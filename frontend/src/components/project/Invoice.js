import React, { Fragment, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';

import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors, newReview } from '../../actions/projectActions'
import { addItemToCart } from '../../actions/cartActions';
import { NEW_REVIEW_RESET } from '../../constants/projectConstants';
import ListReviews from '../reviews/ListReviews';

const ProductDetails = ({ match, history }) => {

    const dispatch = useDispatch();

    const {loading, project, error} = useSelector(state => state.projectDetails)
    const { user } = useSelector(state => state.auth)

    useEffect( ()=>{

        dispatch(getProductDetails(match.params.id))

    }, [dispatch, match.params.id])


    return (
        <Fragment>
            {loading? <Loader /> : (
            <Fragment>
                <MetaData title = { project.title } />
                <div class="invoice">
                    <div class="invoice-heading">
                        <h1>{ project.title }</h1>
                        <div class="address-head">
                            <h5><strong>Contemporary Homes and Styles</strong></h5>
                            <div class="address">
                                <h5>17 Baybridge Road, Kpansia</h5>
                                <h5>Yenagoa, Bayelsa State</h5>
                                <h5>info@contemporary.com</h5>
                            </div>
                        </div>
                    </div>
                    <div class="client-address">
                        <div class="contract-details">
                            <h5><strong>Invoice Number</strong></h5>
                            <h5>{ project._id }</h5>
                            <br/>
                            <h5><strong>Issue Date</strong></h5>
                            <h5>{ project.createdAt }</h5>
                        </div>
                        <div class="c-address">
                            <h5><strong>Billed To</strong></h5>
                            <h5>{ project.client }</h5>
                            <h5>{ project.address }</h5>
                            <h5>Agudama-Epie</h5>
                            <h5>Yenagoa, Bayelsa State</h5>
                            <h5>{ project.contact.email }</h5>
                            <h5>{ project.contact.phone }</h5>
                        </div>
                    </div>
                    <div class="invoice-details">
                        <table class="table">
                            <tr>
                                <th>Service Description</th>
                                <th>Cost</th>
                            </tr>
                            {project.quotation && project.quotation.map(quote => (
                                <Fragment>                                
                                    <tr>
                                        <td>{quote.name}</td>
                                        <td>`$${quote.cost}`</td>
                                    </tr>
                                </Fragment>
                            ))}
                            <tr>
                                <td>Value Added Tax</td>
                                <td>$70</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>$232,450</td>
                            </tr>
                            <tr>
                                <td>Total Installments</td>
                                <td>$100,000</td>
                            </tr>
                            <tr>
                                <td>Amount Paid</td>
                                <td>$50,000</td>
                            </tr>
                            <tr>
                                <td>Balance</td>
                                <td>$82,450</td>
                            </tr>
                        </table>
                    </div>
                    <div class="installemts">
                        <h4>Previouse Installments</h4>
                        <table class="table">
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td>16th January, 2022</td>
                                <td>$50,000</td>
                            </tr>
                            <tr>
                                <td>29th May, 2022</td>
                                <td>50,000</td>
                            </tr>
                        </table>
                    </div>
                </div> 
            
            </Fragment>
        )}
        </Fragment>
           
    )
}

export default ProductDetails
