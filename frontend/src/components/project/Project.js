import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Project = ({ project, col }) => {
    return (
        <Fragment>
            <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
                <div className="card p-3 rounded">
                    <img alt = "Project_Image"
                    className="card-img-top mx-auto"
                    // src='./images/portfolio.png'
                    // src={project.images[0].url}
                    />
                    <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/project/${project._id}`}> {project.title} </Link>
                    </h5>
                    <p className="card-text">{`$${project.budget.toLocaleString() }`}</p>
                    <Link to={`/project/${project._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    </div>
                </div>
            </div> 
            
        </Fragment>
    )
}

export default Project
