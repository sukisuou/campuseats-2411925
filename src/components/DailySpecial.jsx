// 241192[5] - Daily special with countdown

import { useState, useEffect } from 'react'

export const DISCOUNT = 20

function DailySpecial(){
    const [timeLeft, setTimeLeft] = useState('')
    const [count, setCount] = useState(0)
    const [isShaking, setIsShaking] = useState(false)
    const [showTada, setShowTada] = useState(false)

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


    
    // funsies
    const card_style = {
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)' 
    }

    const waguri_style = {
        width: '48px', 
        objectFit: 'contain', 
        border: '2px solid #00685E', 
        borderRadius: '12px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
    }
    const button_style = {
        marginLeft: '10px', 
        display: 'inline-block', 
        position: 'relative',
        animation: 'buttonShake 0.15s ease-in-out'
    }

    const buttonHype = () => {
        setCount(prev => {
            const next = prev + 1
            if(next > 0 && next % 100 === 0){
                setShowTada(true)
                setTimeout(() => setShowTada(false), 1600)
            }
            return next
        })
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 150)
    }

    return (
        <>
            {showTada && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    color: '#ff0055',
                    textShadow: '0 0 20px rgba(255, 0, 85, 0.6), 2px 2px 0 #fff',
                    zIndex: 99999,
                    pointerEvents: 'none',
                    animation: 'tadaAnim 1.6s ease-in-out'
                }}>
                    🔥 FYEEEE! 🔥
                </div>
            )}
            <div className = "card" style={card_style}>
                <img src = "/waguri.gif" alt = "waguri" style = {waguri_style}/>
                <div>
                    🎉 Daily Special: <strong>{DISCOUNT}%</strong> off all drinks! Ends in: <strong>{timeLeft}</strong> 🎉
                    Click to hype it up!
                    <button
                        className = "btn_2"
                        key = {count}
                        style = {button_style} 
                        onClick = {buttonHype}
                    >yooooooo ({count})</button>
                </div>
            </div>
        </>
    )
}

export default DailySpecial