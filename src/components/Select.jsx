import React from 'react'

const Select = ({label,id,name,onChange,value,options,defaultOption,error} ) => {
  return (
    <div className="input-container">
    <label htmlFor={id}>{label}</label>
    <select id={id} name={name}  
    value={value} 
    onChange={onChange}
  >
      {defaultOption && (<option value="" hidden>Select Category</option>)}
                
                { options.map((option,i) => (
                    <option key={i} value={option}>{option}</option>
                ))}
                
              
    </select>
    <p className='error'>{error}</p>
  </div>
  )
}

export default Select