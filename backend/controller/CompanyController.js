const CompanyModel = require("../Models/CompanyModel");
const cloudinary = require("../utils/cloudinary");
const getDataUri=require("../utils/dataUri");


const registerCompany = async (req, res) => {
  try {
    const { companyname } = req.body;
    let company = await CompanyModel.findOne({ name: companyname });
    if (company) {
      return res.json({
        message: "You can't register same company",
      });
    }
    company = await CompanyModel.create({
      name: companyname,
      userId: req.id,
    });
    return res.json({
      message: "Company Registered Successfully",
      data:company,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in userID
    const companies = await CompanyModel.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "Companies not found",
      });
    }
    res.json({
      message: "Companies",
      data:companies,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const id=req.params.id;
    const company = await CompanyModel.findOne({_id:id});
    if (!company) {
      return res.json({
        message: "Company not found",
      });
    }
    return res.json({
      company:company,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const id=req.params.id;
    const { name, description, website, location } = req.body;

     const file=req.file;
    const fileUri=getDataUri(file);
    const cloudResponse=await cloudinary.uploader.upload(fileUri.content);  

    const updateData = {
      name,
      description,
      website,
      location,
      logo: cloudResponse.secure_url,
    };

    const company = await CompanyModel.updateOne(
      {_id:id},
      {
        $set:updateData,
      }
    );
    res.json({
      message: "Updated Successfully",
      data: company,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { registerCompany, getCompany, getCompanyById, updateCompany };
