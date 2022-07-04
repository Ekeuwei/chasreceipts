import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';

import { useDispatch, useSelector } from 'react-redux'
import { getProjectDetails } from '../../actions/projectActions'

const ProjectDetails = ({ match }) => {

    const dispatch = useDispatch();

    const { project } = useSelector(state => state.projectDetails)
    const { user } = useSelector(state => state.auth)

    useEffect( ()=>{

        dispatch(getProjectDetails(match.params.id))

    }, [dispatch, match.params.id])


    return (
        <Fragment>
            <MetaData title = { project.title } />
            <div class="container-host">
                <div class="deatil-header">
                    <h1>{ project.title }</h1>
                </div>
                <div class="detail-items">
                    <hr/>  
                    <h5><strong>Client:</strong></h5>
                    <h5>{ project.client }</h5> 
                </div> 
                <div class="detail-items">
                    <hr/>  
                    <h5><strong>Details/Specifications:</strong></h5>
                    <h5> { project.description } </h5> 
                </div> 
                <div class="detail-items">
                    <hr/>  
                    <h5><strong>Contract Duration:</strong></h5>
                    <h5>{ project.duration } months</h5> 
                </div> 
                <div class="detail-items">
                    <hr/>  
                    <h5><strong>Budget:</strong></h5>
                    <h5>{ project.budget }</h5> 
                </div> 
                <div class="detail-items">
                    <hr/>  
                    <h5><strong>Status:</strong></h5>
                    <h5> {project.status} </h5>
                    <h5> Started: {project.createdAt} </h5>
                    <h5> Te completed:  </h5>
                </div>

                <div class="detail-items">
                    <hr/>
                    <h5><strong>Payment Installments</strong></h5>
                    <table class="table">
                        {project.payments && project.payments.map(payment =>(
                            <tr>
                                <td>{payment.date}</td>
                                <td>${payment.amount}</td>
                            </tr>                                
                        ))}
                        <tr>
                            <td>29th May, 2022</td>
                            <td>50,000</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>$100,000</th>
                        </tr>
                    </table>
                    <button className='button' type="submit">Close</button>
                </div>

            </div>
        </Fragment>
           
    )
}

export default ProjectDetails
