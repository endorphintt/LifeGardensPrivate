import { NextRequest } from 'next/server'
import { Folder } from '../../models/models'
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
        const folders = await Folder.findAll()
        return new Response(JSON.stringify(folders), { status: 200 })
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to retrieve folders',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
