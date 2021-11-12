import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateReservations from './components/CreateReservations';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Reservations from './components/Reservations';
import { Provider } from 'react-redux';
import configureStore from './utils/redux/store/configureStore';

const reduxStore = configureStore();

function App() {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <div>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/reslist" element={<Reservations />} />
            <Route path="/createres" element={<CreateReservations />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
