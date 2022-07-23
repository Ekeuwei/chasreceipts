import React, { Fragment, useEffect, useState } from 'react'
import { PDFViewer, Font, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';

import { useDispatch, useSelector } from 'react-redux'
import { getProjectDetails } from '../../actions/projectActions'

const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };

function getDurationDate(date, duration){
    const dateObj = new Date(date).setDate(new Date().getDate() + (duration * 30))
    return new Date(dateObj).toLocaleDateString('en-us', dateFormat)
}

function getBalance(project){
    const totalPaid = project.payments.map(payment => payment.amount)
                                        .reduce((a, b) => a + b, 0)
    return project.budget - totalPaid
}

Font.register({ 
    family: 'Lato', 
    src: 'https://fonts.googleapis.com/css2?family=BIZ+UDGothic&family=Lato:wght@300;400;700&display=swap', 
    fontStyle: 'normal', 
    fontWeight: 'normal'
});
const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth, 
        height: window.innerHeight,
    },
    page: {
        lineHeight: 1.25,
        fontSize: '14px'
      },
    h1:{
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px'
    },
    h5:{
        // fontSize: '18px',
        fontWeight: 'normal'
    },
    h5Bold: {
        // fontSize: '18px',
        fontWeight: 'bold'
    },
    h5First:{
        // fontSize: '18px',
        fontWeight: 700,
        margin: 'auto 0'
    },
    invoice: {
        padding: '10px',
        // backgroundColor: 'white',
        // margin: 'auto'
    },
    invoice_heading: {
        color: 'black'
    },
    address_head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',
        marginBottom: '10px',
        background: '#fff',
        fontWeight: 400
    },
    client_address: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '10px',
        marginBottom: '10px',
        fontWeight: 400,
        backgroundColor: '#1B6B98',
        borderRadius: '10px',
        color: 'rgba(255, 255, 255, .95)'
    },
    contractDetails:{
        margin: 'auto 0'
    },
    clientAddress:{
        margin: '5px 0',
        width: '200px'
    },
    right: {
        textAlign: 'right',
    },
    table:{
        display: 'flex',
        flexDirection: 'column',
        margin: '10px'
    },
    t_row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    p_heading: {
        margin: '10px 10px 0',
    }
})

const ReceiptInvoice = ({ match }) => {

    const dispatch = useDispatch();

    const { project } = useSelector(state => state.projectDetails)
    const { user } = useSelector(state => state.auth)

    useEffect( ()=>{

        dispatch(getProjectDetails(match.params.id))

    }, [dispatch, match.params.id])


    return (
        <PDFViewer style={styles.viewer}>
            <Document title={`Invoice - ${project.title}`} author='Contemporary Homes and Styles' subject={project.title}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.invoice}>
                        <View style={styles.invoice_heading}>
                            <Text style={styles.h1}>Payment Invoice</Text>                        
                            <View style={styles.address_head}>
                                <View style={styles.h5First}><Text>Contemporary Homes and Styles</Text></View>
                                <View style={styles.clientAddress}>
                                    <Text style={styles.right}>17 Baybridge Road, Kpansia</Text>
                                    <Text style={styles.right}>Yenagoa, Bayelsa State</Text>
                                    <Text style={styles.right}>info@chas.com</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.client_address}>
                            <View style={styles.contractDetails}>
                                <Text style={styles.h5Bold}>Invoice Number</Text>
                                <Text style={{marginBottom:'10px'}}>{project._id}</Text>
                                <Text style={styles.h5Bold}>Issue Date</Text>
                                <Text style={styles.h5}>{new Date().toLocaleDateString('en-us', dateFormat)}</Text>
                            </View>
                            <View style={styles.clientAddress}>
                                <Text style={styles.right}>{project.client}</Text>
                                <Text style={styles.right}>{project.contact.address}</Text>
                                <Text style={styles.right}>{project.contact.email}</Text>
                                <Text style={styles.right}>{project.contact.phone}</Text>
                            </View>

                        </View>

                        <View style={styles.invoicedetails}>
                            <View style={styles.table}>
                                <View style={styles.t_row}>
                                    <Text>Service Description</Text>
                                    <Text>Cost</Text>
                                </View>
                                <View style={styles.t_row}>
                                    <Text>{project.description}</Text>
                                    <Text>{project.budget}</Text>
                                </View>

                            </View>
                        </View>

                        <View style={styles.invoicedetails}>
                            <Text style={styles.p_heading}>PAYMENTS</Text>
                            <View style={styles.table}>
                                {console.log(project)}
                                <View style={styles.t_row}>
                                    <Text>Payment Date</Text>
                                    <Text>Amount</Text>
                                </View>
                                {project.payments.map( payment =>(
                                    <View style={styles.t_row}>
                                        <Text>{new Date(payment.date).toLocaleDateString('en-us', dateFormat)}</Text>
                                        <Text>{payment.amount.toLocaleString()}</Text>
                                    </View>
                                ))}
                                <View style={styles.t_row}>
                                    <Text>Balance</Text>
                                    <Text>{getBalance(project).toLocaleString()}</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    
                </Page>  
                
            </Document> 

        </PDFViewer>
           
    )
}

export default ReceiptInvoice
