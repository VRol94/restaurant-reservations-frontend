export const initReservationData = {
  name: '',
  date: new Date(),
  guestNr: '',
  email: ''
};

export const initialState = [
  {
    id: 0,
    name: 'Roland',
    date: `${new Date().toDateString()} ${new Date().toLocaleTimeString(
      'en-US'
    )}`,
    guestNr: 10,
    email: 'rolandvincze94@gmail.com'
  },
  {
    id: 1,
    name: 'Netti',
    date: `${new Date().toDateString()} ${new Date().toLocaleTimeString(
      'en-US'
    )}`,
    guestNr: 50,
    email: 'vnetti2001@yahoo.com'
  }
];
