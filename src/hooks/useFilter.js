import React, { useState } from 'react'

const useFilter = (dataList,callBack) => {
    const[query , setQuery] = useState('')

    const filteredData = dataList.filter((data) =>
    callBack(data).toLowerCase().includes(query)
    )
  
    return  [filteredData,setQuery]
    
  
}

export default useFilter