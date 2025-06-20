"use client"

import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';


const page = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [showpassword, setShowpassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleLogin = async(data:any)=>{
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='w-full md:w-[500px] min-h-[300px] bg-white shadow rounded-lg text-black p-8 flex flex-col justify-between'>
        {/*  */}
        <div className='my-4'>
            <h4 className='text-4xl'>Forgot password</h4>
            <p className='text-sm text-gray-400 my-2'>Enter your email and reset your password</p>
        </div>
        <form className='space-y-4' onSubmit={handleSubmit(handleLogin)}>
            {/* user credentials */}
            <div>
                <input type="email" placeholder='Email address' className='p-2 px-6 rounded-lg bg-gray-50 border w-full' {...register("email", {required:"Please enter your email"})}/>
                {errors.email && <span className='text-xs text-red-500'>{errors?.email?.message?.toString()}</span>}
            </div>
            

            {/* Submit button */}
            <div>
                {
                    isSubmitting ? 
                    <button className='w-full text-sm cursor-pointer text-white p-2 rounded-full hover:bg-black/50 transition-all' disabled={isSubmitting}>
                        <span>Login in</span>
                    </button>
                    :
                    <div className='flex items-center gap-2'>
                        <button className='w-full text-sm bg-black cursor-pointer text-white p-2 rounded-full hover:bg-black/50 transition-all'>Send mail</button>
                    </div>

                }
                <div>
                    <p className='text-xs my-2 text-center'>Already have an account ? <Link href="/auth/login" className='text-black/75 hover:underline transition-all'>Sign in / Sign up</Link></p>
                </div>
            </div>
        </form>
        <div>
            
        </div>
    </div>
  )
}

export default page