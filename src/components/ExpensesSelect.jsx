import React from "react";
import { useLoaderData } from "react-router-dom";
import { ExpenseForm } from "./ExpenseForm"
import '../static/bootstrap.min.css';

export async function loader({ params }) {
    const url = `http://127.0.0.1:8000/backend/expenses/${params.expenseId}/`;
    const res = await fetch(url, {
        method: 'GET',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        throw new Response("Error in fetching expense:", { status: res.status });
    }
    const data = await res.json();
    return data;
}

export default function ExpensesSelect () {
    const loaderData = useLoaderData();
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-auto">
                    <h1>Expense Details</h1>
                </div>
            </div>
            <div className="row">
                <ExpenseForm
                    pk={loaderData.pk}
                    fields={loaderData.fields}
                    categoryChoices={loaderData.category_choices}
                    type="select"
                />
            </div>
        </div>
    )
}
