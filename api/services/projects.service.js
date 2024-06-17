const projectsDao = require('../dao/projects.dao');

/**
 * @description: POST add project details.
 * @param {object} body - The request body containing project details.
 * @return {object} - The response containing a message, statusCode, error, and result.
 */
exports.addProjectDetails = async function (body) {
    try {
        const result = await projectsDao.addProjectDetails(body);
        console.log(result);

        if (result.error) {
            return {
                message: 'An error occurred while adding project details',
                error: true,
                errorMessage: result.error.message,
                statusCode: 400
            };
        } else {
            return {
                message: 'success',
                error: false,
                statusCode: 200,
                result: { data: result.data }
            };
        }
    } catch (err) {
        console.error('Error in addProjectDetails service', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500
        };
    }
};

/**
 * @description: GET all project details.
 * @return {object} - The response containing a message, statusCode, error, and result.
 */
exports.getAllProjectDetails = async function () {
    try {
        const result = await projectsDao.getAllProjectDetails();
        console.log(result);

        if (result.error) {
            return {
                message: 'An error occurred while fetching project details',
                error: true,
                errorMessage: result.error.message,
                statusCode: 400
            };
        } else {
            return {
                message: 'success',
                error: false,
                statusCode: 200,
                result: { data: result.data }
            };
        }
    } catch (err) {
        console.error('Error in getAllProjectDetails service', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500
        };
    }
};

/**
 * @description: PUT update project details.
 * @param {string} projectId - The ID of the project to update.
 * @param {object} body - The new project details.
 * @return {object} - The response containing a message, statusCode, error, and result.
 */
exports.updateProjectDetails = async function (projectId, body) {
    try {
        const result = await projectsDao.updateProjectDetails(projectId, body);
        console.log(result);

        if (result.error) {
            return {
                message: 'An error occurred while updating project details',
                error: true,
                errorMessage: result.error.message,
                statusCode: 400
            };
        } else {
            return {
                message: 'success',
                error: false,
                statusCode: 200,
                result: { data: result.data }
            };
        }
    } catch (err) {
        console.error('Error in updateProjectDetails service', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500
        };
    }
};

/**
 * @description: DELETE project details.
 * @param {string} projectId - The ID of the project to delete.
 * @return {object} - The response containing a message, statusCode, error, and result.
 */
exports.deleteProjectDetails = async function (projectId) {
    try {
        const result = await projectsDao.deleteProjectDetails(projectId);
        console.log(result);

        if (result.error) {
            return {
                message: 'An error occurred while deleting project details',
                error: true,
                errorMessage: result.error.message,
                statusCode: 400
            };
        } else {
            return {
                message: 'success',
                error: false,
                statusCode: 200,
                result: { data: result.data }
            };
        }
    } catch (err) {
        console.error('Error in deleteProjectDetails service', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500
        };
    }
};
