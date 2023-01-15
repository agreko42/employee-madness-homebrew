const mongoose = require("mongoose")
const names = require("./names.json")
const levels = require("./levels.json")
const positions = require("./positions.json")
const EmployeeModel = require("../schemas/employee.model")
const EquipmentModel = require("../schemas/equipment.model")

const mongoURL = "mongodb://localhost:27017/employeeMadnessHomebrew"

const main = async () => {
    await mongoose.connect(mongoURL)

    await populateEmployeeDatabase()

    await populateEquipmentDatabase()

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

const populateEquipmentDatabase = async () => {
    await EquipmentModel.deleteMany({})

    const entry1 = {
        name: "Frying Pan",
        type: "Cooking Appliance",
        amount: 2,
        owner: undefined,
    }
    const entry2 = {
        name: "Smith&Wesson Equalizer TS 9mm",
        type: "Handgun",
        amount: 1,
        owner: undefined,
    }
    const entry3 = {
        name: "Gigglepig",
        type: "Drug",
        amount: 15,
        owner: undefined,
    }
    await EquipmentModel.create(entry1,entry2,entry3)
    console.log("Equipment created, DB populated")
}

main();