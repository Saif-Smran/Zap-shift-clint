import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const { CreatUser, googleLogin, updateUser } = UseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const photo = watch('photo');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Create user with email and password
      const userCredential = await CreatUser(data.email, data.password);
      const user = userCredential.user;

      // Update user profile with name and photo if provided
      const updateData = { displayName: data.name };

      if (data.photo && data.photo[0]) {
        // Here you would typically upload the photo to storage and get the URL
        // For now, we'll just update the display name
        console.log('Photo file:', data.photo[0]);
      }

      await updateUser(updateData);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created successfully!',
        timer: 2000,
        showConfirmButton: false
      });

      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password accounts are not enabled.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await googleLogin();
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created successfully!',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/');
    } catch (error) {
      console.error('Google registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Google Registration Failed',
        text: 'Failed to register with Google. Please try again.',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please select an image file.',
          confirmButtonColor: '#3085d6'
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Please select an image smaller than 5MB.',
          confirmButtonColor: '#3085d6'
        });
        return;
      }

      setValue('photo', e.target.files, { shouldValidate: true });
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md p-10 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
        <p className="mb-6 text-sm text-gray-500">Register with Profast</p>

        {/* Photo Upload with Preview + Hidden Input */}
        <div className="flex justify-center mb-4 relative">
          <div onClick={handleAvatarClick} className="relative cursor-pointer">
            {photo && photo[0] ? (
              <img
                src={URL.createObjectURL(photo[0])}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <FaUserCircle className="w-20 h-20 text-gray-300" />
            )}

            <div className="absolute bottom-0 right-0 bg-lime-400 p-1 rounded-full">
              <FaPlus className="text-white text-xs" />
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            {...register('photo')}
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {errors.photo && (
          <p className="text-red-500 text-sm text-center mb-4">{errors.photo.message}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
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
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
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


          <button
            type="submit"
            className="btn w-full bg-lime-400 text-black border-none hover:bg-lime-500"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-primary underline">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>

        <button
          className="btn btn-outline w-full"
          onClick={handleGoogleRegister}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              <FcGoogle className="text-xl mr-2" />
              Register with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Register;
