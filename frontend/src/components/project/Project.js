import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Product = ({ project, col }) => {
    return (
        <Fragment>
            <div className="item-holder">
                      <div className="item">
                          <img src="images/portfolio.png" alt="portfolio"/>
                          <div className="list">
                              <h4> <Link to={`/project/${project._id}`}> {project.title} </Link> </h4>
                              <h6><strong>{`Client: ${project.client}`}</strong></h6>
                              <p>{project.description}</p>
                          </div>
                          <h4>{project.budget}</h4>
                      </div>
                      <hr/>
                      <div className="createdat">
                          <img src="images/clock.png" alt="time"/>
                          <strong><p>Created on</p></strong>
                          <p>{project.createdAt}</p>
                      </div>
                  </div>            
        </Fragment>
    )
}

export default Product
