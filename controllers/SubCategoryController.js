const categorytbl = require('../models/categorytbl')

const SubCategorytbl = require('../models/SubCategorytbl');

const ExSubCategorytbl = require('../models/Excategorytbl');


const addSubCategory = async(req,res)=>{
    try {
        let category = await categorytbl.find({}); 

        let mergesubcatTable = await SubCategorytbl.find({}).populate('categoryId');

        return res.render('sub_category',{
            category,
            mergesubcatTable
        })
    } 
    catch (err) {
        return false
    }
}

const postSubcategory = async(req,res)=>{
    try {
        const {category,subcategory} = req.body
        let addSubcategory = await SubCategorytbl.create({
            categoryId : category,
            subcategory : subcategory
        })
        if(addSubcategory){
            console.log("Subcategory Add Successfully");
            return res.redirect('back')
        }
        else{
            console.log("Subcategory Not Add");
            return res.redirect('back')
        }
    } 
    catch (err) {
        return false
    }
}

module.exports = {
    addSubCategory,
    postSubcategory
};