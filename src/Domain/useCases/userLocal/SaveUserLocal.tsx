import { UserLocalReporsitoryImpl } from "../../../Data/repositories/UserLocalRepositoy";

import { User } from "../../entities/User";

const {save} = new UserLocalReporsitoryImpl();

export const SaveUserLocalUseCase = async (user: User) => {
    return await save(user);
}