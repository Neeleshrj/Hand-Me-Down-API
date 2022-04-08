const Joi = require('joi');

const pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";

function validateUser(user) {
    const schema = Joi.object({
        phoneNumber: Joi
        .number()
        .min(10)
        .messages({
            'string.empty': 'Phone Number cannot be empty',
            'string.base': 'Phone Number should be number',
            'string.min': 'Invalid Phone Number',
        }),
        password: Joi
            .string()
            .required()
            .messages({
                'any.required': 'Password cannot be empty'
            }),
    });
    
    return schema.validate(user);
}

exports.validateLogin = validateUser;