"use client"

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { loginAction } from "./action";

const Form = () => {

    const [state , action] = useActionState(loginAction , undefined)

    return (<>
        <form className="flex flex-col gap-2 p-2 items-center border-2 rounded-md border-slate-200 w-[400px] justify-center" action={action}>
            <h1 className="text-[30px]">Login</h1>
            <label className="flex-col w-[100%] gap-2">
                <h3>Email</h3>
                <input name="email" className="flex p-2 rounded-md w-[100%] border-2 border-slate-200" type="email" />
                <p className="text-red-600">{state?.message?.email}</p>
            </label>
            <label className="flex-col w-[100%] gap-2">
                <h3>Password</h3>
                <input name="password" className="flex p-2 rounded-md w-[100%] border-2 border-slate-200" type="password" />
                <p className="text-red-600">{state?.message.password}</p>
            </label>
            <SubmitButton/>
        </form>
    </>);
}

const SubmitButton = () => {
    const {pending} = useFormStatus()
    return <button disabled={pending} type="submit" className="w-full hover:bg-blue-900 transition p-2 rounded-md bg-blue-500 text-white">{pending ? "Pending..." : "Submit"}</button>
}
 
export default Form;