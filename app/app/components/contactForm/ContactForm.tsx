'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './ContactForm.module.scss'

interface Props {
    display: boolean
    setDisplay: () => void
}

const ContactForm: React.FC<Props> = ({ display, setDisplay }) => {
    const [name, setName] = useState<string>('')
    const [number, setNumber] = useState<string>('')

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault() // Запобігаємо стандартній поведінці форми

        try {
            const token = localStorage.getItem('token')
            console.log(token)
            if (!token) {
                console.error('No token available')
                return
            }

            const response = await fetch('/api/routes/addContact', {
                method: 'POST', // Встановлення методу запиту на POST
                headers: {
                    'Content-Type': 'application/json', // Встановлення типу вмісту запиту на JSON
                    Authorization: `Bearer ${token}`, // Додавання токена для авторизації
                },
                body: JSON.stringify({ name, number }), // Перетворення об'єкта повідомлення в JSON строку
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            setNumber('') // Очищення поля вводу після успішного відправлення
            setName('')
            console.log('Message sent successfully')
        } catch (error) {
            console.error('Failed to send message:', error)
        }
    }

    return (
        <div
            className={
                display
                    ? styles.formContainer
                    : `${styles.formContainer} ${styles.hidden}`
            }
        >
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="назва"
                    required
                />
                <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="номер"
                    required
                />
                <button type="submit">додати контакт</button>
                <button
                    className={styles.close}
                    type="button"
                    onClick={() => setDisplay()}
                >
                    відмінити
                </button>
            </form>
        </div>
    )
}

export default ContactForm
