const { schema } = require("../model/joiValidation")

function Validation(req, res, next) {
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        res.status(400).json({ error: validationResult.error.details[0].message })
    }
    next()

}

module.exports = {
    Validation
}