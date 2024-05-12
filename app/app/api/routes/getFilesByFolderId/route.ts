import { NextRequest } from 'next/server'
import { File } from '../../models/models'
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
        const { folderId } = data

        if (!folderId) {
            return new Response(
                JSON.stringify({ error: 'Folder ID is required' }),
                { status: 400 }
            )
        }

        const files = await File.findAll({
            where: { folderId: folderId },
        })

        if (files && files.length > 0) {
            return new Response(JSON.stringify(files), { status: 200 })
        } else {
            return new Response(
                JSON.stringify({
                    error: 'No files found for the provided folder ID',
                }),
                { status: 404 }
            )
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to retrieve files',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
