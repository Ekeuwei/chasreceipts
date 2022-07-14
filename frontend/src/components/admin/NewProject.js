import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, newProject } from '../../actions/projectActions'

import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'

import { NEW_PROJECT_RESET } from '../../constants/projectConstants'

const NewProject = ({ history }) => {
    const [client, setClient] = useState('')
    const [contactName, setContactName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [budget, setBudget] = useState('')
    const [payments, setPayments] = useState([])
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')

    const statusList = [
        'Pending',
        'In Progress',
        'Completed',
    ]

    const categories = [
        'Drawings',
        'Construction'
    ]

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newProject)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(success){
            history.push('/admin/projects');
            alert.success('Project created successfully')
            dispatch({ type: NEW_PROJECT_RESET})
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('client', client)
        formData.set('contact', JSON.stringify({
            name:contactName, 
            phone: phoneNumber,
            email: email,
            address: address
        }))
        formData.set('payments', JSON.stringify([{amount: payments}]))
        formData.set('title', title)
        formData.set('description', description)
        formData.set('duration', duration)
        formData.set('budget', budget)
        formData.set('category', category)
        formData.set('status', status)
        dispatch(newProject(formData))
    }
    
    return (
        <Fragment>
            <MetaData title={'Update Project'} />
            <div className="row">
                <div className="col-l2 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-9">
                    <Fragment>
                    <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4">New Project</h1>

                            <div className="form-group">
                                <label htmlFor="client">Client</label>
                                <input
                                type="text"
                                id="client"
                                className="form-control"
                                value= {client}
                                onChange = {(e)=> setClient(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact">Contact Person</label>
                                <input
                                type="text"
                                id="contact"
                                className="form-control"
                                value={contactName}
                                onChange = {(e) => setContactName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                type="tel"
                                id="phone"
                                className="form-control"
                                value={phoneNumber}
                                onChange = {(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                type="text"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange = {(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={address}
                                onChange = {(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Project Title</label>
                                <input
                                type="text"
                                id="title"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select className="form-control" id="category_field" value={category} 
                                    onChange={(e)=> setCategory(e.target.value)}>
                                    {categories.map(category =>(
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea 
                                    className="form-control" 
                                    id="description" 
                                    rows="8" 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                
                            <div className="form-group">
                                <label htmlFor="duration">Project Duration (In month)</label>
                                <input
                                type="number"
                                id="duration"
                                className="form-control"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="budget">Budget</label>
                                <input
                                type="number"
                                id="budget"
                                className="form-control"
                                value={budget}
                                onChange= {(e) => setBudget(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category_field">Status</label>
                                <select className="form-control" id="category_field" value={status} 
                                    onChange={(e)=> setStatus(e.target.value)}>
                                    {statusList.map(status =>(
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="payments">Payment Installment</label>
                                <input
                                type="number"
                                id="payments"
                                className="form-control"
                                value={payments}
                                onChange={(e) => setPayments(e.target.value)}
                                />
                            </div>
                
                
                            <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={ loading }
                            >
                            CREATE
                            </button>
                
                        </form>
                    </div>
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}

export default NewProject
