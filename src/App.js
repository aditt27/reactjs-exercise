import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main, NoPage } from './layouts/Main';
import { About } from './layouts/About'
import { Home } from './layouts/Home';
import { University } from './layouts/University';
import { Holiday } from './layouts/Holiday';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.min.css';


const App = ()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="findUniversity" element={<University />} />
          <Route path="publicHoliday" element={<Holiday />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
