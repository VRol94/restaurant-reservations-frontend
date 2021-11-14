import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  position: relative;
  color: black;
  text-align: center;
  top: 1cm;
  font-size: 2em;
  font-weight: bold;
`;

const StyledParagraph = styled.h1`
  font-size: 1.5em;
  color: black;
  position: relative;
  text-align: left;
  top: 2cm;
  left: 6cm;
  font-weight: 500;
`;

const Home = () => {
  return (
    <>
      <StyledHeader>
        <h1>Restaurant Reservations</h1>
      </StyledHeader>
      <section>
        <StyledParagraph>Dear visitor!</StyledParagraph>
        <StyledParagraph>
          This is a page used for making reservations in a restaurant.
        </StyledParagraph>
        <StyledParagraph>
          In order to check the reservations that have already been created go
          on the Reservations List menu point.
        </StyledParagraph>
        <StyledParagraph>
          There you can edit the chosen reservation by clicking on the pencil in
          the table and changing the data in the form.
        </StyledParagraph>
        <StyledParagraph>
          You can delete a record from the table by pressing the X icon and
          confirming the deletion.
        </StyledParagraph>
        <StyledParagraph>
          By accessing the Create Reservation page you can create a new
          reservation by completing the form and submitting it.
        </StyledParagraph>
      </section>
    </>
  );
};

export default Home;
