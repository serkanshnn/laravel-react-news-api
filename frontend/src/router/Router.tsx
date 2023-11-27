import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundPage from "./NotFoundPage.tsx";
import Login from "../pages/Login.tsx";

const Layout = React.lazy(() => import("../layouts/Layout"));
const Home = React.lazy(() => import("../pages/Home"));


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"profile"} element={<Home/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"register"} element={<Register/>}/>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
