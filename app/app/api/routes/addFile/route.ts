import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { File } from '../../models/models'
import path from 'path'

export async function POST(request: Request) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 })
    }

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    console.log(file)
    const name: string | null = data.get('name') as unknown as string
    const folderId: string | null = data.get('folderId') as unknown as string
    const date: string | null = data.get('date') as unknown as string

    if (!file) {
        return new Response(
            JSON.stringify({ success: false, message: 'No file provided' }),
            { status: 400 }
        )
    }

    const fileName = uuidv4() + path.extname(file.name)
    const filePath = join('./public', fileName)

    try {
        // Since file is an instance of File, we can safely assume it has arrayBuffer method
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filePath, buffer)

        // Створення нового файлу в базі даних
        const newFile = await File.create({
            name,
            date,
            path: fileName,
            folderId,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return new Response(JSON.stringify({ newFile }), { status: 201 })
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Failed to create file',
                error: 'some error',
            }),
            { status: 500 }
        )
    }
}
