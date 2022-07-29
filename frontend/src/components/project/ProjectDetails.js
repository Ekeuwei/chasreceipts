import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';

import { useDispatch, useSelector } from 'react-redux'
import { getProjectDetails } from '../../actions/projectActions'

const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function getDurationDate(date, duration){
    const dateObj = new Date(date).setDate(new Date().getDate() + (duration * 30))
    return new Date(dateObj).toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})
}

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
                    <h2 className="mt-3 text-center text-lg-left">{ project.title }</h2>
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
                    <h5>₦{ project.budget && project.budget.toLocaleString() }</h5> 
                </div> 
                <div class="detail-items">
                    <hr/>  
                    <h5><strong>Status:  </strong> {project.status}</h5>
                    <h5><strong> Started on:  </strong>{new Date(project.createdAt).toLocaleDateString('en-us', dateFormat)} </h5>
                    <h5><strong>To be completed:  </strong> { `${getDurationDate(project.createdAt, project.duration)}` }</h5>
                </div>

                <div class="detail-items">
                    <hr/>
                    <h5><strong>Payment Installments</strong></h5>
                    <table class="table">
                        {project.payments && project.payments.map(payment =>(
                            <tr>
                                <td className="pl-0">{new Date(payment.date).toLocaleDateString('en-us', dateFormat)}</td>
                                <td className="text-right">₦{payment.amount.toLocaleString()}</td>
                            </tr>                                
                        ))}
                        <tr>
                            <th className="pl-0">Total</th>
                            <th className="text-right">₦{ project.payments && project.payments.map(v => v.amount).reduce((a, b) => a + b, 0).toLocaleString()}</th>
                        </tr>
                    </table>
                    <Link to={`invoice/${project._id}`} className="btn mb-2" id="login_btn">Generate Invoice</Link>
                    {/* <button id="login_button" className="btn btn-block py-3" type="submit">Close</button> */}
                </div>

            </div>
        </Fragment>
           
    )
}

export default ProjectDetails
