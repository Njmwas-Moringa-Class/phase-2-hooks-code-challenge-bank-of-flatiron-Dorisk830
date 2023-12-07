import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8001/transactions");
        if (!response.ok) {
          throw new Error(`Failed to fetch transactions: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched transactions:", data);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(
          "An error occurred while fetching transactions. Please check the console for more details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error(`Failed to add transaction: ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions((prevTransactions) => [...prevTransactions, data]);
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError(
        "An error occurred while adding a new transaction. Please check the console for more details."
      );
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm onAdd={handleAddTransaction} />
      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TransactionsList transactions={filteredTransactions.length ? filteredTransactions : transactions} />
      )}
    </div>
  );
}

export default AccountContainer;
