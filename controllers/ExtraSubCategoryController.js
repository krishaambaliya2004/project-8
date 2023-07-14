const categorytbl = require('../models/categorytbl');
const subcategorytbl = require('../models/SubCategorytbl');
const extrasubcategorytbl = require('../models/Excategorytbl');

const addExtraSubCategory = async(req,res) => {

    try{
        let category = await categorytbl.find({});
        let subcategory = await subcategorytbl.find({});
        let editRecord;
        let mergeExsubcatTable = await extrasubcategorytbl.find({}).populate('subcategoryId').populate('categoryId');

        return res.render('extra_sub_category',{
            category,
            subcategory,
            mergeExsubcatTable,
            editRecord : ''
        });
    }catch(err){
        console.log(err);
        return false;
    } 
}

const postExSubcategory = async(req,res) => {
    try{
        let addextrasubcategory = await extrasubcategorytbl.create({
            categoryId : req.body.category,
            subcategoryId : req.body.subcategory,
            exsubcategory : req.body.exsubcategory,
        })
        if(addextrasubcategory){
            console.log("Extrasubcategory successfully add");
            return res.redirect('back');
        }else{
            console.log("something wrong");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const editExSubcategory = async(req,res) => {
   try{
        let editId = req.query.id;
        let category = await categorytbl.find({});
        let subcategory = await subcategorytbl.find({});
        let editRecord = await extrasubcategorytbl.findById(editId);
        let mergeExsubcatTable = await extrasubcategorytbl.find({}).populate('subcategoryId').populate('categoryId');
        return res.render('extra_sub_category',{
            editRecord,
            category,
            subcategory,
            mergeExsubcatTable
        })  
   }catch(err){
    console.log(err);
    return false;
   }
}

module.exports = {
    addExtraSubCategory,
    postExSubcategory,
    editExSubcategory
}