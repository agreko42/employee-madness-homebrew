const mongoose = require("mongoose")
const names = require("./names.json")
const levels = require("./levels.json")
const positions = require("./positions.json")
const EmployeeModel = require("../schemas/employee.model")

const mongoURL = "mongodb://localhost:27017/employeeMadnessHomebrew"

const main = async () => {
    await mongoose.connect(mongoURL)

    await populateEmployeeDatabase()

    await mongoose.disconnect(mongoURL)
}

const populateEmployeeDatabase = async () => {
    await EmployeeModel.deleteMany({})

    const employees = names.map ( (srcName) => ({
        name: srcName,
        level: levels[Math.floor(Math.random() * levels.length)],
        position: positions[Math.floor(Math.random() * positions.length)],
        missing: false,
    }))

    await EmployeeModel.create(...employees)
    console.log("Employees created, DB populated")
}

main();