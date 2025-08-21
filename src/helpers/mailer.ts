import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}:any) => {
    
    try {
      const hashedToken = await bcryptjs.hash(userId.toString() , 10)

      if (emailType === "VERIFY"){
         const updatedUser = await User.findByIdAndUpdate(userId, {
            $set : {
              verifyToken : hashedToken, 
              verifyTokenExpairy: new Date(Date.now() + 3600000)
             }
          });

       } else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId, {
            $set : {
              forgotPasswordToken : hashedToken,
              forgotPasswordTokenExpairy:  new Date(Date.now() + 3600000)
            }
          });
       }

        // Looking to send emails in production? Check out our Email API/SMTP product!
          var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ab98a6fd66c0fa",   //  not here 
              pass: "e0df967a205cd5", 
            }
          });

          const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email,
            subject: emailType === 'verify' ? "Verify your email" : "Reset your password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> to ${emailType === "VERIFY" ? "Verify your email" : "reset your password"}
            or copy or paste the link in the browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, 
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse


    } catch (error : any) {
        throw new Error(error.message)
    }
}

