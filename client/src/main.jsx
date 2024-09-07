import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import About from './Components/About.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import Altsearch from './Components/Altsearch.jsx';

import AltSearchComponent from "./Components/AltSearchComponent.jsx";
import DownloadPage from './Components/DownloadPage.jsx';
import DownloadLinks from './Components/helppages/DownloadLinks.jsx';
import AdminPanel from './Components/AdminPanel.jsx';
import GameFinder from './Components/GameFinder.jsx';
import AboutGameFinder from './Components/helppages/AboutGameFinder.jsx';
import Categories from './Components/Categories.jsx';
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
    path: "/help/downloadlinks",
    element: <DownloadLinks/> ,
  },
  {
    path: "/adminpanel",
    element: <AdminPanel/> ,
  },
  {
    path: "/GameFinder",
    element: <GameFinder/> ,
  },
  {
    path: "/about/GameFinder",
    element: <AboutGameFinder/> ,
  },
  {
    path: "/categories",
    element: <Categories/> ,
  },

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
      <RouterProvider router={router} />
  </StrictMode>,
)
