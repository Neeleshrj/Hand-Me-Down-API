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
            .required()
            .messages({
                'string.empty': 'Task Description cannot be empty'
            }),
        payout: Joi
            .string()
            .required()
            .messages({
                'string.empty': 'Payout value is required'
            }),
        location: Joi
            .object(),
        image: Joi
            .string()
    });

    return schema.validate(tasks);
}

exports.validate = validateTask;