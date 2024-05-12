import c from './Structura.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const data = [
    {
        title: 'ГОЛОВА ПРАВЛІННЯ',
        users: [
            {
                name: "Цегенько Володимир Дем'янович",
                path: '/books/1',
            },
        ],
    },
    {
        title: 'ЧЛЕНИ ПРАВЛІННЯ',
        users: [
            {
                name: "Цегенько Володимир Дем'янович",
                path: '/books/1',
            },
            {
                name: "Цегенько Володимир Дем'янович",
                path: '/books/2',
            },
            {
                name: "Цегенько Володимир Дем'янович",
                path: '/books/3',
            },
        ],
    },
    {
        title: 'РЕВЕЗІЙНА КОМІСІЯ',
        users: [
            {
                name: "Цегенько Володимир Дем'янович",
                path: '/books/1',
            },
            {
                name: "Цегенько Володимир Дем'янович",
                path: '/books/2',
            },
            {
                name: "Цегенько Володимир Дем'янович",
                path: '/books/3',
            },
        ],
    },
]

const Structura = () => {
    return (
        <div className={c.structura}>
            <h2 className={c.structura__title}>СТРУКТУРА КООПЕРАТИВУ</h2>
            <div className={c.structura__body}>
                {data.map((item) => (
                    <div key={item.title} className={c.structura__item}>
                        <div
                            key={item.title}
                            className={c.structura__item_container}
                        >
                            <Image
                                src="/person.png"
                                alt="person"
                                width={60}
                                height={70}
                                className={c.structura__img}
                            />
                            <p className={c.structura__item_title}>
                                {item.title}
                            </p>
                            <div className={c.structura__names}>
                                {item.users.map((name) => (
                                    <Link
                                        key={name.path}
                                        href={name.path}
                                        passHref
                                        className={c.structura__link}
                                    >
                                        {name.name}

                                        <span></span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Structura
