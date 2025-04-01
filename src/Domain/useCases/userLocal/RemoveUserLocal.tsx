import { UserLocalReporsitoryImpl } from "../../../Data/repositories/UserLocalRepositoy";
import { User } from "../../entities/User";
 
const { remove } = new UserLocalReporsitoryImpl ();

export const RemoveUserLocalUseCase = async () => {
    return await remove ();
}