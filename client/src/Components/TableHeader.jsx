import React from 'react'
import { useState } from 'react'



const serverURL = "http://localhost:8080/api"

export default function TableHeader(props) {

  const [col1Search, setCol1Search] = useState("")
  const [col2Search, setCol2Search] = useState("")
  const [col3Search, setCol3Search] = useState("")
  const [col4Search, setCol4Search] = useState("")

  function col1SearchHandler(e) {
    console.log(e.target.value)

    setCol1Search(e.target.value)

    console.log(`${serverURL}/${props.target}/search${props.columnOne.toLowerCase()}/${e.target.value}`)

    fetch(`${serverURL}/${props.target}/search${props.columnOne.toLowerCase()}/${e.target.value}`)
    .then(res => res.json())
    .then(data => {
      props.setTableData(data)
      console.log(data)
    })
  }

  // // function searchByCol2(e) {
  //   setCol2Search(e)
  //   console.log(col2Search)

  //   fetch(`${serverURL}/${props.target}/${e.target.value}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     props.setTableData(data)
  //     console.log(data)
  //   })
  // }

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
               onChange ={(e) => col1SearchHandler(e)}
               value = {col1Search}
               
        />
      </th>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.columnTwo}`}
               onChange = { (e) =>  setCol2Search(e.target.value)}
               value = {col2Search}
        />
      </th>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.columnTwo}`}
               onChange = { (e) => setCol3Search(e.target.value)}
               value = {col3Search}
        />
      </th>
    </tr>
   </>
  )
}
