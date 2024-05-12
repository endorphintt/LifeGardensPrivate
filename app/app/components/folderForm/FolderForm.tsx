'use client'

import React, { FormEvent, useState } from 'react'
import styles from './FolderForm.module.scss'

interface Props {
    display: boolean
    setDisplay: () => void
}

const FolderForm: React.FC<Props> = ({ display, setDisplay }) => {
    const [title, setTitle] = useState<string>('')

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault() // Запобігаємо стандартній поведінці форми

        try {
            const token = localStorage.getItem('token')
            console.log(token)
            if (!token) {
                console.error('No token available')
                return
            }

            const response = await fetch('/api/routes/addFolder', {
                method: 'POST', // Встановлення методу запиту на POST
                headers: {
                    'Content-Type': 'application/json', // Встановлення типу вмісту запиту на JSON
                    Authorization: `Bearer ${token}`, // Додавання токена для авторизації
                },
                body: JSON.stringify({ title }), // Перетворення об'єкта повідомлення в JSON строку
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            setTitle('')

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="назва"
                    required
                />
                <button type="submit">додати папку</button>
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

export default FolderForm
