'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast';


import type { Database } from '@/lib/database.types'
import clsx from 'clsx';

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    const [signInLoading, setSignInLoading] = useState(false)
    const [signUpLoading, setSignUpLoading] = useState(false)

    const handleSignUp = async () => {
        try {
            setSignUpLoading(true)
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: 'George Millanzi',
                        age: 27,
                    },
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })
            if (error) {
                console.log("error occured")
                console.log(error)
                toast.error(JSON.stringify(error))
                return
            }

            toast.success('Successfully signned up in. You can now sign in!')
            router.refresh()
        }
        catch (e) {

        }
        finally {
            setSignUpLoading(false)
        }

    }

    const handleSignIn = async () => {

        try {
            setSignInLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                console.log("error occured")
                console.log(error)
                toast.error(JSON.stringify(error))
                return
            }
            toast.success('Successfully signed in..Redirecting!')
            router.refresh()
        }
        catch (e) {

        }
        finally {
            setSignInLoading(false)
        }

    }

    return (
        <div className="h-screen bg-[#f5f5f5] flex items-center justify-center">
            <div className="bg-white w-[420px]  mx-auto border border-[#cecece] p-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" onChange={(e) => setEmail(e.target.value)} value={email}
                        className="py-3 px-4 block w-full bg-gray-200 border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    />
                </div>
                <div className='mt-2'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='py-3 px-4 block w-full bg-gray-200 border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
                    />
                </div>
                <div className="mt-4 space-x-2">

                    <button onClick={handleSignIn} className={
                        clsx(
                            "bg-blue-700 text-white px-6 py-2",
                            signInLoading && "cursor-not-allowed bg-blue-400"
                        )
                    }>
                        {
                            signInLoading ?
                                <>
                                    Signing in ...
                                </>
                                :
                                <>
                                    Sign in
                                </>
                        }
                    </button>

                    <button onClick={handleSignUp} className={
                        clsx(
                            "bg-blue-700 text-white px-6 py-2",
                            signUpLoading && "cursor-not-allowed bg-blue-400"
                        )
                    }>
                        {
                            signUpLoading ?
                                <>
                                    Signing up ...
                                </>
                                :
                                <>
                                    Sign up
                                </>
                        }

                    </button>

                </div>

            </div>

        </div>

    )
}