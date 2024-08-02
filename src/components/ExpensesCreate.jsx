import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { ExpenseForm } from "./ExpenseForm";
import '../static/bootstrap.min.css';


export async function loader () {
    const url = `http://127.0.0.1:8000/backend/expenses/create/`;
    const res = await fetch(url, {
        method: 'GET',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        throw new Response("Error in fetching expense categories:", { status: res.status });
    }
    const data = await res.json();
    return data;
}

export async function action ({ request }) {
    const formData = await request.formData();
    const res = await fetch('http://127.0.0.1:8000/backend/expenses/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (!res.ok) {
        throw new Error('Error in creating expense');
    }
    return redirect('/expenses/create/success');
}

export default function ExpensesCreate () {
    const loaderData = useLoaderData();
    return (
        <div className="container-fluid">
            <h1>Expense Create</h1>
            <ExpenseForm
                pk={loaderData.fields}
                fields={loaderData.fields}
                categoryChoices={loaderData.category_choices}
                type="create"
            />
        </div>
    )
}

