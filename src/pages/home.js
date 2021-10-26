import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const [formType, setFormType] = useState('signup')

    return (
        <>
            <div className="font-mono bg-gray-900 text-gray-200 min-h-screen">

                <div className="h-64">
                    <div className="m-auto flex flex-col text-gray-900">
                        <div className="flex flex-row justify-center text-center py-4">
                            <div className="w-1/4 bg-blue-300 rounded py-2" onClick={() => setFormType('signup')} >Sign Up</div>
                            <div className="w-1/16">Hello There</div>
                            <div className="w-1/4 bg-blue-300 rounded py-2" onClick={() => setFormType('login')} >Log in</div>
                        </div>
                        <div className=" flex flex-col justify-center items-center">
                            <p className="text-gray-200 text-center">Click the button below to {(formType === 'login') ? "Log In!" : "Sign Up!"}</p>
                            {(formType === 'signup') ? <button className="bg-blue-300 py-2 px-4 m-4 rounded lg:w-1/3"><Link to="/todo">SignUp</Link></button> : <button className="bg-blue-300 py-2 px-4 m-4 rounded lg:w-1/3"><Link to="/todo">LogIn</Link></button>}
                        </div>

                    </div>
                    <div className="text-center my-64">
                        Incomplete login form. Just for practising Routing in React.
                    </div>
                </div>
            </div>
        </>
    )
}