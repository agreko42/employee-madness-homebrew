import React from 'react'

export default function TableCard(props) {
  return (
    <tr>
      <td>{props.columnOne}</td>
      <td>{props.columnTwo}</td>
      <td>{props.columnThree}</td>
      <td>{`${props.columnFour}`}</td>
      <button>Update</button>
      <button>Delete</button>
    </tr>
  )
}
