import axios from 'axios'

import {
    ALL_PROJECTS_REQUEST,
    ALL_PROJECTS_SUCCESS,
    ALL_PROJECTS_FAIL,

    PROJECTS_DETAILS_REQUEST,
    PROJECTS_DETAILS_SUCCESS,
    PROJECTS_DETAILS_FAIL,

    ADMIN_PROJECTS_REQUEST,
    ADMIN_PROJECTS_SUCCESS,
    ADMIN_PROJECTS_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,

    NEW_PROJECT_REQUEST,
    NEW_PROJECT_SUCCESS,
    NEW_PROJECT_FAIL,

    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAIL,

    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAIL,

    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,


    CLEAR_ERRORS

} from '../constants/projectConstants'

export const getProjects = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PROJECTS_REQUEST })

        let link = `/api/v1/projects?keyword=${keyword}&page=${currentPage}`

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PROJECTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PROJECTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newProject = (projectData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PROJECT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/admin/project/new`, projectData, config)

        dispatch({
            type: NEW_PROJECT_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error.response);
        dispatch({
            type: NEW_PROJECT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete project (Admin)
export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PROJECT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/project/${id}`)

        dispatch({
            type: DELETE_PROJECT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PROJECT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Project (Admin)
export const updateProject = (id, projectData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROJECT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/project/${id}`, projectData, config)

        dispatch({
            type: UPDATE_PROJECT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROJECT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProjectDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROJECTS_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/project/${id}`)

        dispatch({
            type: PROJECTS_DETAILS_SUCCESS,
            payload: data.project
        })

    } catch (error) {
        dispatch({
            type: PROJECTS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review/`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminProjects = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PROJECTS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/projects`)

        dispatch({
            type: ADMIN_PROJECTS_SUCCESS,
            payload: data.projects
        }) 

    } catch (error) {
        dispatch({
            type: ADMIN_PROJECTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Get project revires
export const getProjectsReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        }) 

    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Get project revires
export const deleteReview = (id, projectId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&projectId=${projectId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        }) 

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
