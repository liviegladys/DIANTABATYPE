import * as dotenv from "dotenv";
import * as dotenvExpand  from "dotenv-expand";
import * as mongoose from "mongoose";

export class DbConnection {
    private static connectionInstance: DbConnection;
    private dotenvConfig = dotenv.config();
    private expandDotenv = dotenvExpand(this.dotenvConfig)

    private constructor(){}
    
    public static getInstance(): DbConnection{
        if(!DbConnection.connectionInstance){
            DbConnection.connectionInstance = new DbConnection();
            console.log("je suis unique")
        }
        return DbConnection.connectionInstance;
    }
    public async connectMongo(){
        mongoose.connect(`${process.env.BDD_CONNECTION}` , { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.once("open", ()=> {
            console.log("Connection okay");
        })
        .on("error", (error) => {

            console.log("Connection failed" + error);
       
        })
    }
}