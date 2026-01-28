# Cookie-tool


Cookie Utility is a lightweight Firefox extension that allows you to view and export cookies for the current website. It’s designed for development, debugging, and testing purposes. All actions are manual, local, and secure — no data is sent to any server.

Features:

Displays all cookies for the active website.

Shows cookie details including HttpOnly, Secure, and SameSite flags.

Select/deselect individual cookies before export.

Copy selected cookies to clipboard.

Export selected cookies to a .txt file.

Select all / none functionality.

Clean, dark developer-friendly UI.

Works only on sites you open manually; does not access cookies silently.

Privacy & Security:

No data collection, storage, or transmission.

Cookies are accessed only locally in your browser.

For development and personal use only.

Installation / Testing:

Open Firefox and go to about:debugging#/runtime/this-firefox.

Click Load Temporary Add-on.

Select the manifest.json file in the project folder.

Click the extension icon to use it.

Notes:

Some sites (like Google or Roblox) may split cookies across subdomains; open the main page of the site to view cookies.

Works for personal testing and debugging only; do not export cookies from accounts you do not own.
