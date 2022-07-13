const express = require('express');
const router = express.Router();

const { 
    getProjects, 
    newProject, 
    getSingleProject, 
    updateProject, 
    deleteProject,
    getAdminProjects, 
} = require('../controllers/projectController');

const { isAuthenticatedUser, authorizeRoles  } = require('../midllewares/auth');

router.route('/projects').get(/*isAuthenticatedUser,*/ getProjects); // more roles can be pass to the authorizeRole function like 'admin, editor, superAdmin...'
router.route('/project/:id').get(getSingleProject);

router.route('/admin/project/new').post(/*isAuthenticatedUser, authorizeRoles('admin'),*/ newProject); 
router.route('/admin/project/:id')
                    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProject)
                    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProject);

router.route('/admin/projects').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProjects)

            
module.exports = router;