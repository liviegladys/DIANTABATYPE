import clientModel from "../models/clientModel";
import { DbConnection } from "../../Data/dbConnection";
import { CryptPassword } from "../schema_services/cryptPassword";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class ClientManager {

  private instance = DbConnection.getInstance();
  private connection = this.instance.connectMongo();

  /*
   * Creation new client
  */

  public async createClient(req, res) {
    const clientExist = await clientModel.findOne({ Email: req.body.Email })
    if (clientExist != null) {
      res.status(400).send({ message: 'Utilisateur déjà enregistré avec cet Email' })
    } else {
      const newClient = new clientModel({
        Name: req.body.Name,
        FirstName: req.body.FirstName,
        Email: req.body.Email,
        Panier: req.body.Panier
      })
      CryptPassword.hashPassword(req.body.Password, 10, (err, hash) => {
        if (err) {
          res.send(err)
        } else {
          newClient.Password = hash;
          newClient.save((err, user) => {
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

  /*
  * Get all clients in array
  */

  public async getAllClient(req, res) {
    const Clients = await clientModel.find({})
    const viewClients = []
    for (let client of Clients) {
      const viewClient = {
        Name: client.Name,
        FirstName: client.FirstName,
        Email: client.Email,
        Panier: client.Panier,
        Id: client._id
      }
      viewClients.push(viewClient)
    }
    res.status(200).send(viewClients)
  }

  /**
   * Login client
   */

  public async login(req, res) {
    console.log(req.body)
    if (req.body.Email) {
      const clientByEmail = await clientModel.findOne({ Email: req.body.Email });
      if (clientByEmail != undefined) {
        if (req.body.Password) {
          await bcrypt.compare(req.body.Password, clientByEmail.Password, (err, same) => {
            if (err) {
              res.status(500).send({ message: "Une erreur est survenue, veuillez vérifier que tous les champs sont correctement remplis. Si l'erreur persiste, veuillez contacter votre administrateur" });
            } else if (same) {
              const token = jwt.sign(clientByEmail._id.toJSON(), process.env.SECRET_TOKEN_ACCESS);
              res.status(200).send({ accessToken: token });
            } else {
              res.status(400).send({ message: "La comparaison de mot de passe a échoué, êtes vous sûr d'avoir rentré le bon ?" });
            }
          })
        } else {
          res.status(400).send({ message: "Veuillez entrer un mot de passe" });
        }
      } else {
        res.status(401).send({ message: "Pas d'utilisateur connu avec cette adresse mail" });
      }
    }
  }



  public deleteClient(req, res) {
    const Client = clientModel.findOne({ Email: req.body.Email })
    if (Client == null) {
      res.status(400).send({ message: "L'utilisateur n'existe pas" })
    } else {
      Client.deleteOne((err, Clients) => {
        if (err) {
          res.send(err)
        } else {
          res.status(200).send('Utilisateur supprimé avec succés')
        }
      })
    }
  }

  async verifToken(req, res, next) {
    const headerAuth = await req.header('Authorization');
    const token = await headerAuth && headerAuth.split(' ')[1]
    console.log(token)
    if (token == undefined || token == '' || token == null) {
      res.status(401).send({ message: 'Une authentification est nécessaire' })
    } else {
      jwt.verify(token, process.env.SECRET_TOKEN_ACCESS, async (err, user) => {
        if (err) {
          res.status(500).send({ message: "Une erreur est survenue, veuillez réessayer ultérieurement. Si l'erreur persiste, veuillez contacter votre administrateur" });
        } else {
          const connectedUser = await clientModel.findById(user)
          req.user = connectedUser;
          next();
        }
      })
    }
  }

  public async updateClientPassword(req, res) {
    const client = await clientModel.findById(req.user._id)
    if (req.body.NewPass != null && req.body.NewPass != undefined && req.body.NewPass.trim().length != 0) {
      if (req.body.Password != null && req.body.NewPass != req.body.Password) {
        await bcrypt.compare(req.body.Password, client.Password, async (err, same) => {
          if (err) {
            res.status(500).send({ message: "Une erreur est survenue lors de la vérification de votre mot de passe" })
          } else if (!same) {
            res.status(400).send({ message: "Une erreur est survenue lors de la comparaison des mots de passe. Avez vous bien entré votre mot de passe actuel?" })
          } else {
            if (req.body.NewPass) {
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(req.body.NewPass, salt);
              await client.set("Password", hash)
              client.save((err, user) => {
                if (err) {
                  res.status(500).send({ message: 'Une erreur est survenue lors de la mise à jour.' })
                } else {
                  res.status(200).send({ message: "Votre mot de passe a bien été mis à jour" })
                }
              })
            } else {
              res.status(400).send({ message: 'Le mot de passe doit contenir 8 charactères, une majuscule, un chiffre et un caractère spécial' })
            }
          }
        })
      } else {
        res.status(400).send({ message: "Veuillez entrer votre mot de passe actuel" })
      }
    } else {
      res.status(400).send({ message: "Un nouveau mot de passe est requis pour la mise à jour!" })
    }

  }
  
  public async getClientById(req,res){
    const client = await clientModel.findById(req.user._id)
    if (client != null && client != undefined) {
      res.status(200).send(client)
    } else {
      res.status(400).send({ message: "Pas d'utilisateur trouvé" })
    }
  }




}









