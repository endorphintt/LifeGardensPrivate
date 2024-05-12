import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { Message, User } from '../../models/models'
import { authenticate } from '../../functions'
import { UserInterface } from '@/app/interfaces'

export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 })
    }

    const authUser = await authenticate(request) // Змінив назву змінної з 'user' на 'authUser'
    if (!authUser) {
        return new Response('Authentication failed', { status: 401 })
    }

    // Декодування токену для отримання даних про користувача
    let tokenData
    try {
        const tokenWithBearer = request.headers.get('authorization') || ''
        const token = tokenWithBearer.split(' ')[1]
        tokenData = jwt.verify(token, 'random_secret_key123') as jwt.JwtPayload
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Невдалий токен' }), {
            status: 401,
        })
    }

    if (!tokenData || typeof tokenData !== 'object' || !tokenData['id']) {
        return new Response(
            JSON.stringify({
                message: 'Токен не містить ідентифікатора користувача',
            }),
            { status: 401 }
        )
    }

    const result = await User.findByPk(tokenData.id)

    if (!result) {
        return new Response(
            JSON.stringify({ message: 'Користувача не знайдено' }),
            { status: 404 }
        )
    }

    const user: UserInterface = result.get({ plain: true }) as UserInterface

    try {
        const requestBody = await request.text()
        const { message } = JSON.parse(requestBody)
        const newMessage = await Message.create({
            value: message,
            date: new Date(),
            userId: user.id,
            userName: user.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        console.log('consolelog', newMessage)
        return new Response(JSON.stringify({ newMessage }), { status: 201 })
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Не вдалося створити повідомлення',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
