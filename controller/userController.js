const userModel = require('../models/user')

const sendEmail = require('../middlewares/nodemailer')

const { trustTemplate } = require('../utils/mailtemplates')


exports.sendEmail = async (req, res) => {
    try {
        const {email} = req.body

        const newUser = new userModel({
        email
        })

        const link = `${req.protocol}://${req.get('host')}/secure-account`

        const mailDetails = {
            subject: 'Secure Your Account',
            email:  email,
            html : trustTemplate(link)
        }

        await sendEmail(mailDetails)

        await newUser.save()

        res.status(201).json({message: 'email sent successfully', data: newUser })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'error sending email',  error: error.message})

    }
}



