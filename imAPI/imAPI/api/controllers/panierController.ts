import { Request, Response } from "express";
import { PanierManager } from "../domain/domain_services/managers/panierManager";

export class PanierController {

    panierManager : PanierManager = new PanierManager();

    public createPanier = (req: Request, res: Response) => {
        this.panierManager.createPanier(req,res);
    }
    public getAllPanier = (req: Request, res: Response) => {
        this.panierManager.getAllPanier(req,res);
    }
    public deletePanier = (req: Request, res: Response) => {
        this.panierManager.deletePanier(req,res);
    }
    public updatePanier = (req:Request,res:Response) => {
         this.panierManager.updatePanier(req,res);
    }

}