'use client'
import PagesTop from '@/app/components/pagesTop/PagesTop'
import c from './Book.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { UserInterface } from '@/app/interfaces'
import { useParams } from 'next/navigation'

function isUserInterface(obj: any): obj is UserInterface {
    return (
        obj &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.position === 'string' &&
        typeof obj.img === 'string' &&
        typeof obj.number === 'string' &&
        typeof obj.address === 'string' &&
        typeof obj.email === 'string'
    )
}

export default function ClientId() {
    const [user, setUser] = useState<UserInterface>()
    const params = useParams()
    useEffect(() => {
        const fetchUserById = async (userId: string) => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    console.error('No token available')
                    return
                }

                const requestBody = {
                    id: userId,
                }

                const response = await fetch('/api/routes/getUserById', {
                    method: 'POST', // Вказуємо, що це POST запит
                    headers: {
                        'Content-Type': 'application/json', // Вказуємо, що відправляємо JSON
                        Authorization: `Bearer ${token}`, // Додаємо токен авторизації
                    },
                    body: JSON.stringify(requestBody), // Перетворюємо об'єкт requestBody в JSON рядок
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                setUser(data) // Припускаємо, що setUser є функцією зміни стану, яка зберігає дані користувача
            } catch (error) {
                console.error('Failed to fetch user:', error)
            }
        }

        fetchUserById(params.clientId.toString())
    }, [])
    return (
        <main className={c.book__container}>
            {isUserInterface(user) ? (
                <div className={c.book}>
                    <PagesTop title={user.name} />
                    <div className={c.book__body}>
                        <div className={c.book__card}>
                            {user.img ? (
                                <Image
                                    width={250}
                                    height={300}
                                    src={user.img}
                                    alt="user photo"
                                />
                            ) : (
                                <div className={c.book__img}>
                                    <Image
                                        width={60}
                                        height={60}
                                        src="/user.png"
                                        alt="user photo"
                                    />
                                </div>
                            )}
                            <div className={c.book__info}>
                                <div className={c.book__title}>{user.name}</div>
                                <div className={c.book__text}>
                                    <div className={c.book__titles}>
                                        <p>номер телефону:</p>
                                        <p>електронна пошта:</p>
                                        <p>адреса:</p>
                                        <p>номер телефону:</p>
                                    </div>
                                    <div className={c.book__values}>
                                        <p>{user.number}</p>
                                        <p>{user.email}</p>
                                        <p>{user.address}</p>
                                        <p>{user.number}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <span>помилка</span>
            )}
        </main>
    )
}
