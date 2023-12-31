import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteReview, getProductsReviews } from '../../actions/productActions'
import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'


const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, reviews } = useSelector(state => state.productReviews)
    const { isDeleted } = useSelector(state => state.review)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Review deleted successfully')
            dispatch({type: DELETE_REVIEW_RESET})
        }

        if(productId !== ''){
            dispatch(getProductsReviews(productId))
        }

    }, [dispatch, alert, error, productId, isDeleted])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getProductsReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                }, {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions: 
                        <button className="btn btn-danger py-1 px2 ml-2" onClick={() => deleteReviewHandler(review._id)} >
                            <i className="fa fa-trash"></i>
                        </button>

            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-l2 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label for="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="email_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        SEARCH
                                    </button>
                                </form>
                            </div>                
                        </div>
                        {reviews && reviews.length > 0? (
                            <MDBDataTable 
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ):(
                            <p className="mt-5 text-center">No Reviews</p>
                        )}
                        
                    </Fragment>
                </div>
            </div>

            
            
        </Fragment>
    )
}

export default ProductReviews
