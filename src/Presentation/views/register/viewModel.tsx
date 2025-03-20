import React, {useState} from 'react'
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
const RegisterViewModel = () =>{
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

     const onChange = (property: string, value: any) => {
           setValues({...values, [property]: value});
     }

     const register = async () => {
         const response = await RegisterAuthUseCase(values);
            console.log('result' + JSON.stringify(response));
     }

  return {
   ...values,
   onChange,
   register
   
  }
}

export default RegisterViewModel;
