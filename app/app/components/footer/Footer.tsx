'use client'

import Link from 'next/link'
import { links } from '../header/Header'
import c from './Footer.module.scss'
import Image from 'next/image'
import { scrollToTop } from '@/app/functions'
import Form from './Form'

const Footer = () => {
    return (
        <article className={c.footer}>
            <div className={c.footer__container}>
                <Image
                    className={c.footer__img}
                    height={100}
                    width={100}
                    src="/logo.png"
                    alt="logo"
                />
                <div className={c.footer__menu}>
                    <p className={c.footer__menu_title}>Меню</p>
                    <div className={c.footer__links}>
                        {links.map((link) => (
                            <Link
                                className={c.footer__link}
                                key={link.path}
                                onClick={() => scrollToTop()}
                                href={link.path}
                                passHref
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <Form />
            </div>
        </article>
    )
}

export default Footer
