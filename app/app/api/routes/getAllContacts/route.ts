import { NextRequest } from 'next/server'
import { Contact } from '../../models/models'
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
        const contacts = await Contact.findAll()
        return new Response(JSON.stringify(contacts), { status: 200 })
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to retrieve contacts',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
