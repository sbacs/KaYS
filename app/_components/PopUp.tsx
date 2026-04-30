"use client"
import { useEffect, useState } from "react";


export default function PopUp() {

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handler = (e: Event) => {
            const msg = (e as CustomEvent).detail?.message;
            setMessage(msg ?? "");
            setModalOpen(true);
        };

        window.addEventListener("open-modal", handler);
        return () => window.removeEventListener("open-modal", handler);
    }, []);

    useEffect(() => {
        if (!modalOpen) return;
        const timer = setTimeout(() => setModalOpen(false), 2000);
        return () => clearTimeout(timer);
    }, [modalOpen]);


    return (
        <div className={`absolute w-75 h-20 bg-surface shadow-md flex items-center justify-center pointer-events-none rounded-xl border border-border text-text  top-2 right-2 ${modalOpen ? " translate-x-0" : " translate-x-[110%] "} transition-all duration-150`}>
            {message}
        </div>
    )
}