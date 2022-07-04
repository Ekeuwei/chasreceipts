import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, newProject } from '../../actions/projectActions'

import MetaData from '../layout/MetaData'

import { NEW_PROJECT_RESET } from '../../constants/projectConstants'

const NewProject = ({ history }) => {
    const [client, setClient] = useState('')
    const [contact, setContact] = useState({})
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [budget, setBudget] = useState('')
    const [payments, setPayments] = useState([])

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newProject)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(success){
            history.push('/');
            alert.success('Project created successfully')
            dispatch({ type: NEW_PROJECT_RESET})
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('client', client)
        formData.set('contact', JSON.stringify({
            name:contact, 
            phone: phoneNumber,
            email: email,
            address: address
        }))
        formData.set('title', title)
        formData.set('description', description)
        formData.set('duration', duration)
        formData.set('budget', budget)
        dispatch(newProject(formData))
    }
    
    return (
        <Fragment>
            <MetaData title={'Update Project'} />
            <div className="wrapper"> 
                <form className="project-form" onSubmit={submitHandler} encType='multipart/form-data'>
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
                          value={contact.name}
                          onChange = {(e) => setContact(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          className="form-control"
                          value={contact.phoneNumber}
                          onChange = {(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          id="email"
                          className="form-control"
                          value={contact.email}
                          onChange = {(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          id="address"
                          className="form-control"
                          value={contact.address}
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
                        <label htmlFor="payments">Payment Installment</label>
                        <input
                          type="number"
                          id="payments"
                          className="form-control"
                          value={payments}
                          onChange={(e) => setPayments(e.target.value)}
                        />
                      </div>
        
          
                    <div className="submit-button">
                        <button
                        id="login_button"
                        type="submit"
                        className="button"
                        >
                        Create
                        </button>
                    </div>
        
                  </form>
            </div>
            
        </Fragment>
    )
}

export default NewProject
