import { verify,hash } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const addAdminDefault = async() => {
    const admin = await User.findOne({ role: "ADMIN_ROLE"})
    if(!admin) {
        await User.create({
            username: "Admin",
            email: "admin@gmail.com",
            password: await hash("123456789"),
            role: "ADMIN_ROLE",
        })
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        })
    }
}