import React, { useState } from "react";
import { useParams, useLoaderData, useActionData, Link, Form, redirect } from "react-router-dom";
import '../static/bootstrap.min.css';


export async function loader({ params }) {
    const url = `http://127.0.0.1:8000/backend/expenses/${params.expenseId}/edit/`;
    const res = await fetch(url, {
        method: 'GET',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        throw new Response("Error in fetching expense to edit:", { status: res.status });
    }
    const data = await res.json();
    return data;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const data = {
        description: formData.get("description"),
        amount: formData.get("amount"),
        category: formData.get("category"),
        date: formData.get("date"),
        approved: formData.get("approved") === "on" ? true : false,
    }
    const res = await fetch(`http://127.0.0.1:8000/backend/expenses/${params.expenseId}/edit/`, {
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
    return redirect('/expenses/edit/success');
}

export default function ExpensesEdit ({ params }) {

    const loaderData = useLoaderData();
    const actionData = useActionData();
    const categoryChoices = loaderData.category_choices;
    const id = loaderData.pk;
    console.log('id/pk: ', id);

    return (
        <div>
            <h1>Update Expense</h1>
            {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
            <Form className="form" method="post">
                <div className="form-group">
                    <label className="form-label">Description
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            defaultValue={loaderData.fields.description}
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
                            defaultValue={loaderData.fields.amount}
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
                            defaultValue={loaderData.fields.category}
                            required
                        >
                            {Object.entries(categoryChoices).map(([key, value]) => (
                                <option key={key}>{value.toString()}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>Date
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            defaultValue={loaderData.fields.date}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form">Approved
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="approved"
                            defaultChecked={loaderData.fields.approved}
                        />
                    </label>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Update</button>
                <br /><br />
                <Link to="/expenses/${params.id}/delete">     
                    <button type="button" className="btn btn-danger">Delete</button>
                </Link>
                <br /><br />
                <Link to="/expenses">
                    <button type="button" className="btn btn-secondary">Back</button>
                </Link>
            </Form>
        </div>
    )
}
