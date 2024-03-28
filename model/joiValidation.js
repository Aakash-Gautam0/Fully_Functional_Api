const Joi = require("joi")

const schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(10)
        .required(),


    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))



})

module.exports = {
    schema
}           