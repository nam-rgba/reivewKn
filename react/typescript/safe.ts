interface Point {
    x: number,
    y:number
}

function logPoint(p: Point){
    console.log(`{x, y}: {${p.x}, ${p.y}}`);
}

const point1={x:1, y:2};
logPoint(point1);


// Object

const student :{
    name: string;
    age: number;
}={
    name: "Nam",
    age: 21
}

// Union type

let p: number | string = 10
p = "hello";

// Any type

let nam: any = 'single'
nam=129

// Unknow type

let myname: unknown= 'nam doan';
if(typeof myname === 'string'){
    console.log(myname.includes('nam'));
}
