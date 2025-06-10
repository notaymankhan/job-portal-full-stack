import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true ,unique: true},
    email: { type: String },
    image: { type: String, required: true },
    password: { type: String},
    adminCreated: { type: Boolean, default: false }

})

const Company = mongoose.model('Company', companySchema)

export default Company
