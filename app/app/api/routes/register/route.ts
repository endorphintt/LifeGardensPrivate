import { NextRequest } from 'next/server'
import bcrypt from 'bcrypt'
import { User } from '../../models/models'
import { generateJwt } from '../../functions' // Ensure this function handles JWT creation correctly
import { UserInterface } from '@/app/interfaces'

interface RequestBody {
    name: string
    position: string
    img: string | null
    number: string
    address: string
    email: string
    password: string
}

export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
        })
    }

    try {
        const requestBody = await request.text()
        const {
            name,
            position,
            img,
            number,
            address,
            email,
            password,
        }: RequestBody = JSON.parse(requestBody)

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return new Response(
                JSON.stringify({ error: 'User already exists' }),
                { status: 409 }
            )
        }

        const hashPassword = bcrypt.hashSync(password, 5)
        const user = (await User.create({
            name,
            position,
            img,
            number,
            address,
            email,
            password: hashPassword,
        })) as unknown as UserInterface

        const token = generateJwt(user.id, user.email, user.position)
        return new Response(JSON.stringify({ token }), { status: 200 })
    } catch (error) {
        console.error('Registration Error:', error)
        return new Response(
            JSON.stringify({
                error: 'Failed to register user',
                details:
                    error instanceof Error
                        ? error.message
                        : 'No additional details',
            }),
            { status: 500 }
        )
    }
}
