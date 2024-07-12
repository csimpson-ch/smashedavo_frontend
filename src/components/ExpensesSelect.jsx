import React, { useState } from "react";
import { useParams, useLoaderData, useActionData, Link, Form, redirect } from "react-router-dom";
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

export default function ExpensesSelect ({ params }) {

    const loaderData = useLoaderData();
    console.log(loaderData);
    // const actionData = useActionData();

    // const handleEdit = (event) => {
    //     if (
    //         !confirm(
    //             `Are you sure you want to edit the expense ${loaderData.fields.description}?`
    //         )
    //     ) {
    //         event.preventDefault();
    //     }
    // }

    return (
        <div>
            <h1>Expense Details</h1>
            <Form 
                className="form"
                method="post"
                action="edit"
                // onSubmit={handleEdit}
            >
                <div className="form-group">
                    <label className="form-label">
                        <span>Description</span>
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
                    <label className="form-label">
                        <span>Amount</span>
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
                    <label className="form-label">
                        <span>Category</span>
                        <select
                            id="categorySelect"
                            className="form-control"
                            name="category"
                            defaultValue={loaderData.fields.category}
                            required
                        >
                            {Object.entries(loaderData.category_choices).map(([key, value]) => (
                                <option key={key}>{value.toString()}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        <span>Date</span>
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
                    <label className="form-label">
                        <span>Approved </span>
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
            </Form>
        </div>
    )
}
