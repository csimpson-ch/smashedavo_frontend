import React from "react";
import { Link } from "react-router-dom";
import '../static/bootstrap.min.css';

export default function ExpensesCreateSuccess() {
    return (
        <>
        <div className="row">
            <h1>Expense created successfully!</h1>
        </div>
        <div className="row">
            <div className="col-auto">
                <Link to="/create">
                    <button type="button" className="btn btn-outline-primary">Finish</button>
                </Link>
            </div>
            <div className="col-auto">
                <Link to="/expenses/create">
                    <button type="button" className="btn btn-outline-secondary">Create Another</button>
                </Link>
            </div>
            <div className="col-auto">
                <Link to="/expenses">
                    <button type="button" className="btn btn-outline-info">View Expenses</button>
                </Link>
            </div>
        </div>
        </>
    )
}
