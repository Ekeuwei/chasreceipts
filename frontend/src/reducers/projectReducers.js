import { 
    ALL_PROJECTS_REQUEST, 
    ALL_PROJECTS_SUCCESS, 
    ALL_PROJECTS_FAIL,
    
    PROJECTS_DETAILS_REQUEST,
    PROJECTS_DETAILS_SUCCESS,
    PROJECTS_DETAILS_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,

    NEW_PROJECT_REQUEST,
    NEW_PROJECT_SUCCESS,
    NEW_PROJECT_RESET,
    NEW_PROJECT_FAIL,

    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_RESET,
    DELETE_PROJECT_FAIL,

    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_RESET,
    UPDATE_PROJECT_FAIL,

    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_RESET,
    GET_REVIEWS_FAIL,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,

    ADMIN_PROJECTS_REQUEST,
    ADMIN_PROJECTS_SUCCESS,
    ADMIN_PROJECTS_FAIL,

    CLEAR_ERRORS    

} from '../constants/projectConstants'

export const projectsReducer = (state = { projects:[] }, action) => {
    switch (action.type) {
        case ALL_PROJECTS_REQUEST:
        case ADMIN_PROJECTS_REQUEST:
            return {
                loading: true,
                projects: []
            }

        case ADMIN_PROJECTS_SUCCESS:
            return {
                loading: false,
                projects: action.payload
            }

        case ALL_PROJECTS_SUCCESS:
            return {
                loading: false,
                projects: action.payload.projects,
                projectsCount: action.payload.projectsCount,
                resPerPage: action.payload.resPerPage,
                filteredProjectsCount: action.payload.filteredProjectsCount
            }

        case ALL_PROJECTS_FAIL:
        case ADMIN_PROJECTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }            
    
        default: 
            return state;
    }
}

export const projectDetailsReducer = (state = {project: {}}, action) => {
    switch (action.type) {
        case PROJECTS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PROJECTS_DETAILS_SUCCESS:
            return {
                loading: false,
                project: action.payload
            }
        
            case PROJECTS_DETAILS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }

            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
    
        default:
            return state;
    }
}

export const newProjectReducer = (state = { project: {} }, action) => {
    switch (action.type) {
        case NEW_PROJECT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PROJECT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                project: action.payload.project
            }
        
        case NEW_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_PROJECT_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}

export const projectReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PROJECT_REQUEST:
        case UPDATE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        
        case DELETE_PROJECT_FAIL:
        case UPDATE_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_PROJECT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_PROJECT_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}

export const projectReviewReducer = (state = [], action) => {
    switch (action.type) {
        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }
        
        case GET_REVIEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_REVIEWS_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}