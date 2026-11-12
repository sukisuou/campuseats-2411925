import { useState, useEffect } from 'react'
import { Link } from 'react-router'

function isVendorOpen(openHours){
    if(!openHours) return false

    // parse the format ("10:00 am") into minutes (600)
    const toMinutes = (timeStr) => {
        const [time, period] = timeStr.trim().toLowerCase().split(' ')
        let [hours, minutes] = time.split(':').map(Number)

        if (period === 'pm' && hours !== 12) hours += 12
        if (period === 'am' && hours === 12) hours = 0

        return hours * 60 + minutes
    }

    // break format into open and close ("10:00 am /-/ 10:00 pm")
    const [openStr, closeStr] = openHours.split('-')
    const openTime = toMinutes(openStr)
    const closeTime = toMinutes(closeStr)

    const now = new Date()
    const nowTime = now.getHours() * 60 + now.getMinutes()

    return openTime <= closeTime 
        ? nowTime >= openTime && nowTime < closeTime    // normal period (am - pm)
        : nowTime >= openTime || nowTime < closeTime    // overnight period (pm - am)
}

function VendorCard({ vendor }){
    const [isOpen, setIsOpen] = useState(() => isVendorOpen(vendor.openHours))

    // real time update, no need to refresh
    useEffect(() => {
        const interval = setInterval(() => {setIsOpen(isVendorOpen(vendor.openHours))}, 30000)  // update every 30 seconds

        return () => clearInterval(interval)
    }, [vendor.openHours])

    return (
        <Link
            to = {`/vendor/${vendor.id}`}
            className = "card vendor-card"
        >
            <div className = "thumb" aria-hidden = "true">{vendor.name.charAt(0)}</div>
            <div>
                <h3>{vendor.name}</h3>
                <p className = "muted">{vendor.location}</p>
                <p className = "muted">Open: {vendor.openHours}</p>
                <span className = {isOpen ? 'status open' : 'status closed'}>
                    {isOpen ? 'Open now' : 'Closed'}
                </span> 
            </div>
        </Link>
    )
}

export default VendorCard