import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import EntryCreate from './EntryCreate';
import Login from './Login';
import EntryThread from './EntryThread';
import NavBar from './NavBar';

ReactDOM.render(
    <div>
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path={"/"} element={<App />}/>
                <Route path={"/login"} element={<Login />} />
                <Route path={"/entry"} element={<EntryCreate />}/>
                <Route path={"/entry/:entryID"} element={<EntryThread />} />
            </Routes>
        </BrowserRouter>

    </div>
    ,
    document.getElementById('root')
);
