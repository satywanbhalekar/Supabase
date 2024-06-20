const projectsDao = require('../dao/projects.dao');
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

/**
 * @description: POST add project details.
 * @param {object} body - The request body containing project details.
 * @return {object} - The response containing a message, statusCode, error, and result.
 */
exports.addProjectDetails = async function (body) {
    try {
        const result = await projectsDao.addProjectDetails(body);
        console.log("Inside addProjectDetails service");
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



exports.signup = async function (email, password) {
    try {
        const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return {
                message: 'An error occurred while signing up',
                error: true,
                errorMessage: error.message,
                statusCode: 400
            };
        } else {
            return {
                message: 'User signed up successfully',
                error: false,
                statusCode: 200,
                result: { user, session }
            };
        }
    } catch (err) {
        console.error('Error in signup service', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500
        };
    }
};

exports.signing = async function (email, password) {
    try {
        const { user, session, error } = await supabase.auth.signIn({
            email,
            password,
           
        });

        if (error) {
            console.error('Error signing in:', error.message);
            return {
                message: 'Sign in failed',
                error: true,
                errorMessage: error.message,
                statusCode: 400,
            };
        }

        console.log('Sign in successful:', user);
        return {
            message: 'Sign in successful',
            error: false,
            statusCode: 200,
            result: { user, session },
        };
    } catch (err) {
        console.error('Error in signing service', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500,
        };
    }
};



exports.resetPassword = async function(params) {
    const { email } = params;

    try {
        // Send reset password email
        const { error: resetError } = await supabase.auth.api.resetPasswordForEmail(email, {
            redirectTo: 'http://example.com/account/update-password', // Replace with your actual redirect URL
        });

        if (resetError) {
            console.error('Error sending password reset email:', resetError.message);
            return {
                message: 'An error occurred while sending the password reset email',
                error: true,
                errorMessage: resetError.message,
                statusCode: 400,
            };
        }

        return {
            message: 'Password reset email sent successfully',
            error: false,
            statusCode: 200,
        };
    } catch (err) {
        console.error('Error in resetPassword service:', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500,
        };
    }
};
