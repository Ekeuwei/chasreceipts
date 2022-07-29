import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearErrors, deleteProject, getAdminProjects } from '../../actions/projectActions'

import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import { DELETE_PROJECT_RESET } from '../../constants/projectConstants'

const ProjectsList = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, projects } = useSelector(state => state.projects)
    const { error: deleteError, isDeleted } = useSelector(state => state.project)

    useEffect(()=>{
        dispatch(getAdminProjects())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Project deleted successfully')
            history.push('/admin/projects')
            dispatch({type: DELETE_PROJECT_RESET})
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setProjects = () => {
        const data = {
            columns: [
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                    // attributes: {className:'d-none d-md-block'}
                },
                {
                    label: 'Client',
                    field: 'client',
                    sort: 'asc'
                },
                {
                    label: 'Budget',
                    field: 'budget',
                    sort: 'asc'
                }, {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        projects.forEach(project => {
            data.rows.push({
                title: project.title,
                client: project.client,
                budget: `₦${project.budget.toLocaleString()}`,
                status: project.status,
                actions: <Fragment>
                            <Link to={`/admin/project/${project._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                            <button className="btn btn-danger py-1 px2 ml-2" onClick={()=> deleteProjectHandler(project._id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    

            })
        })

        return data;
    }

    const deleteProjectHandler = (id)=>{
        dispatch(deleteProject(id))
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
                        <h1 className="my-5">All Projects</h1>

                        {loading? <loader /> : (
                            <MDBDataTable 
                                data={setProjects()}
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

export default ProjectsList
