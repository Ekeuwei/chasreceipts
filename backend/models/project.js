const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter project title'],
        trime: true,
        maxlength: [100, 'Project title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter project description'],
        trime: true
    },
    client: {
        type: String,
        required: [true, 'Please enter project client']
    },
    contact: {
        name: {
           type: String,
            required: [true, 'Please enter project contact'],
            trime: true,
            maxlength: [100, 'Project contact cannot exceed 100 characters'] 
        },
        phone: {
            type: String,
            required: [true, 'Please enter project phone'],
            trime: true,
            maxlength: [100, 'Project phone cannot exceed 100 characters']
        },
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, 'Please enter valide email address']
        },
        address: {
            type: String,
            required: true
        },
        
    },    
    budget:{
        type: Number,
        require: [true, 'Please enter project budget'],
        maxlength: [10, 'Project budget cannot exceed 10 characters'],
        default: 0.0
    },
    duration: {
        type: Number,
        required: true
    },
    images: [
        {
            public_id:{
                type: String,
                require: true
            },
            url:{
                type: String,
                require: true
            }
        }
    ],
    quotation: [
        {
            name:{
                type: String,
                require: true
            },
            cost:{
                type: Number,
                required: true
            }
        }
    ],
    payments:[
        {
            date:{
                type: Date,
                default: Date.now
            },
            amount: Number
        }
    ],
    status: {
        type: String,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('project', projectSchema)