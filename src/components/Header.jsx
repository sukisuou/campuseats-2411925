// no more button apparently
import { NavLink } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

function Header() {
    const { count, orders } = useCart()
    const { user } = useAuth()

    return (
        <header className = "header" style = {{ position: 'sticky', top: 0, zIndex: 1000}}>
            <h1 className = "logo">
                CampusEats
            </h1>
            <nav className = "nav">
                <NavLink to = "/" end className = "link btn">
                    Vendors
                </NavLink>
                <NavLink to = "/orders" className = "link btn">
                    Orders <span className = "badge">{orders.length}</span>
                </NavLink>
                <NavLink to = "/cart" className = "link btn">
                    Cart <span className = "badge">{count}</span>
                </NavLink>
                {user ? (
                    <NavLink to = "/profile" end className = "user-name link btn">
                        Hi, {user.displayName || user.email}!
                    </NavLink>
                ) : (<NavLink to = "/login" className = "link btn">Log in</NavLink>)}
            </nav>
        </header>
    )
}

export default Header