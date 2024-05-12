import { useState, useEffect } from 'react'

interface AuthState {
    isAuthenticated: boolean
}

const useAuth = (): boolean => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        setIsAuthenticated(!!userData)
    }, [])

    return isAuthenticated
}

export default useAuth
