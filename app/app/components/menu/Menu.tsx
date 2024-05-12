'use client'

import c from './Menu.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { links } from '../header/Header'
import { TOGGLE_MENU } from '@/app/redux/consts'
import { MenuState } from '@/app/redux/menuReducer'
import { StoreInterface } from '@/app/redux/store'

const Menu = () => {
    const isOpen: boolean = useSelector(
        (state: StoreInterface) => state.menu.isOpen
    )
    const dispatch = useDispatch()
    return (
        <div
            className={c.menu}
            style={{
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            }}
        >
            <div className={c.menu__header}>
                <Image
                    className={c.header__logo}
                    src="/logo.png"
                    width={60}
                    height={60}
                    alt="logo"
                />
                <button
                    className={c.menu__cancel}
                    onClick={() => dispatch({ type: TOGGLE_MENU })}
                ></button>
            </div>
            <div className={c.menu__links}>
                {links.map((link) => (
                    <Link key={link.path} href={link.path} passHref>
                        <button
                            onClick={() => dispatch({ type: TOGGLE_MENU })}
                            className={c.menu__link}
                        >
                            {link.name}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Menu
