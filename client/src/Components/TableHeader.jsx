import React from 'react'
import { useState, useEffect } from 'react'

const serverURL = "http://localhost:8080/api"



const fillDropdown = (data, source) => {

  if(source==="Level"){
    let differentLevels = {};

    data.forEach( (entry) => {
      differentLevels[entry.level] = 1;
    });
    const content = (Object.getOwnPropertyNames(differentLevels)).map( (level, index) => {
      return <option key={index}>{level}</option>
    });

    return content
  }
  else if(source==="Position"){
    let differentPositions = {};
  
    data.forEach( (entry) => {
      differentPositions[entry.position] = 1;
    });
    const content = (Object.getOwnPropertyNames(differentPositions)).map( (position, index) => {
       return <option key={index}>{position}</option>
    });
    return content
  }
  else if(source==="Type"){
    let differentTypes= {};
  
    data.forEach( (entry) => {
      differentTypes[entry.type] = 1;
    });
    const content = (Object.getOwnPropertyNames(differentTypes)).map( (type, index) => {
       return <option key={index}>{type}</option>
    });
    return content
  }
  else if(source==="Amount"){
    let differentAmounts= {};
  
    data.forEach( (entry) => {
      differentAmounts[entry.amount] = 1;
    });
    const content = (Object.getOwnPropertyNames(differentAmounts)).map( (amount, index) => {
       return <option key={index}>{amount}</option>
    });
    return content
  }
}

export default function TableHeader(props) {

  const [col1Search, setCol1Search] = useState("")
  const [col2Search, setCol2Search] = useState("")
  const [col3Search, setCol3Search] = useState("")
  const [col4Search, setCol4Search] = useState("")
  const [sort, setSort] = useState("")




  let queryString = constructQueryString()


  function constructQueryString(){

    let queryString = "";

    if(col1Search !== "" || col2Search !== "" || col3Search !== ""|| col4Search !== "" || sort !== ""){
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
      
    }
    if(col4Search !== ""){
      queryString += `${props.columnFour.toLowerCase()}=${col4Search}`
    }
    if(col1Search !== "" && sort !== "" || col2Search !== "" && sort !== "" || col3Search !== "" && sort !== "" || col4Search !== "" && sort !== ""){
      queryString += "&"
    }
    if(sort !== ""){
      queryString += sort
    }
    return queryString
  }

  useEffect(() => {
      fetch(`${serverURL}/${props.target}/search${queryString}`)
      .then(res => res.json())
      .then(data => {
         props.setTableData(data)
      })
  }, [queryString])

  useEffect( () => {
    queryString = ""
  }, [props.target])


  return (
   <>
    <tr>
      <th>{props.columnOne}
        <button onClick = {() => setSort(`sort=${props.columnOne.toLowerCase()},1`)}>↑</button>
        <button onClick = {() => setSort(`sort=${props.columnOne.toLowerCase()},-1`)}>↓</button>
      </th>
      <th>{props.columnTwo}
        <button onClick = {() => setSort(`sort=${props.columnTwo.toLowerCase()},1`)}>↑</button>
        <button onClick = {() => setSort(`sort=${props.columnTwo.toLowerCase()},-1`)}>↓</button>
      </th>
      <th>{props.columnThree}
        <button onClick = {() => setSort(`sort=${props.columnThree.toLowerCase()},1`)}>↑</button>
        <button onClick = {() => setSort(`sort=${props.columnThree.toLowerCase()},-1`)}>↓</button>
      </th>
      <th>{props.columnFour}</th>
    </tr>
    <tr>
      <th>
        <input type="text" 
               placeholder ={`Search for ${props.target}`}
               onChange ={(e) =>  setCol1Search(e.target.value)}
               value = {col1Search}
        />
      </th>
      <th>
        <select type="text" 
               placeholder ={`Search for ${props.columnTwo}`}
               onChange = { (e) =>  setCol2Search(e.target.value)}
               value = {col3Search}>
          <option disabled value ="">{`Select ${props.columnTwo}`}</option>
          {fillDropdown(props.tableData, props.columnTwo)}
        </select>
      </th>
      <th>
        <select type="text" 
                placeholder ={`Search for ${props.columnThree}`}
                onChange = { (e) =>  setCol3Search(e.target.value)}
                value = {col3Search}>
          <option disabled value ="">{`Select ${props.columnThree}`}</option>
          {fillDropdown(props.tableData, props.columnThree)}
        </select>

      </th>
    </tr>
   </>
  )
}
 