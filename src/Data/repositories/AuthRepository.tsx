import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResposeApiDelivery } from "../sources/remote/models/ResponseApiDelivery";

export class AuthRepositoryImpl implements AuthRepository {
    async register(user: User) {
        try {
            const response = await ApiDelivery.post('/users/create', user);

            return Promise.resolve({error: undefined, result: response.data})

        } catch (error) {
            let e = (error as Error).message;
            console.log('error' + e);
            return Promise.resolve({success: false, error: e, result: undefined});
        }
    }
}