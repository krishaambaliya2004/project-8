const express = require('express')

const routes = express.Router();

const passport = require('passport')

const fileupload = require('../config/fileupload')

const Admincontroller = require('../controllers/AdminController')
const CategoryController = require('../controllers/CategoryController')
const SubCategoryController = require('../controllers/SubCategoryController');
const ExtraSubCategoryController = require('../controllers/ExtraSubCategoryController');
const ProductController = require('../controllers/ProductController');

routes.get('/',Admincontroller.login);
routes.get('/register',Admincontroller.register)
routes.get('/dashboard',passport.checkAuthentication,Admincontroller.dashboard)
routes.post('/registerData',Admincontroller.registerData)
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),Admincontroller.loginData);
routes.get('/logout',Admincontroller.logout),
routes.get('/addblog',passport.checkAuthentication,Admincontroller.addblog),
routes.post('/insertdata',fileupload,Admincontroller.insertdata),
routes.get('/viewblog',passport.checkAuthentication,Admincontroller.viewblog)
routes.get('/deletedata',Admincontroller.deletedata)
routes.get('/editdata',Admincontroller.editdata)
routes.get('/newpassword',passport.checkAuthentication,Admincontroller.newpassword)
routes.post('/Setnewpassword',Admincontroller.Setnewpassword)
routes.get('/profile',passport.checkAuthentication,Admincontroller.profile)
routes.post('/changeprofile',Admincontroller.changeprofile)
routes.post('/forgotpassword',Admincontroller.forgotpassword)
routes.get('/otp',Admincontroller.otp)
routes.post('/enterotp',Admincontroller.enterotp)
routes.get('/loginNewpassword',Admincontroller.loginNewpass)
routes.post('/newpass',Admincontroller.newpass)

// Category Routes
routes.get('/category',passport.checkAuthentication,CategoryController.category)
routes.post('/addcategory',CategoryController.addcategory)
routes.get('/deletecategory',CategoryController.deletecategory)
routes.get('/editcategory',CategoryController.editcategory)


//SubCategory Routes
routes.get('/addSubCategory',passport.checkAuthentication,SubCategoryController.addSubCategory)
routes.post('/postSubcategory',SubCategoryController.postSubcategory)


//ExtraSubcategory
routes.get('/addExtraSubCategory',passport.checkAuthentication,ExtraSubCategoryController.addExtraSubCategory)
routes.post('/postExSubcategory',passport.checkAuthentication,ExtraSubCategoryController.postExSubcategory)
routes.get('/editExSubcategory',passport.checkAuthentication,ExtraSubCategoryController.editExSubcategory); 


routes.get('/product',passport.checkAuthentication,ProductController.product)


module.exports = routes

