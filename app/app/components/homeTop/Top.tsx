import c from './Top.module.scss'

const Top = () => {
    return (
        <article className={c.top}>
            <div className={c.top__info}>
                <h1 className={c.top__title}>LIFE GARDENS</h1>
                <h2 className={c.top__subtitle}>
                    сайт обслуговуючого кооперативу
                </h2>
            </div>
        </article>
    )
}

export default Top
