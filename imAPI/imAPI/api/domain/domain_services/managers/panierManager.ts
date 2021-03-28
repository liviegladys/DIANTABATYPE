/**
 * Subject : Contains methods for Products
 * Author : Laura Fialdès / Gladys Akela
 * Date : 22/02/2021
 */

import panierModel from "../Models/panierModel";
import { DbConnection } from "../../Data/dbConnection";


export class PanierManager {

    private instance = DbConnection.getInstance();
    private connection = this.instance.connectMongo();

    // Panier création
    // Back to format JSON

    public async createPanier(req, res) {
        const panierExist = await panierModel.findOne({ Reference: req.body.Reference })
        if (panierExist != null) {
            res.status(400).send({ message: 'Panier déjà enregistré avec cette réference' })
        } else {
            const newPanier = new panierModel({
                Reference: req.body.Reference,
                Products: req.body.Products,
                Dispo: req.body.Dispo,
                Price: req.body.Price,
                Quantity: req.body.Quantity
            })
            newPanier.save((err, newPanier) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("Produit créé" + newPanier)
                }
            })

        }
    }

    // Recovery of all products
    // Back to format JSON

    public async getAllPanier(req, res) {
        const Paniers = await panierModel.find({})
        const viewPaniers = []
        for (let panier of Paniers) {
            const viewPanier = {
                Reference: panier.Reference,
                Products: panier.Products,
                Dispo: panier.Dispo,
                Price: panier.Price,
                Quantity: panier.Quantity,
                Id: panier._id
            }
            viewPaniers.push(viewPanier)
        }
        res.status(200).send(viewPaniers)
    }


    public deletePanier(req, res) {
        const Paniers = panierModel.findOne({ Reference: req.body.Reference })
        if (Paniers == null) {
            res.status(400).send({ message: 'Panier déjà supprimé' })
        } else {

            Paniers.deleteOne((err, Paniers) => {
                if (err) {
                    res.send(err)
                } else {
                    res.status(200).send("Panier supprimé")
                }
            })
        }
    }

    public async updatePanier(req, res) {
        if (req.body.Reference != null || req.body.Reference != undefined) {// undifined ça veut dire que reference dans le corps de la requette n'existe pas
            const Panier = await panierModel.findOne({ Reference: req.body.Reference })// indique un element selon les critères et trouve la valeur du critère, la fonction asynchrone me renvoie le resultat de la requete et non la requete     
            if (Panier == null) {
                res.status(400).send({ message: 'le panier n existe  pas' }) // le front reçoit du json pour pas avoir de message d'erreur
            } else {
                if (req.body.NumberPanier != 0 && req.body.NumberPanier <= Panier.Quantity) {
                    if (Panier.Quantity == req.body.NumberPanier) {
                        Panier.updateOne({ Quantity: (Panier.Quantity - req.body.NumberPanier), Dispo: false }, { new: true }, (err, newPanier) => {
                            if (err) {
                                res.status(400).send({ message: "Erreur lors de la mise à jour" })
                            } else {
                                res.status(200).send({ message: "la mise à jour a bien été effectuée" })
                            }
                        })
                    } else {
                        Panier.updateOne({ Quantity: (Panier.Quantity - req.body.NumberPanier) }, { new: true }, (err, newPanier) => {
                            console.log(newPanier)
                            if (err) {
                                res.status(400).send({ message: "erreur lors de la mise à jour" })
                            } else {
                                res.status(200).send({ message: "Mise à jour effectué avec succès" })
                            }
                        })
                    }
                } else {
                    res.status(400).send({ message: 'la quantité de panier n est pas suffisante' })
                }
            }
        } else {
            res.status(400).send({ message: 'la reference est null ou indefinie' })
            console.log("reference null")

        }

    }






}