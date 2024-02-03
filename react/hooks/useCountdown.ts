/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react"

const useCountdown = (time: number) => {

    // number of seconds left
    const [timeLeft, setTimeLeft] = useState<number>(time);
    // Interval ref
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    // Check is end?
    const hasTimeLeft = timeLeft<=0;
    // Check is runing
    const isRunning = intervalRef.current !== null;


    // Start countdown
    const startCountdown = useCallback(() => {
        if(!isRunning && !hasTimeLeft) {
            // Set interval
            intervalRef.current = setInterval(()=>{
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            },1000)
        }
    },[setTimeLeft, isRunning, hasTimeLeft]);

    // Reset countdown
    const resetCountdown = useCallback(() => {
        // Clear interval if exist 
        clearInterval(intervalRef.current!);
        // Set interval to null
        intervalRef.current = null;
        // Reset time
        setTimeLeft(time);
    },[time]);

    // when count to 0, clear interval and set interval to null
    useEffect(() => {
        if(hasTimeLeft) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
        }
    },[hasTimeLeft]);

    // when component unmount, clear interval and set interval to null
    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current!);
        }
    },[]);

    return {timeLeft, startCountdown, resetCountdown, isRunning}

};

export default useCountdown;