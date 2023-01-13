const mongoose = require("mongoose")

const {Schema} = mongoose;

const EmployeeSchema = new Schema ({

    name : String,
    level: String,
    position: String,
    missing: Boolean,
    created: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Employees", EmployeeSchema)