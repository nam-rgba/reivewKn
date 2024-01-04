// eslint-disable-next-line react/prop-types
export default function Document({text}){
    console.log(text)
 

    return  (  
     <div>
        {text.map((txt, index) => <p key={index}>{txt}</p>)}
    </div>)
}

import PropTypes from 'prop-types';

// ...

Document.propTypes = {
  text: PropTypes.array.isRequired
};