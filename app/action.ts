"use server"

import { generateToken } from "@/configs/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

const userData = {
    email : "test@gmail.com",
    password : "12345678"
}

const UserFilter = z.object({
    email : z.string().email(),
    password : z.string()
})

export async function loginAction(prevState : any , formData : FormData){
    
    const result = UserFilter.safeParse(Object.fromEntries(formData))
    
    if(result.data?.email !== userData.email || result.data?.password !== userData.password){
        return {
            message : {
                email : "Email Or Password is not Correct! Please Try Again.",
                password : "Email Or Password is not Correct! Please Try Again."
            }
        }
    }

    const token = await generateToken({email : result.data.email});

    (await cookies()).set('token' , token , {maxAge : 60 * 60 * 60 * 24 , path : "/" , httpOnly : true})

    redirect("/dashboard")

}