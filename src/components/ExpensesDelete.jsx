import React from "react";
import { useParams, useLoaderData, useActionData, Link, Form, redirect } from "react-router-dom";
import '../static/bootstrap.min.css';

export async function action({ request, params }) {
    const data = {
        delete: true,
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
    return redirect('/expenses/delete/success');
}

export default function ExpensesDelete ({ params }) {
    const actionData = useActionData();
    return (
        <div>
            <h1>Delete Expense</h1>
            {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
            <p>Are you sure you want to delete this expense?</p>

            <Form method="post">
                <button type="submit" className="btn btn-danger">Delete</button>
                <Link to="/expenses/{{params.expenseId}}/edit">
                    <button type="button" className="btn btn-secondary">Back</button>
                </Link>
            </Form>
        </div>
    )
}
