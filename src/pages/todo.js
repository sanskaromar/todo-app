import React, { useEffect } from 'react';
import ToDos from '../components/todoapp'

export default function Todo() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <div className="bg-gray-900 font-sans p-4 text-gray-300 min-h-screen">
            <ToDos />
            <div className="m-4 p-12 text-center text-yellow-400">
                Made with {"<3"} by Sanskar Omar
            </div>
        </div>
    )
}