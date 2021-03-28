import { ClientController } from "../../controllers/clientController";




export class RouteClient {
    public baseUrl: string = "/client";
    public clientController : ClientController = new ClientController();
    public clientRoutes(app): void {
        app.route(this.baseUrl + "/create").post(this.clientController.verifToken,this.clientController.createClient);
        app.route(this.baseUrl + "/getAll").get(this.clientController.verifToken, this.clientController.getAllClient);
        app.route(this.baseUrl + "/login").post(this.clientController.login);
        app.route(this.baseUrl + "/delete").post(this.clientController.verifToken,this.clientController.deleteClient);

        app.route(this.baseUrl + "/profil/:id") .post(this.clientController.verifToken,this.clientController.verifToken, this.clientController.updateClientPassword)
                                                .get(this.clientController.verifToken, this.clientController.getClientById)
    }
}