import React from "react";
import { useLoaderData, useActionData, Link, Form, redirect } from "react-router-dom";
import '../static/bootstrap.min.css';

export async function action({ request, params }) {
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
    console.log('delete page', loaderData)
    const actionData = useActionData();
    return (
        <div className="container">
            <div className="row">
                <div className="col-auto">
                    <h1>Expense Details</h1>
                </div>
            </div>
            <div className="row">
                <Form className="form" method="post">
                    <div className="form-group">
                        <label className="form-label">
                            <span>Description</span>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                defaultValue={loaderData.fields.description}
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
                            />
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <p className="text-danger">Confirm that you want to delete this expense.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <button type="submit" className="btn btn-outline-danger">Delete</button>
                        </div>
                        <div className="col-auto">
                            <Link to={`/expenses/${loaderData.pk}`}>
                                <button type="button" className="btn btn-secondary">Cancel</button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
