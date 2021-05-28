import React, { useState, useEffect } from 'react'

const Timer = ({ Time }) => {
  const { hours, minutes, seconds } = Time;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
  const [start, setStart] = useState(false)
  const [num,setNum] = useState(minutes)

  const StartHandler = () => {
    setStart(true)
  }
  const StopHandler = () => {
    setStart(false)
  }
  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0)
      reset()
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };
  const reset = () => {
    setStart(false)
    if(num==25){
      setTime([parseInt(hours), parseInt(5), parseInt(seconds)])
      setNum(5)
    }
     else{
      setTime([parseInt(hours), parseInt(25), parseInt(seconds)])
      setNum(25)
     }
  };

 
  useEffect(() => {
    if (start) {
       setTimeout(() => tick(), 1000);    
    }
  });

 

  return (
    <div>
      <p>{`${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`} </p>
      <button onClick={StartHandler}>Start</button>
      <button onClick={StopHandler}>Stop</button>
    </div>
  );
}


export default Timer
