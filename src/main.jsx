import * as React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider} from "@heroui/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
          <App />
      </HeroUIProvider>
    </BrowserRouter>
  </React.StrictMode>
)




