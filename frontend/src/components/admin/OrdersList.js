import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllOrders, clearErrors, deleteOrder } from '../../actions/orderActions'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrdersList = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.allOrders)
    const { isDeleted } = useSelector(state => state.order)

    useEffect(()=>{
        dispatch(getAllOrders())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Order deleted successfully')
            history.push('/admin/orders')
            dispatch({type: DELETE_ORDER_RESET})
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                }, {
                    label: 'No of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                        ?<p style={{color: 'green'}}>{order.orderStatus}</p>
                        :<p style={{color: 'red'}}>{order.orderStatus}</p>,
                actions: <Fragment>
                            <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-eye"></i>
                            </Link>
                            <button className="btn btn-danger py-1 px2 ml-2" onClick={ () => deleteOrderHandler(order._id) } >
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>                   

            })
        })

        return data;
    }
    
    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-l2 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-9">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading? <loader /> : (
                            <MDBDataTable 
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}

export default OrdersList
