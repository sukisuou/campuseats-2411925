import { useState, useEffect } from 'react'

export function useVendors(){
    // grab from main
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)

    // from onRetry - reload is a function apparently
    const reload = () => setReloadKey((k) => k + 1)

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
            // no setSelectedVendorId
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

    return { vendors, loading, error, reload }
}