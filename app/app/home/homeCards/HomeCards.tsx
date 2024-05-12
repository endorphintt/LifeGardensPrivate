'use client'

import DocCard from '@/app/components/docCard/DocCard'
import { fetchDataWithPath } from '../../functions'
import { FolderInterface } from '@/app/interfaces'
import { useEffect, useState } from 'react'

const HomeCards = () => {
    const [data, setData] = useState<FolderInterface[] | []>([])
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                const data = await fetchDataWithPath(
                    token,
                    '/api/routes/getAllFolders'
                )
                setData(data)
            }
        }

        fetchData()
    }, [])
    return (
        <div className="component">
            {data.map((element, index) => {
                if (
                    index % 2 === 0 &&
                    (element.id == '05253a7d-123a-44ba-95ba-e4f7bba96127' ||
                        element.id == '610c8c12-f486-4b13-909c-92e5bf420ee9' ||
                        element.id == 'cd1d4bbc-1e9f-42a8-9c16-1b6d047ef1f9' ||
                        element.id == 'b9f92013-ff62-49ee-bdcb-b02200c1797c')
                ) {
                    return (
                        <DocCard
                            key={element.id}
                            data={element}
                            color="#303A2A"
                        />
                    )
                } else if (
                    element.id == '05253a7d-123a-44ba-95ba-e4f7bba96127' ||
                    element.id == '610c8c12-f486-4b13-909c-92e5bf420ee9' ||
                    element.id == 'cd1d4bbc-1e9f-42a8-9c16-1b6d047ef1f9' ||
                    element.id == 'b9f92013-ff62-49ee-bdcb-b02200c1797c'
                ) {
                    return (
                        <DocCard
                            key={element.id}
                            data={element}
                            color="#C8CDCA"
                        />
                    )
                }
            })}
        </div>
    )
}

export default HomeCards
