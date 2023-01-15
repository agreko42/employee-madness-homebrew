import React from 'react'
import { Link } from 'react-router-dom'

const serverURL = "http://localhost:8080/api"



export default function TableCard(props) {

  function deletionHandler(target, id) {
    fetch(`${serverURL}/${target}/delete/${id}`,{ method: "DELETE" })
    .then(fetch(`${serverURL}/${props.target}/search`)
          .then(res => res.json())
          .then(data => {props.setTableData(data)})
        )
  }

  return (
    <tr>
      <td>{props.columnOne}</td>
      <td>{props.columnTwo}</td>
      <td>{props.columnThree}</td>
      <td>{`${props.columnFour}`}</td>
      <Link to={`/${props.target}/update/${props.id}`}>
        <button>Update</button>
      </Link>
      <button onClick = { (e)=> deletionHandler(props.target, props.id)}>Delete</button>
    </tr>
  )
}
