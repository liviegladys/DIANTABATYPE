import { Document} from "mongoose";


export interface IStore extends Document {
    Name: String,
    Email: String,
    Password: String ,
    Panier: String
}