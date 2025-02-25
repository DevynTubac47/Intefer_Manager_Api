import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - nameCompany
 *         - descriptionCompany
 *         - addressCompany
 *         - phoneCompany
 *         - emailCompany
 *         - impactLevel
 *         - yearFoundation
 *         - category
 *       properties:
 *         nameCompany:
 *           type: string
 *           description: Nombre de la empresa.
 *           maxLength: 35
 *           example: "Empresa XYZ"
 *         descriptionCompany:
 *           type: string
 *           description: Descripción de la empresa.
 *           example: "Una empresa dedicada a la tecnología."
 *         addressCompany:
 *           type: string
 *           description: Dirección de la empresa.
 *           example: "Calle Falsa 123"
 *         phoneCompany:
 *           type: string
 *           description: Teléfono de la empresa.
 *           minLength: 8
 *           maxLength: 8
 *           example: "12345678"
 *         emailCompany:
 *           type: string
 *           description: Correo electrónico de la empresa.
 *           example: "contacto@empresa.com"
 *         impactLevel:
 *           type: string
 *           description: Nivel de impacto de la empresa.
 *           enum: ["HIGH", "MEDIUM", "LOW"]
 *           example: "HIGH"
 *         yearFoundation:
 *           type: string
 *           format: date
 *           description: Año de fundación de la empresa.
 *           example: "2000-01-01"
 *         category:
 *           type: string
 *           description: Categoría de la empresa.
 *           example: "Tecnología"
 *         trayectory:
 *           type: number
 *           description: Trayectoria de la empresa en años.
 *           example: 10
 */

const companySchema = Schema({
    nameCompany:{
        type: String,
        required: true,
        maxLength: [35, "Name cannot exceed 25 characters"],
        unique:true
    },
    descriptionCompany:{
        type: String,
        required: [true, "Description is required"],
    },
    addressCompany:{
        type: String,
        required: [true, "Address is required"]
    },
    phoneCompany:{
        type: String,
        required: [true, "Phone is required"],
        minLength: 8,
        maxLength: 8,
        unique: true
    },
    emailCompany:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    impactLevel:{
        type: String,
        required: true,
        enum: ["HIGH","MEDIUM","LOW"]
    },
    yearFoundation:{
        type: Date,
        required: true,
        set: (value) => {
            return new Date(value.getFullYear(), value.getMonth(), value.getDate());
        }
    },
    category:{
        type: String,
        required: true,
    },
    trayectory:{
        type: Number
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Company', companySchema);