import { DISCOUNT } from "./DailySpecial"

function MenuItemCard({ item, onAdd }) {
    const isDrink = item.category === 'Drinks'
    const finalPrice = isDrink ? item.price * ((100 - DISCOUNT) / 100) : item.price

    return (
        <article className = "card menu-card">
            <div className = "thumb" aria-hidden = "true">{item.name.charAt(0)}</div>
            <h3>{item.name}</h3>
            <p className = "muted">{item.description}</p>
            <p className = "price">
                {isDrink ? (
                    <>
                        <span className="muted" style={{ textDecoration: 'line-through', marginRight: '0.5rem' }}>
                            RM {item.price.toFixed(2)}
                        </span>
                        <span>RM {finalPrice.toFixed(2)}</span>
                    </>
                ) : (`RM ${item.price.toFixed(2)}`)}
            </p>
            <button className = "btn" disabled = {!item.available} onClick={() => onAdd({ ...item, price: finalPrice })} >
                {item.available ? 'Add to cart' : 'Sold out'}
            </button>
        </article>
    )
}

export default MenuItemCard