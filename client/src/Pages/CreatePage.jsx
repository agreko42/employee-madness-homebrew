import { React, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const serverURL = "http://localhost:8080/api"

export default function CreatePage({target}) {
  const [updateCol1, setUpdateCol1] = useState("")
  const [updateCol2, setUpdateCol2] = useState("")
  const [updateCol3, setUpdateCol3] = useState("")
  const navigate = useNavigate();


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


function creationHandler(col1, col2, col3, target){
  const bodyObject = (
    target === "employees" ? employeeConstructor(col1, col2, col3) : equipmentConstructor(col1, col2, col3) 
  )

  console.log(bodyObject)
  console.log(target)

  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyObject), 
  }

 fetch(`${serverURL}/${target}/create`, requestOptions)
  .then( (res) => res.json())
  .then( () => {
    navigate(`/${target}`)
  })
}


  return (
    <>
        <div>{`Create ${target}`}</div>
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
        <button onClick = {(e) => creationHandler(updateCol1, updateCol2, updateCol3, target)}>Save Entry</button>
    </>
  )
}
