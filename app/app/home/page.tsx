import DocCard from '../components/docCard/DocCard'
import Top from '../components/homeTop/Top'
import Structura from '../components/structura/Structura'
import c from './styles.module.scss'
import { fetchDataWithPath } from '../functions'
import HomeCards from './homeCards/HomeCards'

export default async function Home() {
    return (
        <div className={c.home}>
            <Top />
            <Structura />
            <HomeCards />
        </div>
    )
}
