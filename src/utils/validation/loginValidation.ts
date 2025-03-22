import * as Yup from 'yup'


export interface FormValues{

    email:string,
    password:string

}

export const initialValues:FormValues={

    email:'',
    password:''


}

export const validationSchema = Yup.object({
    email: Yup.string().trim() .email('Invalid email address').required('Email is required'),
    password: Yup.string().trim().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });