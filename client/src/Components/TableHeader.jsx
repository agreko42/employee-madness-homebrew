import React from 'react'
import { useState } from 'react'



const serverURL = "http://localhost:8080/api"

export default function TableHeader(props) {

  const [col1Search, setCol1Search] = useState("")
  const [col2Search, setCol2Search] = useState("")
  const [col3Search, setCol3Search] = useState("")
  const [col4Search, setCol4Search] = useState("")

  function constructQueryString(){

    let queryString = "";

    if(col1Search !== "" || col2Search !== "" || col3Search !== ""){
      queryString = "?"
    }
    if(col1Search !== ""){
      queryString += `${props.columnOne.toLowerCase()}=${col1Search}`
    }
    if(col1Search !== "" && col2Search !== "") {
      queryString += "&"
    }
    if(col2Search !== ""){
      queryString += `${props.columnTwo.toLowerCase()}=${col2Search}`
    }
    if(col2Search !== "" && col3Search !== "" || col1Search !== "" && col3Search !== ""){
      queryString += "&"
    }
    if(col3Search !== ""){
      queryString += `${props.columnThree.toLowerCase()}=${col3Search}`
    }
    if(col3Search !== "" && col4Search !== "" || col2Search !== "" && col4Search !== "" || col1Search !== "" && col4Search !== ""){
      queryString += "&"
    }
    if(col4Search !== ""){
      queryString += `${props.columnFour.toLowerCase()}=${col4Search}`
    }
    return queryString
  }


  function searchHandler(e) {
    console.log(e.target)
    const queryString = constructQueryString()

    console.log(`${serverURL}/${props.target}${queryString}`)
    console.log("nameSearch"+col1Search)
    console.log("posSearch:"+col2Search)

    console.log(queryString)

    //fetch(`${serverURL}/${props.target}/${e}`)
    fetch(`${serverURL}/${props.target}/search${queryString}`)
    .then(res => res.json())
    .then(data => {
      props.setTableData(data)
    })
  }

  // // function searchByCol2(e) {
  //   setCol2Search(e)
  //   console.log(col2Search)

  //   fetch(`${serverURL}/${props.target}/${e}`)
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
               onChange ={(e) =>  setCol1Search(e.target.value)+
                                  searchHandler(e)}
               value = {col1Search}
               
        />
      </th>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.columnTwo}`}
               onChange = { (e) =>  setCol2Search(e.target.value)}
               onSubmit = { (e) => searchHandler(e)}
               value = {col2Search}
        />
      </th>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.columnTwo}`}
               onChange = { (e) => setCol3Search(e.target.value)+
                                   searchHandler(e.target.value)}
               value = {col3Search}
        />
      </th>
    </tr>
   </>
  )
}
