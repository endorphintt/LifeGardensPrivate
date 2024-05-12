import { NextApiRequest } from 'next'
import { JwtPayload } from 'jsonwebtoken'

export interface UserInterface {
    id: string
    name: string
    position: string
    img: string
    number: string
    address: string
    email: string
    password: string
}

export interface ContactInterface {
    id: string
    name: string
    number: string
}

export interface FolderInterface {
    title: string
    id: string
}

export interface MessageInterface {
    id: string
    value: string
    date: string
    userId: string
    userName: string
}

export interface FileInterface {
    id: string
    name: string
    date: string
    path: string
    folderId: string
}

export interface DecodedInterface {
    email: string
    password: string
}
