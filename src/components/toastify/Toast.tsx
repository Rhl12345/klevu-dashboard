'use client';
import { ToastContainer } from 'react-toastify';

const Toast = () => {
    return <ToastContainer autoClose={5000} position="top-center" closeButton stacked />;
};

export default Toast;