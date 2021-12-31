import React from 'react'

function FormInput(props) {
    const {info} = props
    return (
      <div>
        <span>{info.name}</span>
        <input type={info.type} name={info.name}  onChange={handleChange}/>
      </div>
    );
}

export default FormInput
