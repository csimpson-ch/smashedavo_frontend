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
        throw new Response("Error in fetching expense:", { status: res.status });
    }
    const data = await res.json();
    return data;
}

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     const data = {
//         description: formData.get("description"),
//         amount: formData.get("amount"),
//         category: formData.get("category"),
//         date: formData.get("date"),
//         approved: formData.get("approved") === "on" ? true : false,
//     }
//     const res = await fetch(`http://127.0.0.1:8000/backend/expenses/${params.expenseId}/edit/`, {
//         method: 'POST',
//         modes: 'cors',
//         credentials: "same-origin",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     if (res.status !== 200) {
//         throw new Response("Error in updating expense:", { status: res.status });
//     }
//     return redirect('/expenses');
// }

export default function ExpensesSelect ({}) {

    const loaderData = useLoaderData();
    console.log(loaderData);
    // const expenseId = loaderData.pk;

    return (
        <div className="container">
            <div className="row">
                <div className="col-auto">
                    <h1>Expense Details</h1>
                </div>
                <div className="col-2">
                    <Link to="/expenses">
                        <button type="button" className="btn-close" aria-label="Close"></button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <Form className="form">
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
                    {/* <br />
                    <button type="submit" className="btn btn-primary">Edit</button> */}
                </Form>
            </div>
            <br />
            <div className="row">
                <div className="col-auto">
                    <Link to={`/expenses/${loaderData.pk}/edit`}>
                        <button type="button" className="btn btn-outline-primary">Edit</button>
                    </Link>
                </div>
                <div className="col-auto">
                <Link to={`/expenses/${loaderData.pk}/delete`}>   
                        <button type="button" className="btn btn-outline-danger">Delete</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
