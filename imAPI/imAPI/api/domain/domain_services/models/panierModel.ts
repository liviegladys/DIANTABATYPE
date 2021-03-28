/**
 * Subject : Contains model for Manager Pros
 * Author : Laura Fialdès
 * Date : 26/02/2021
 */

import * as mongoose from "mongoose";
import {PanierSchema} from "../../schema/panierSchema";
import {IPanier} from "../../../IDomain/IPanier"



export default mongoose.model<IPanier>("Panier", PanierSchema);