import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateReservations from './components/CreateReservations';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Reservations from './components/Reservations';
import { Provider } from 'react-redux';
import configureStore from './utils/redux/store/configureStore';
import styled from 'styled-components';
import backgroundImage from './utils/img/restaurant-reservation.jpg';

const PageContainerWithBackground = styled.div`
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
  }
`;

const reduxStore = configureStore();

function App() {
  return (
    <PageContainerWithBackground>
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
    </PageContainerWithBackground>
  );
}

export default App;
