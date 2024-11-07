import axios from 'axios';

// Get the access token and refresh token from local storage
const accessToken = localStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token');

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

// Add the access token to the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle 401 errors (unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Retry the request if the response status is 401 (unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get a new access token using the refresh token
        const data = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        console.log(data);
        // Save the new access token to local storage
        localStorage.setItem('access_token', data.data.access);

        // Add the new access token to the request headers and retry the original request
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.data.access}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // Handle the error
        console.error(error);
        if(error.response.status == 401){
            localStorage.clear();
            window.location.href = '/login/';
        }
      }
    }

    // Return the error if it cannot be handled
    return Promise.reject(error);
  }
);


export default axiosInstance;