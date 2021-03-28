import * as mongoose from "mongoose";
import { ClientSchema } from "../../schema/clientSchema";
import { IClient } from "../../../IDomain/IClient";


export default mongoose.model<IClient>("Client", ClientSchema);