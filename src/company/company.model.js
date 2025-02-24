import { Schema, model } from "mongoose";

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
        required: true
    },
    category:{
        
    },
    path:{
        type: Number
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Company', companySchema);