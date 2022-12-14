import { Outlet, Navigate } from 'react-router-dom';
import { TokenRepository } from 'repository/TokenRepository';

function PrivateRoute() {
    const access = TokenRepository.getToken();
    return access ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute;
