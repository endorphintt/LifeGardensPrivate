'use client'

import React, { useState, FormEvent } from 'react'
import styles from './LoginPage.module.scss'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter() // Хук для перенаправлення

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const response = await axios.post('/api/routes/login', {
                email,
                password,
            })
            if (response.data.token) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.data.token)
                }
                router.push('/home')
            } else {
                alert('Неправильний логін або пароль')
            }
        } catch (error) {
            console.error('Login failed:', error)
            alert('Неправильний логін або пароль')
        }
    }
    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>
                    Увійти
                </button>
            </form>
        </div>
    )
}

export default LoginPage
