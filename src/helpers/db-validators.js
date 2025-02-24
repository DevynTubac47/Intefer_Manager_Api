import Company from "../company/company.model.js";

export const companyExist = async (nameCompany) => {
    const existe = await Company.findOne({ nameCompany });
    if (existe) {
        throw new Error(`The Company ${nameCompany} is already registered`);
    }
}  