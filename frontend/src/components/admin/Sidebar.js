import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <div className="menu-toggle">
                    <a href="#menu" data-toggle="collapse" aria-expanded="false"> 
                        <span className="title">Menu</span> 
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
                <ul className="list-unstyled components collapse" id="menu">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>
            
                    <li>
                        <a href="#projectSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-project-hunt"></i> Projects </a>
                        <ul className="collapse list-unstyled" id="projectSubmenu">
                            <li>
                            <Link to="/admin/projects"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/project"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>
            
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
