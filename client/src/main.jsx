import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as ReactDOM from "react-dom/client";
import About from './Components/About.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import Altsearch from './Components/Altsearch.jsx';

import AltSearchComponent from "./Components/AltSearchComponent.jsx";
import DownloadPage from './Components/DownloadPage.jsx';
import HelpPage from './Components/HelpPage.jsx';
import AdminPanel from './Components/AdminPanel.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/> ,
  },
  {
    path: "/about",
    element: <About/> ,
  },
  {
    path: "/navbar-test",
    element: <Navbar/> ,
  },
  {
    path: "/altsearch",
    element: <Altsearch/> ,
  },
  {
    path: "/searchtest",
    element: <AltSearchComponent/> ,
  },
  {
    path: "/downloadpage/:id",
    element: <DownloadPage /> ,
  },
  {
    path: "/help/:id",
    element: <HelpPage/> ,
  },
  {
    path: "/adminpanel",
    element: <AdminPanel/> ,
  },

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
      <RouterProvider router={router} />
  </StrictMode>,
)
