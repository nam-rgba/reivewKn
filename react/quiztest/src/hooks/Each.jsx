import {Children} from 'react'
// Custom render
export const Each =({render, of}) =>
Children.toArray(of.map((item, index)=>render(item, index)));