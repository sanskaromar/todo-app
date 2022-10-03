import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'

export default function Todos() {
    const history = useHistory()
    const [tasks, setTasks] = useState([])
    const [status, setStatus] = useState([])
    const addTasks = []

    for (let i = 0; i < tasks.length; i++) {
        addTasks.push(
            <>
                <div className="flex flex-row mb-2 w-full items-center md:w-2/3 lg:w-1/2">
                    {(status[i] === 0) ?
                        <input type="checkbox" class="form-checkbox rounded h-6 w-6 mx-2 text-gray-800 bg-gray-700 border-blue-300 border-2 "
                            onClick={(e) => {
                                setStatus(status.map((stat, index) => (index === i ? stat = 1 : stat)))
                            }} />
                        :
                        <input type="checkbox" class="form-checkbox rounded h-6 w-6 mx-2 text-gray-800 bg-gray-700 border-blue-300 border-2 " checked
                            onClick={(e) => {
                                setStatus(status.map((stat, index) => (index === i ? stat = 0 : stat)))
                            }} />
                    }

                    <input className="w-full rounded-2xl border-4 border-blue-300 px-2 py-1 text-gray-800 bg-gray-300 focus:bg-gray-400 focus:text-white focus:border-blue-200 text-3xl"
                        type="text" value={tasks[i]}
                        placeholder={`Add a new task`}
                        onChange={(e) => {
                            setTasks(tasks.map((task, index) => (index === i ? e.target.value : task)))
                        }}
                    />
                    {/* Delete Button */}
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-10 w-10 px-2 hover:bg-red-600 cursor-pointer bg-gray-900 bg-opacity-0 rounded-full flex-shrink-0'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='white'
                        onClick={(e) => {
                            setTasks(tasks.filter((task, index) => index !== i))
                            setStatus(status.filter((stat, index) => index !== i))
                            
                        }}>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                    </svg>
                </div>
            </>
        )
    }

    Storage.prototype.setObj = function (key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function (key) {
        return JSON.parse(this.getItem(key))
    }

    const handleClick = () => {
        localStorage.setObj("tasks", tasks);
        localStorage.setObj("status", status);
    }

    const clear = (e) => {
        localStorage.clear()
        setTasks(["Add your first Task", "Track progress with checkbox", "Delete tasks when not required", "", ""]);
        setStatus([1, 1, 0, 0, 0]);
    }

    const signOut = () => {
        localStorage.clear()
        history.push("/")
    }

    useEffect(() => {
        if (localStorage.getObj("tasks") && localStorage.getObj("status")) {
            setTasks(localStorage.getObj("tasks"));
            setStatus(localStorage.getObj("status"));
        }
        else {
            setTasks(["Add your first Task", "Track progress with checkbox", "Delete tasks when not required", "", ""]);
            setStatus([1, 1, 0, 0, 0]);
        }
    }, [])


    return (
        <div className="flex flex-col items-center">
            <div className="flex-row">
                <button
                    className = 'mx-3 p-1 mb-2 text-green-400 text-2xl rounded-sm hover:bg-opacity-25 cursor-pointer bg-gray-100 bg-opacity-0 flex-shrink-0'
                    onClick = {handleClick}>
                    Save
                </button>
                <button
                    className = 'mx-3 p-1 mb-2 text-green-400 text-2xl rounded-sm hover:bg-opacity-25 cursor-pointer bg-gray-100 bg-opacity-0 flex-shrink-0'
                    onClick = {clear}>
                    Clear
                </button>
            </div>
            {addTasks}
            {/* Add more tasks fields button */}
            <button
                className='h-10 w-10 mx-auto text-green-600 text-4xl hover:bg-green-400 hover:text-white cursor-pointer bg-gray-100 bg-opacity-0 rounded-full flex-shrink-0'
                onClick={() => {
                    setTasks([...tasks, ""])
                    setStatus([...status, 0])
                }
                }>
                +
            </button>
            <button
                className = 'mx-3 p-1 mb-2 text-green-400 text-2xl rounded-sm hover:bg-opacity-25 cursor-pointer bg-gray-100 bg-opacity-0 flex-shrink-0'
                onClick = {signOut}>
                Sign Out
            </button>
        </div>

    )
}