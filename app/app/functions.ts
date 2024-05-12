'use client'

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

export function formatDateString(isoString: string) {
    const date = new Date(isoString)
    return date.toLocaleDateString('uk-UA', {
        // Використання української локалізації
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function isTokenExpired() {
    const token = localStorage.getItem('token')?.toString()
    if (token) {
        const arrayToken = token.split('.')
        const tokenPayload = JSON.parse(atob(arrayToken[1]))
        if (tokenPayload.email == 'VolodymyrTsehenko@gmail.com') {
            return true
        } else {
            return false
        }
    }
}

export async function fetchDataWithPath(
    token: any,
    path: string
): Promise<any> {
    try {
        if (!token) {
            console.error('No token available')
            return
        }
        const response = await fetch(path, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return await response.json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
        return null // або можна кидати помилку, залежно від ваших вимог
    }
}

export async function fetchFilesById(
    token: any,
    id: string,
    path: string
): Promise<any> {
    try {
        if (!token) {
            console.error('No token available')
            return
        }
        const response = await fetch(path, {
            method: 'POST', // Вказуємо метод POST
            headers: {
                'Content-Type': 'application/json', // Додаємо заголовок для JSON
                Authorization: `Bearer ${token}`, // Використовуємо токен для авторизації
            },
            body: JSON.stringify({ folderId: id }), // Відправляємо ID в тілі запиту у форматі JSON
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return await response.json() // Отримуємо відповідь у форматі JSON
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
        return null // Повертаємо null у разі помилки
    }
}

export const deleteById = async (id: string, path: string) => {
    try {
        const token = localStorage.getItem('token')
        if (!token) {
            console.error('No token available')
            return
        }

        const requestBody = {
            id: id,
        }

        const response = await fetch(path, {
            method: 'POST', // Використовуємо POST, якщо сервер вимагає цей метод для видалення
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
        console.log('Message deleted successfully:', data) // Логуємо успішне видалення
    } catch (error) {
        console.error('Failed to delete message:', error)
    }
}
