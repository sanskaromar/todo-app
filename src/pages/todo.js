import React, { useEffect } from 'react';
import ToDos from '../components/todoapp'

export default function Todo() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <div className="bg-gray-400 font-sans p-8 text-gray-300 min-h-screen">
            <ToDos />
            <div className="m-8 p-8 text-2xl text-center text-yellow-800">
                Made with {"<3"} by Sanskar Omar
            </div>
        </div>
    )
}