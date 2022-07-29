import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { clearErrors, getProjectDetails, updateProject } from '../../actions/projectActions'

import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import { UPDATE_PROJECT_RESET } from '../../constants/projectConstants'

const UpdateProject = ({ match, history }) => {

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
    const [payAmount, setPayAmount] = useState('')
    const [payComment, setPayComment] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, project } = useSelector(state => state.projectDetails)
    const { loading, error:updateError, isUpdated } = useSelector(state => state.project)

    const projectId = match.params.id

    const statusList = [
        'Pending',
        'In Progress',
        'Completed',
    ]

    const categories = [
        'Drawings',
        'Construction'
    ]

    useEffect(()=>{

        if(project && project._id !== projectId){
            dispatch(getProjectDetails(projectId))
        } else {
            setTitle(project.title)
            setClient(project.client)
            setContactName(project.contact.name)
            setPhoneNumber(project.contact.phone)
            setEmail(project.contact.email)
            setAddress(project.contact.address)
            setDescription(project.description)
            setDuration(project.duration)
            setBudget(project.budget)
            setPayments(project.payments)
            setCategory(project.category)
            setStatus(project.status)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if(isUpdated){
            history.push('/admin/projects');
            alert.success('Project updated successfully')
            dispatch({ type: UPDATE_PROJECT_RESET})
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, project, projectId])

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
        formData.set('payments', JSON.stringify(payments))
        formData.set('title', title)
        formData.set('description', description)
        formData.set('duration', duration)
        formData.set('budget', budget)
        formData.set('category', category)
        formData.set('status', status)

        dispatch(updateProject(project._id, formData))
    }

    function removePayment(deleteIndex) {
        setPayments(payments.filter((_, index) => index !== deleteIndex));
    }

    function addPayment(){
        let date = Date.now();
        
        setPayments([...payments, {amount:payAmount, comment:payComment, date}])
        setPayAmount('')
        setPayComment('')
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
                            <h1 className="mb-4">{project.title}</h1>

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
                            <div class="form-group col px-0">
                                <label htmlFor="payments">Payment Installment</label>
                                <div class="input-group mb-3">
                                    <input type="number" placeholder='₦0.00' id="p_amount" className="form-control" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} />
                                    <textarea rows="1" placeholder='comment' id="p_comment" className="form-control" value={payComment} onChange={(e) => setPayComment(e.target.value)} />
                                    <button class="btn btn-secondary mt-0" type="button" id="button-addon2"
                                    onClick={()=> addPayment()}>Add</button>
                                </div>
                                <div class="list-group">
                                    { payments.map((payment, index) => (
                                        <li class="list-group-item list-group-item-action d-flex justify-content-between" key={index}>
                                            <span className="my-auto mr-3">{payment.amount.toLocaleString()}</span>
                                            <span className="my-auto">{new Date(payment.date).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            <button class="btn btn-secondary mt-0 float-right fa fa-trash" 
                                            type="button" onClick={()=> removePayment(index)}></button>
                                        </li>
                                    ))}
                                </div>
                            </div> 
                
                
                            <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={ loading }
                            >
                            UPDATE
                            </button>
                
                        </form>
                    </div>
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}

export default UpdateProject
