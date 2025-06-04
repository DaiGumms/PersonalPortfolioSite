/**
 * End-to-end test script for the contact form
 * 
 * This is a simple test script to validate the contact form functionality.
 * It checks that the form elements are rendered correctly, 
 * validates form inputs, and simulates form submission.
 * 
 * To use this test:
 * 1. Install Playwright: npm install -D @playwright/test
 * 2. Run the test: npx playwright test tests/contact-form.spec.ts
 */

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('form validation and submission', async ({ page }) => {
    // Navigate to the homepage containing the contact form
    await page.goto('/');
    
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView();
    });
    
    // Wait for form to be visible
    await page.waitForSelector('form');
    
    // Check that form elements are present
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Test form validation - Try submitting empty form
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('text="Name must be at least 2 characters."')).toBeVisible();
    await expect(page.locator('text="Invalid email address."')).toBeVisible();
    await expect(page.locator('text="Message must be at least 10 characters."')).toBeVisible();
    
    // Fill form with invalid data
    await page.locator('input[id="name"]').fill('A');
    await page.locator('input[id="email"]').fill('invalid-email');
    await page.locator('textarea[id="message"]').fill('Too short');
    
    // Check validation errors
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('text="Name must be at least 2 characters."')).toBeVisible();
    await expect(page.locator('text="Invalid email address."')).toBeVisible();
    await expect(page.locator('text="Message must be at least 10 characters."')).toBeVisible();
    
    // Fill form with valid data
    await page.locator('input[id="name"]').fill('John Doe');
    await page.locator('input[id="email"]').fill('test@example.com');
    await page.locator('textarea[id="message"]').fill('This is a test message that is long enough to pass validation.');
    
    // Mock API response for testing
    await page.route('/api/contact', async (route) => {
      const json = { success: true, message: 'Email sent successfully' };
      await route.fulfill({ json });
    });
    
    // Submit the form
    await page.locator('button[type="submit"]').click();
    
    // Wait for success message
    await expect(page.locator('text="Message Sent Successfully!"')).toBeVisible({ timeout: 5000 });
  });
  
  test('accessibility testing', async ({ page }) => {
    // Navigate to the homepage containing the contact form
    await page.goto('/');
    
    // Scroll to the contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView();
    });
    
    // Check accessibility attributes on form elements
    await expect(page.locator('input[id="name"]')).toHaveAttribute('aria-required', 'true');
    await expect(page.locator('input[id="email"]')).toHaveAttribute('aria-required', 'true');
    await expect(page.locator('textarea[id="message"]')).toHaveAttribute('aria-required', 'true');
    
    // Tab through form elements to check keyboard navigation
    await page.keyboard.press('Tab'); // Should focus name field
    await expect(page.locator('input[id="name"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Should focus email field
    await expect(page.locator('input[id="email"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Should focus message field
    await expect(page.locator('textarea[id="message"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Should focus submit button
    await expect(page.locator('button[type="submit"]')).toBeFocused();
  });
});
