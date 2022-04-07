const Joi =  require('Joi');

function validateTask(tasks){
    const schema = Joi.object({
        taskTitle: Joi
            .string()
            .max(100)
            .required()
            .messages({
                'string.empty': 'Task Title cannot be empty',
            }),
        description: Joi
            .string()
            .max(1000)
            .messages({
                'string.empty': 'Task Description cannot be empty'
            }),
        postUser: Joi
            .required()
            .messages({
                'any.required': 'Post User is required'
            }),
        acceptUser: Joi
            .required()
            .messages({
                'any.required': 'Accept User required'
            })
    });

    return schema.validate(tasks);
}

exports.validate = validateTask;