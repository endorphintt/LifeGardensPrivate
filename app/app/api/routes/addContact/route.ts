import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { Contact } from '../../models/models'
import { authenticate } from '../../functions'

// Оновлена функція POST
export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 })
    }

    const user = await authenticate(request)
    if (!user) {
        return new Response('Authentication failed', { status: 401 })
    }

    try {
        const requestBody = await request.text()
        const { name, number } = JSON.parse(requestBody)
        const newContact = await Contact.create({
            name,
            number,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        return new Response(JSON.stringify({ newContact }), { status: 201 })
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to create contact',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
