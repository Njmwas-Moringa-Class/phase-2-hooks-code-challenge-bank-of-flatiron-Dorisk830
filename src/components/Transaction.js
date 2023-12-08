import React from 'react';

function Transaction({ id, date, description, category, amount, onDelete }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Transaction;
