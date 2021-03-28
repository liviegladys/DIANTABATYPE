/**
 * Subject : Contains model for Manager Pros
 * Author : Laura Fialdès
 * Date : 26/02/2021
 */

import * as mongoose from "mongoose";
import {StoreSchema} from "../../schema/storeSchema";
import {IStore} from "../../../IDomain/IStore"



export default mongoose.model<IStore>("Store", StoreSchema);