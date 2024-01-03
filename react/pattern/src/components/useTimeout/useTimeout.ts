import { useEffect, useRef } from "react";

export function useTimeout(callback: () => void, delay: number) {
    // use useRef to memory the callback function

    const refCallback=useRef(callback);
    refCallback.current=callback;

    // use useEffect to set timeout every time delay change
    useEffect(()=>{
        const timeId=setTimeout(()=>refCallback.current(), delay)
        return clearTimeout(timeId)
    },[delay])
}