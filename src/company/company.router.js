import { Router } from "express";
import { generateReport, getCompanies, getCompanyByCategory, getCompanyByOrder, getCompanyByPath, registerCompany, updateCompany } from "./company.controller.js";
import { getCompanyByCategoryValidator, getCompanyByPathValidator, registerCompanyValidator, updateCompanyValidator } from "../middlewares/company-validators.js";

const router = Router();

router.post("/registerCompany", registerCompanyValidator,registerCompany);
router.get("/companies", getCompanies);
router.get("/companiesByTrayectory/:path", getCompanyByPathValidator,getCompanyByPath);
router.get("/companiesByCategory/:category", getCompanyByCategoryValidator,getCompanyByCategory);
router.get("/companies/order", getCompanyByOrder)
router.put("/updateCompany/:id", updateCompanyValidator, updateCompany);
router.get("/companies/report", generateReport);

export default router;
