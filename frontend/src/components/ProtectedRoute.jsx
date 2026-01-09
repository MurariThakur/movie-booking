import { useAppContext } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect, useRef } from 'react';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAppContext();
  const toastShown = useRef(false);

  useEffect(() => {
    if (isAdmin === false && !toastShown.current) {
      toast.error("You are not authorized to access this page");
      toastShown.current = true;
    }
  }, [isAdmin]);

  if (isAdmin === null) return <Loading />;
  if (isAdmin === false) return <Navigate to="/" replace />;
  
  return children;
};

export default ProtectedRoute;