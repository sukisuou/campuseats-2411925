// 241192[5] - Daily special with countdown

import { useState, useEffect } from 'react'

export const DISCOUNT = 20

function DailySpecial(){
    const [timeLeft, setTimeLeft] = useState('')

    useEffect(() => {
        function updateCountdown(){
            const now = new Date()
            const endOfDay = new Date()
            endOfDay.setHours(23, 59, 59, 999)  //uhhh 1 milisecond before day ends

            const diff = endOfDay - now
            if(diff <= 0) { //check if the time's still before the end of day
                setTimeLeft('Ended')
                return
            }

            //1000 milisecond is 1 second
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)    //24 hours
            const minutes = Math.floor((diff / (1000 * 60)) % 60)   //60 minutes
            const seconds = Math.floor((diff / (1000)) % 60)

            const pad = (n) => String(n).padStart(2, '0')
            setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`)
        }

        updateCountdown()
        const timerId = setInterval(updateCountdown, 1000)  //do interval every 1 second cuz... yeah, 1 second
        
        return () => clearInterval(timerId) //cleanup
    }, [])

    return (
        <div className = "card">
            Daily Special: <strong>{DISCOUNT}%</strong> off all drinks! Ends in: <strong>{timeLeft}</strong>
        </div>
    )
}

export default DailySpecial