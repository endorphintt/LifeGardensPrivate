'use client'
import React, { useEffect, useState } from 'react'
import PagesTop from '../components/pagesTop/PagesTop'
import { ContactInterface } from '../interfaces'
import c from './Contacts.module.scss'
import { deleteById, isTokenExpired } from '../functions'
import Image from 'next/image'
import ContactForm from '../components/contactForm/ContactForm'

export default function Contacts() {
    const [contacts, setContacts] = useState<ContactInterface[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    console.error('No token available')
                    return
                }
                const response = await fetch('/api/routes/getAllContacts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setContacts(data)
            } catch (error) {
                console.error('Failed to fetch contacts:', error)
            }
        }
        if (isTokenExpired()) {
            setIsAdmin(true)
        }

        fetchContacts()
    }, [])

    return (
        <main className={c.contacts}>
            <PagesTop title="КОНТАКТИ" />
            <div className={c.contacts__body}>
                {contacts.map((item, index) => (
                    <div key={index} className={c.contacts__item}>
                        <div className={c.contacts__titles}>
                            <p>назва:</p>
                            <p>номер:</p>
                        </div>
                        <div className={c.contacts__values}>
                            <p>{item.name}</p>
                            <p>{item.number}</p>
                        </div>
                        <button
                            style={{
                                visibility: isAdmin ? 'visible' : 'hidden',
                                opacity: isAdmin ? '1' : '0',
                            }}
                            className={c.contacts__deleteContact}
                            onClick={() =>
                                deleteById(item.id, '/api/routes/deleteContact')
                            }
                        >
                            <Image
                                src="/delete.png"
                                width={25}
                                height={25}
                                alt="delete"
                            />
                        </button>
                    </div>
                ))}
            </div>
            <ContactForm
                display={display}
                setDisplay={() => setDisplay(false)}
            />
            <button
                style={{
                    visibility: isAdmin ? 'visible' : 'hidden',
                    opacity: isAdmin ? '1' : '0',
                }}
                className={c.contacts__addContact}
                onClick={() => setDisplay(true)}
            ></button>
        </main>
    )
}
