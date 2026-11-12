// personal addition!!! (cuz i wanna see the account at any time, purely decorational tho)
// using LocalStorage for now, not Firestore yet

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function ProfilePage(){
    const { user, logout } = useAuth()
        
    // set a profile description/bio, hehe
    const [bio, setBio] = useLocalStorage(`bio_${user.uid}`, '')
    const [draft, setDraft] = useState(bio)
    const [isEditing, setIsEditing] = useState(false)

    // editing logic
    const toggleEdit = () => setIsEditing((prev) => !prev)
    const saveEdit = () => {
        const trimmed = draft.trim()
        setBio(trimmed)
        setDraft(trimmed)
        toggleEdit()
    }
    const cancelEdit = () => {
        setDraft(bio)
        toggleEdit()
    }

    // logout inside profile
    const navigate = useNavigate()
    async function handleLogout() {
        await logout()
        navigate('/')
    }

    // some styling 
    const card_style = {
        display: 'flex',
        gap: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        background: '#fff',
        borderRadius: '12px',
        padding: '1rem',
        resize: 'none'
    }
    const image_style = {
        width: '100px',
        height: '100px',
        objectFit: 'contain', 
        border: '2px solid #000000', 
        borderRadius: '12px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
    }
    const info_style = {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        gap: '12px'
    }
    const bio_style = {
        width: '400px',
        marginLeft: '3rem',
        wordBreak: 'break-word',
        flexShrink: 0
    }
    const button_style = {
        display: 'inline-flex',
        marginTop: '4px',
        marginRight: '4px',
        width: 'fit-content', 
        textDecoration: 'none'
    }
    const desc_box_style = {
        ...card_style,
        width: '100%',
        boxSizing: 'border-box'
    }
    const placeholder_style = {
        ...card_style,
        color: bio ? '#000' : '#888',
        fontStyle: bio ? 'normal' : 'italic'
    }
    
    return (
        <>
            <h1>{user.displayName || user.email}'s profile</h1>
            <div style = {card_style}>
                {/* Profile Side : Left */}
                <img src = {user.photoURL || '/default_avatar.jpg'} alt = {user.displayName} referrerPolicy = "no-referrer" style = {image_style}/>
                <div style = {info_style}>
                    <span><strong>Name:</strong> {user.displayName}</span>
                    <span><strong>Email:</strong> {user.email}</span>
                    <span><strong>UID:</strong> {user.uid}</span>
                </div>
                {/* Description Side : Right */}
                <div style = {bio_style}>
                    <span><strong>Description:</strong></span>
                    { isEditing ? (
                        <div>
                            <textarea value = {draft} onChange = {(e) => setDraft(e.target.value)} style = {desc_box_style} placeholder = "Type something..."/>
                            <button type = "button" className = "btn" style = {button_style} onClick = {saveEdit}>Save</button>
                            <button type = "button" style = {button_style} className = "btn" onClick = {cancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <span style = {placeholder_style}>{bio.trim() || "Nothing to see here..."}</span>
                            <button type = "button" className = "btn" style = {button_style} onClick = {toggleEdit}>Edit</button>
                        </div>    
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                {/* Logout button */}
                <button type = "button" className = "btn-danger" onClick = {handleLogout}>Log out</button>
            </div>
        </>
    )
}