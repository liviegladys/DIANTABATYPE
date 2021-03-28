import * as mongoose from "mongoose";

export const ClientSchema : mongoose.Schema = new mongoose.Schema({
    Name: { type: String, required: true },
    FirstName: { type:String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Panier: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PanierModel' }]
})
