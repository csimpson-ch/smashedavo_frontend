import React from "react";
import { useLoaderData, Link, Form, redirect } from "react-router-dom";
import { ExpenseForm } from "./ExpenseForm";
import '../static/bootstrap.min.css';

// note - reuses loader from ExpensesSelect

export async function action({ request, params }) {
    const urlAPI = `http://127.0.0.1:8000/backend/expenses/${params.expenseId}/edit/`;
    const urlRedirect = `/expenses/${params.expenseId}`
    const formData = await request.formData();
    const data = {
        description: formData.get("description"),
        amount: formData.get("amount"),
        category: formData.get("category"),
        date: formData.get("date"),
        approved: formData.get("approved") === "on" ? true : false,
    }
    const res = await fetch(urlAPI, {
        method: 'POST',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.status !== 200) {
        throw new Response("Error in updating expense:", { status: res.status });
    }
    return redirect(urlRedirect);
}

export default function ExpensesEdit () {
    const loaderData = useLoaderData();
    return (
        <div className="container">
            <div className="row">
                <h1>Expense Edit</h1>
            </div>
            <div className="row">
                <ExpenseForm
                    pk={loaderData.pk}
                    fields={loaderData.fields}
                    categoryChoices={loaderData.category_choices}
                    type="edit"
                />
            </div>
        </div>
    )
}
