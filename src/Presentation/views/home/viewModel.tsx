import { SaveUserLocalUseCase } from "../../../Domain/useCases/userLocal/SaveUserLocal";
import { GetUserLocalUseCase } from "../../../Domain/useCases/userLocal/GetUserLocal";
import React, {useEffect, useState} from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/Login.Auth";

const HomeViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setvalues] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        getUserSession();
    }, []);

    const getUserSession = async () => {
        const user = await GetUserLocalUseCase();
        console.log("Usuario Sesión: " + JSON.stringify(user));
    }

    const onChange = (property: string, value: any) => {
        setvalues({...values, [property]: value });
    };


    const login = async () => {
        if(isValiForm()) {
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('Result: ' + JSON.stringify(response));

            if(!response.success) {
                setErrorMessage(response.message);
            } else {
                await SaveUserLocalUseCase(response.data as any);
            }
        }
    }

    const isValiForm = () => {
        if(values.email === '') {
            setErrorMessage('El email es requerida.');
            return false;
        }

        if(values.password === '') {
            setErrorMessage('La contraseña es requerida.');
            return false;
        }

        return true;
    }

    return {
        ...values,
        onChange,
        login,
        errorMessage  
    }

};

export default HomeViewModel;