# Setup
- Using `npm install` and `npm run dev` to run the Vite application

# Architecture
App
|—— Header
|—— DailySpecial
|—— VendorCard
|—— MenuList
|   \—— MenuItemCard
|—— CartPage
|   |—— CartItem
|   \—— CheckoutForm
\——Footer

- `App.jsx`: The root container, holds vendors data, active vendor selection, cart contents, view toggle (cart, menu) and order confirmation 
- `Header.jsx`: Displays application name (CampusEats) and dynamic button interactions between `Vendors` and `Cart`
- `DailySpecial.jsx`: Displays a promotional card, with 1-second interval between each update, tracking until midnight
- `VendorCard.jsx`: Displays individual vendor, with location, operation time, and `isOpen` state
- `MenuItemCard.jsx`/`MenuList.jsx`: Displays the items in each vendor, with description, availability, and button to `handleAddToCart`
- `CartPage.jsx`/`CartItem.jsx`: Displays selected items with subtotal calculation, handling increment/decrement and removal of items
- `CheckoutForm.jsx`: Displays a form to enter name, location, and pickup time for the orders  
- `Footer.jsx`: Static display of copyright and university name

# State Management
- `vendors`: Stores the array of vendor data fetched from `vendors.json`.
- `loading`: Tracks async fetch status to show a loading state while fetching.
- `error`: Stores any fetch error messages if the request fails.
- `reloadKey`: Numeric counter used as a dependency to re-trigger the data fetch.
- `selectedVendorId`: Holds the `id` of the currently clicked vendor.
- `cart`: Array of `{ item, qty }` objects tracking chosen food items.
- `view`: Controls current page view (`'menu'` | `'cart'` | `'done'`).
- `lastOrder`: Stores the submitted order summary payload to display on the confirmation screen.