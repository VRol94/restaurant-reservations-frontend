import React from 'react';
import { Column, Table2, Cell } from '@blueprintjs/table';

const Reservations = () => {
  const dollarCellRenderer = rowIndex => (
    <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
  );
  const euroCellRenderer = rowIndex => (
    <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
  );

  return (
    <>
      <Table2 numRows={10}>
        <Column cellRenderer={dollarCellRenderer} />
        <Column cellRenderer={euroCellRenderer} />
      </Table2>
    </>
  );
};

export default Reservations;
