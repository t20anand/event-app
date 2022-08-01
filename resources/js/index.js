import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent';
import EventList from './components/EventList';
import EventTrashedList from './components/EventTrashedList';

ReactDOM.render((
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
      />

      <BrowserRouter>
        <div className="container">
          <br/>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card">
                {/* <div className="card-header"></div> */}
                <div className="card-body">
                  <Routes>
                    <Route exact path='/trash' element={<EventTrashedList/>} />
                    <Route exact path='/add' element={<AddEvent/>} />
                    <Route path='/edit' element={<EditEvent/>} />
                    <Route exact path='/' element={<EventList/>} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
), document.getElementById('root'));