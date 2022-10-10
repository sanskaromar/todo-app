import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ProgressBar = (props) => {
    const { percentage = 0 } = props
    return (
        <div
            x-data="scrollProgress"
            class="fixed inline-flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5"
        >

            <svg class="w-20 h-20">
                <CircularProgressbar value={percentage} text={`${percentage}%`} />;

            </svg>
        </div>
    )
}

export default ProgressBar