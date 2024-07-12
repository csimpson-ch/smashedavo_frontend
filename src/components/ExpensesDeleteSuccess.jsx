import React from "react";
import { Link } from "react-router-dom";
import '../static/bootstrap.min.css';

export default function ExpensesDeleteSuccess() {
    return (
        <>
            <h1>Expense deleted successfully!</h1>
            <Link to="/expenses">
                <button type="button" className="btn btn-outline-primary">Finish</button>
            </Link>
        </>
    )
}
