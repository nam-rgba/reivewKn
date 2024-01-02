import { useCallback } from "react"
import { useState } from "react"

export default function Counter(){
    const [count, setCount] = useState(0)
    const increase = useCallback(()=>setCount(count => count+1),[])
    const decrease = useCallback(()=>setCount(count => count-1),[])
    return (
        <div>
            <button onClick={increase} >add</button>
            <button onClick={decrease}>minus</button>
            <h1>{count}</h1>
        </div>
    )
}