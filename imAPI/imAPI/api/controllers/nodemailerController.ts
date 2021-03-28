import {SendMail} from "../domain/domain_services/config/nodemailer"

export class nodemailerController{
   
    nodemailer : SendMail = new SendMail ();

}