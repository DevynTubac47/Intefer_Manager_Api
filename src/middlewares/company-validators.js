import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { companyExist } from "../helpers/db-validators.js";

export const registerCompanyValidator = [
    validateJWT,
    body("nameCompany").custom(companyExist),
    validarCampos,
    handleErrors
]

export const getCompanyByPathValidator = [
    param("path").isNumeric().withMessage("Trajectory must be a number"),
    validarCampos,
    handleErrors
]

export const getCompanyByCategoryValidator = [
    param("category").isString().withMessage("Category must be a string"),
    validarCampos,
    handleErrors
]

