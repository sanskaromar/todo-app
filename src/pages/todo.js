import React, { useEffect, useState } from "react"
import ToDos from "../components/todoapp"
import ProgressBar from "../components/ProgressBar"

export default function Todo() {
	const [toggle, setToggle] = useState(true)
	const [autoSave, setAutoSave] = useState(false)
	const [percentage, setPercentage] = useState(0)

	Storage.prototype.setObj = function (key, obj) {
		return this.setItem(key, JSON.stringify(obj))
	}
	Storage.prototype.getObj = function (key) {
		return JSON.parse(this.getItem(key))
	}
	useEffect(() => {
		window.scroll(0, 0)
		if (localStorage.getObj("theme") === "dark") {
			setToggle(false)
		} else {
			localStorage.setObj("theme", "light")
			setToggle(true)
		}
	}, [])

	useEffect(() => {
		if (!toggle) {
			document.querySelector("#switch").style.backgroundColor =
				"rgba(147,26,222,0.83)"
			document.querySelector("#main").classList.add("dark")
			localStorage.setObj("theme", "dark")
		} else {
			document.querySelector("#switch").style.backgroundColor = "#D1D5DB"
			document.querySelector("#main").classList.remove("dark")
			localStorage.setObj("theme", "light")
		}
	}, [toggle])

	useEffect(() => {
		if (autoSave) {
			document.querySelector("#switch2").style.backgroundColor =
				"rgba(147,26,222,0.83)"
		} else {
			document.querySelector("#switch2").style.backgroundColor = "#D1D5DB"
		}
	}, [autoSave])

	const toggleClass = " transform translate-x-5"
	return (
		<div className='bg-blue-200 font-sans p-8 text-gray-300 min-h-screen dark:bg-gray-900'>
			<ProgressBar percentage={percentage} />
			<div className='flex space-x-5'>
				<div className='flex space-x-2'>
					<div
						id='switch'
						className='md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer'
						onClick={() => {
							setToggle(!toggle)
						}}>
						{/* Switch */}
						<div
							className={
								"bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
								(toggle ? null : toggleClass)
							}></div>
					</div>
					<span className='text-gray-800 font-semibold'>Dark Mode</span>
				</div>
				<div className='flex space-x-2'>
					<div
						id='switch2'
						className='md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer'
						onClick={() => {
							setAutoSave(!autoSave)
						}}>
						{/* Switch */}
						<div
							className={
								"bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
								(!autoSave ? null : toggleClass)
							}></div>
					</div>
					<span className='text-gray-800 font-semibold'>Auto Save</span>
				</div>
			</div>
			<ToDos autoSave={autoSave} setPercentage={setPercentage} />
			<div className='m-8 p-8 text-2xl text-center text-yellow-800'>
				Made with {"<3"} by Sanskar Omar
			</div>
		</div>
	)
}
