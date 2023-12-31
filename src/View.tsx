import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

import appRoutes from './routes/appRoutes';
import { useAuth } from './contexts';

const ProtectedRoute = () => {
  const auth = useAuth();
  console.log(auth.isLoggedIn());
  // return auth.isLoggedIn() ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={appRoutes.loginPage} replace />
  // );
  return auth.isLoggedIn() ? (
    <Outlet />
  ) : (
    <Navigate to={appRoutes.loginPage} replace />
  );
};

const View = () => {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path={appRoutes.mainPage} element={<ProtectedRoute />}>
          <Route path="" element={<MainPage />} />
        </Route>
        <Route path={appRoutes.loginPage} element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default View;
