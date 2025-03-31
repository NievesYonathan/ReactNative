import { SaveUserLocalUseCase } from "../../../Domain/useCases/userLocal/SaveUserLocal";
import { GetUserLocalUseCase } from "../../../Domain/useCases/userLocal/GetUserLocal";
import React, {useEffect, useState} from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/Login.Auth";

const HomeViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    // Estado para mensajes de éxito
    const [successMessage, setSuccessMessage] = useState('');
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

    // Función para limpiar el formulario
    const resetForm = () => {
        setvalues({
            email: '',
            password: ''
        });
    };


    const login = async () => {
        if(isValiForm()) {
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('Result: ' + JSON.stringify(response));

            if(!response.success) {
                setErrorMessage(response.message);
            } else {
                await SaveUserLocalUseCase(response.data as any);
                setSuccessMessage('Sesión iniciada correctamente!');
                // Limpia el formulario
                resetForm();
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
        errorMessage,  // Mensaje de error
        successMessage,  // Mensaje de éxito
        resetForm
    }

};

export default HomeViewModel;