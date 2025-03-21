import React, {useState} from 'react'
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
const RegisterViewModel = () => {
   // Define una variable de estado para el error
   const [errorMessage, setErrorMessage] = useState('');
   const [values, setValues] = useState({
     id: 0,
     name: '',
     lastname: '',
     phone: '',
     email: '',
     image: '',
     password: '',
     confirmPassword: ''
   });
 
   // Función para manejar el cambio de valores
   const onChange = (property: string, value: any) => {
     setValues({ ...values, [property]: value });
   };
 
   // Función para validar el formulario
   const isValiForm = (): boolean => {
     // Limpiar el mensaje de error antes de comenzar la validación
     setErrorMessage('');
 
     if (values.name === '') {
       setErrorMessage('El nombre es requerido');
       return false;
     }
     if (values.lastname === '') {
       setErrorMessage('El apellido es requerido');
       return false;
     }
     if (values.phone === '') {
       setErrorMessage('El telefono es requerido');
       return false;
     }
     if (values.email === '') {
       setErrorMessage('El correo es requerido');
       return false;
     }
     if (values.password === '') {
       setErrorMessage('La contraseña es requerida');
       return false;
     }
     if (values.confirmPassword === '') {
       setErrorMessage('La confirmación de contraseña es requerida');
       return false;
     }
     if (values.password !== values.confirmPassword) {
       setErrorMessage('Las contraseñas no coinciden');
       return false;
     }
 
     return true;
   };
 
   // Función para registrar al usuario
   const register = async () => {
     if (!isValiForm()) {
       return; // Detener la ejecución si el formulario no es válido
     }
 
     // Llamada al UseCase para registrar
     try {
       const response = await RegisterAuthUseCase(values);
       console.log('Result: ', JSON.stringify(response));
       // Aquí podrías manejar la respuesta, como redirigir al usuario
     } catch (error) {
       // Aquí podrías manejar cualquier error de la llamada a la API
       console.error('Error registering user:', error);
       setErrorMessage('Ocurrió un error al registrar el usuario');
     }
   };
 
   return {
     ...values,
     onChange,
     register,
     errorMessage
   };
 };
 
 export default RegisterViewModel;