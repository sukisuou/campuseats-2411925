import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import DailySpecial from './components/DailySpecial.jsx'

function App() {
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)
    
    const [selectedVendorId, setSelectedVendorId] = useState(null)
    const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
    const [cart, setCart] = useState([]) // lines of { item, qty }
    const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
    const [lastOrder, setLastOrder] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        setError(null)
        fetch('/api/vendors.json', { signal: controller.signal })
        .then((res) => {
            // TODO: if res.ok is false, throw new Error(`HTTP ${res.status}`)
            if(!res.ok) throw new Error(`HTTP ${res.status}`)
            return res.json()
        })
        .then((data) => {
            setVendors(data)
            // Keep the vendor the user already picked; otherwise pick the first one.
            setSelectedVendorId((current) => current ?? data[0]?.id ?? null)
        })
        .catch((err) => {
            // TODO: call setError(err.message), but NOT when err.name is 'AbortError'
            if(err.name !== 'AbortError') setError(err.message)
        })
        .finally(() => {
            if (!controller.signal.aborted) setLoading(false)
        })

        return () => controller.abort() // cleanup: cancel an old request
    }, [reloadKey])
    
    function handleAddToCart(item) {
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
    function handleChangeQty(itemId, delta) { // delta is +1 or -1
        setCart((prev) =>
        prev
            .map((line) => line.item.id === itemId ? { ...line, qty: line.qty + delta } : line)
            .filter((line) => line.qty > 0) // qty 0 means the line disappears
        )
    }
    function handleRemove(itemId) {
        // TODO: setCart(prev => prev.filter(...)), keep lines whose item.id !== itemId
        setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
    }

    const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

    function handlePlaceOrder(details) {
        const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
        setLastOrder({ ...details, total })
        setCart([])
        setView('done')
    }

    let content
    if(loading){
        content = <Loading/>
    }else if(error){
        content = <ErrorMessage message = {error} onRetry = {() => setReloadKey((k) => k + 1)}/>
    }else if(view === 'cart'){
        content = (
            <CartPage 
                cart = {cart}
                onChangeQty = {handleChangeQty}
                onRemove = {handleRemove}
                onPlaceOrder = {handlePlaceOrder}
            />
        )
    }else if(view === 'done'){
        content = (
            <div className = "card">
                <h2>Order placed!</h2>
                <p>Thank you, <strong>{lastOrder.name}</strong></p>
                <p>Mahallah: <strong>{lastOrder.mahallah}</strong></p>
                <p>Pickup time: <strong>{lastOrder.pickupTime}</strong></p>
                <p>Total price: <strong>RM {lastOrder.total.toFixed(2)}</strong></p>
                <button type = "button" className = "btn" onClick = {() => setView('menu')}>
                    Back to menu
                </button>
            </div>
        )
    }else{
        content = (
            <>
                <DailySpecial/>
                <section>
                    <h2 className = "section-title">Choose a vendor</h2>
                    <div className = "vendor-grid">
                        {vendors.map((vendor) => (
                            <VendorCard
                                key = {vendor.id}
                                vendor = {vendor}
                                isSelected = {vendor.id === selectedVendorId}
                                onSelect = {setSelectedVendorId}
                            />
                        ))}
                    </div>
                </section>
                {selectedVendor && (
                    <section>
                        <h2 className = "section-title">Menu: {selectedVendor.name}</h2>
                        <MenuList items = {selectedVendor.menu} onAdd = {handleAddToCart} />
                    </section>
                )}
            </>
        )
    }

    return (
    <>
        <Header cartCount = {cartCount} onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
        <main className = "container">{content}</main>
        <Footer />
    </>
    )
}

export default App