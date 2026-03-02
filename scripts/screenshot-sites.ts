import { chromium, Browser, Page } from 'playwright';
import path from 'path';
import fs from 'fs';

// ============================================
// CONFIGURATION
// ============================================
const CONFIG_FILE = path.join(process.cwd(), 'sites.config');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'screenshots');
const MAX_PAGES = 50;
const ANIMATION_WAIT = 800;

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const clickableSelectors = [
  'button:not([disabled]):not([type="submit"])',
  '[role="button"]',
  '[data-toggle]',
  '[aria-haspopup]',
  '[aria-expanded]',
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50)
    .replace(/^-|-$/g, '');
}

function isSameDomain(url: string, baseUrl: string): boolean {
  try {
    const urlHost = new URL(url).hostname;
    const baseHost = new URL(baseUrl).hostname;
    return urlHost === baseHost;
  } catch {
    return false;
  }
}

function loadSitesFromConfig(): string[] {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(`No ${CONFIG_FILE} found.`);
    return [];
  }
  
  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

function parseCliArgs(): { urls: string[] } {
  const args = process.argv.slice(2);
  const urls: string[] = [];
  
  for (const arg of args) {
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
      urls.push(arg);
    } else if (arg.startsWith('--url=')) {
      urls.push(arg.replace('--url=', ''));
    }
  }
  
  return { urls };
}

function urlToSlug(url: string): string {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  if (pathname === '/' || pathname === '') return 'home';
  return pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
}

// ============================================
// COPY SCRAPING
// ============================================

interface PageCopy {
  url: string;
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  h3: string[];
  paragraphs: string[];
  links: { text: string; href: string }[];
  buttons: string[];
}

async function scrapeCopy(page: Page, url: string): Promise<PageCopy> {
  const copy = await page.evaluate(() => {
    const getText = (selector: string): string[] => {
      return Array.from(document.querySelectorAll(selector))
        .map(el => (el.textContent || '').trim())
        .filter(t => t.length > 0);
    };

    const getLinks = () => {
      return Array.from(document.querySelectorAll('a[href]'))
        .map(a => ({
          text: (a.textContent || '').trim(),
          href: a.getAttribute('href') || '',
        }))
        .filter(l => l.text.length > 0 && !l.href.startsWith('#'));
    };

    return {
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      h1: getText('h1'),
      h2: getText('h2'),
      h3: getText('h3'),
      paragraphs: getText('p').filter(p => p.length > 20), // Skip short ones
      links: getLinks().slice(0, 50), // Limit
      buttons: getText('button').slice(0, 20),
    };
  });

  return { url, ...copy };
}

// ============================================
// PAGE DISCOVERY
// ============================================

async function getPageTitle(page: Page): Promise<string> {
  const title = await page.title();
  const cleaned = title
    .replace(/\s*[|\-–—]\s*.*$/, '')
    .trim();
  return slugify(cleaned) || 'untitled';
}

async function getSiteName(page: Page, url: string): Promise<string> {
  const title = await page.title();
  // Try to get the site name (after | or - in title)
  const match = title.match(/[|\-–—]\s*(.+)$/);
  if (match) return slugify(match[1]);
  
  // Fallback to first part of title
  const cleaned = title.replace(/\s*[|\-–—]\s*.*$/, '').trim();
  if (cleaned) return slugify(cleaned);
  
  // Fallback to domain
  const domain = new URL(url).hostname.replace('www.', '');
  return slugify(domain);
}

interface PageInfo {
  url: string;
  name: string;
  title: string;
}

async function discoverPages(page: Page, startUrl: string): Promise<PageInfo[]> {
  const discovered: PageInfo[] = [];
  const usedNames = new Set<string>();
  const toVisit = [startUrl];
  const visited = new Set<string>();

  console.log('🔍 Discovering pages...');

  while (toVisit.length > 0 && discovered.length < MAX_PAGES) {
    const url = toVisit.shift()!;
    
    const normalizedUrl = new URL(url);
    normalizedUrl.hash = '';
    normalizedUrl.search = '';
    const cleanUrl = normalizedUrl.href.replace(/\/$/, '');

    if (visited.has(cleanUrl)) continue;
    visited.add(cleanUrl);

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(500);
      
      const title = await page.title();
      let name = await getPageTitle(page);
      
      // If name already used, append URL slug to make unique
      if (usedNames.has(name)) {
        const urlSlug = urlToSlug(url);
        name = `${name}-${urlSlug}`;
      }
      // Still duplicate? Add counter
      let counter = 2;
      const baseName = name;
      while (usedNames.has(name)) {
        name = `${baseName}-${counter++}`;
      }
      
      usedNames.add(name);
      discovered.push({ url, name, title });
      console.log(`  ✓ ${name} (${url})`);

      // Find all internal links
      const links = await page.$$eval('a[href]', (anchors, baseUrl) => {
        return anchors
          .map(a => {
            try {
              const href = a.getAttribute('href');
              if (!href) return null;
              if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return null;
              return new URL(href, baseUrl).href;
            } catch {
              return null;
            }
          })
          .filter(Boolean) as string[];
      }, startUrl);

      for (const link of links) {
        const normalized = new URL(link);
        normalized.hash = '';
        normalized.search = '';
        const clean = normalized.href.replace(/\/$/, '');
        
        if (isSameDomain(link, startUrl) && !visited.has(clean)) {
          toVisit.push(link);
        }
      }
    } catch (error) {
      console.log(`  ✗ Skipped: ${url}`);
    }
  }

  return discovered;
}

// ============================================
// SCREENSHOT FUNCTIONS
// ============================================

async function takePageScreenshots(
  page: Page,
  siteName: string,
  pageName: string,
  viewportName: string
) {
  const dir = path.join(OUTPUT_DIR, siteName, pageName);
  ensureDir(dir);

  await page.screenshot({
    path: path.join(dir, `${viewportName}-full.png`),
    fullPage: true,
  });
  console.log(`    ✓ ${viewportName}-full.png`);

  await page.screenshot({
    path: path.join(dir, `${viewportName}-above-fold.png`),
    fullPage: false,
  });
  console.log(`    ✓ ${viewportName}-above-fold.png`);
}

async function captureClickStates(
  page: Page,
  siteName: string,
  pageName: string
) {
  const dir = path.join(OUTPUT_DIR, siteName, pageName, 'interactions');
  const captured = new Set<string>();
  let count = 0;

  for (const selector of clickableSelectors) {
    const elements = await page.$$(selector);

    for (const element of elements) {
      if (count >= 15) break;

      try {
        const isVisible = await element.isVisible();
        if (!isVisible) continue;

        const text = await element.evaluate((el) => {
          const txt = (el.textContent || el.getAttribute('aria-label') || '').trim();
          return txt.slice(0, 30).replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-');
        });
        
        if (!text || captured.has(text.toLowerCase())) continue;
        captured.add(text.toLowerCase());

        const baseName = text.toLowerCase();

        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        ensureDir(dir);
        await page.screenshot({
          path: path.join(dir, `${baseName}-before.png`),
          fullPage: false,
        });

        await element.click();
        await page.waitForTimeout(ANIMATION_WAIT);

        await page.screenshot({
          path: path.join(dir, `${baseName}-after.png`),
          fullPage: false,
        });

        count++;

        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        await page.mouse.click(10, 10);
        await page.waitForTimeout(200);

      } catch {
        await page.keyboard.press('Escape').catch(() => {});
        await page.waitForTimeout(200);
        continue;
      }
    }
  }

  if (count > 0) {
    console.log(`    ✓ ${count} click interactions captured`);
  }
}

async function captureMenuStates(
  page: Page,
  siteName: string,
  pageName: string,
  viewportName: string
) {
  const dir = path.join(OUTPUT_DIR, siteName, pageName, 'menus');
  
  const menuTriggers = [
    '[aria-label*="menu" i]',
    '[aria-label*="navigation" i]',
    'button[class*="menu" i]',
    'button[class*="hamburger" i]',
    '.hamburger',
    '.menu-toggle',
    '.mobile-menu-trigger',
    '[class*="nav-toggle"]',
  ];

  for (const triggerSelector of menuTriggers) {
    const trigger = await page.$(triggerSelector);
    if (!trigger) continue;

    try {
      const isVisible = await trigger.isVisible();
      if (!isVisible) continue;

      ensureDir(dir);

      await trigger.click();
      await page.waitForTimeout(ANIMATION_WAIT);

      await page.screenshot({
        path: path.join(dir, `menu-${viewportName}.png`),
        fullPage: false,
      });
      console.log(`    ✓ menu-${viewportName}.png`);

      await page.keyboard.press('Escape');
      await page.waitForTimeout(ANIMATION_WAIT);
      break;
    } catch {
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(300);
      continue;
    }
  }
}

// ============================================
// MAIN FLOW
// ============================================

async function screenshotSite(browser: Browser, startUrl: string) {
  const discoveryContext = await browser.newContext();
  const discoveryPage = await discoveryContext.newPage();
  
  await discoveryPage.goto(startUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
  const siteName = await getSiteName(discoveryPage, startUrl);
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📸 ${siteName}`);
  console.log(`   ${startUrl}`);
  console.log('='.repeat(50));

  const pages = await discoverPages(discoveryPage, startUrl);
  await discoveryContext.close();

  console.log(`\n📄 Found ${pages.length} pages\n`);

  // Collect all copy data
  const allCopy: PageCopy[] = [];

  for (const pageInfo of pages) {
    console.log(`\n📄 ${pageInfo.name}`);

    for (const viewport of viewports) {
      console.log(`  → ${viewport.name} (${viewport.width}x${viewport.height})`);

      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();

      try {
        await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(ANIMATION_WAIT);

        await takePageScreenshots(page, siteName, pageInfo.name, viewport.name);

        // Scrape copy only on desktop (once per page)
        if (viewport.name === 'desktop') {
          const copy = await scrapeCopy(page, pageInfo.url);
          allCopy.push(copy);
          await captureClickStates(page, siteName, pageInfo.name);
        }

        if (viewport.name === 'mobile' || viewport.name === 'tablet') {
          await captureMenuStates(page, siteName, pageInfo.name, viewport.name);
        }
      } catch (error) {
        console.error(`    ✗ Error: ${error instanceof Error ? error.message : error}`);
      } finally {
        await context.close();
      }
    }
  }

  // Save copy.json
  const copyPath = path.join(OUTPUT_DIR, siteName, 'copy.json');
  fs.writeFileSync(copyPath, JSON.stringify(allCopy, null, 2));
  console.log(`\n📝 Saved copy.json`);
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('🚀 Site Screenshot Crawler');
  console.log('==========================\n');

  const { urls: cliUrls } = parseCliArgs();
  const configUrls = cliUrls.length === 0 ? loadSitesFromConfig() : [];
  const urls = cliUrls.length > 0 ? cliUrls : configUrls;

  if (urls.length === 0) {
    console.log('Usage:');
    console.log('  npm run screenshots -- https://example.com');
    console.log('  Or create sites.config with URLs (one per line)');
    process.exit(1);
  }

  console.log(`Sites to screenshot: ${urls.length}`);
  urls.forEach(u => console.log(`  - ${u}`));
  console.log(`\nOutput: ${OUTPUT_DIR}\n`);

  ensureDir(OUTPUT_DIR);

  const browser = await chromium.launch({ headless: true });

  try {
    for (const url of urls) {
      await screenshotSite(browser, url);
    }

    console.log('\n✅ All screenshots complete!');
    console.log(`📁 Saved to: ${OUTPUT_DIR}`);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
