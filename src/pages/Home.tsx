import Header from '../components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") {
      navigate('/posts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
