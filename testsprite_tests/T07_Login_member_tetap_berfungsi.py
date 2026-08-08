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
        
        # -> Klik tautan 'Masuk' di header untuk membuka halaman /login atau form masuk.
        # Masuk link
        elem = page.get_by_role('link', name='Masuk', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Daftar' tab to open the registration form.
        # Daftar button
        elem = page.get_by_role('button', name='Daftar', exact=True)
        await elem.click(timeout=10000)
        
        # -> Fill the 'Nama lengkap', 'Email', and 'Password' fields with the new account details and click the 'Daftar' button.
        # Nama lengkap text field
        elem = page.get_by_placeholder('Nama lengkap', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Test User 2026-08-08")
        
        # -> Fill the 'Nama lengkap', 'Email', and 'Password' fields with the new account details and click the 'Daftar' button.
        # nama@email.com email field
        elem = page.get_by_placeholder('nama@email.com', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("testuser20260808@example.com")
        
        # -> Fill the 'Nama lengkap', 'Email', and 'Password' fields with the new account details and click the 'Daftar' button.
        # Minimal 6 karakter password field
        elem = page.get_by_placeholder('Minimal 6 karakter', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("password1")
        
        # -> Fill the 'Nama lengkap', 'Email', and 'Password' fields with the new account details and click the 'Daftar' button.
        # Daftar button
        elem = page.get_by_text('Nama', exact=True).locator("xpath=ancestor-or-self::*[.//button][1]").get_by_role('button', name='Daftar', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Masuk' button in the login card to sign in with the newly created account.
        # Masuk button
        elem = page.get_by_text('Email', exact=True).locator("xpath=ancestor-or-self::*[.//button][1]").get_by_role('button', name='Masuk', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Masuk' link in the header to open the login form so the created account can be used to sign in.
        # Masuk link
        elem = page.get_by_role('link', name='Masuk', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        elem = page.locator('text=Akun berhasil dibuat. Silakan masuk.').nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: Success message "Akun berhasil dibuat. Silakan masuk." is visible after registration
        assert await elem.is_visible(), "Expected success message 'Akun berhasil dibuat. Silakan masuk.' to be visible after scrolling into view"
        current_url = await page.evaluate("() => window.location.href")
        # Assert: URL navigates to / (beranda) after login
        assert "/" in current_url, "The page should be at / (beranda) after login"
        elem = page.locator('text=Test User 2026-08-08').nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: Header displays username "Test User 2026-08-08" after login
        assert await elem.is_visible(), "Expected header to show 'Test User 2026-08-08' after scrolling into view"
        elem = page.locator('text=Logout').nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: Logout button is visible in the header after login
        assert await elem.is_visible(), "Expected 'Logout' button to be visible after scrolling into view"
        locator = page.locator('text=PREMIUM')
        count = await locator.count()
        # Assert: No PREMIUM badge is present on the page
        assert count == 0, f"Expected no PREMIUM badge on the page, found {count}"
        locator = page.locator('text=FREE')
        count = await locator.count()
        # Assert: No FREE badge is present on the page
        assert count == 0, f"Expected no FREE badge on the page, found {count}"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    