import React, {useState} from 'react'
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
const RegisterViewModel = () => {
   // Define una variable de estado para el error
   const [errorMessage, setErrorMessage] = useState('');
  
   // Estado para almacenar mensajes de éxito
  const [successMessage, setSuccessMessage] = useState('');
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

 // Función para resetear el formulario a valores vacíos
 const resetForm = () => {
  setValues({
    id: 0,
    name: '',
    lastname: '',
    phone: '',
    email: '',
    image: '',
    password: '',
    confirmPassword: ''
  });
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
 
   const register = async () => {
    if (!isValiForm()) {
      return;
    }

    try {
      // Llama al caso de uso para registrar el usuario
      const response = await RegisterAuthUseCase(values);
      console.log('Result: ', JSON.stringify(response));
      
      // Si el registro fue exitoso
      if (response.success) {
        // Establece mensaje de éxito
        setSuccessMessage('Usuario registrado con éxito!');
        // Limpia el formulario
        resetForm();
      } else {
        // Establece mensaje de error si la API lo devuelve
        setErrorMessage(response.message);
      }
    } catch (error) {
      // Manejo de errores de la petición
      console.error('Error registering user:', error);
      setErrorMessage('Ocurrió un error al registrar el usuario');
    }
  };

 
  return {
    ...values,
    onChange,
    register,
    errorMessage,
    successMessage, // Mensaje de éxito
    resetForm  // Función para limpiar el formulario
  };
 };
 
 export default RegisterViewModel;