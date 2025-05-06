import { Navigate } from "react-router-dom"; // Untuk melakukan navigasi
import PropTypes from 'prop-types';


const ProtectedRoute = ({ isAuthenticated, children }) => { // Perbaikan disini
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Validasi prop 'isAuthenticated' dan 'children'
ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // Menambahkan validasi tipe prop untuk isAuthenticated
  children: PropTypes.node.isRequired, // Menambahkan validasi tipe prop untuk children
};

export default ProtectedRoute;
