import React from 'react';

const Home = () => {
  return (
    <>
      <header className="home-title">
        <h1>Restaurant Reservations</h1>
      </header>
      <section className="home-presentation">
        <p>Dear visitor!</p>
        <p>This is a page used for making reservations in a restaurant.</p>
        <p>
          In order to check the reservations that have already been created go
          on the Reservations List menu point.
        </p>
        <p>
          There you can edit the chosen reservation by clicking on the pencil in
          the table and changing the data in the form.
        </p>
        <p>
          You can delete a record from the table by pressing the X icon and
          confirming the deletion.
        </p>
        <p>
          By accessing the Create Reservation page you can create a new
          reservation by completing the form and submitting it.
        </p>
      </section>
    </>
  );
};

export default Home;
