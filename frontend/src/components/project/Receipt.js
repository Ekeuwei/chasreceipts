import React, { Fragment } from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };

function getBalance(project){
    const totalPaid = project.payments.map(payment => payment.amount)
                                        .reduce((a, b) => a + b, 0)
    return project.budget - totalPaid
}

const styles = StyleSheet.create({
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
    centerAlign:{
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
    },
    tableFirstColumn: {
        width: '70%'
    }
})


const Receipt = ({project}) => {
  return (
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
                        <View style={styles.centerAlign}>
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
                                <Text style={styles.tableFirstColumn}>{project.description}</Text>
                                <Text style={styles.centerAlign}>{project.budget.toLocaleString()}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.invoicedetails}>
                        <Text style={styles.p_heading}>PAYMENTS</Text>
                        <View style={styles.table}>
                            <View style={styles.t_row}>
                                <Text>Payment Date</Text>
                                <Text>Amount</Text>
                            </View>
                            {project.payments.size===0? 
                            <Fragment> 
                                {project.payments.map( payment =>(
                                    <View style={styles.t_row}>
                                        <Text style={styles.tableFirstColumn}>{new Date(payment.date).toLocaleDateString('en-us', dateFormat)}</Text>
                                        <Text style={styles.centerAlign}>{payment.amount.toLocaleString()}</Text>
                                    </View>
                                ))}
                            </Fragment> : <View style={{margin:'10 auto'}}> <Text>No Previous payments</Text> </View>}
                            <View style={styles.t_row}>
                                <Text>Balance</Text>
                                <Text>{getBalance(project).toLocaleString()}</Text>
                            </View>

                        </View>
                    </View>
                </View>
                
            </Page>  
            
        </Document> 
  )
}

export default Receipt