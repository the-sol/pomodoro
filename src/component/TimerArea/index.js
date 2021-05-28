import React from 'react'
import Timer from '../Timer'
const TimerArea = () => {
    const Time = {hours:0, minutes: 0, seconds: 5}
    
    return (
        
        <div>
            <Timer Time={Time}/>
        </div>
    )
}

export default TimerArea
