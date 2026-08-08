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
        
        # -> Click the 'Mulai Konsultasi' button
        # Mulai Konsultasi link
        elem = page.get_by_role('link', name='Mulai Konsultasi', exact=True)
        await elem.click(timeout=10000)
        
        # -> Switch to the homepage tab and verify the '50K' price text on the Konsultasi Hukum Privat card.
        # Switch to tab 7BF7
        page = context.pages[-1]  # switch to most recently active tab
        
        # -> Switch to the WhatsApp send page and verify the message text contains 'Rp50.000'.
        # Switch to tab 34A4
        page = context.pages[-1]  # switch to most recently active tab
        
        # --> Assertions to verify final state
        # Switch to the homepage tab (assume the first opened page is the homepage)
        homepage = context.pages[0]
        elem = homepage.locator('text=50K').nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: Konsultasi Hukum Privat card on the homepage displays the large price "50K"
        assert await elem.is_visible(), "Expected element to be visible after scrolling into view"
        
        # Switch to the WhatsApp tab (assume the most recently opened tab is WhatsApp)
        whatsapp_page = context.pages[-1]
        msg_elem = whatsapp_page.locator('text=Saya tertarik menggunakan layanan Konsultasi Hukum (Rp50.000).').nth(0)
        await msg_elem.scroll_into_view_if_needed()
        text = await msg_elem.text_content()
        # Assert: WhatsApp message contains the text "Rp50.000"
        assert 'Rp50.000' in text, "Expected 'Rp50.000' to appear in the WhatsApp pre-filled message"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    