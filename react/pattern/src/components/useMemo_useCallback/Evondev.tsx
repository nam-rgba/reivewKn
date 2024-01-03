/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-labels */
// useMemo Hiểu đơn giản thì nó sẽ ghi nhớ(Memoized) giá trị giữa các lần mà Component re-render.

import { useEffect, useMemo } from "react";

// 1. by Refferences

const a={name: "nam"}
const b={name: "nam"}

console.log(a===b); // false

const c=a;

console.log(a===c) // true

// 2. problem

function Test2 (){
    // Each time component re-render, the 'value' will be re-inited
    const value={nmae: "nam"}
    
    // But 'value===value' is false (a===b) 
    // So dependencies change => useEffect work => re-render againt
    useEffect(()=>{},[value])

    return <div>Test2</div>
}


// Now, useMemo come and solve this problem like:

function Test3(){
    const value = useMemo(() => {naem: 'nam'}, []);
    useEffect(() => {
        // do something
    }, [value]);
    return <div>test3</div>
}

// 3. Khi tất cả các props và chính Component đó đều được ghi nhớ(memoized), bằng không tất cả đều vô nghĩa