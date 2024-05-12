'use client'

import c from './ChatForm.module.scss'
import React, { useState, FormEvent } from 'react'

const ChatForm: React.FC = () => {
    const [message, setMessage] = useState<string>('') // Вказуємо, що стан message має тип string

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault() // Запобігаємо стандартній поведінці форми

        try {
            const token = localStorage.getItem('token') // Отримання токена з локального сховища
            if (!token) {
                console.error('No token available')
                return
            }

            const response = await fetch('/api/routes/addMessage', {
                method: 'POST', // Встановлення методу запиту на POST
                headers: {
                    'Content-Type': 'application/json', // Встановлення типу вмісту запиту на JSON
                    Authorization: `Bearer ${token}`, // Додавання токена для авторизації
                },
                body: JSON.stringify({ message }), // Перетворення об'єкта повідомлення в JSON строку
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            setMessage('') // Очищення поля вводу після успішного відправлення
            console.log('Message sent successfully')
        } catch (error) {
            console.error('Failed to send message:', error)
        }
    }

    return (
        <form className={c.form} onSubmit={handleSubmit}>
            <textarea
                className={c.form__text}
                id="messageInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введіть повідомлення тут..."
                required
            />
            <button className={c.form__button} type="submit">
                Відправити
            </button>
        </form>
    )
}

export default ChatForm
