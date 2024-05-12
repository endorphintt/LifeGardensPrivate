import { NextRequest } from 'next/server'
import { Folder } from '../../models/models'
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

        const result = await Folder.destroy({
            where: { id },
        })

        if (result === 0) {
            // Якщо не знайдено записів для видалення
            return new Response(
                JSON.stringify({ message: 'Folder not found' }),
                { status: 404 }
            )
        }

        return new Response(
            JSON.stringify({ message: 'Folder deleted successfully' }),
            { status: 200 }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to delete folder',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
