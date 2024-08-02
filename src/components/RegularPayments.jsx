import React, { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import moment from 'moment';
import '../static/bootstrap.min.css';

export async function loader() {
    const res = await fetch('http://127.0.0.1:8000/backend/regularpayments/', {
        method: 'GET',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        throw new Response("Error in fetching regular payments:", { status: res.status });
    }
    const data = await res.json();
    return data;
}

export default function RegularPayments() {
    const data = useLoaderData();
    const [regularPayments, setRegularPayments] = useState([]);

    useEffect(() => {
        setRegularPayments(data);
    }, [data]);
    
    return (
        <div className="container-fluid">
            <h1 key='heading'>Regular Payments</h1>
            <SearchableRegularPaymentsTable regularpayments={regularPayments} />
        </div>
    )
}

function SearchableRegularPaymentsTable({ regularpayments })  {

    const [searchText, setSearchText] = useState('');
    const [filterDate, setFilterDate] = useState(false);

    return (
        <div className='container-fluid'>
        <SearchBar 
            searchText={searchText}
            onSearchTextChange={setSearchText}
            filterDate={filterDate}
            onFilterDateChange={setFilterDate}
        />
        <RegularPaymentsTable
            regularpayments={regularpayments}
            searchText={searchText}
            filterDate={filterDate}
        />
        </div>
    )
}


function SearchBar ({searchText, onSearchTextChange, filterDate, onFilterDateChange}) {
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
                    value={filterDate}
                    onChange={(event) => onFilterDateChange(event.target.checked)}
                />
                Show Overdue Payments
            </label>
        </form>
    )
}

function RegularPaymentsTable({ regularpayments, searchText, filterDate }) {

    // create rows to display based on filter criteria
    const rows = [];    
    regularpayments.forEach((regularpayment) => {
        if (regularpayment.fields.description.toLowerCase().includes(searchText.toLowerCase()) || searchText === '') {
            if (!filterDate) {
                rows.push(<RegularPaymentRow regularpayment={regularpayment} />)
            } else {
                if (regularpayment.fields.next_payment_date < moment().format('YYYY-MM-DD')) {
                    rows.push(<RegularPaymentRow regularpayment={regularpayment} />)
                }
            }
        }
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Category</th>
                    <th scope="col">Interval</th>
                    <th scope="col">Next Payment Date</th>
                    <th scope="col">Last Payment Date</th>
                    <th scope="col">Loan</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
};


function RegularPaymentRow ({ regularpayment }) {
    return (
        <tr key={regularpayment.pk}>
            <td>{regularpayment.fields.description}</td>
            <td>{regularpayment.fields.amount}</td>
            <td>{regularpayment.fields.category}</td>
            <td>{regularpayment.fields.interval}</td>
            <td>{regularpayment.fields.next_payment_date}</td>
            <td>{regularpayment.fields.last_payment_date}</td>
            <td>{regularpayment.fields.loan}</td>
            <td>
                <Link to={`/regularpayments/${regularpayment.pk}`}>
                    <button className="btn btn-outline-primary">Select</button>
                </Link>
            </td>
        </tr>
    )
}
