/* eslint-disable @typescript-eslint/no-unused-vars */
import useGenerateWords from './useGenerateWords';
import useCountdown from './useCountdown';
import useTyping from './useTyping';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { countErrors } from '../utils/index';


export type State = 'START' | 'PLAYING' | 'END';


const useEngine = (timeL: number, setOpenThank: ()=>void) => {
    const [state, setState] = useState<State>('START');
    const NUM_WORDS = useMemo(() => 20, []);
    const {words, updateWords} = useGenerateWords(NUM_WORDS);
    const {timeLeft, startCountdown, resetCountdown, isRunning }= useCountdown(timeL);
    const {cusor, typed, totalTyped, clearTyped, resetTotalTyped} = useTyping(state !== 'END', setOpenThank );

    // check if the user has started typing and the cursor is not at the start
    const isStart = state === 'START' && cusor>0;
    const areWordsEnd=cusor===words.length;

    const [error, setError] = useState(0);

    const restart = useCallback(() => {
        resetCountdown();
        resetTotalTyped();
        setState('START');
        setError(0);
        updateWords();
        clearTyped();
    }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

    const sumError = useCallback(() => {
        const wordsReached = words.substring(0, totalTyped);
        setError((prevError)=>prevError+countErrors(wordsReached, typed ));
    }, [typed, words, cusor]);

    // when user start typing, start the countdown
    useEffect(()=>{
        if(isStart){
            setState('PLAYING');
            startCountdown();
        }
        // dependencies for this effect
    },[isStart, startCountdown, cusor]);

    useEffect(()=>{
        if(!timeLeft){
            setState('END');
            sumError();
        }
    },[timeLeft, sumError]);

    // when the user has reached the end of the words, stop the countdown
    useEffect(()=>{
        if(areWordsEnd){
            sumError();
            updateWords();
            clearTyped();
        }
    },[cusor, words, clearTyped, typed, areWordsEnd, sumError]);

    return {state, words, timeLeft, resetCountdown,isRunning, typed, totalTyped, error, restart};   

}

export default useEngine;