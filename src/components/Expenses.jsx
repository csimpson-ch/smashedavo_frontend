import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../static/bootstrap.min.css';


function SearchableExpensesTable({ expenses }) {

    const [searchText, setSearchText] = useState('');
    const [approvedOnlyFilter, setApprovedOnlyFilter] = useState(false);

    return (
        <div className='container-fluid'>
            <SearchBar
                searchText={searchText}
                onSearchTextChange={setSearchText}
                approvedOnlyFilter={approvedOnlyFilter}
                onApprovedOnlyFilterChange={setApprovedOnlyFilter}
            />
            <ExpensesTable
                expenses={expenses}
                searchText={searchText}
                approvedOnlyFilter={approvedOnlyFilter}
            />
            <p>{approvedOnlyFilter}</p>
            <p>{searchText}</p>
        </div>
    )

}


function SearchBar ({searchText, onSearchTextChange, approvedOnlyFilter, onApprovedOnlyFilterChange}) {
    return (
        <form class="d-flex">
            <input
                className="form-control mb-2"
                type="search"
                value={searchText}
                placeholder="Search in Description"
                onChange={(event) => onSearchTextChange(event.target.value)}
            />
            <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={approvedOnlyFilter}
                    onChange={(event) => onApprovedOnlyFilterChange(event.target.checked)}
                />
                Approved Only
            </label>
        </form>
    )
}


function ExpensesTable({ expenses, searchText, approvedOnlyFilter }) {
    
    let rows = [];

    expenses.forEach((expense) => {
        
        // if (expense.fields.description.toLowerCase().includes(searchText.toLowerCase()) || searchText === '') {
        //     rows.push(<ExpenseRow expense={expense} />)
        // }
        if (expense.fields.description.toLowerCase().includes(searchText.toLowerCase()) || searchText === '') {
            if (approvedOnlyFilter && !expense.fields.approved) {
                return;
            }
            rows.push(<ExpenseRow expense={expense} />)
        }
    })
    
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Loan</th>
                    <th>Regular Payment</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}


function ExpenseRow({ expense }) {
    return (
        <tr
            key={expense.pk}
            className={expense.fields.approved ? 'table-success' : 'table-warning'}
        >
            <td>{expense.fields.description}</td>
            <td>{expense.fields.amount}</td>
            <td>{expense.fields.category}</td>
            <td>{expense.fields.loan}</td>
            <td>{expense.fields.regularpayment}</td>
            <td>{expense.fields.date}</td>
            <td></td>
        </tr>
    )
};


const Expenses = () => {
    // State to hold the fetched blog posts
    const [expenses, setExpenses] = useState([]);
    let url = 'http://127.0.0.1:8000/backend/expenses/';

    useEffect(() => {
        fetch(url, {
                method: 'GET',
                modes: 'cors',
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then(response => response.json())
        .then(data => {
            setExpenses(data)
        })
        .catch(error => console.error(error));
    }, [url]);
    
    // Render the fetched blog posts
    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <h1 key='heading'>Expenses for {sessionStorage.getItem('username')}</h1>
                <SearchableExpensesTable expenses={expenses} />
            </div>
        </div>
        
    )
}

export default Expenses