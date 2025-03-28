import { UserLocalReporsitoryImpl } from "../../../Data/repositories/UserLocalRepositoy";

const { getUser } = new UserLocalReporsitoryImpl();

export const GetUserLocalUseCase = async () => {
    return await getUser();
};