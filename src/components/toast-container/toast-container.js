import React from 'react';
import { ToastContainer } from 'react-toastify';

const Toast = () => (
  <ToastContainer
    position="top-center"
    autoClose={3000}
    limit={2}
    pauseOnFocusLoss
    hideProgressBar
    pauseOnHover
    closeOnClick
    newestOnTop
    draggable
  />
);

export default Toast;
