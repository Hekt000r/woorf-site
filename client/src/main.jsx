import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as ReactDOM from "react-dom/client";
import About from './Components/About.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import Altsearch from './Components/Altsearch.jsx';
import SearchComponent from './Components/searchComponent.jsx';
import AltSearchComponent from "./Components/AltSearchComponent.jsx";
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
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
      <RouterProvider router={router} />
  </StrictMode>,
)
