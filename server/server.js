const mongoose = require("mongoose")
const EmployeeModel = require("./schemas/employee.model")
const EquipmentModel = require("./schemas/equipment.model")

const express = require("express")
const app = express();
const PORT = 8080;

const cors = require("cors")
const bodyParser = require("body-parser")

const mongoURL = "mongodb://localhost:27017/employeeMadnessHomebrew"
const employeeAPI = "/api/employees"
const equipmentAPI = "/api/equipment"

app.use(bodyParser.json())

app.options("/api/employees/updater/:id", cors())
app.options("/api/equipment/updater/:id", cors())
app.options("/api/employees/create", cors())
app.options("/api/equipment/create", cors())
app.options("/api/employees/delete/:id", cors())
app.options("/api/equipment/delete/:id", cors())


app.get(employeeAPI, async (req, res) => {
 console.log("Server: employee landing triggered")
 
    const allEmployees = await EmployeeModel.find()

    res.set("Access-Control-Allow-Origin", ["*"])

    res.send(allEmployees)
})



app.get(employeeAPI+"/search", async (req, res) => {
    console.log("Server: employee search triggered")
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
// app.get(employeeAPI+"/update/:id", async(req, res) => {

//     console.log("WTF")
//     const EmployeesById = await EmployeeModel.find( { _id: req.params.id})

//     res.set("Access-Control-Allow-Origin", ["*"])

//     res.send(EmployeesById)
// })


app.patch("/api/employees/updater/:id", async (req, res) => {
    console.log("EmployeePatch-endpoint triggers")
    console.log(req.params.id)
    const id = req.params.id
    const body = req.body
    console.log(body)

    const updatedEmployee = await EmployeeModel.updateOne( {_id: id}, {$set: body})

    res.set("Access-Control-Allow-Origin", ["*"])

   return res.json(updatedEmployee)
})

app.post("/api/employees/create", async (req, res, next) => {
    const newEmployee = req.body;
    console.log(newEmployee)
    
    const savedEmployee = await EmployeeModel.create(newEmployee);

    res.set("Access-Control-Allow-Origin", ["*"])
    res.send(savedEmployee);
});

app.delete("/api/employees/delete/:id", async (req, res) => {
    const employee = req.params.id

    const deletedEmployee = await EmployeeModel.deleteOne({_id: employee})

    res.set("Access-Control-Allow-Origin", ["*"])
    res.send(deletedEmployee)
})






app.get("/api/equipment", async (req, res) => {

    console.log("equipment Landing triggers")

    const allEquipment = await EquipmentModel.find()

    res.set("Access-Control-Allow-Origin", ["*"])

    res.send(allEquipment)
})


app.get(equipmentAPI+"/search", async (req, res) => {
    console.log("Server: Equipment search triggered")
    console.log(req.query)
    const nameQuery = req.query.name
    const nameRegex = new RegExp(nameQuery, "i")

    const typeQuery = req.query.type
    const typeRegex = new RegExp(typeQuery, "i")

    const amountQuery = req.query.amount

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
    typeQuery !== undefined ? filterObject.type = typeRegex : ""
    amountQuery !== undefined ? filterObject.amount = amountQuery : ""

    return filterObject
    }

    const filteredEquipment = await EquipmentModel.find(constructFilterObject()).sort(constructSortObject())

    res.set("Access-Control-Allow-Origin", ["*"])
    res.send(filteredEquipment)
})

app.patch("/api/equipment/updater/:id", async (req, res) => {
    console.log("EquipPatch-endpoint triggers")
    console.log(req.params.id)
    const id = req.params.id
    const body = req.body
    console.log(body)

    const updatedEquipment = await EquipmentModel.updateOne( {_id: id}, {$set: body})

    res.set("Access-Control-Allow-Origin", ["*"])

   return res.json(updatedEquipment)
})

app.post("/api/equipment/create", async (req, res, next) => {
    const newEquipment = req.body;
    
    const savedEquipment = await EquipmentModel.create(newEquipment);

    res.set("Access-Control-Allow-Origin", ["*"])
    res.send(savedEquipment);
});


const main = async () => {

   await mongoose.connect(mongoURL)

   app.listen(PORT, () => {
    console.log("Server is listening on 8080")
    console.log(`http://localhost:${PORT}/api/employees`)
    console.log(`http://localhost:${PORT}/api/equipment`)
   }) 
}

main();
