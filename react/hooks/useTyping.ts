import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyboardCodeValid } from "../utils";


const useTyping = (enable:boolean, setOpenThank:()=>void) => {
    // Init position of cursor
    const [cusor, setCursor] = useState(0);
    // Init typed string
    const [typed, setTyped] = useState('');
    // Total typed characters  
    const totalTyped = useRef(0);
    
    // Handle keydown event
    const handleKeyDown =useCallback(({key, code}:KeyboardEvent)=>{
        // If not enable or key is valid, return
        if(!enable || !isKeyboardCodeValid(code)) return;
        switch(key) {
            // If key is backspace, remove last character
            case 'Backspace':
                setTyped((prevTyped) => prevTyped.slice(0, -1));
                setCursor((prevCursor) => prevCursor - 1);
                totalTyped.current -= 1;
                break;

            case 'Escape':
                setOpenThank();
                console.log('esc');
                break;
            
            default:
                setTyped((prevTyped) => prevTyped + key);
                setCursor((prevCursor) => prevCursor + 1);
                totalTyped.current += 1;
        }
    },[cusor,enable]);

    const clearTyped = useCallback(() => {
        setTyped('');
        setCursor(0);
    },[]);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    },[]);


    // attach event listener to window
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        console.log('add event listener');
        // remove event listener when component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    },[handleKeyDown]);

    return {cusor, typed, totalTyped: totalTyped.current, clearTyped, resetTotalTyped};
}

export default useTyping;