const registertbl = require('../models/registertbl')

const blogtbl = require('../models/blogtbl')

const nodemailer = require('nodemailer')

const fs = require('fs')

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/dashboard')
    }
    return res.render('login');
}

const register = (req, res) => {
    return res.render('register')
}

const dashboard = (req, res) => {
    return res.render('dashboard')
}

const registerData = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body
        if (password == cpassword) {
            let userdata = await registertbl.create({
                name: name,
                email: email,
                password: password
            })
            if (userdata) {
                console.log("Used data Add successful");
                return res.redirect('/')
            }
            else {
                console.log("data not add");
                return res.redirect('back')
            }
        }
        else {
            console.log("password and confirm password in not match");
            return false
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const loginData = (req, res) => {
    return res.redirect('/dashboard')
}

const logout = (req, res) => {
    req.logout((err) => {
        console.log(err);
        return false
    })
    return res.redirect('/');
}

const addblog = (req, res) => {
    return res.render('addblog', {
        single: ""
    })
}

const insertdata = async (req, res) => {
    try {
        const { editid, name, discription } = req.body
        if (editid) {
            if (req.file) {
                if (!name || !discription) {
                    console.log("Enter All Data");
                    return res.redirect('/')
                }
                let dltimg = await blogtbl.findById(editid)
                if (dltimg) {
                    fs.unlinkSync(dltimg.image)
                }
                else {
                    console.log("image not delete");
                    return false
                }
                let image = "";
                if (req.file) {
                    image = req.file.path
                }
                let updatedata = await blogtbl.findByIdAndUpdate(editid, {
                    name: name,
                    discription: discription,
                    image: image
                })
                if (updatedata) {
                    console.log("Edit Done");
                    return res.redirect('/viewblog')
                }
                else {
                    console.log("Not Edited");
                    return false
                }
            }
            else {
                image = "";
                let singledata = await blogtbl.findById(editid);
                if (!name || !discription) {
                    console.log("Enter All Data");
                    return res.redirect('back')
                }
                if (singledata) {
                    image = singledata.image;
                    let updatedata = await blogtbl.findByIdAndUpdate(editid, {
                        name: name,
                        discription: discription,
                        image: image
                    })
                    if (updatedata) {
                        req.flash('success', "Data Successfully Edit")
                        console.log("Edit Done");
                        return res.redirect('/viewblog')
                    }
                    else {
                        console.log("Not Edited");
                        return false
                    }
                }
            }
        }
        else {
            let image = "";
            if (req.file) {
                image = req.file.path
            }
            if (!name || !discription || !image) {
                req.flash('danger', "Enter All data");
                console.log("Enter All data");
                return res.redirect('/addblog')
            }
            let data = await blogtbl.create({
                name: name,
                discription: discription,
                image: image
            })
            if (data) {
                req.flash('success', "Data Successfully Add");
                console.log("Data Successfully Add");
                return res.redirect('back');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const viewblog = async (req, res) => {
    try {
        let blogdata = await blogtbl.find({});
        if (blogdata) {
            return res.render('viewblog', {
                blogdata
            })
        }
        else {
            console.log("record not found");
            return false
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const deletedata = async (req, res) => {
    try {
        let id = req.query.id
        let dltimg = await blogtbl.findById(id)
        if (dltimg) {
            fs.unlinkSync(dltimg.image)
        }
        else {
            console.log("image not delete");
            return false
        }
        let dltdata = await blogtbl.findByIdAndDelete(id)
        if (dltdata) {
            req.flash('danger', 'Data Successfully delete')
            console.log("data deleted");
            return res.redirect('back');
        }
        else {
            console.log("data not delete");
            return res.redirect('back');
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const editdata = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await blogtbl.findById(id)
        if (single) {
            return res.render('addblog', {
                single
            })
        }
        else {
            console.log("record not found");
            return false
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const newpassword = (req, res) => {
    return res.render('newpassword')
}

const Setnewpassword = async (req, res) => {
    try {
        const { editid, npassword, cpassword } = req.body;
        if (!npassword || !cpassword) {
            req.flash('danger', "Enter all field")
            console.log("Enter all field");
            return res.redirect('/newpassword')
        }
        if (npassword != cpassword) {
            req.flash('danger', "new password And Confirm Password are not match")
            console.log("new password And Confirm Password are not match");
            return res.redirect('/newpassword')
        }
        let changepassword = await registertbl.findByIdAndUpdate(editid, {
            password: npassword
        })
        if (changepassword) {
            req.flash('success', "Password successfully change")
            console.log("Password successfully change");
            return res.redirect('/newpassword')
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const profile = (req, res) => {
    return res.render('profile')
}

const changeprofile = async (req, res) => {
    try {
        const { editid, name, password, cpassword } = req.body
        if (!name || !password || !cpassword) {
            req.flash('danger', "Enter All the Field")
            console.log("Enter All the Field");
            return res.redirect('back')
        }
        if (password != cpassword) {
            req.flash('danger', "Both Password are not match")
            console.log("Both Password are not match");
            return res.redirect('back')
        }
        let changeprofile = await registertbl.findByIdAndUpdate(editid, {
            name: name,
            password: password
        })
        if (changeprofile) {
            req.flash('success', 'Profile is successfully change')
            console.log("Profile is change");
            return res.redirect('back')
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const forgotpassword = async (req, res) => {
    const { email } = req.body;
    let useremail = req.body.email
    try {
        let checkemail = await registertbl.findOne({ email: email })
        if (checkemail) {

            // Create a transporter using your email service provider details
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'smitgandhi2001@gmail.com',
                    pass: 'irtnhbyihlfarkio'
                }
            });

            // Generate a random OTP
            const generateOTP = () => {
                const digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            };

            // Send OTP via email
            const sendOTP = (email, otp) => {


                const mailOptions = {
                    from: 'smitgandhi2001@gmail.com',
                    to: useremail,
                    subject: 'One-Time Password (OTP) Verification',
                    text: `Your OTP is: ${otp}`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending OTP:', error);
                    } else {
                        console.log('OTP sent successfully.');
                        let obj = {
                            otp: otp,
                            email: useremail
                        }
                        res.cookie('userotp', obj);
                        return res.redirect('/otp')
                    }
                });
            };

            // Example usage
            const email = useremail;
            const otp = generateOTP();
            sendOTP(email, otp);
        }
        else {
            req.flash('danger', "Mail Not found")
            console.log("Mail Not found");
            return res.redirect('back')
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

const otp = (req, res) => {
    return res.render('otp');
}

const enterotp = (req, res) => {
    if (req.cookies.userotp.otp == req.body.otp) {
        return res.redirect('/loginNewpassword')
    }
    else {
        req.flash('danger', "Otp Is invalid")
        return res.redirect('back')
    }
}

const loginNewpass = (req, res) => {
    return res.render('loginNewPassword')
}

const newpass = async(req,res)=>{
    try {
        const {npassword,cpassword} = req.body
        if(npassword != cpassword){
            req.flash('danger',"New And Confirm Password are not match")
            return res.redirect('back');
        }
        else{
            let email = req.cookies.userotp.email
            let changepassword = await registertbl.findOneAndUpdate({email},{
                password : npassword
            })
            if(changepassword){
                res.clearCookie('userotp')
                return res.redirect('/')
            }else{
                console.log("password not update");
                return res.redirect('back')
            }
        }
    } 
    catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

module.exports = {
    login,
    register,
    dashboard,
    registerData,
    loginData,
    logout,
    addblog,
    insertdata,
    viewblog,
    deletedata,
    editdata,
    newpassword,
    Setnewpassword,
    profile,
    changeprofile,
    forgotpassword,
    otp,
    enterotp,
    loginNewpass,
    newpass
}