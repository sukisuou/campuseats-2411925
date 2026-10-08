function VendorCard(){
    // data for our vendor
    const vendor = {
        name: "Secret Recipe",
        location: "Mahallah Uthman, Block E",
        openHours: "10:00 am - 10:00 pm",
        isOpen: true
    }

    return (
        <article className = "card vendor-card">
            {/*shows the first letter on icon*/}
            <div className = "thumb" aria-hidden = "true">
                {vendor.name.charAt(0)}
            </div>
            <div>
                <h2>{vendor.name}</h2>
                <p className = "muted">{vendor.location}</p>
                <p className = "muted">Open: {vendor.openHours}</p>
                {/*shows green on open and red on closed*/}
                <span className = {vendor.isOpen ? 'status open' : 'status closed'}>
                    {vendor.isOpen ? 'Open now' : 'Closed'}
                </span>
            </div>
        </article>
    )
}

export default VendorCard