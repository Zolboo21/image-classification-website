import React from "react";
import '../sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Image Search</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">Home</li>
                        <li className="sidebarListItem">How to do</li>
                        <li className="sidebarListItem">Option</li>
                    </ul>
                </div>
            </div>
        </div>
        )
}

export default Sidebar;