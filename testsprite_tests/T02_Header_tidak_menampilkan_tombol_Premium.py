import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:3000/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # --> Assertions to verify final state
        cnt = await page.locator("text=Premium").count()
        # Assert: No 'Premium' button is present in the header
        assert cnt == 0, "Found a 'Premium' button in the header"
        cnt = await page.locator("text=mahkota").count()
        # Assert: No 'mahkota' text is present in the header
        assert cnt == 0, "Found 'mahkota' text in the header"
        cnt = await page.locator("text=Mahkota").count()
        # Assert: No 'Mahkota' text is present in the header
        assert cnt == 0, "Found 'Mahkota' text in the header"
        elem = page.locator("text=Diskusi Hukum").nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: Site title 'Diskusi Hukum' is visible in the header
        assert await elem.is_visible(), "Expected site title 'Diskusi Hukum' to be visible in the header"
        img = page.locator('xpath=/html/body/header/nav/a/img').nth(0)
        await img.scroll_into_view_if_needed()
        alt = await img.get_attribute('alt')
        # Assert: Site logo image has alt text 'Diskusi Hukum' (no crown/mahkota)
        assert alt == "Diskusi Hukum", f"Unexpected logo alt text: {alt}"
        elem = page.locator("text=Beranda").nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: 'Beranda' menu item is visible in the header
        assert await elem.is_visible(), "Expected 'Beranda' menu item to be visible in the header"
        elem = page.locator("text=Artikel ▾").nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: 'Artikel ▾' menu item is visible in the header
        assert await elem.is_visible(), "Expected 'Artikel ▾' menu item to be visible in the header"
        elem = page.locator("text=Komunitas ▾").nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: 'Komunitas ▾' menu item is visible in the header
        assert await elem.is_visible(), "Expected 'Komunitas ▾' menu item to be visible in the header"
        elem = page.locator("text=Konsultasi").nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: 'Konsultasi' menu item is visible in the header
        assert await elem.is_visible(), "Expected 'Konsultasi' menu item to be visible in the header"
        inp = page.locator('xpath=/html/body/header/nav/div[2]/form/input').nth(0)
        await inp.scroll_into_view_if_needed()
        # Assert: Search input with placeholder 'Cari artikel...' is visible in the header
        assert await inp.is_visible(), "Expected search input to be visible in the header"
        placeholder = await inp.get_attribute('placeholder')
        # Assert: Search input has placeholder exactly 'Cari artikel...'
        assert placeholder == 'Cari artikel...', f"Unexpected search placeholder: {placeholder}"
        btn = page.locator('xpath=/html/body/header/nav/div[2]/button[2]').nth(0)
        await btn.scroll_into_view_if_needed()
        # Assert: Search button (aria-label="Cari") is visible in the header
        assert await btn.is_visible(), "Expected search button to be visible in the header"
        elem = page.locator('text=Masuk').nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: 'Masuk' login link is visible in the header
        assert await elem.is_visible(), "Expected 'Masuk' login link to be visible in the header"
        link_href = await page.locator('xpath=/html/body/header/nav/div[2]/a').nth(0).get_attribute('href')
        # Assert: 'Masuk' link points to the /login path
        assert '/login' in link_href, f"'Masuk' link does not point to /login: {link_href}"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    