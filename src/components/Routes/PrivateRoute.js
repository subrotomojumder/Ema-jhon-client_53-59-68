import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    // console.log(location)
    if (loading) {
        return <h5>Loading.........</h5>
    }

    if(user && user.uid){
        return children;
    }

    return <Navigate to='/login' state={{from : location}} replace></Navigate>
};

export default PrivateRoute;