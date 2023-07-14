const mongoose = require('mongoose')

const crudschema = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'categoryCrud'
    },
    subcategoryId : {
        type :mongoose.Types.ObjectId,
        ref : 'subcategory'
    },
    exsubcategory : {
        type :mongoose.Types.ObjectId,
        ref : 'exsubcategory'
    },
    product : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    qty : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    productImage : {
        type : String,
        required : true
    }
})

const crud = mongoose.model('exsubcategory',crudschema)

module.exports = crud