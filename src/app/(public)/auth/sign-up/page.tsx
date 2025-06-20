"use client"
import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import { Eye, EyeClosed } from 'lucide-react';

interface PersonalInfo {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    country: string;
    countryCode: string;
}

interface AccountInfo {
    email: string;
    password: string;
    confirmPassword: string;
}

const page = () => {
    const [step, setStep] = useState(1);

    return (
        <div className='w-full md:w-[500px]  bg-white shadow rounded-lg text-black p-8 flex flex-col justify-between'>
            <div className='my-4'>
                <h4 className='text-4xl'>Sign up</h4>
                <p className='text-sm text-gray-400 my-2'>Enter all required information (<span className='text-red-500'>*</span>)</p>
            </div>
            {
                step === 1 ?
                <PersonalInfoForm onNext={() => setStep(2)} />:
                step === 2 &&
                <AccountInformation onBack={() => setStep(1)} />
            }
        </div>
    )
}

export default page

const PersonalInfoForm = ({ onNext }: { onNext: () => void }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfo>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: PersonalInfo) => {
        setIsSubmitting(true);
        try {
            console.log(data);
            onNext();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="First Name *"
                        className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                        {...register("firstName", { required: "First name is required" })}
                    />
                    {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Last Name *"
                        className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                        {...register("lastName", { required: "Last name is required" })}
                    />
                    {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
                </div>
            </div>

            <div>
                <input
                    type="tel"
                    placeholder="Phone Number *"
                    className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                    {...register("phoneNumber", { required: "Phone number is required" })}
                />
                {errors.phoneNumber && <span className="text-xs text-red-500">{errors.phoneNumber.message}</span>}
            </div>

            <div>
                <input
                    type="date"
                    className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                    {...register("dateOfBirth", { required: "Date of birth is required" })}
                />
                {errors.dateOfBirth && <span className="text-xs text-red-500">{errors.dateOfBirth.message}</span>}
            </div>

            <div>
                <select
                    className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                    {...register("gender", { required: "Gender is required" })}
                >
                    <option value="">Select Gender *</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <span className="text-xs text-red-500">{errors.gender.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Country *"
                        className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                        {...register("country", { required: "Country is required" })}
                    />
                    {errors.country && <span className="text-xs text-red-500">{errors.country.message}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Country Code *"
                        className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                        {...register("countryCode", { required: "Country code is required" })}
                    />
                    {errors.countryCode && <span className="text-xs text-red-500">{errors.countryCode.message}</span>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white p-2 rounded-lg hover:bg-black/50 transition-all"
            >
                {isSubmitting ? "Processing..." : "Next"}
            </button>
        </form>
    );
};

const AccountInformation = ({ onBack }: { onBack: () => void }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<AccountInfo>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const password = watch("password");

    const onSubmit = async (data: AccountInfo) => {
        setIsSubmitting(true);
        try {
            console.log(data);
            // Handle registration logic here
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    type="email"
                    placeholder="Email Address *"
                    className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password *"
                    className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                        }
                    })}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    {showPassword ? <Eye className="h-4" /> : <EyeClosed className="h-4" />}
                </button>
                {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>

            <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password *"
                    className="p-2 px-4 rounded-lg bg-gray-50 border w-full"
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                    })}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    {showConfirmPassword ? <Eye className="h-4" /> : <EyeClosed className="h-4" />}
                </button>
                {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>}
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="w-full border border-black text-black p-2 rounded-lg hover:bg-gray-50 transition-all"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white p-2 rounded-lg hover:bg-black/50 transition-all"
                >
                    {isSubmitting ? "Processing..." : "Sign Up"}
                </button>
            </div>
        </form>
    );
};