require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
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
            return { success: false, error: error.message };
        }

        console.log('Sign up successful:', data);
        return { success: true, data: data };
    } catch (err) {
        console.error('Unexpected error during sign up:', err);
        return { success: false, error: 'Unexpected error' };
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
        console.error('Error in signing function:', err);
        return {
            message: 'Something went wrong!',
            error: true,
            statusCode: 500,
        };
    }
}




module.exports = {
    addProjectDetails,
    getAllProjectDetails,
    updateProjectDetails,
    deleteProjectDetails,
    signUp,
    signing,
    checkDatabaseConnection
};
