import React from 'react'
import BottomNavBar from './BottomNavBar'

const Layout = ({ children }) => {
    return (
        <div>
            <div className="Content" >
                {children}
            </div>
            <BottomNavBar />
        </div>
        
    )
}

export default Layout
