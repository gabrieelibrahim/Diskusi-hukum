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
        
        # -> Open the Konsultasi page by navigating to /konsultasi.
        await page.goto("http://localhost:3000/konsultasi")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Konsultasi Sekarang' button to open WhatsApp and verify the prefilled message contains 'Rp50.000'.
        # Konsultasi Sekarang link
        elem = page.get_by_role('link', name='Konsultasi Sekarang', exact=True)
        await elem.click(timeout=10000)
        
        # -> Switch to the 'Konsultasi Hukum — Diskusi Huk' tab and verify the price card shows '50K' and the '1. Transfer' step also shows '50K'.
        # Switch to tab EA38
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Click the 'Konsultasi Sekarang' button to open WhatsApp with the prefilled message.
        # Konsultasi Sekarang link
        elem = page.get_by_role('link', name='Konsultasi Sekarang', exact=True)
        await elem.click(timeout=10000)
        
        # -> Switch to the tab titled 'Konsultasi Hukum — Diskusi Huk' so the price card and the '1. Transfer' step can be inspected.
        # Switch to tab EA38
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Klik tombol 'Konsultasi Sekarang' untuk membuka WhatsApp dan verifikasi bahwa pesan pra-isian berisi 'Rp50.000'.
        # Konsultasi Sekarang link
        elem = page.get_by_role('link', name='Konsultasi Sekarang', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        elem = page.locator("text=Mulai dari 50K per sesi konsultasi").nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: Price card shows the text "Mulai dari 50K per sesi konsultasi"
        assert await elem.is_visible(), "Expected element to be visible after scrolling into view"
        elem = page.locator("text=1. Transfer 50K").nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: Step '1. Transfer 50K' is visible in the steps list
        assert await elem.is_visible(), "Expected element to be visible after scrolling into view"
        elem = page.locator("text=Saya tertarik menggunakan layanan Konsultasi Hukum (Rp50.000).").nth(0)
        await elem.scroll_into_view_if_needed()
        text = await elem.text_content()
        # Assert: WhatsApp prefilled message contains 'Rp50.000'
        assert 'Rp50.000' in text, "Expected WhatsApp prefilled message to contain 'Rp50.000'"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    