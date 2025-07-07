import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types";
import { useAuth } from "../contexts/FakeAuthContext"

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();

    useEffect(function() {
        if (!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
}
ProtectedRoute.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoute