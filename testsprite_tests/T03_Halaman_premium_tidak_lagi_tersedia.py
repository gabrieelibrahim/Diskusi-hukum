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
        
        # -> Buka URL '/premium' dan periksa apakah halaman menunjukkan 404/redirect atau menampilkan konten premium (harga/CTA).
        await page.goto("http://localhost:3000/premium")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # --> Assertions to verify final state
        current_url = await page.evaluate("() => window.location.href")
        # Assert: The browser is currently at /premium (we visited the premium URL)
        assert "/premium" in current_url, "The page should be at /premium"
        
        elem = page.locator("text=404").nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: The page shows the large '404' text indicating the page was not found
        assert await elem.is_visible(), "Expected element to be visible after scrolling into view"
        
        text = await page.locator("text=Halaman Tidak Ditemukan").nth(0).text_content()
        # Assert: The page displays the title 'Halaman Tidak Ditemukan'
        assert 'Halaman Tidak Ditemukan' in text
        
        text = await page.locator("text=Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.").nth(0).text_content()
        # Assert: The page shows the explanatory not-found sentence
        assert 'Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.' in text
        
        elem = page.locator('xpath=/html/body/main/div/div/a').nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: The 'Kembali ke Beranda' link is visible to navigate back to home
        assert await elem.is_visible(), "Expected element to be visible after scrolling into view"
        
        count = await page.locator("text=Premium").count()
        # Assert: The page does not contain the text 'Premium' (no premium offers visible)
        assert count == 0, "Found unexpected 'Premium' text on the page"
        
        count = await page.locator("text=Berlangganan").count()
        # Assert: The page does not contain the text 'Berlangganan' (no subscription CTA)
        assert count == 0, "Found unexpected 'Berlangganan' text on the page"
        
        count = await page.locator("text=Harga").count()
        # Assert: The page does not contain the text 'Harga' (no price displayed)
        assert count == 0, "Found unexpected 'Harga' text on the page"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    