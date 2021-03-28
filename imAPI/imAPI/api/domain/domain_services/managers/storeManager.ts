/**
 * Subject : Contains methods for Magasin
 * Author : Laura Fialdès
 * Date : 26/02/2021
 */

import storeModel from "../Models/storeModel";
import { DbConnection } from "../../Data/dbConnection";
import { CryptPassword } from "../schema_services/cryptPassword";
import * as bcrypt from "bcrypt";
import { match } from "node:assert";

export class StoreManager {

    private instance = DbConnection.getInstance();
    private connection = this.instance.connectMongo();

    public async createStore(req, res) {
        const storeExist = await storeModel.findOne({ Email: req.body.Email })
        if (storeExist != null) {
            res.status(400).send({ message: 'Utilisateur déjà enregistré avec cet Email' })
        } else {
            const newStore = new storeModel({
                Name: req.body.Name,
                Email: req.body.Email,
                Panier: req.body.Panier
            })
            CryptPassword.hashPassword(req.body.Password, 10, (err, hash) => {
                if (err) {
                    res.send(err)
                } else {
                    newStore.Password = hash;
                    newStore.save((err, user) => {
                        if (err) {
                            res.send(err)
                        } else {
                            res.sendStatus(201)
                        }
                    })
                }
            })

        }
    }
    public async getAllStore(req, res) {
        const Stores = await storeModel.find({})
        const viewStores = []
        for (let store of Stores) {
            const viewStore = {
                Name: store.Name,
                Panier: store.Panier,
                Id: store._id
            }
            viewStores.push(viewStore)
        }
        res.status(200).send(viewStores)
    }


    public deleteStore(req, res) {
        const Stores = storeModel.findOne({ Email: req.body.Email })
        if (Stores == null) {
            res.status(400).send({ message: 'Magasin déjà supprimé' })
        } else {

            Stores.remove((err, Stores) => {
                if (err) {
                    res.send(err)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    }

    public async updateStore(req, res) {
        const reponsePositive = []
        const reponseNegative = []

        if (req.body.Email != undefined && req.body.Email != null) {
            const store = await storeModel.findOne({ Email: req.body.Email })
            if (store == null) {
                reponseNegative.push("le magasin n' existe pas")

            } else if (req.body.NewEmail != undefined && req.body.NewEmail != null && req.body.NewEmail != "") {
                await bcrypt.compare(req.body.Password, store.Password, (err, match) => {
                    if (err) {

                        reponseNegative.push("la comparaison a échoué")

                    } else if (match == true) {

                        store.updateOne({ Email: (req.body.NewMail) }, { new: true }, (err, newStore) => {
                            if (err) {

                                reponseNegative.push("la mise à jour à echouée")

                            } else {

                                reponsePositive.push("la mise à jour a bien été effectuée")

                            }
                        })
                    } else {
                        reponseNegative.push("la mise à jour ne peut etre effectué car les mots de passe ne correspondent pas")

                    }
                })
            }

            if (req.body.Name != null && req.body.NewName != null && req.body.Name != req.body.NewName && req.body.NewName != "") {
                store.updateOne({ Name: (req.body.NewName) }, { new: true }, (err, newStore) => {
                    if (err) {
                        reponseNegative.push("la mise à jour a échoué")

                    } else {
                        reponsePositive.push("la mise à jour a bien été effectuée")

                    }
                })

            } else {
                reponseNegative.push("la mise à jour a échoué")

            }
        } else {
            reponseNegative.push("un email est requis")
        }
            if (reponsePositive.length != 0 && reponseNegative.length != 0) {
                res.status(400).send("il ya eut des erreurs lors de la mise à jour")
            } else if (reponseNegative.length != 0 && reponsePositive.length == 0) {
                res.status(400).send("la mise à jour de tous les champs a échoué")
            } else if (reponsePositive.length != 0 && reponseNegative.length == 0) {
                res.status(200).send("la mise à jour s' est correctement déroulée")
            }

        }

    }
