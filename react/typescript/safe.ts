interface Point {
    x: number,
    y:number
}

function logPoint(p: Point){
    console.log(`{x, y}: {${p.x}, ${p.y}}`);
}

const point1={x:1, y:2};
logPoint(point1);