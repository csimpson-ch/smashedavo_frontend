import React from "react";
import { useLoaderData, Link, Form, redirect } from "react-router-dom";

import '../static/bootstrap.min.css';

// note - reuses loader from RegularPaymentsSelect

export async function action({ request, params }) {
    const formData = await request.formData();
    const data = {
        description: formData.get("description"),
        amount: formData.get("amount"),
        category: formData.get("category"),
        interval: formData.get("interval"),
        next_payment_date: formData.get("next_payment_date"),
        first_payment_date: formData.get("first_payment_date"),
    }
    console.log('formdata', data)
    const res = await fetch(`http://127.0.0.1:8000/backend/regularpayments/${params.regularpaymentId}/edit/`, {
        method: 'POST',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.status !== 200) {
        throw new Response("Error in updating regular payment:", { status: res.status });
    }
    return redirect(`/regularpayments/${params.regularpaymentId}`);
}

export default function RegularPaymentsEdit () {
    const loaderData = useLoaderData();
    return (
        <div className="container">
            <div className="row">
                <h1>Regular Payment Edit</h1>
            </div>
            <Form className="form" method="post">
                <div className="row">
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
                                <span>Interval</span>
                                <select
                                    id="intervalSelect"
                                    className="form-control"
                                    name="interval"
                                    defaultValue={loaderData.fields.interval}
                                    required
                                >
                                    {Object.entries(loaderData.interval_choices).map(([key, value]) => (
                                        <option key={key}>{value.toString()}</option>
                                    ))}
                                </select>
                            </label>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            <span>Next Payment Date</span>
                            <input
                                type="date"
                                className="form-control"
                                name="next_payment_date"
                                defaultValue={loaderData.fields.next_payment_date}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                            <label className="form-label">
                                <span>First Payment Date</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="first_payment_date"
                                    defaultValue={loaderData.fields.first_payment_date}
                                    required
                                />
                            </label>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-primary">Update</button>
                    </div>
                    <div className="col-auto">
                        <Link to={`/regularpayments/${loaderData.pk}`}>
                            <button type="button" className="btn btn-secondary">Cancel</button>
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    )
}
