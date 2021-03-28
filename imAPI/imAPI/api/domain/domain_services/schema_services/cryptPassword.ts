/**
 * Subject : Contains methods for data encryption
 * Author : Laura Fialdès
 * Date : 26/02/2021
 */

import { ClientSchema } from "../../schema/clientSchema";
import * as bcrypt from "bcrypt";

export class CryptPassword {
    public static hashPassword(password: string, rounds: number, callback: (error: Error, hash: string) => void) : void {
        bcrypt.hash(password, rounds, (error, hash) => {
            callback(error, hash);
        });
    }
    public static compare(password: string, dbHash: string, callback: (error: string | null, match: boolean | null) => void) {
        bcrypt.compare(password, dbHash, (err: Error, match: boolean) => {
            if(match) {
                // passwords match
                callback(null, true);
            } else {
                // passwords do not match
                callback('Invalid password match', null);
            }
        });
    }
}