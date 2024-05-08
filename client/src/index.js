import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Auth0ProviderWithNavigate } from "./Auth0ProviderWithNavigate";
import './index.css';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<BrowserRouter>
    <Auth0ProviderWithNavigate>
        <App/>
    </Auth0ProviderWithNavigate>
</BrowserRouter>);
