import React from 'react'
import { useState } from 'react'



const serverURL = "http://localhost:8080/api"

export default function TableHeader(props) {

  const [col1Search, setCol1Search] = useState("")
  const [col2Search, setCol2Search] = useState("")

  function searchByCol1(e) {
    setCol1Search(e)

    

    console.log(`${serverURL}/${props.target}/${e} `)

    fetch(`${serverURL}/${props.target}/${e}`)
    .then(res => res.json())
    .then(data => {
      props.setTableData(data)
    })
  }

  function searchByCol2(e) {
    setCol2Search(e)
    console.log(col2Search)

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
               onChange ={(e) => searchByCol1(e.target.value)}
               value = {col1Search}
               
        />
      </th>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.columnTwo}`}
               onChange = { (e) => searchByCol2(e.target.value)}
               value = {col2Search}
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
