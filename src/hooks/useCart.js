import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

export function useCart() {
    const context = useContext(CartContext)
    // safely return error if null
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}