import React from 'react'
import { useEffect, useState } from "react"

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
      console.log(data)
    })
  }, [target]);


  if(isLoading){
    return <Loading/>
  }
  else{
      return (
      <table>
        
        <thead>
          { target === "employees" ? <TableHeader target = {target}
                                                  setIsLoading = {setIsLoading}
                                                  setTableData = {setTableData}
                                                  columnOne = {"Name"}
                                                  columnTwo = {"Position"}
                                                  columnThree = {"Level"}
                                                  columnFour = {"Missing"}/>
          : target === "equipment" ? <TableHeader target = {target}
                                                  columnOne = {"Name"}
                                                  columnTwo = {"Amount"}
                                                  columnThree = {null}
                                                  columnFour = {null}/>
          : ""
          }
        </thead>

        <tbody>
          {tableData.map( (dataEntry, index) => {
            return (
                target === "employees"? <TableCard columnOne = {dataEntry.name}
                                                    columnTwo = {dataEntry.position}
                                                    columnThree = {dataEntry.level}
                                                    columnFour = {dataEntry.missing}
                                                    key = {dataEntry._id}/>
              : target === "equipment" ? <TableCard columnOne = {dataEntry.name}
                                                    columnTwo = {dataEntry.position}
                                                    columnThree = {dataEntry.level}
                                                    columnFour = {dataEntry.missing}
                                                    index = {index}/>
              : ""
            )}
        )}  
        </tbody> 

      </table>
    ) 
  }

}
