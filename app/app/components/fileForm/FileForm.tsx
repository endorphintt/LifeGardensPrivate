'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './FileForm.module.scss'

interface Props {
    display: boolean
    setDisplay: () => void
    folderId: string
}

const FileForm: React.FC<Props> = ({ display, setDisplay, folderId }) => {
    const [name, setName] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('date', date)
        formData.append('folderId', folderId)
        if (file) {
            formData.append('file', file)
        }

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                console.error('No token available')
                return
            }
            const response = await fetch('/api/routes/addFile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // Тільки токен авторизації
                },
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                console.log('File uploaded successfully:', result)
                setDisplay() // використовуйте setDisplay(false) для відключення відображення
            } else {
                const errorResponse = await response.json()
                throw new Error(
                    'Failed to upload file: ' + errorResponse.message
                )
            }
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
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
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="дата"
                    required
                />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">додати файл</button>
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

export default FileForm
