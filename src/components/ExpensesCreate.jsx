import React, { useState, useEffect } from "react";
import '../static/bootstrap.min.css';
import { useLoaderData, useActionData, Form, redirect } from "react-router-dom";

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
    const categoryChoices = useLoaderData();
    const actionData = useActionData();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: categoryChoices[0],
        date: '',
        approved: false,
        regularPaymentToggle: false,
        regularPaymentDescription: '',
    });

    return (
        <div className="container-fluid">
            <h1>Create Expense</h1>
            <Form className="form" method="post">
                <div className="form-group">
                    <label className="form-label">Description
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Enter description"
                            required
                        />
                        </label>
                </div>
                <div className="form-group">
                    <label>Amount
                        <input
                            type="number"
                            className="form-control"
                            name="amount"
                            placeholder="Enter amount"
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Category
                        <select
                            id="categorySelect"
                            className="form-control"
                            name="category"
                            required
                        >
                            {Object.entries(categoryChoices).map(([key, value]) => (
                                <option key={key}>{value.toString()}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-check-label">Approved
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="approved"
                        />
                    </label>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
        </div>
    )
}

