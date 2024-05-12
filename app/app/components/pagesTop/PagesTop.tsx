'use client'
import React from 'react'

interface Props {
    title: string
}

const PagesTop: React.FC<Props> = ({ title }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '250px',
                backgroundColor: '#303a2a',
                padding: '5px',
            }}
        >
            <p
                style={{
                    fontSize: '32px',
                    color: 'white',
                    letterSpacing: '10px',
                    textAlign: 'center',
                }}
            >
                {title}
            </p>
        </div>
    )
}

export default PagesTop
