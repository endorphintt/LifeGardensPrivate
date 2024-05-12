'use client'

import { useEffect, useState } from 'react'
import c from './Chat.module.scss'
import { MessageInterface } from '@/app/interfaces'
import { deleteById, formatDateString, isTokenExpired } from '@/app/functions'
import Image from 'next/image'

function isMessageInterface(obj: any): obj is MessageInterface {
    return (
        obj &&
        typeof obj.id === 'string' &&
        typeof obj.value === 'string' &&
        typeof obj.date === 'string' && // Переконайтеся, що це "date", якщо це дата
        typeof obj.userId === 'string' &&
        typeof obj.userName === 'string'
    )
}

const Chat = () => {
    const [messages, setMessages] = useState<MessageInterface[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    console.error('No token available')
                    return
                }
                const response = await fetch('/api/routes/getAllMessages', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setMessages(data)
            } catch (error) {
                console.error('Failed to fetch contacts:', error)
            }
        }
        fetchContacts()
        if (isTokenExpired()) {
            setIsAdmin(true)
        }
    }, [])
    return (
        <div className={c.chat}>
            {isMessageInterface(messages[0]) ? (
                <div className={c.messages}>
                    {messages.map((message: MessageInterface) => (
                        <div key={message.id} className={c.messages__item}>
                            <p className={c.messages__owner}>
                                {message.userName}
                            </p>
                            <p className={c.messages__value}>{message.value}</p>
                            <p className={c.messages__date}>
                                {formatDateString(message.date)}
                            </p>
                            <button
                                style={{
                                    visibility: isAdmin ? 'visible' : 'hidden',
                                    opacity: isAdmin ? '1' : '0',
                                }}
                                onClick={() =>
                                    deleteById(
                                        message.id,
                                        '/api/routes/deleteMessage'
                                    )
                                }
                                className={c.messages__delete}
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
            ) : (
                <span>загрузка</span>
            )}
        </div>
    )
}

export default Chat
