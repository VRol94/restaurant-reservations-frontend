import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Alignment, Button, Classes } from '@blueprintjs/core';

const Navigation = () => {
  return (
    <Navbar className={Classes.DARK}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Restaurant Reservations</Navbar.Heading>
        <Navbar.Divider />
        <Link to="/">
          <Button className="bp3-minimal" icon="home" text="Home" />
        </Link>
        <Link to="/reslist">
          <Button
            className="bp3-minimal"
            icon="list"
            text="Reservations List"
          />
        </Link>
        <Link to="/createres">
          <Button
            className="bp3-minimal"
            icon="plus"
            text="Create Reservation"
          />
        </Link>
      </Navbar.Group>
    </Navbar>
  );
};

export default Navigation;
