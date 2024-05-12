import { NextRequest } from 'next/server'
import { User } from '../../models/models'
import { authenticate } from '../../functions'

export async function POST(request: NextRequest) {
    const user = await authenticate(request)
    if (!user) {
        return new Response(
            JSON.stringify({ message: 'Authentication failed' }),
            { status: 401 }
        )
    }

    try {
        const requestBody = await request.text()
        const data = JSON.parse(requestBody)
        const { id } = data

        if (!id) {
            return new Response(
                JSON.stringify({ error: 'User ID is required' }),
                { status: 400 }
            )
        }

        const user = await User.findOne({ where: { id } })
        if (user) {
            return new Response(JSON.stringify(user), { status: 200 })
        } else {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
            })
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to retrieve user',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
