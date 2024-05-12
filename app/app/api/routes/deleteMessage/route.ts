import { NextRequest } from 'next/server'
import { Message } from '../../models/models'
import { authenticate } from '../../functions'

export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), {
            status: 405,
        })
    }

    const user = await authenticate(request)
    if (!user) {
        return new Response(JSON.stringify({ message: 'Bad token' }), {
            status: 404,
        })
    }

    try {
        const requestBody = await request.text()
        const { id } = JSON.parse(requestBody)

        const result = await Message.destroy({
            where: { id },
        })

        if (result === 0) {
            return new Response(
                JSON.stringify({ message: 'Message not found' }),
                { status: 404 }
            )
        }

        return new Response(
            JSON.stringify({ message: 'Message deleted successfully' }),
            { status: 200 }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to delete message',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
