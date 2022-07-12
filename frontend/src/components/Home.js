import React, { Fragment, useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the default design of the slider

import MetaData from './layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../actions/projectActions'
import Project from './project/Project'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 100000]);
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Electronics',
        'Camera',
        'Laptop',
        'Accessories',
        'Headphones',
        'Mobile Phones',
        'Books',
        'Food',
        'Clothes/Shoes',
        'Beauthy/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const alert = useAlert();
    
    const dispatch = useDispatch();

    const {  loading, projects, error, projectsCount, resPerPage, filteredProjectsCount } = useSelector(state => state.projects)

    const keyword = match.params.keyword

    useEffect( ()=> {

        if(error){
            return  alert.error(error)
        }
         
        dispatch(getProjects(keyword, currentPage, price, category, rating))        

    }, [dispatch, alert, error, keyword, currentPage, category, price, rating])

    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    }

    let count = projectsCount;
    if(keyword){
        count = filteredProjectsCount
    }



    return (
        <Fragment>
            {loading? <Loader /> : (            
                <Fragment>        
                    <MetaData title= {'Buy Best Projects Online'} />
                    {
                      keyword? 
                      (<h1 id="projects_heading">Search Results</h1>):
                      (<h1 id="projects_heading">Latest Projects</h1>)
                    }
                    

                    <section id="projects" className="container mt-5">
                        <div className="row">
                          {
                            projects && projects.map(project => (
                                        <Project key={project._id}  project = { project } col={3} />                  
                                    ))
                          }                            
                        
                        </div>
                    </section>
                    
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination 
                                activePage = {currentPage}
                                itemsCountPerPage = {resPerPage}
                                totalItemsCount = {projectsCount}
                                onChange = {setCurrentPageNo}
                                nextPageText = {'Next'}
                                prevPageText = {'Prev'}
                                firstPageText = {'First'}
                                lastPageText = {'Last'}
                                itemClass = "page-items"
                                linkClass = "page-link"
                            />
                        </div>
                    )}
                    

                </Fragment>
            )}
        </Fragment>
        
        
    )
}

export default Home
