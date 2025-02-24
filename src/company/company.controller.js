import Company from "./company.model.js";

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

        const company = new Company({...data, yearFoundation: isoDate, path: trayectoria })
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
        const { path } = req.params;

        const company = await Company.find({path});
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
