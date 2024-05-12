'use client'

import { FileInterface, FolderInterface } from '@/app/interfaces'
import c from './DocCard.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { deleteById, fetchFilesById, isTokenExpired } from '../../functions'
import FileForm from '../fileForm/FileForm'

interface Props {
    data: FolderInterface
    color: string
}

const DocCard: React.FC<Props> = ({ data, color }) => {
    const [more, setMore] = useState<boolean>(false)
    const [filesData, setFilesData] = useState<FileInterface[] | []>([])
    const [display, setDisplay] = useState(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                const FilesData = await fetchFilesById(
                    token,
                    data.id,
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
        <div className={c.card} style={{ backgroundColor: color }}>
            <p className={c.card__title}>{data.title}</p>
            <div
                className={c.card__body}
                style={{ height: more ? '' : '230px' }}
            >
                {filesData?.map((file) => (
                    <div key={file.id} className={c.card__item}>
                        <div className={c.card__info}>
                            <div className={c.card__names}>
                                <p className="card__name">назва:</p>
                                <p className="card__name">дата публікації:</p>
                            </div>
                            <div className={c.card__titles}>
                                <p className={c.card__fileName}>{file.name}</p>
                                <p className={c.card__fileData}>{file.date}</p>
                            </div>
                        </div>
                        <div className={c.card__buttons}>
                            <button
                                onClick={() =>
                                    window.open(
                                        './' + file.path,
                                        '_blank',
                                        'noopener,noreferrer'
                                    )
                                }
                                className={c.card__download}
                            >
                                <Image
                                    src="/download.png"
                                    width="40"
                                    height="40"
                                    alt="download"
                                />
                            </button>
                            <button
                                style={{
                                    visibility: isAdmin ? 'visible' : 'hidden',
                                    opacity: isAdmin ? '1' : '0',
                                }}
                                className={c.card__deleteFile}
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
                    </div>
                ))}
            </div>
            <button
                className={c.card__more}
                onClick={() => setMore(!more)}
                style={{
                    transform: more ? 'rotate(180deg)' : '',
                    display: filesData?.length > 3 ? 'block' : 'none',
                }}
            ></button>
            <FileForm
                display={display}
                folderId={data.id}
                setDisplay={() => setDisplay(false)}
            />
            <button
                style={{
                    visibility: isAdmin ? 'visible' : 'hidden',
                    opacity: isAdmin ? '1' : '0',
                }}
                className={c.card__addFile}
                onClick={() => setDisplay(true)}
            ></button>
        </div>
    )
}

export default DocCard
