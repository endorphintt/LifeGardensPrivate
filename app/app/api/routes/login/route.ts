import { NextRequest } from 'next/server'
import bcrypt from 'bcrypt'
import { User } from '../../models/models'
import { generateJwt } from '../../functions' // Assuming generateJwt is correctly implemented
import { UserInterface } from '@/app/interfaces'

export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
        })
    }

    try {
        const requestBody = await request.text()
        const { email, password } = JSON.parse(requestBody)

        const user = (await User.findOne({
            where: { email },
        })) as UserInterface | null
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
            })
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {
            return new Response(JSON.stringify({ error: 'Invalid password' }), {
                status: 401,
            })
        }

        const token = generateJwt(user.id, user.email, user.position)
        return new Response(JSON.stringify({ token }), { status: 200 })
    } catch (error) {
        console.error(
            'Authentication Error:',
            error instanceof Error ? error.message : 'Unknown error'
        )
        return new Response(
            JSON.stringify({
                error: 'An unknown error occurred',
                details:
                    error instanceof Error
                        ? error.message
                        : 'No additional details',
            }),
            { status: 500 }
        )
    }
}
