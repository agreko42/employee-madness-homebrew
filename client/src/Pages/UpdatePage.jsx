import {React, useState} from 'react'
import { useParams } from 'react-router-dom'



const serverURL = "http://localhost:8080/api"

// function fetchEntry(target, id) {
//   const entry = fetch(`${serverURL}/${target}/update/${id}`).then( (res) => res.json())
//   return entry
//   }


export default function UpdatePage({target}) {
  const { id } = useParams()
  const [updateCol1, setUpdateCol1] = useState("")
  const [updateCol2, setUpdateCol2] = useState("")
  const [updateCol3, setUpdateCol3] = useState("")


function employeeConstructor(name, position, level){
  let bodyObject = {};
  if (name !== ""){
    bodyObject.name = name
  } 
  if(position !== ""){
    bodyObject.position = position
  }
  if(level !== ""){
    bodyObject.level = level
  }
  return bodyObject
}

function equipmentConstructor(name, type, amount){
  let bodyObject = {};
  if (name !== ""){
    bodyObject.name = name
  } 
  if(type !== ""){
    bodyObject.type = type
  }
  if(amount !== ""){
    bodyObject.amount = amount
  }
  return bodyObject
}


function updateHandler(col1, col2, col3, target, id){
  const bodyObject = (
    target === "employees" ? employeeConstructor(col1, col2, col3) : equipmentConstructor(col1, col2, col3) 
  )

  console.log(bodyObject)
  console.log(target)

  const requestOptions = {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyObject), 
  }

 fetch(`${serverURL}/${target}/updater/${id}`, requestOptions)
  .then( (res) => res.json())
  .then( (json) => console.log(json))
}


  return (
    <>
        <div>Update Entry</div>
        <input placeholder={target === "employees" ? "Employee Name":"Equipment Name"}
               onChange = { (e) => setUpdateCol1(e.target.value)}
               value = {updateCol1}
        />
        <input placeholder={target === "employees" ? "Employee Position" : "Equipment Type"} 
               onChange = { (e) => setUpdateCol2(e.target.value)}
               value={updateCol2}
        />
        <input placeholder={target === "employees" ? "Employee Level" : "Equipment Amount"}  
               onChange = { (e) => setUpdateCol3(e.target.value)}
               value = {updateCol3}
        />
        <button onClick = {(e) => updateHandler(updateCol1, updateCol2, updateCol3, target, id)}>Save Changes</button>
    </>
  )
}
