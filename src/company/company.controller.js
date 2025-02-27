import ExcelJS from "exceljs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Company from "./company.model.js";
import { fstat } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const registerCompany = async (req, res) =>{
    try{
        const { yearFoundation, ...data} = req.body;
        
        const isoDate = new Date(yearFoundation);
        if (isNaN(isoDate.getTime())) {
            return res.status(400).json({
              success: false,
              msg: "Fecha inválida",
            });
        }

        const currentDate = new Date();
        const trayectoria = currentDate.getFullYear() - isoDate.getFullYear();

        const company = new Company({...data, yearFoundation: isoDate, trayectory: trayectoria })
        await company.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully registered company',
            company
        })
    }catch(error){
        return res.status(500).json({ 
            success: false, 
            messge: "Error registering the company", 
            error: error.message
        })
    }
}

export const getCompanies = async (req, res) =>{
    try{
        const companies = await Company.find();
        return res.status(200).json({
            success: true,
            total: companies.length,
            companies
        })
    }catch(error){
        return res.status(500).json({ 
            success: false, 
            messge: "Error getting companies", 
            error: error.message
        })
    }
}

export const getCompanyByPath = async (req, res) =>{
    try{
        const { trayectory } = req.params;

        const company = await Company.find({trayectory: trayectory});
        if(!company){
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            })
        }
        return res.status(200).json({
            success: true,
            total: company.length,
            company
        })
    }catch(error){
        return res.status(500).json({ 
            success: false, 
            messge: "Error getting company", 
            error: error.message
        })
    }   
}

export const getCompanyByCategory = async (req, res) =>{
    try{
        const { category } = req.params;

        const companies = await Company.find({category});
        if(!companies){
            return res.status(404).json({
                success: false,
                message: 'Companies not found'
            })
        }
        return res.status(200).json({
            success: true,
            total: companies.length,
            companies
        })
    }catch(error){
        return res.status(500).json({ 
            success: false, 
            messge: "Error getting companies", 
            error: error.message
        })
    }   
}

export const getCompanyByOrder = async (req, res) =>{
    try{
        const { order } = req.query;
        let letterSort = {};

        if(order === 'A-Z'){
            letterSort.nameCompany = 1;
        }else if(order === 'Z-A'){
            letterSort.nameCompany = -1;
        }

        const companies = await Company.find().sort(letterSort);
        return res.status(200).json({
            success: true,
            total: companies.length,
            companies
        })
    }catch(error){
        return res.status(500).json({ 
            success: false, 
            messge: "Error getting companies", 
            error: error.message
        })
    }
}    

export const updateCompany = async (req, res) =>{
    try{
        const { id } = req.params;
        const { yearFoundation, ...data} = req.body;
        
        let updateData = { ...data };

        if(yearFoundation){
            const isoDate = new Date(yearFoundation);
            if (isNaN(isoDate.getTime())) {
                return res.status(400).json({
                success: false,
                msg: "Fecha inválida",
                });
            }

            const currentDate = new Date();
            const trayectoria = currentDate.getFullYear() - isoDate.getFullYear();

            updateData.yearFoundation = isoDate;
            updateData.trayectory = trayectoria;
        }

        const company = await Company.findByIdAndUpdate(id, updateData, {new: true});
        if(!company){
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Company updated successfully',
            company
        })
    }catch(error){
        return res.status(500).json({ 
            success: false, 
            messge: "Error updating company", 
            error: error.message
        })
    }
}

export const generateReport = async (req, res) =>{
    try{
        const companies = await Company.find();

        if(companies.length === 0){
            return res.status(404).json({
                success: false,
                message: 'There are no companies to generate the report'
            })
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies Report');

        worksheet.columns = [
            { header: 'Name', key: 'nameCompany', width: 25 },
            { header: 'Description', key: 'descriptionCompany', width: 50 },
            { header: 'Address', key: 'addressCompany', width: 30 },
            { header: 'Phone', key: 'phoneCompany', width: 15 },
            { header: 'Email', key: 'emailCompany', width: 30 },
            { header: 'Impact Level', key: 'impactLevel', width: 15 },
            { header: 'Year Foundation', key: 'yearFoundation', width: 15 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Trayectory', key: 'trayectory', width: 15 },
        ]

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { 
                bold: true, 
                color: { argb: 'FFFFFF' },
                size: 12,
            }
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '1D16E5' }
            }
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        })

        companies.forEach(company => {
            worksheet.addRow({
                nameCompany: company.nameCompany,
                descriptionCompany: company.descriptionCompany,
                addressCompany: company.addressCompany,
                phoneCompany: company.phoneCompany,
                emailCompany: company.emailCompany,
                impactLevel: company.impactLevel,
                yearFoundation: company.yearFoundation,
                category: company.category,
                trayectory: company.trayectory
            })
        })

        const filePath = path.join(__dirname, `../../public/reports/companies-report-${Date.now()}.xlsx`);

        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            success: true,
            message: 'Report generated successfully',
            report: filePath
        })
    }catch(error){
        return res.status(500).json({ 
            success: false, 
            messge: "Error generating report", 
            error: error.message
        })
    }
}