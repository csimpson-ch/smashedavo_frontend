import React from "react";
import { Link } from "react-router-dom";
import '../static/bootstrap.min.css';

export default function ExpensesCreateSuccess() {
    return (
        <>
            <h1>Expense created successfully!</h1>
            <Link to="/create">
                <button type="button" className="btn btn-outline-primary">Finish</button>
            </Link>
            <br /><br />
            <Link to="/expenses/create">
                <button type="button" className="btn btn-outline-secondary">Create Another</button>
            </Link>
            <br /><br />
            <Link to="/expenses">
                <button type="button" className="btn btn-outline-info">View Expenses</button>
            </Link>
        </>
    )
}
