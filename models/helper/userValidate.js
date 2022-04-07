const Joi = require('joi');

const pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";

function validateUser(user) {
    const schema = Joi.object({
        fullname: Joi
            .string()
            .max(50)
            .required()
            .messages({
                'string.base': 'Name should be a String',
                'string.empty': 'Name cannot be empty',
                'any.required': 'Name is a required field',
            }),
        email: Joi
            .string()
            .min(5)
            .max(255)
            .required()
            .email()
            .messages({
                'string.base': 'Email should be a String',
                'string.empty': 'Email cannot be empty',
                'any.required': 'Email is a required field',
                'string.email': "Enter a valid Email",
                'string.min': 'Enter a valid Email',
            }),
        password: Joi
            .string()
            .required()
            .pattern(new RegExp(pattern))
            .min(8)
            .max(20)
            .messages({
                'string.base': 'Password should be a String',
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password should at least be 8 characters',
                'string.max': 'Password can be max 20 characters',
                'string.pattern.base': 'Password should contain at least 1 symbol, 1 number, 1 lowercase and 1 uppercase character',
                'any.required': 'Password cannot be empty'
            }),
        cPassword: Joi
            .any()
            .equal(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Confirm Password does not match'
            }),
        phoneNumber: Joi
            .number()
            .min(10)
            .messages({
                'string.empty': 'Phone Number cannot be empty',
                'string.base': 'Phone Number should be number',
                'string.min': 'Invalid Phone Number',
            }),
        publicKey: Joi
            .string()
            .required()
            .messages({
                'string.empty': 'Public Key cannot be empty',
                'string.base': 'Public key should be a string'
            })
    });
    
    return schema.validate(user);
}

exports.validate = validateUser;