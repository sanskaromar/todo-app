import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const [formType, setFormType] = useState('signup')

    return (
        <>
            <div className="font-mono bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center p-6">
                <header className="text-center text-5xl p-8 font-mono">
                    To Do App
                </header>

                <div className='flex flex-row w-full justify-center'>
                    <button className="text-gray-700 font-semibold w-1/4 text-center bg-blue-300 rounded py-2 mx-2" onClick={() => setFormType('signup')} >Sign Up</button>
                    <button className="text-gray-700 font-semibold w-1/4 text-center bg-blue-300 rounded py-2 mx-2" onClick={() => setFormType('login')} >Log in</button>
                </div>
                    

                <p className="text-gray-200 mt-4 text-center">Click the button below to {(formType === 'login') ? "Log In!" : "Sign Up!"}</p>
                {(formType === 'signup') ? <button className="text-gray-700 font-semibold bg-blue-300 py-2 px-4 m-4 rounded lg:w-1/3"><Link to="/todo">SignUp</Link></button> : <button className="bg-blue-300 py-2 px-4 m-4 rounded lg:w-1/3"><Link to="/todo">LogIn</Link></button>}

                <span className="text-center justify-self-end mt-auto">
                    Incomplete login form. Just for practising Routing in React.
                </span>
            </div>
        </>
    )
}