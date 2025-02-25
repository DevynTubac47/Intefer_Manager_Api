import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario.
 *           example: "usuario123"
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario.
 *           example: "usuario@example.com"
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *           example: "contraseña123"
 *         role:
 *           type: string
 *           description: Rol del usuario.
 *           example: "ADMIN_ROLE"
 *       example:
 *         username: "usuario123"
 *         email: "usuario@example.com"
 *         password: "contraseña123"
 *         role: "ADMIN_ROLE"
 */

const userSchema = Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    role:{
        type: String,
        required: true,
        default:'ADMIN_ROLE'
    }, 
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)