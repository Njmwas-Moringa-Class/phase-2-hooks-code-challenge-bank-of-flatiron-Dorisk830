import React, { useState } from "react";

function AddTransactionForm({ onAdd }) {
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // Trigger the onAdd callback with the new transaction
    onAdd(newTransaction);

    // Clear the form after adding the transaction
    setNewTransaction({
      date: "",
      description: "",
      category: "",
      amount: 0,
    });
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" value={newTransaction.date} onChange={handleChange} />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTransaction.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newTransaction.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={newTransaction.amount}
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
