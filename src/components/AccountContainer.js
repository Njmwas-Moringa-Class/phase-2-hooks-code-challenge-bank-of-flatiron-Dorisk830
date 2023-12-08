import React, { useState, useEffect } from 'react';
import TransactionsList from './TransactionsList';
import Search from './Search';
import AddTransactionForm from './AddTransactionForm';

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions when component mounts
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8001/transactions');
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch('http://localhost:8001/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error(`Failed to add transaction: ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions((prevTransactions) => [...prevTransactions, data]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete transaction: ${response.statusText}`);
      }

      await fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm onAdd={handleAddTransaction} />
      <TransactionsList
        transactions={filteredTransactions.length ? filteredTransactions : transactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}

export default AccountContainer;
