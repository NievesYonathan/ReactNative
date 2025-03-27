import User from "../../../NodeJs/models/user";
import { User } from "../../Domain/entities/User";
import { UserLocalReporsitory } from "../../Domain/repositories/AuthRepository";
import { LocalStorage } from "./LocalStorage";

export class UserLocalReporsitoryImpl implements UserLocalReporsitory {
    async save(user: User): Promise<void> {
        const {save} = LocalStorage();
        await save('user', JSON.stringify(user));
    }

    async getUser(): Promise<User> {
        const {getItem } = LocalStorage();
        const data = await getItem('user');
        return user:User = JSON.parse(data as any);
    }

    async remove(): Promise<void> {
        const {remove} = LocalStorage();
        await remove('user');
    }
}