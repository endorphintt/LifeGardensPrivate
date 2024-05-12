import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { Folder } from '../../models/models'
import { authenticate } from '../../functions'

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
        const { title } = JSON.parse(requestBody)
        const newFolder = await Folder.create({
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        return new Response(JSON.stringify({ newFolder }), { status: 201 })
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to create folder',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
