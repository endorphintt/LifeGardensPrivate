import PagesTop from '../components/pagesTop/PagesTop'
import c from './Documents.module.scss'
import DocumentsBody from './DocumentsBody'

export default function Documents() {
    return (
        <main className={c.documents}>
            <PagesTop title="БУХГАЛТЕРІЯ" />
            <DocumentsBody />
        </main>
    )
}
