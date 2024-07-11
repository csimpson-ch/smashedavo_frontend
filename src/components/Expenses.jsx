import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import '../static/bootstrap.min.css';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';


export default function Expenses ({urlAPI}) {
    const data = useLoaderData();
    const [expenses, setExpenses] = useState([]);
    const [urlQuery, setUrlQuery] = useState('');
    const [toExpenseCreate, setToExpenseCreate] = useState(false);

    useEffect(() => {
        setExpenses(data);
    }, [data])

    const handleClick = () => {
        setToExpenseCreate(true);
    }

    if (toExpenseCreate) {
        return <Navigate to="/expenses/create" replace={true}/>;
    }

    return (
        <div className="container-fluid">
            <h1 key='heading'>Expenses</h1>
            <div className="container-fluid">
                <button type="button" class="btn btn-primary" onClick={handleClick}>
                    Create New
                </button>
            </div>
            <br />
            <SearchableExpensesTable
                expenses={expenses}
                urlQuery={urlQuery}
                setUrlQuery={setUrlQuery}
            />
        </div>
    )
}


function SearchableExpensesTable({expenses, urlQuery, setUrlQuery}) {
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
                urlQuery={urlQuery}
                setUrlQuery={setUrlQuery}
            />
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


function ExpensesTable({expenses, searchText, approvedOnlyFilter, urlQuery, setUrlQuery}) {

    // create values to track clicks of table buttons
    const [clickDescription, setClickDescription] = useState(0);
    const [clickAmount, setClickAmount] = useState(0);
    const [clickCategory, setClickCategory] = useState(0);
    const [clickDate, setClickDate] = useState(0);

    // create array of rows to display, filtered based on search parameters
    let rows = [];
    expenses.forEach((expense) => {
        if (expense.fields.description.toLowerCase().includes(searchText.toLowerCase()) || searchText === '') {
            if (approvedOnlyFilter && !expense.fields.approved) {
                return;
            }
            rows.push(<ExpenseRow expense={expense} />)
        }
    })

    function handleClickDescription() {
        setClickDescription(clickDescription + 1)
        if (clickDescription % 2 === 0) {
            setUrlQuery('?orderby=description&ordering=asc')
        } else {
            setUrlQuery('?orderby=description&ordering=desc')
        }
    }

    function handleClickAmount() {
        setClickAmount(clickAmount + 1)
        if (clickAmount % 2 === 0) {
            setUrlQuery('?orderby=amount&ordering=asc')
        } else {
            setUrlQuery('?orderby=amount&ordering=desc')
        }
    }

    function handleClickCategory() {
        setClickCategory(clickCategory + 1)
        if (clickCategory % 2 === 0) {
            setUrlQuery('?orderby=category&ordering=asc')
        } else {
            setUrlQuery('?orderby=category&ordering=desc')
        }
    }
    
    function handleClickDate() {
        setClickDate(clickDate + 1)
        if (clickDate % 2 === 0) {
            setUrlQuery('?orderby=date&ordering=asc')
        } else {
            setUrlQuery('?orderby=date&ordering=desc')
        }
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Description
                        <button type="button" className="btn btn-default btn-sm" onClick={handleClickDescription}>
                            <ChevronDownIcon size="small" />
                            <ChevronUpIcon size="small" />
                        </button>
                    </th>
                    <th>Amount
                        <button type="button" className="btn btn-default btn-sm" onClick={handleClickAmount}>
                            <ChevronDownIcon size="small" />
                            <ChevronUpIcon size="small" />
                        </button>          
                    </th>
                    <th>Category
                        <button type="button" className="btn btn-default btn-sm" onClick={handleClickCategory}>
                            <ChevronDownIcon size="small" />
                            <ChevronUpIcon size="small" />
                        </button>
                    </th>
                    <th>Loan</th>
                    <th>Regular Payment</th>
                    <th>Date
                        <button type="button" className="btn btn-default btn-sm" onClick={handleClickDate}>
                            <ChevronDownIcon size="small" />
                            <ChevronUpIcon size="small" />
                        </button>
                    </th>
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
            <td>
                <Link to={`/expenses/${expense.pk}/edit`}>
                    <button className="btn btn-outline-primary">Edit</button>
                </Link>
                
            </td>
        </tr>
    )
};

