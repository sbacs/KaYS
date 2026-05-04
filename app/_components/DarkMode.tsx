'use client'
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
    const [dark, setDark] = useState( localStorage.getItem('darkTheme') === 'true' )

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('darkTheme', String(dark) );
    }, [dark])

    return (
        <button onClick={() => setDark(d => !d)} className='w-16 h-8 hover:cursor-pointer rounded-full bg-surface-raised flex items-center  p-0.5 justify-center'>
            <div className={`h-full aspect-square ${dark ? 'translate-x-[50%]' : '-translate-x-[50%]'} flex items-center justify-center transition-all duration-150 bg-surface rounded-full `}>
                {dark ? <Sun /> : <Moon />}
            </div>
        </button>
    )
}