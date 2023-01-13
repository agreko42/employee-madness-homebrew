import React from 'react'
import { useState } from 'react'



const serverURL = "http://localhost:8080/api"

export default function TableHeader(props) {

  const [searchedName, setSearchedName] = useState("")

  function searchByName(e) {
    setSearchedName(e)

    fetch(`${serverURL}/${props.target}/${e}`)
    .then(res => res.json())
    .then(data => {
      props.setTableData(data)
      console.log(data)
    })
  }

  return (
   <>
    <tr>
      <th>{props.columnOne}</th>
      <th>{props.columnTwo}</th>
      <th>{props.columnThree}</th>
      <th>{props.columnFour}</th>
    </tr>
    <tr>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.target}`}
               onChange ={(e) => searchByName(e.target.value)}
               value = {searchedName}
               
        />
      </th>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.columnTwo}`}
        />
      </th>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.columnThree}`}
        />
      </th>
    </tr>
   </>
  )
}
