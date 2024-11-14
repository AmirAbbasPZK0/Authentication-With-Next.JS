// do not use crypto or the libraries that are using it in Next JS

import { SignJWT , jwtVerify} from "jose";

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY as string);

type Data = {
    email : string
}

export const generateToken = async (data : Data) => {
    const token = await new SignJWT({...data})
    .setProtectedHeader({alg : "HS256"})
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER as string)
    .setAudience(process.env.JWT_AUDIENCE as string)
    .setExpirationTime("24h")
    .sign(secretKey)
    return token
}

export const verifyToken = async (token : string) => {
    try {
        const { payload } = await jwtVerify(token, secretKey, {
            issuer: process.env.JWT_ISSUER, // issuer
            audience: process.env.JWT_AUDIENCE, // audience
        });
        // log values to console
        return payload
    } catch (e) {
        // token verification failed
        console.log(e);
    }

    
}