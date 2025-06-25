"use client"

import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
// import { useRouter, useSearchParams } from 'next/navigation';

const page = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [showpassword, setShowpassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const router = useRouter();
    // const searchParams = useSearchParams();

    const handleLogin = async(data:any)=>{
        try {
            setIsSubmitting(true);
            console.log(data);
            // ... existing login logic ...
            // On successful login:
            // const redirect = searchParams.get('redirect');
            // if (redirect) {
            //     router.replace(redirect);
            // } else {
            //     router.replace('/');
            // }
        } catch (error) {
            console.log(error);
        }finally{
            setIsSubmitting(false);
        }
    }


  return (
    <div className='w-full md:w-[500px] min-h-[300px] bg-white shadow rounded-lg text-black p-8 flex flex-col justify-between'>
        {/*  */}
        <div className='my-4'>
            <h4 className='text-4xl'>Sign in</h4>
            <p className='text-sm text-gray-400 my-2'>Connect to an existing account</p>
        </div>
        <form className='space-y-4' onSubmit={handleSubmit(handleLogin)}>
            {/* user credentials */}
            <div>
                <input type="text" placeholder='Username or email' className='p-2 px-6 rounded-lg bg-gray-50 border w-full' {...register("credential", {required:"Please enter your username or email"})}/>
                {errors.credential && <span className='text-xs text-red-500'>{errors?.credential?.message?.toString()}</span>}
            </div>
            {/* User password */}
            <div>
                <div className='relative flex items-center'>
                    {
                        showpassword ? <Eye className='text-md absolute h-4 right-1' onClick={()=>setShowpassword(false)} />: <EyeClosed className='text-md absolute h-4 right-1' onClick={()=>setShowpassword(true)}/>
                    }
                    <input type={showpassword ? "text" :"password"} placeholder='Password' className='p-2 px-6 rounded-lg bg-gray-50 border w-full' {...register("password", {required:"Please enter your password"})}/>
                </div>
                {errors.password && <span className='text-xs text-red-500'>{errors?.password?.message?.toString()}</span>}
            </div>
            {/* forgot password */}
            <div className='flex justify-end'>
                <Link href="/auth/forgot-password" className='text-black text-xs'>Forgot password</Link>
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
                        <button className='w-full text-sm bg-black cursor-pointer text-white p-2 rounded-full hover:bg-black/50 transition-all'>Se connecter</button>
                    </div>

                }
                <div>
                    <p className='text-xs my-2 text-center'>Don't have an account ? <Link href="/auth/sign-up" className='text-black/75 hover:underline transition-all'>Sign up</Link></p>
                </div>
            </div>
        </form>
        <div>
            <hr className='my-2'/>
            <button className='flex items-center gap-2 w-full'>
                <span>Connect with google</span>
            </button>
        </div>
    </div>
  )
}

export default page