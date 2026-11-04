import { useCart } from '../hooks/useCart.js'

export function OrdersPage() {
    const { orders, deleteOrder } = useCart()

    // catch null or zero order
    if(!orders || orders.length === 0){
        return (
            <div>
                <h2>Orders</h2>
                <p className = "muted">No past orders yet.</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Orders</h2>
            <div className = "grid">
                {orders.map((order) => (
                    <div key={order.id} className="card">
                        <p><strong>Order #{order.id}</strong></p>
                        <p className = "muted">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className = "muted">
                            For {order.name} ({order.mahallah}) : Pickup at {order.pickupTime}
                        </p>

                        <ul className = "cart-list">
                            {order.items.map((line) => (
                                <li key = {line.item.id} className = "cart-line">
                                    <span>{line.item.name} × {line.qty}</span>
                                    <span>RM {(line.item.price * line.qty).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>

                        <p style = {{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', fontWeight: 'bold' }}>
                            <span>Total:</span>
                            <span style = {{marginRight: '30px'}}>RM {order.total.toFixed(2)}</span>
                        </p>

                        <button type = "button" className = "btn-danger" onClick = {() => deleteOrder(order.id)}>
                            Delete Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}