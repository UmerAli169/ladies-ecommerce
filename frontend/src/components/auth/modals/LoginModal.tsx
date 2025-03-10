

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { AuthModal } from '../common/AuthModal';
import { AuthForm } from '../formick/AuthForm';
import { AuthInput } from '../../shared/Input';
import { AuthButton } from '../common/AuthButton';
import { GoogleButton } from '../common/GoogleButton';
import { OrDivider } from '../common/OrDivider';
import { useAuthStore } from '@/store/authStore';
import { login } from '@/services/internal';
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecoverPassword: () => void;
  onCreateAccount: () => void;
}

export const LoginModal = ({ isOpen, onClose, onRecoverPassword, onCreateAccount }: LoginModalProps) => {
  const [loginError, setLoginError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (values: Record<string, string>, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const userData = await login(values); 
      setUser(userData); 
      onClose();
    } catch (error: any) {
      setLoginError(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title="Log In" heading="Please enter your e-mail and password:">
      <AuthForm
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address").required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={handleLogin}
      >
        {loginError && <div className="error">{loginError}</div>}
        <AuthInput type="email" name="email" placeholder="Email" required />
        <AuthInput type="password" name="password" placeholder="Password" required />
        <AuthButton type="submit">Log In</AuthButton>
        <OrDivider />
        <GoogleButton />
      </AuthForm>
      <div className='text-center  py-[20px] md:text-[16px] text-[14px] text-[#697586] font-medium'>
          <button type='button' onClick={onRecoverPassword}>
            Forgot your password? <span className='underline'> Recover password </span>
          </button>
        </div>

        <div className='text-center   md:text-[16px] text-[14px]  text-[#697586] font-medium'>
          New to Bloom Beauty?{' '}
          <button type='button' onClick={onCreateAccount} className='underline'>
            Create an Account
          </button>
        </div>
    </AuthModal>
    
  );
};



      
      