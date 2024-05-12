'use client'

import { TOGGLE_MENU } from '@/app/redux/consts'
import c from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { scrollToTop } from '@/app/functions'
import Head from 'next/head'

export const links = [
    { path: '/home', name: 'Головна' },
    { path: '/documents', name: 'Бухгалтерія' },
    { path: '/forum', name: 'Форум' },
    { path: '/books', name: 'Членські книги' },
    { path: '/contacts', name: 'Контакти' },
]

const Header = () => {
    const [scrollY, setScrollY] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <header
            style={{
                backgroundColor: scrollY > 30 ? '#313A2B' : 'transparent',
            }}
            className={c.header}
        >
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Alumni+Sans:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Image
                className={c.header__logo}
                src="/logo.png"
                width={60}
                height={60}
                alt="logo"
            />
            <div className={c.header__links}>
                {links.map((link) => (
                    <Link
                        onClick={() => scrollToTop()}
                        key={link.path}
                        href={link.path}
                        passHref
                        style={{ fontFamily: 'Alumni Sans' }}
                    >
                        <button className={c.header__link}>{link.name}</button>
                    </Link>
                ))}
            </div>
            <div
                onClick={() => dispatch({ type: TOGGLE_MENU })}
                className={c.header__icon}
            ></div>
        </header>
    )
}

export default Header
