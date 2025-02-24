import { Router } from "express";
import { getCompanies, getCompanyByCategory, getCompanyByOrder, getCompanyByPath, registerCompany } from "./company.controller.js";
import { getCompanyByCategoryValidator, getCompanyByPathValidator, registerCompanyValidator } from "../middlewares/company-validators.js";

const router = Router();

router.post("/registerCompany", registerCompanyValidator,registerCompany);
router.get("/companies", getCompanies);
router.get("/companiesByTrayectory/:path", getCompanyByPathValidator,getCompanyByPath);
router.get("/companiesByCategory/:category", getCompanyByCategoryValidator,getCompanyByCategory);
router.get("/companies/order", getCompanyByOrder)

export default router;
