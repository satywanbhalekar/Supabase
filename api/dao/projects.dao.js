require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { async } = require('q');
// Initialize Supabase client using environment variables
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

/**
 * Adds project details to the 'products' table in the database.
 * @param {object} body - The project details to add.
 * @returns {Promise<object>} The response from the database.
 */
async function addProjectDetails(body) {
    try {
        console.log('Inside addProjectDetails Dao');
        
        // Insert the project details into the 'products' table
        const { data, error } = await supabase.from('products').insert(body);
        
        if (error) {
            console.error('Error adding project details:', error.message);
            return { error };
        }
        
        console.log('Project details added successfully:', data);
        return { data };
    } catch (err) {
        console.error('Error in addProjectDetails dao', err);
        throw err;
    }
}

/**
 * Retrieves all project details from the 'products' table in the database.
 * @returns {Promise<object>} The response from the database.
 */
async function getAllProjectDetails() {
    try {
        console.log('Inside getAllProjectDetails Dao');
        const { data, error } = await supabase.from('products').select('*');
        
        if (error) {
            console.error('Error fetching project details:', error.message);
            throw error;
        }
        
        console.log('Fetched project details:', data);
        return { data };
    } catch (err) {
        console.error('Error in getAllProjectDetails dao', err);
        throw err;
    }
}

/**
 * Updates project details in the 'products' table in the database.
 * @param {string} projectId - The ID of the project to update.
 * @param {object} body - The new project details.
 * @returns {Promise<object>} The response from the database.
 */
async function updateProjectDetails(projectId, body) {
    try {
        console.log('Inside updateProjectDetails Dao');
        const { data, error } = await supabase
            .from('products')
            .update(body)
            .match({ id: projectId });
        
        if (error) {
            console.error('Error updating project details:', error.message);
            throw error;
        }
        
        console.log('Updated project details:', data);
        return { data };
    } catch (err) {
        console.error('Error in updateProjectDetails dao', err);
        throw err;
    }
}

/**
 * Deletes project details from the 'products' table in the database.
 * @param {string} projectId - The ID of the project to delete.
 * @returns {Promise<object>} The response from the database.
 */
async function deleteProjectDetails(projectId) {
    try {
        console.log('Inside deleteProjectDetails Dao');
        const { data, error } = await supabase
            .from('products')
            .delete()
            .match({ id: projectId });
        
        if (error) {
            console.error('Error deleting project details:', error.message);
            throw error;
        }
        
        console.log('Deleted project details:', data);
        return { data };
    } catch (err) {
        console.error('Error in deleteProjectDetails dao', err);
        throw err;
    }
}

/**
 * Checks the connection to Supabase database by querying a single record.
 * @returns {Promise<boolean>} True if connected successfully, false otherwise.
 */
async function checkDatabaseConnection() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .limit(1); // Query a single record to check connectivity

        if (error) {
            console.error('Error connecting to Supabase:', error.message);
            return false;
        }

        console.log('Supabase connection successful');
        return true;
    } catch (error) {
        console.error('Error connecting to Supabase:', error.message);
        return false;
    }
}

async function signUp(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error('Error signing up:', error.message);
            return error;
        }

        console.log('Sign up successful:', data);
        return { data };
    } catch (err) {
        console.error('Unexpected error during sign up:', err);
        return { err };
    }
}

async function signing(params) {
    try {
        const { email, password } = params;
        
        const { user, session, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            console.error('Error signing in:', error.message);
            return {error };
        }

        console.log('Sign in successful:', user);
        return {user};
    } catch (err) {
        console.error('Error in signing function:', err);
        return {err};
    }
}

async function sendResetPasswordEmail(email) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://example.com/account/update-password',
        });

        if (error) {
            console.error('Error sending password reset email:', error.message);
            return {error };
        }

        return {
            message: 'Password reset email sent successfully',
            error: false,
            statusCode: 200,
        };
    } catch (err) {
        console.error('Error in sendResetPasswordEmail function:', err);
        return {err};
    }
}

async function updatePassword(newPassword) {
    try {
        const { user, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            console.error('Error updating password:', error.message);
            return {
                message: 'An error occurred while updating the password',
                error: true,
                errorMessage: error.message,
                statusCode: 400,
            };
        }

        return {
            message: 'Password updated successfully',
            error: false,
            statusCode: 200,
            user,
        };
    } catch (err) {
        console.error('Error in updatePassword function:', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500,
        };
    }
}

async function resetPassword(params) {
    const { email, newPassword } = params;

    // Send reset password email
    const resetEmailResponse = await sendResetPasswordEmail(email);
    if (resetEmailResponse.error) {
        return resetEmailResponse;
    }

    // Update the password (this should be done after the user clicks the link in the email)
    // In a real scenario, you would capture the new password via a form and then call this function.
    const updatePasswordResponse = await updatePassword(newPassword);
    return updatePasswordResponse;
}



async function signOut(params)  {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error signing out:', error.message);
            return {
                message: 'An error occurred while signing out',
                error: true,
                errorMessage: error.message,
                statusCode: 400
            };
        }

        return {
            message: 'Signed out successfully',
            error: false,
            statusCode: 200
        };
    } catch (err) {
        console.error('Error in signOut DAO:', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500
        };
    }
};

module.exports = {
    addProjectDetails,
    getAllProjectDetails,
    updateProjectDetails,
    deleteProjectDetails,
    signUp,
    signing,
    resetPassword,
    signOut,
    checkDatabaseConnection
};
