import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import firebaseConfig from './authentication/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';

import store from './store'
import { Provider } from 'react-redux'
import Message from './Pages/Message/Message';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/> ,
  },
  {
    path: "/msg",
    element: <Message/> ,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
