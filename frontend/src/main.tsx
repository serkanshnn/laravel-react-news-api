import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import Router from "./router/Router.tsx";
import './plugins/axios';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router/>
        </QueryClientProvider>
    </React.StrictMode>
)
