import { useVendors } from '../hooks/useVendors.js'
import VendorCard from '../components/VendorCard.jsx'
import DailySpecial from '../components/DailySpecial.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export function HomePage() {
    // use the useVendors hook this time to show the vendors
    const { vendors, loading, error, reload } = useVendors()
    if(loading) return <Loading/>
    if(error) return <ErrorMessage message = {error} onRetry = {reload} />

    // return the usual homepage with vendors (not with menus)
    return (
        <>
            <DailySpecial />
            <section>
                <h2 className = "section-title">Choose a vendor</h2>
                <div className = "vendor-grid">
                    {vendors.map((vendor) => (
                        <VendorCard key = {vendor.id} vendor = {vendor} />
                    ))}
                </div>
            </section>
        </>
    )
}