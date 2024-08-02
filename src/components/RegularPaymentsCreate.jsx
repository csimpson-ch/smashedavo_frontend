import React from "react";
import { useLoaderData, Form, Link, redirect } from "react-router-dom";
import { FormDescription } from "./Forms";
import '../static/bootstrap.min.css';


export async function loader () {
    const url = `http://127.0.0.1:8000/backend/regularpayments/create/`;
    const res = await fetch(url, {
        method: 'GET',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        throw new Response("Error in fetching categories:", { status: res.status });
    }
    const data = await res.json();
    return data;
}

export async function action ({ request }) {
    const formData = await request.formData();
    const res = await fetch('http://127.0.0.1:8000/backend/regularpayments/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (!res.ok) {
        throw new Error('Error in creating regular payment');
    }
    return redirect('/regularpayments/');
}

export default function RegularPaymentsCreate () {
    const loaderData = useLoaderData();

    return (
        <div className="container-fluid">
            <h1>Create Regular Payment</h1>
            <div className="row">
                <RegularPaymentForm
                    pk={loaderData.pk}
                    fields={loaderData.fields}
                    categoryChoices={loaderData.category_choices}
                    intervalChoices={loaderData.interval_choices}
                    type="create"
                />
            </div>
        </div>
    )
}

