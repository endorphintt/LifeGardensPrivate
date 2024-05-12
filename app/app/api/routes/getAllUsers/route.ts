import { NextRequest } from 'next/server'
import { User } from '../../models/models'
import { authenticate } from '../../functions'

export async function GET(request: NextRequest) {
    if (request.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
        })
    }

    const user = await authenticate(request)
    if (!user) {
        return new Response(
            JSON.stringify({ message: 'Authentication failed' }),
            { status: 401 }
        )
    }

    try {
        const users = await User.findAll()
        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to retrieve users',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
