'use client'

import React, { useEffect, useState } from 'react'
import { UserInterface } from '../interfaces'
import c from './Books.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { scrollToTop } from '../functions'

const BooksBody = () => {
    const [users, setUsers] = useState<UserInterface[]>([])

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    console.error('No token available')
                    return
                }
                const response = await fetch('/api/routes/getAllUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                console.error('Failed to fetch contacts:', error)
            }
        }

        fetchContacts()
    }, [])
    return (
        <div className={c.body}>
            {users.map((user: UserInterface) => (
                <Link
                    onClick={() => scrollToTop()}
                    key={user.id}
                    className={c.body__link}
                    href={'/books/' + user.id}
                    passHref
                >
                    <div className={c.body__left}>
                        <Image
                            src="/person.png"
                            width={50}
                            className={c.body__img}
                            height={50}
                            alt="user"
                        />
                        <p className={c.body__title}>{user.name}</p>
                    </div>
                    <div className={c.body__pointer}>
                        <span></span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default BooksBody
