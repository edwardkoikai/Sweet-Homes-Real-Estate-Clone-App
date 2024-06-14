import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
// import { createRoot } from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import Home from './pages/Home';
import {router} from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
