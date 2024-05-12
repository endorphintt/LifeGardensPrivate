import PagesTop from '../components/pagesTop/PagesTop'
import c from './Books.module.scss'
import BooksBody from './BooksBody'

export default function Books() {
    return (
        <main className={c.books}>
            <PagesTop title="ЧЛЕНСЬКІ КНИГИ" />
            <BooksBody />
        </main>
    )
}
