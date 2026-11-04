import { useParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export function VendorPage(){
    const { id } = useParams()

    // use the useVendors hook this time to show the vendors
    const { vendors, loading, error, reload } = useVendors()
    if(loading) return <Loading/>
    if(error) return <ErrorMessage message = {error} onRetry = {reload} />
    
    // shows the menu in a vendor
    const vendor = vendors.find((v) => v.id === id)
    if(!vendor){
        return (
            <div>
                <h2>Vendor not found</h2>
                <p>Could not find a vendor with ID "{id}".</p>
                <Link to="/">Back to Vendors</Link>
            </div>
        )
    }

    return (
        <section>
            <h2 className = "section-title">{vendor.name}'s Menu</h2>
            <MenuList items = {vendor.menu} />
        </section>
    )
}