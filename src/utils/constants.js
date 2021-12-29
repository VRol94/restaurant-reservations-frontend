import gql from 'graphql-tag';

export const url = 'http://localhost:5000/graphql';
export const reservationsData = `query{
  reservations{
    id,
    name,
    date,
    email,
    guestNr
  }
}`;

export const createReservation = gql`
  mutation addReservation(
    $name: String!
    $date: String!
    $guestNr: Int!
    $email: String
  ) {
    addReservation(name: $name, date: $date, guestNr: $guestNr, email: $email) {
      name
      date
      guestNr
      email
    }
  }
`;

export const editReservation = gql`
  mutation updateReservation(
    $id: Int!
    $name: String!
    $date: String!
    $guestNr: Int!
    $email: String
  ) {
    updateReservation(
      id: $id
      name: $name
      date: $date
      guestNr: $guestNr
      email: $email
    ) {
      id
      name
      date
      guestNr
      email
    }
  }
`;

export const reservationToDelete = gql`
  mutation deleteReservation($id: Int!) {
    deleteReservation(id: $id) {
      id
    }
  }
`;

export const initReservationData = {
  name: '',
  date: new Date(),
  guestNr: '',
  email: ''
};

export const initialState = {
  list: [],
  lastFetch: null
};
