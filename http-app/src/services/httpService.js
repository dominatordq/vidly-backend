import axios from 'axios';
import * as Sentry from "@sentry/react";
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
  
    if (!expectedError) {
        Sentry.captureException(error);
        toast.error('An unexpected error occurred.');
    }
  
    return Promise.reject(error); // returns a rejected promise with the error
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}