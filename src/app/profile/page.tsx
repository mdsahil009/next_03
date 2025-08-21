'use client'
import React , { useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("nothing")
    const getUserDetails = async () => {
        const res = await axios.post("/api/users/about")
        console.log(res.data.data._id );
        setData(res.data._id)
    }
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout Success")
            router.push("/login")
        } catch (error : any ) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-amber-950">
            <h1> Profile page </h1>
            <hr />
            <h2> {data === "nothing" ? "Nothing" : <Link href ={`/profile/${data}`}> {data} </Link>}</h2>
            <hr/> 
            <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
            onClick={logout}> logout</button>

            <button className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded '
            onClick={getUserDetails}> get User detail</button>
        </div>
    )
}