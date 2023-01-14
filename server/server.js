const mongoose = require("mongoose")
const EmployeeModel = require("./schemas/employee.model")

const express = require("express")
const app = express();
const PORT = 8080;

const mongoURL = "mongodb://localhost:27017/employeeMadnessHomebrew"
const employeeAPI = "/api/employees"


app.get(employeeAPI, async (req, res) => {
 console.log("Server: employee landing triggered")
    const allEmployees = await EmployeeModel.find()

    res.set("Access-Control-Allow-Origin", ["*"])

    res.send(allEmployees)
})

app.get(`${employeeAPI}/search`, async (req, res) => {
console.log("Server: employee search triggered")
console.log(req.query)
    const nameQuery = req.query.name
    const nameRegex = new RegExp(nameQuery, "i")

    const posQuery = req.query.position
    const posRegex = new RegExp(posQuery, "i")

    const levelQuery = req.query.level
    const lvlRegex = new RegExp(levelQuery, "i")


    function constructSortObject() {
        let sortSplit = ""
        if(req.query.sort){
            sortSplit = req.query.sort.split(",")
        }
        const sortKey = sortSplit[0]
        let  sortQuery = {};
        sortQuery[sortKey] = sortSplit[1]
        console.log(sortQuery)
        return sortQuery
    }


    function constructFilterObject(){
    const filterObject = {};

    nameQuery !== undefined ? filterObject.name = nameRegex : ""
    posQuery !== undefined ? filterObject.position = posRegex : ""
    levelQuery !== undefined ? filterObject.level = lvlRegex : ""

    return filterObject
    }

    
    const filteredEmployees = await EmployeeModel.find(constructFilterObject()).sort(constructSortObject())

    res.set("Access-Control-Allow-Origin", ["*"])
    res.send(filteredEmployees)
})


// app.get("/api/equipment", async (req, res) => {

//     const allEquipment = await EquipmentModel.find()

//     res.set("Access-Control-Allow-Origin", ["*"])

//     res.send(allEquipment)
// })


const main = async () => {

   await mongoose.connect(mongoURL)

   app.listen(PORT, () => {
    console.log("Server is listening on 8080")
    console.log(`http://localhost:${PORT}/api/employees`)
    console.log(`http://localhost:${PORT}/api/equipment`)
   }) 
}

main();
