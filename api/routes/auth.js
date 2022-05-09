const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//MAIL SENDER DETALIS
//user:eshop123forTest@gmail.com
//pass:eshop123forTest!@

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'eshop123forTest@gmail.com',
        pass:'eshop123forTest!@',
    },
    tls:{
        rejectUnauthorized: false
    }
})


//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        emailToken: crypto.randomBytes(64).toString('hex'),
        password: CryptoJS.AES.encrypt(
            req.body.password, process.env.PASS_SEC
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

        //SEND VERIFICATION MAIL TO USER
        var mailOptions = {
            from: ' "enetshop" <eshop123forTest@gmail.com>',
            to: savedUser.email,
            subject: "Confirm Your Email Address",
            html: `<head>

           <meta charset="utf-8">
           <meta http-equiv="x-ua-compatible" content="ie=edge">
           <title>Email Confirmation</title>
           <meta name="viewport" content="width=device-width, initial-scale=1">
           <style type="text/css">
           /**
            * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
            */
           @media screen {
             @font-face {
               font-family: 'Source Sans Pro';
               font-style: normal;
               font-weight: 400;
               src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
             }
             @font-face {
               font-family: 'Source Sans Pro';
               font-style: normal;
               font-weight: 700;
               src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
             }
           }
           /**
            * Avoid browser level font resizing.
            * 1. Windows Mobile
            * 2. iOS / OSX
            */
           body,
           table,
           td,
           a {
             -ms-text-size-adjust: 100%; /* 1 */
             -webkit-text-size-adjust: 100%; /* 2 */
           }
           /**
            * Remove extra space added to tables and cells in Outlook.
            */
           table,
           td {
             mso-table-rspace: 0pt;
             mso-table-lspace: 0pt;
           }
           /**
            * Better fluid images in Internet Explorer.
            */
           img {
             -ms-interpolation-mode: bicubic;
           }
           /**
            * Remove blue links for iOS devices.
            */
           a[x-apple-data-detectors] {
             font-family: inherit !important;
             font-size: inherit !important;
             font-weight: inherit !important;
             line-height: inherit !important;
             color: inherit !important;
             text-decoration: none !important;
           }
           /**
            * Fix centering issues in Android 4.4.
            */
           div[style*="margin: 16px 0;"] {
             margin: 0 !important;
           }
           body {
             width: 100% !important;
             height: 100% !important;
             padding: 0 !important;
             margin: 0 !important;
           }
           /**
            * Collapse table borders to avoid space between cells.
            */
           table {
             border-collapse: collapse !important;
           }
           a {
             color: #1a82e2;
           }
           img {
             height: auto;
             line-height: 100%;
             text-decoration: none;
             border: 0;
             outline: none;
           }
           </style>
         
         </head>
         <body style="background-color: #e9ecef;">
         
           <!-- start preheader -->
           <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
             Hi ${savedUser.username}, thank you for signing up for enetshop. Let us know how we can help you get started. Take a look at the options below and select the one which matches your needs.
           </div>
           <!-- end preheader -->
         
           <!-- start body -->
           <table border="0" cellpadding="0" cellspacing="0" width="100%">
         
             <!-- start logo -->
             <tr>
               <td align="center" bgcolor="#e9ecef">
                 <!--[if (gte mso 9)|(IE)]>
                 <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                 <tr>
                 <td align="center" valign="top" width="600">
                 <![endif]-->
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                   <tr>
                     <td align="center" valign="top" style="padding: 36px 24px;">
                       <a href="http://${req.headers.host}/" target="_blank" style="display: inline-block;">
                         <img src="https://i.imgur.com/rlSGJSO.png" alt="Logo" border="0" width="238" style="display: block; width: 238px; max-width: 238px; min-width: 238px;">
                       </a>
                     </td>
                   </tr>
                 </table>
                 <!--[if (gte mso 9)|(IE)]>
                 </td>
                 </tr>
                 </table>
                 <![endif]-->
               </td>
             </tr>
             <!-- end logo -->
         
             <!-- start hero -->
             <tr>
               <td align="center" bgcolor="#e9ecef">
                 <!--[if (gte mso 9)|(IE)]>
                 <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                 <tr>
                 <td align="center" valign="top" width="600">
                 <![endif]-->
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                   <tr>
                     <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                       <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                     </td>
                   </tr>
                 </table>
                 <!--[if (gte mso 9)|(IE)]>
                 </td>
                 </tr>
                 </table>
                 <![endif]-->
               </td>
             </tr>
             <!-- end hero -->
         
             <!-- start copy block -->
             <tr>
               <td align="center" bgcolor="#e9ecef">
                 <!--[if (gte mso 9)|(IE)]>
                 <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                 <tr>
                 <td align="center" valign="top" width="600">
                 <![endif]-->
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
         
                   <!-- start copy -->
                   <tr>
                     <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                       <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="http://${req.headers.host}/">enetshop</a>, you can safely delete this email.</p>
                     </td>
                   </tr>
                   <!-- end copy -->
         
                   <!-- start button -->
                   <tr>
                     <td align="left" bgcolor="#ffffff">
                       <table border="0" cellpadding="0" cellspacing="0" width="100%">
                         <tr>
                           <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                             <table border="0" cellpadding="0" cellspacing="0">
                               <tr>
                                 <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                   <a href="http://${req.headers.host}/api/auth/user/verify-email?token=${savedUser.emailToken}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify email</a>
                                 </td>
                               </tr>
                             </table>
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                   <!-- end button -->
         
                   <!-- start copy -->
                   <tr>
                     <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                       <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                       <p style="margin: 0;"><a href="http://${req.headers.host}/user/verify-email?token=${savedUser.emailToken}" target="_blank">http://${req.headers.host}/user/verify-email?token</a></p>
                     </td>
                   </tr>
                   <!-- end copy -->
         
                   <!-- start copy -->
                   <tr>
                     <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                       <p style="margin: 0;">Cheers,<br> enetshop</p>
                     </td>
                   </tr>
                   <!-- end copy -->
         
                 </table>
                 <!--[if (gte mso 9)|(IE)]>
                 </td>
                 </tr>
                 </table>
                 <![endif]-->
               </td>
             </tr>
             <!-- end copy block -->
         
             <!-- start footer -->
             <tr>
               <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                 <!--[if (gte mso 9)|(IE)]>
                 <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                 <tr>
                 <td align="center" valign="top" width="600">
                 <![endif]-->
                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
         
                   <!-- start permission -->
                   <tr>
                     <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                       <p style="margin: 0;">You received this email because we received a request for authorization for your account. If you didn't request registering you can safely delete this email.</p>
                     </td>
                   </tr>
                   <!-- end permission -->
         
                   <!-- start unsubscribe -->
                   <tr>
                     <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                       <p style="margin: 0;">To stop receiving these emails, you can <a href="http://${req.headers.host}/user/help" target="_blank">unsubscribe</a> at any time.</p>
                       <p style="margin: 0;">enetcode Inc., 2022. All rights reserved.</p>
                     </td>
                   </tr>
                   <!-- end unsubscribe -->
         
                 </table>
                 <!--[if (gte mso 9)|(IE)]>
                 </td>
                 </tr>
                 </table>
                 <![endif]-->
               </td>
             </tr>
             <!-- end footer -->
         
           </table>
           <!-- end body -->
         
         </body>`
        }

        //SENDING MAIL
        transporter.sendMail(mailOptions,function(error,info){
            if (error) {
                console.log(error)
            }else{
                console.log("Verifycation email is sent to your account")
            }
        })
    } catch (err) {
        res.status(500).json(err);
    }

})

//VERIFY EMAIL
router.get("/user/verify-email", async(req,res)=>{
    try {
        const token = req.query.token
        const user = await User.findOne({emailToken: token})
        if (user) {
            user.isVerified=true
            await user.save()
            res.redirect('http://localhost:3000/login')
        }else{
            res.redirect('http://localhost:3000/register')
            console.log("email not verified")
        }
        
    } catch (error) {
        console.log(error)
    }
})


//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, isVerified: req.body.isVerified = true });
        if (!user) {
            res.status(401).json("Wrong credentials1!");
            return 
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, process.env.PASS_SEC
        );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (Originalpassword !== req.body.password) {
            res.status(404).json("Wrong credentials2!");
            return
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});

    } catch (err) {
        res.status(500).json(err)
        return
    }
})

module.exports = router;