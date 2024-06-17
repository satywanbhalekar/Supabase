const Joi = require('joi');

// Define the schema for adding a new project
const addProjectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});

// Define the schema for updating an existing project
const updateProjectSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
});

// Export the schemas
module.exports = {
    addProjectSchema,
    updateProjectSchema
};
