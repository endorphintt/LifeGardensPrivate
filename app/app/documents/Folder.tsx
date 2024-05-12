import React, { useEffect, useState } from 'react'
import c from './Documents.module.scss'
import { FileInterface, FolderInterface } from '../interfaces'
import Image from 'next/image'
import { deleteById, fetchFilesById, isTokenExpired } from '../functions'
import FileForm from '../components/fileForm/FileForm'

interface Props {
    folder: FolderInterface
}

const Folder: React.FC<Props> = ({ folder }) => {
    const [more, setMore] = useState<boolean>(false)
    const [display, setDisplay] = useState(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [filesData, setFilesData] = useState<FileInterface[] | []>([])

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                const FilesData = await fetchFilesById(
                    token,
                    folder.id,
                    '/api/routes/getFilesByFolderId'
                )
                setFilesData(FilesData)
            }
        }
        if (isTokenExpired()) {
            setIsAdmin(true)
        }
        fetchData()
    }, [])
    return (
        <div className={c.folder}>
            <div className={c.folder__header}>
                <Image
                    src="/folder.png"
                    width={70}
                    height={70}
                    alt="folder icon"
                />
                <p className={c.folder__title}>{folder.title}</p>
                <button
                    onClick={() => setMore(!more)}
                    style={{
                        transform: more ? 'rotate(180deg)' : '',
                    }}
                    className={c.folder__more}
                ></button>
                <button
                    style={{
                        visibility: isAdmin ? 'visible' : 'hidden',
                        opacity: isAdmin ? '1' : '0',
                    }}
                    className={c.folder__deleteFolder}
                    onClick={() =>
                        deleteById(folder.id, '/api/routes/deleteFolder')
                    }
                >
                    <Image
                        src="/delete.png"
                        width={25}
                        height={25}
                        alt="delete"
                    />
                </button>
                <button
                    style={{
                        visibility: isAdmin ? 'visible' : 'hidden',
                        opacity: isAdmin ? '1' : '0',
                    }}
                    className={c.folder__addFile}
                    onClick={() => setDisplay(true)}
                ></button>
            </div>
            <div
                className={c.folder__files}
                style={{
                    padding: more ? '20px' : '0',
                }}
            >
                {more && filesData ? (
                    filesData.map((file) => (
                        <div key={file.id} className={c.folder__item}>
                            <div className={c.folder__info}>
                                <div className={c.folder__names}>
                                    <p className={c.folder__name}>назва:</p>
                                    <p className={c.folder__name}>
                                        дата публікації:
                                    </p>
                                </div>
                                <div className={c.folder__titles}>
                                    <p className={c.folder__fileName}>
                                        {file.name}
                                    </p>
                                    <p className={c.folder__fileData}>
                                        {file.date}
                                    </p>
                                </div>
                            </div>
                            <div className={c.folder__buttons}>
                                <button
                                    onClick={() =>
                                        window.open(
                                            './' + file.path,
                                            '_blank',
                                            'noopener,noreferrer'
                                        )
                                    }
                                    className={c.folder__download}
                                >
                                    <Image
                                        src="/download.png"
                                        width="40"
                                        height="40"
                                        alt="download"
                                    />
                                </button>
                            </div>
                            <button
                                style={{
                                    visibility: isAdmin ? 'visible' : 'hidden',
                                    opacity: isAdmin ? '1' : '0',
                                }}
                                className={c.folder__deleteFile}
                                onClick={() =>
                                    deleteById(
                                        file.id,
                                        '/api/routes/deleteFile'
                                    )
                                }
                            >
                                <Image
                                    src="/delete.png"
                                    width={25}
                                    height={25}
                                    alt="delete"
                                />
                            </button>
                        </div>
                    ))
                ) : (
                    <span></span>
                )}
            </div>
            <FileForm
                display={display}
                folderId={folder.id}
                setDisplay={() => setDisplay(false)}
            />
        </div>
    )
}

export default Folder
