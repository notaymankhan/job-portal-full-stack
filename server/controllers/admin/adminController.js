import Job from '../../models/Job.js';
import Company from '../../models/Company.js';
import generateToken from "../../utils/generateToken.js";

const postJob = async (req, res) => {
    const { title, description, location, category ,  level  , salary , visible, companyId , applyLink } = req.body;

    try {
        const newJob = await Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category,
            visible,
            applyLink: applyLink || ''
        });

        await newJob.save();

        res.json({ success: true, job: newJob });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const createCompany = async( req,res)=>{
    try{
        const {name,image} = req.body;
        const company = new Company({
            name,
            image,
            adminCreated: true
        })

        await company.save();
        res.json({
            success: true,
            company
        })




    }catch (error) {
        res.json({ success: false, message: error.message })
    }

}

const getCompanyId = async(req,res)=>{
    const name = req.body.name;
    try{
        const company = await Company.findOne({ name });
        if(!company){
            return res.json({ success: false, message: "Company not found" });
        }
        res.json({ success: true, companyId : company._id });

    }catch(error) {
        res.json({ success: false, message: error.message });
    }

}

export { postJob , createCompany, getCompanyId };
