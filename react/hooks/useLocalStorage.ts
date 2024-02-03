import { useEffect, useState } from "react"

export function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T)
) {
    // State to store our value
    const [storedValue, setStoredValue] = useState<T>(() => {
        // Get from local storage then parse stored json or if none return initialValue
        const jsonValue= localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)
        // If initialValue is a function, invoke it to get next value
        if(typeof initialValue === 'function') {
            return (initialValue as () => T)()
        } else {
            
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue))
    },[key, storedValue])

    return [storedValue,setStoredValue] as [T, typeof setStoredValue]
}