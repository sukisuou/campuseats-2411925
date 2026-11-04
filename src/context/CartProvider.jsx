import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage('cart', [])
    const [orders, setOrders] = useLocalStorage('orders', [])

    const count = cart.reduce((sum, line) => sum + line.qty, 0)
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

    //just change name from main, rest just copy
    function addToCart(item) {
        setCart((prev) => {
            const existing = prev.find((line) => line.item.id === item.id)
            if (existing) {
            // Already in the cart: copy every line, and add 1 to the matching one
            return prev.map((line) =>
                line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line)
            }

            return [...prev, { item, qty: 1 }] // new line
        })
    }
    function changeQty(itemId, delta) { // delta is +1 or -1
        setCart((prev) =>
        prev
            .map((line) => line.item.id === itemId ? { ...line, qty: line.qty + delta } : line)
            .filter((line) => line.qty > 0) // qty 0 means the line disappears
        )
    }
    function removeFromCart(itemId) {
        setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
    }

    //handle order placing
    function placeOrder(details) {
        const newOrder = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            items: cart, 
            total,
            ...details  // from CheckoutForm
        }

        setOrders((prev) => [newOrder, ...prev])
        setCart([])
        return newOrder
    }

    // extra!!! delete the chosen order (cuz uh, deleting on devtool sucks, hehe)
    function deleteOrder(orderId) {
        setOrders((prev) => prev.filter((order) => order.id !== orderId))
    }

    return (
        <CartContext.Provider value={{ cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder, deleteOrder }}>
            {children}
        </CartContext.Provider>
    )
}