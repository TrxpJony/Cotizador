import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

const cookies = new Cookies();

const ProtectedRoute = ({ element, allowedRole }) => {
  const userRole = cookies.get('rol'); // Obtener el rol del usuario

  // Permitir que allowedRole sea string o array
  const isAllowed = Array.isArray(allowedRole)
    ? allowedRole.includes(userRole)
    : userRole === allowedRole;

  if (!isAllowed) {
    // Si el rol no coincide, redirige a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }

  // Si el rol coincide, renderiza el componente permitido
  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  allowedRole: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
};

export default ProtectedRoute;
