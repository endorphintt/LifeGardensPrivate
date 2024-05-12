'use client'

import { useState } from 'react'
import PagesTop from '../components/pagesTop/PagesTop'
import c from './Forum.module.scss'
import Chat from './chat/Chat'
import Voting from './voting/Voting'
import ChatForm from './chat/chatForm/chatForm'

export default function Forum() {
    const [display, setDisplay] = useState<string>('chat')
    return (
        <div className={c.forum}>
            <PagesTop title="Форум" />
            <div className={c.forum__body}>
                <div className={c.forum__buttons}>
                    <button
                        onClick={() => setDisplay('chat')}
                        className={c.forum__button}
                    >
                        Чат
                    </button>
                    <button
                        onClick={() => setDisplay('voting')}
                        className={c.forum__button}
                    >
                        {' '}
                        Голосування
                    </button>
                </div>
                {display === 'chat' ? <Chat /> : <Voting />}
            </div>
            <ChatForm />
        </div>
    )
}
