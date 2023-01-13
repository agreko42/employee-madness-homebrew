const mongoose = require("mongoose")
const EmployeeModel = require("./schemas/employee.model")



const express = require("express")






const app = express();
const PORT = 8080;
const mongoURL = "mongodb://localhost:27017/employeeMadnessHomebrew"
const employeeAPI = "/api/employees"


app.get(employeeAPI, async (req, res) => {

    const allEmployees = await EmployeeModel.find()

    res.set("Access-Control-Allow-Origin", ["*"])

    res.send(allEmployees)
})

app.get(`${employeeAPI}/:name`, async (req, res) => {
    const name = `${req.params.name}`
    const nameRegex = new RegExp(name, "i")

    console.log(req.params)

    const filteredEmployees = await EmployeeModel.find( {name: nameRegex} )

    res.set("Access-Control-Allow-Origin", ["*"])
    res.send(filteredEmployees)
})

// app.get(`${employeeAPI}/:position`, async (req, res) => {
//     const pos = `${req.params.position}`
//     const posRegex = new RegExp(pos, "i")

//     const filteredPositions = await EmployeeModel.find( {position: posRegex} )

//     res.set("Access-Control-Allow-Origin", ["*"])
// })


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
