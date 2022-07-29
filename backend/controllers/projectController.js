const Project = require('../models/project')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../midllewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary')

// Create new project => /api/v1/admin/project/new
exports.newProject = catchAsyncErrors( async (req, res, next) => {

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }

    let imagesLinks = []; 

    /*for(let i = 0; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'projects'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }*/

    req.body.images = imagesLinks;
    // req.body.user = req.user.id;
    req.body.contact = JSON.parse(req.body.contact);
    req.body.payments = JSON.parse(req.body.payments);
    const project = await Project.create(req.body);

    res.status(201).json({
        success: true,
        project
    });
});

// Get all projects => /api/v1/projects?keyword=apple
exports.getProjects = catchAsyncErrors(async (req, res, next) => {

    // return next(new ErrorHandler('My Error', 400)) // Burble error

    const resPerPage = 10;
    const projectsCount = await Project.countDocuments();

    const apiFeatures = new APIFeatures(Project.find(), req.query)
                        .search()
                        //.filter()
    
    let projects = apiFeatures.query;
    let filteredProjectsCount = projects.length

    apiFeatures.pagination(resPerPage)
    projects = await apiFeatures.query;

    res.status(200).json({
        success: true,
        projectsCount,
        resPerPage,
        filteredProjectsCount,
        projects
    });
});

// Get all projects(Admin) => /api/v1/admin/projects
exports.getAdminProjects = catchAsyncErrors(async (req, res, next) => {

    const projects = await Project.find();
    res.status(200).json({
        success: true,
        projects
    });
});


// Get project by Id => /api/v1/project/:id
exports.getSingleProject = catchAsyncErrors(async (req, res, next) => {

    const project = await Project.findById(req.params.id);

    if(!project){
        return next(new ErrorHandler('Project Not Found', 404));
    }

    res.status(200).json({
        success: true,
        project
    });
});

// Upate project => /api/v1/admin/project/:id
exports.updateProject = catchAsyncErrors(async (req, res, next) => {
    
    let project = await Project.findById(req.params.id);

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }

    if(images !== undefined){
        // Deleting images associated with the project
        for(let i = 0; i < project.images.length; i++){
            const result = await cloudinary.v2.uploader.destroy(project.images[i].public_id)
        }

        let imagesLinks = [];

        for(let i = 0; i < images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'projects'
            })

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
    }

    if(!project){
        /*return res.status(404).json({
            success: false,
            message: 'Project not found'
        });*/
        return next(new ErrorHandler('Project Not Found', 404));
    }

    req.body.contact = JSON.parse(req.body.contact);
    req.body.payments = JSON.parse(req.body.payments);
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        project
    })
});

// Delete Project
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
    let project = await Project.findById(req.params.id);

    if(!project){
        return next(new ErrorHandler('Project Not Found', 404));
    }

    // Deleting images associated with the project
    for(let i = 0; i < project.images.length; i++){
        const result = await cloudinary.v2.uploader.destroy(project.images[i].public_id)
    }

    await project.remove();

    res.status(200).json({
        success: true,
        message: 'Project is deleted succesfully'
    });
});

// Create new review =>     /api/v1/review
exports.createProjectReview = catchAsyncErrors( async (req, res, next) => {
    const { rating, comment, projectId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const project = await Project.findById(projectId)

    const hasReviewed = project.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(hasReviewed){
        project.reviews.forEach( review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment,
                review.rating = rating
            }
        })

    } else {
        project.reviews.push(review);
        project.numOfReviews = project.reviews.length
    }

    project.ratings = project.reviews.reduce( (acc, item) => item.rating + acc, 0 ) / project.reviews.length

    await project.save( { validateBeforeSave: false } )

    res.status(200).json({
        success: true
    })
})

// Get Project Reviews   =>  /api/v1/reviews
exports.getProjectReviews = catchAsyncErrors( async (req, res, next) => {
    const project = await Project.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: project.reviews
    })
})


// Delet Project Review   =>  /api/v1/reviews
exports.deleteReview = catchAsyncErrors( async (req, res, next) => {
    const project = await Project.findById(req.query.projectId);

    const reviews = project.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    const ratings = project.reviews.reduce( (acc, item) => item.rating + acc, 0 ) / reviews.length

    const numOfReviews = reviews.length

    await Project.findByIdAndUpdate(req.query.projectId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})














