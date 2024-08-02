import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { ExpenseForm } from "./ExpenseForm";
import '../static/bootstrap.min.css';

export async function action({ request, params }) {
    // TODO - tidy this up, probably dont need to send form data with request
    const formData = await request.formData();
    const data = {
        description: formData.get("description"),
        amount: formData.get("amount"),
        category: formData.get("category"),
        date: formData.get("date"),
        approved: formData.get("approved") === "on" ? true : false,
    }
    const res = await fetch(`http://127.0.0.1:8000/backend/expenses/${params.expenseId}/delete/`, {
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
    return redirect("/expenses");
}

export default function ExpensesDelete () {
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
                    type="delete"
                />
            </div>
        </div>
    )
}
