import jwt from 'jsonwebtoken'

export const generateJwt = (
    id: string,
    email: string,
    position: string
): string => {
    return jwt.sign({ id, email }, 'random_secret_key123', {
        expiresIn: '24h',
    })
}

export async function authenticate(request: Request) {
    const tokenWithBearer = request.headers.get('authorization') || ''
    const token = tokenWithBearer.split(' ')[1]
    if (!token) return null

    try {
        const decoded = jwt.verify(token, 'random_secret_key123')
        return decoded
    } catch {
        return null
    }
}
