import React, { Fragment, useEffect } from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import {MobileView, BrowserView} from 'react-device-detect'

import { useDispatch, useSelector } from 'react-redux'
import { getProjectDetails } from '../../actions/projectActions'
import Receipt from './Receipt';

const ReceiptInvoice = ({ match }) => {

    const dispatch = useDispatch();

    const { project } = useSelector(state => state.projectDetails)

    useEffect( ()=>{

        dispatch(getProjectDetails(match.params.id))

    }, [dispatch, match.params.id])


    return (
        <Fragment>

            <MobileView>
                <PDFDownloadLink document={<Receipt project={project}/>} fileName={`Receipt - ${project.title}`}>
                    {({ blob, url, loading, error }) =>
                        <div id='centerButton'>
                           { loading ? 'Loading document...' : 'Download now!'}
                        </div>
                    }
                </PDFDownloadLink>
            </MobileView>

            <BrowserView>
                <PDFViewer style={{ width: window.innerWidth, height: window.innerHeight}}>
                    <Receipt project={project}/>
                </PDFViewer>
            </BrowserView>
            
        </Fragment>           
    )
}

export default ReceiptInvoice
