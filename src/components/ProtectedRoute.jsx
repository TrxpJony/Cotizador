import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

const cookies = new Cookies();

const ProtectedRoute = ({ element, allowedRole }) => {
  const userRole = cookies.get('rol'); // Obtener el rol del usuario

  if (userRole !== allowedRole) {
    // Si el rol no coincide, redirige a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }

  // Si el rol coincide, renderiza el componente permitido
  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  allowedRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;
