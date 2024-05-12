'use client'

import React, { useEffect, useState } from 'react'
import c from './Documents.module.scss'
import { FolderInterface } from '../interfaces'
import Image from 'next/image'
import Folder from './Folder'
import { fetchDataWithPath, fetchFilesById, isTokenExpired } from '../functions'
import FolderForm from '../components/folderForm/FolderForm'

const DocumentsBody = () => {
    const [FoldersData, setFoldersData] = useState<FolderInterface[] | []>([])
    const [display, setDisplay] = useState(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                const FoldersData = await fetchDataWithPath(
                    token,
                    '/api/routes/getAllFolders'
                )
                setFoldersData(FoldersData)
            }
        }
        if (isTokenExpired()) {
            setIsAdmin(true)
        }
        fetchData()
    }, [])
    return (
        <div className={c.folders}>
            {FoldersData ? (
                FoldersData.map((folder: FolderInterface) => (
                    <Folder key={folder.id} folder={folder} />
                ))
            ) : (
                <span></span>
            )}
            <FolderForm
                display={display}
                setDisplay={() => setDisplay(false)}
            />
            <button
                style={{
                    visibility: isAdmin ? 'visible' : 'hidden',
                    opacity: isAdmin ? '1' : '0',
                }}
                className={c.folders__addFolder}
                onClick={() => setDisplay(true)}
            ></button>
        </div>
    )
}

export default DocumentsBody
