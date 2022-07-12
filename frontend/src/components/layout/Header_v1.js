import React, { Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Search from './Search'
import { logout } from '../../actions/userActions'

import '../../App.css'


const Header = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = ()=>{
        dispatch(logout());
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
        
        </Fragment>
    )
}

export default Header
