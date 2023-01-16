import React from 'react'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import TableHeader from "../Components/TableHeader"
import TableCard from "../Components/TableCard"
import Loading from "../Components/Loading"

const serverURL = "http://localhost:8080/api"


export default function TablePage( {target} ) {


  const [isLoading, setIsLoading] = useState(true)
  const [tableData, setTableData] = useState(null);


  useEffect( () => {

    setIsLoading(true)

    fetch(`${serverURL}/${target}`)
    .then(res => res.json())
    .then(data => {
      setTableData(data)
      setIsLoading(false)
    })
  }, [target]);


  if(isLoading){
    return <Loading/>
  }
  else{
      return (
      <table>
        <Link to = {`/${target}/create`}>
          <button>{`Create ${target}` }</button>
        </Link>
        <thead>
          { target === "employees" ? <TableHeader target = {target}
                                                  tableData = {tableData}
                                                  setTableData = {setTableData}
                                                  columnOne = {"Name"}
                                                  columnTwo = {"Position"}
                                                  columnThree = {"Level"}
                                                  columnFour = {"Missing"}/>
          : target === "equipment" ? <TableHeader target = {target}
                                                  setIsLoading = {setIsLoading}
                                                  tableData = {tableData}
                                                  setTableData = {setTableData}
                                                  columnOne = {"Name"}
                                                  columnTwo = {"Type"}
                                                  columnThree = {"Amount"}
                                                  columnFour = {"Owner"}/>
          : ""
          }
        </thead>

        <tbody>
          {tableData.map( (dataEntry) => {
            return (
                target === "employees"? <TableCard  target= {target}
                                                    setTableData = {setTableData}
                                                    columnOne = {dataEntry.name}
                                                    columnTwo = {dataEntry.position}
                                                    columnThree = {dataEntry.level}
                                                    columnFour = {dataEntry.missing}
                                                    id = {dataEntry._id}
                                                    key = {dataEntry._id}/>
              : target === "equipment" ? <TableCard target= {target}
                                                    setTableData = {setTableData}
                                                    columnOne = {dataEntry.name}
                                                    columnTwo = {dataEntry.type}
                                                    columnThree = {dataEntry.amount}
                                                    columnFour = {dataEntry.owner}
                                                    id = {dataEntry._id}
                                                    key = {dataEntry._id}/>
              : ""
            )}
        )}  
        </tbody> 

      </table>
    ) 
  }

}
