import * as express from "express";
import { RouteClient } from "../lib/routes/clientRoute"
import{ RoutePanier} from "../lib/routes/panierRoute"
import{ RouteStore} from "../lib/routes/storeRoute"
import * as cors from "cors"





class App {
    public app: express.Application;
    public routeClt: RouteClient = new RouteClient();
    public routePanier: RoutePanier = new RoutePanier();
    public routeStore: RouteStore = new RouteStore();


    constructor(){
        this.app = express();
        this.config();
        this.routeClt.clientRoutes(this.app);
        this.routePanier.panierRoutes(this.app);
        this.routeStore.storeRoutes(this.app);
        
    }
    private config(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cors({
            origin:[ "http://localhost:5500", "http://127.0.0.1:5500"], 
            credentials: true
        }))

    


    }
}

export default new App().app;