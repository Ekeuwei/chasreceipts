import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { getProjects } from '../actions/projectActions'
import Search from '../components/layout/Search'
import Project from './project/Project'

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1)
  
  const dispatch = useDispatch();

  const { projects, projectCount } = useSelector(state => state.projects);

  const keyword = match.params.keyword;
  
  useEffect( () => {
    
    dispatch(getProjects(keyword, currentPage))

  },[dispatch, currentPage, keyword])

  return (
    <Fragment>
            <div className="search">
                <h1>Contemporary Styles</h1>
                <div className="search-wrapper">
                  <Route render = {({ history }) => <Search history = { history } /> } />
                  <Link to={`/admin/project`} className="button">Add Project</Link>
                </div>
            </div>
            <div class="search-content">
                  {/* <h4>Recently Added</h4> */}
                  {projects && projects.map(project => (
                    <Project key={project._id} project = {project}/>
                  ))}              
          </div>
        
</Fragment>
  )
}

export default Home