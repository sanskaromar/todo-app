import { useState } from "react"


export default function Todos() {
    const [tasks, setTasks] = useState(["Add your first Task", "Track progress with checkbox", "Delete tasks when not required", "", ""])
    const [status, setStatus] = useState([1, 1, 0, 0, 0])
    const addTasks = []

    for (let i = 0; i < tasks.length; i++) {
        addTasks.push(
            <>
                <div className="flex flex-row mb-2 w-full items-center">
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

                    <input className="w-full rounded border-4 border-blue-300 px-2 py-1 text-blue-50 bg-gray-700 focus:bg-gray-900 focus:text-white focus:border-blue-200"
                        type="text" value={tasks[i]}
                        placeholder={`Add a new task`}
                        onChange={(e) => {
                            setTasks(tasks.map((task, index) => (index === i ? e.target.value : task)))
                        }}
                    />
                    {/* Delete Button */}
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-10 w-10 px-2 hover:bg-opacity-25 cursor-pointer bg-gray-100 bg-opacity-0 rounded-full flex-shrink-0'
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

    return (
        <div className="flex flex-col">
            {addTasks}
            <button
                className='h-10 w-10 mx-auto text-white text-4xl  hover:bg-opacity-25 cursor-pointer bg-gray-100 bg-opacity-0 rounded-full flex-shrink-0'
                onClick={() => {
                    setTasks([...tasks, ""])
                    setStatus([...status, 0])
                }
                }>
                +
            </button>
        </div>

    )
}