const nodemailer = require('nodemailer')

exports.autoMail = async (to, subject, html) => {
  //Nodemailer TRANSPORTER
 
  const transporter = nodemailer.createTransport({
    // host: process.env.EHOST,
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: 'vikassharmargec@gmail.com',
      pass: 'vbieewkoabhoqpid'
     
    }
  })
  //Nodemailer OPTIONS
  
  var mailOptions = {
    from: '"Reset password" <vikassharmargec@gmail.com>',
    to: to, 
    subject: subject,
    html: html
};
  transporter.verify(function(error, success) {
    if (error) {
          console.log(error);
    } else {
          console.log('Server is ready to take our messages');
    }
  });
  
  //Sending EMAIL
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(`Cannot send email >>> ${err.message}`);
      
    } else {
      console.log(`Email sent successfully: ${info.response}`);
    }
  })
}

