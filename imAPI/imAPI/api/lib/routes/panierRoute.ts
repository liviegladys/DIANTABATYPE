import { PanierController } from "../../controllers/panierController";
import { ClientController } from "../../controllers/clientController";



export class RoutePanier {
    public baseUrl: string = "/panier";
    public panierController : PanierController = new PanierController();
    public clientController : ClientController = new ClientController();
    public panierRoutes(app): void {
        app.route(this.baseUrl + "/create").post(this.panierController.createPanier); 
        app.route(this.baseUrl + "/getAll").get(this.clientController.verifToken,this.panierController.getAllPanier);
        app.route(this.baseUrl + "/delete").get(this.panierController.deletePanier);

    }
}