KS Knives — static demo site
=================================

This is a small static site demo for a handcrafted knives shop. It includes:

- `index.html` — page markup (hero, products, about, contact)
- `styles.css` — main styles
- `app.js` — client-side JS to load `products.json` and render products
- `products.json` — product data used by `app.js`
- `assets/` — SVG placeholders used as product images

Quick local testing
-------------------

Browsers restrict fetch() for local JSON files when opened via the `file://` protocol. Run a simple local server and open the site:

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

What I changed
--------------

- Added a hero, navigation, about, and contact sections.
- Implemented a simple product renderer and modal in `app.js`.
- Added sample `products.json` and SVG placeholders.

Next steps (optional)
---------------------

- Hook contact form to Formspree or a backend endpoint.
- Replace SVG placeholders with real product photos.
- Add an order/cart flow and payment integration.
