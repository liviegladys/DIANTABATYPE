import { Request, Response } from "express";
import { StoreManager } from "../domain/domain_services/managers/storeManager";

export class StoreController {

    storeManager : StoreManager = new StoreManager();

    public createStore = (req: Request, res: Response)=> {
       this.storeManager.createStore(req,res);
    }
    public updateStore = (req: Request, res: Response) => {
        this.storeManager.updateStore(req,res);
    }
    public deleteStore = (req:Request, res: Response) => {
        this.storeManager.deleteStore(req,res);
    }
    public getAllStore = (req:Request, res: Response) => {
        this.storeManager.getAllStore(req,res);
    }
}