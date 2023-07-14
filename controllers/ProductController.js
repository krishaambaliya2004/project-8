const categorytbl = require('../models/categorytbl');
const subcategorytbl = require('../models/SubCategorytbl');
const extrasubcategorytbl = require('../models/Excategorytbl');


const product = async(req,res) => {
    try{
        let category = await categorytbl.find({});
        let subcategory = await subcategorytbl.find({});
        let extrasubcategory = await extrasubcategorytbl.find({});
        let editRecord;
        let mergeExsubcatTable = await extrasubcategorytbl.find({}).populate('subcategoryId').populate('categoryId');

        return res.render('product',{
            category,
            subcategory,
            mergeExsubcatTable,
            editRecord : '',
            extrasubcategory
        });
    }catch(err){
        console.log(err);
        return false;
    } 
}

module.exports = {
    product
}