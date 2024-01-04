import { useRef, useState } from "react";
import Document from "./Document";

export default function Text(){
    const [text, setText]= useState([])
    const textRef= useRef();


    const handleEnter = function() {
        setText(prevText => [...prevText, textRef.current.value])
    }
    
    return (
    <div>
      <div className="container">
        <input type="text" onKeyDown={(e) => e.key === 'Enter' && handleEnter() } ref={textRef}/>
        <Document text={text} />
        <p>1</p>
      </div>
    </div>
  );
}