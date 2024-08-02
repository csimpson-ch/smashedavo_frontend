import React from "react";
import { useLoaderData, Link, Form } from "react-router-dom";
import { FormDescription } from "./Forms";
import '../static/bootstrap.min.css';

export async function loader({ params }) {
    const url = `http://127.0.0.1:8000/backend/regularpayments/${params.regularpaymentId}/`;
    const res = await fetch(url, {
        method: 'GET',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        throw new Response("Error in fetching regular payment:", { status: res.status });
    }
    const data = await res.json();
    return data;
}

export default function RegularPaymentsSelect () {
    const loaderData = useLoaderData();
    return (
        <div className="container">
            <div className="row">
                <div className="col-auto">
                    <h1>Regular Payment Details</h1>
                </div>
                <div className="col-2">
                    <Link to="/regularpayments">
                        <button type="button" className="btn-close" aria-label="Close"></button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <Form className="form">
                    <FormDescription value={loaderData.fields.description} enabled={false} />
                    {/* <div className="form-group">
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
                    </div> */}
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
                            <span>Interval</span>
                            <select
                                id="intervalSelect"
                                className="form-control"
                                name="interval"
                                defaultValue={loaderData.fields.interval}
                                disabled
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
                                disabled
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
                                disabled
                            />
                        </label>
                    </div>
                </Form>
            </div>
            <br />
            <div className="row">
                <div className="col-auto">
                    <Link to={`/regularpayments/${loaderData.pk}/edit`}>
                        <button type="button" className="btn btn-outline-primary">Edit</button>
                    </Link>
                </div>
                <div className="col-auto">
                    <Link to={`/regularpayments/${loaderData.pk}/delete`}>   
                        <button type="button" className="btn btn-outline-danger">Delete</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
