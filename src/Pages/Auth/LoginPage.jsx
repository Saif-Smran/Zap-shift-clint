import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { login, googleLogin } = UseAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await login(data.email, data.password);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back!',
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email address.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.';
            }
            
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
                confirmButtonColor: '#3085d6'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleLogin();
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back!',
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/');
        } catch (error) {
            console.error('Google login error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: 'Failed to login with Google. Please try again.',
                confirmButtonColor: '#3085d6'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="mb-6 text-sm text-gray-500">Login with Profast</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                            },
                        })}
                        className="input input-bordered w-full"
                        disabled={loading}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        className="input input-bordered w-full"
                        disabled={loading}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div className="text-right">
                    <a href="#" className="text-sm text-primary underline">
                        Forget Password?
                    </a>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary w-full bg-lime-400 border-none text-black hover:bg-lime-500"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>

            <p className="mt-4 text-sm">
                Don't have any account?{' '}
                <Link to='/auth/register' className="text-primary underline">
                    Register
                </Link>
            </p>

            <div className="divider">OR</div>

            <button 
                className="btn btn-outline w-full"
                onClick={handleGoogleLogin}
                disabled={loading}
            >
                {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                ) : (
                    <>
                        <FcGoogle className="text-xl mr-2" />
                        Login with Google
                    </>
                )}
            </button>
        </div>
    );
};

export default LoginPage;
