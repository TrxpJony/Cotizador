import * as React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {NextUIProvider} from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
          <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
)




