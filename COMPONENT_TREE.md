## Component Tree

```
.
└── App
    └── BrowserRouter
        └── CartProvider
            └── Layout
                ├── Header [Reused]
                ├── <Outlet />
                │   ├── HomePage [Adjusted]
                │   │   ├── <DailySpecial /> [Personal Feature: 20% off any drinks]
                │   │   └── VendorCard [Reused]
                │   ├── VendorPage [Adjusted]
                │   │   └── MenuList [Adjusted]
                │   │       └── MenuItemCard [Reused]
                │   ├── CartPage [Reused]
                │   │   ├── CartItem [Reused]
                │   │   └── CheckoutForm [Reused]
                │   ├── OrdersPage [Personal Feature]
                │   │   └── (inline card and delete button)
                │   └── NotFoundPage [Reused]
                └── Footer [Reused]
```