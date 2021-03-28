import { Document} from "mongoose";


export interface IClient extends Document {
        Name: string,
        FirstName: string,
        Email: string,
        Password: string,
        Panier: string
}