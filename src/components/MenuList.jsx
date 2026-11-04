import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items }) {
    // screw onAdd prop, we use addToCart from useCart and CartProvider, muahahaha
    const { addToCart } = useCart()
    
    if (items.length === 0) {
        return <p className="muted">No items on this menu yet.</p>
    }

    return (
        <div className="grid">
            {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onAdd={addToCart} />    // MenuItemCard can keep the onAdd name, i dont care
            ))}
        </div>
    )
}
export default MenuList