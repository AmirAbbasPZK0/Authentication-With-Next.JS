import { NextResponse , NextRequest } from "next/server";
import { verifyToken } from "./configs/auth";


const publicRoutes = ["/" , "/signup"]
const privateRoutes = ['/dashboard']

export async function middleware(req : NextRequest){

    const token = req.cookies.get("token")?.value

    const isValid = await verifyToken(token!)

    const isInPrivateRoute = privateRoutes.includes(req.nextUrl.pathname)
    const isInPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

    if(isInPrivateRoute && !isValid){
        return NextResponse.redirect(new URL('/login' , req.nextUrl))
    }

    if(isInPublicRoute && isValid){
        return NextResponse.redirect(new URL('/dashboard' , req.nextUrl))
    }

    return NextResponse.next()
}