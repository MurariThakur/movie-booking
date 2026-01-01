import { memo } from 'react';

import { Toaster } from 'react-hot-toast';
import AppRoutes from '../src/route/AppRoutes';

const App = () => {
  return (
    <>
    <Toaster />
    <AppRoutes />
    </>
  );
};

export default App;