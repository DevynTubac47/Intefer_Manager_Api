import Company from "./company.model.js";
import { parse } from  "date-fns";

export const registerCompany = async (req, res) =>{
    try{
        const { yearFoundation, ...data} = req.body;
        
        const isoDate = new Date(date);
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

        })
    }catch(error){
        return res.status(500).json({ 
            success: false, 
            msg: "Error registering the company", 
            error 
        })
    }
}