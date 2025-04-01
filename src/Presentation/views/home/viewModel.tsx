import { SaveUserLocalUseCase } from "../../../Domain/useCases/userLocal/SaveUserLocal";
import { GetUserLocalUseCase } from "../../../Domain/useCases/userLocal/GetUserLocal";
import React, {useEffect, useState} from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/Login.Auth";
import { Alert } from "react-native";
import { useUserLocal } from "../../hooks/useUserLocal";



const HomeViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    // Estado para mensajes de éxito
    const [successMessage, setSuccessMessage] = useState('');
    const [values, setvalues] = useState({
        email: '',
        password: ''
    });

    const { user, getUserSession } = useUserLocal();
    console.log("Usuario: " + JSON.stringify(user));

    useEffect(() => {
        getUserSession();
    }, []);


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

        //getUserSession ();


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
        user,
        onChange,
        login,
        errorMessage,  // Mensaje de error
        successMessage,  // Mensaje de éxito
        resetForm
    }

};

export default HomeViewModel;