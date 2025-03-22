import { motion } from "framer-motion";
import { useEffect } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { logged } from '../utils/context/reducers/authSlice';
import { initialValues, validationSchema } from '../utils/validation/loginValidation';
import { postLogin } from '../services/api/user/apiMethods';
import { Button } from "../components/ui/button";

export default function LoginPage() {
  const user = useSelector((state: any) => state.auth.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (values: any) => {
    postLogin(values)
      .then((response: any) => {
        const data = response.data;
        console.log(data);
        if (response.status === 200) {
          toast.success(data.message);
          dispatch(logged({ user: data, token: data.user.accessToken }));
          localStorage.setItem('userToken', data.user.accessToken);
          navigate('/home');
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center">
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-[#ff9800]">Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <div className="mx-auto max-w-xs">
                <div className="mb-4">
                  <Field
                    as="input"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg font-medium bg-gray-200 border border-gray-400 text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-500"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="mb-6">
                  <Field
                    as="input"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg font-medium bg-gray-200 border border-gray-400 text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-500"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <motion.div
                  className="flex justify-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
                    Sign In
                  </Button>
                </motion.div>
              </div>
            </Form>
          )}
        </Formik>
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >

          <span className="text-sm text-gray-300">Forgot your password? </span>
          <a href="/resetemail" className="text-orange-400 hover:underline font-semibold">reset</a><br></br>

          <span className="text-sm text-gray-300">Don't have an account? </span>
          <a href="/signup" className="text-orange-400 hover:underline font-semibold">Sign Up</a>

        </motion.div>
      </motion.div>
    </div>
  );
}
