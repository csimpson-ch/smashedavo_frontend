import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useLoaderData } from "react-router-dom";
import { FormExpenseDescription } from "./FormElements"
import { FormExpenseAmount } from "./FormElements"
import { FormExpenseCategory } from "./FormElements"
import { FormExpenseDate } from "./FormElements"
import { FormExpenseApproved } from "./FormElements"
import '../static/bootstrap.min.css';

// TODO - need to handle navigating to an object pk that doesn't exist


export default function ExpenseEdit ({urlExpenseUpdate}) {

    const data = useLoaderData();
    const params = useParams();
    const urlExpenseUpdateId = urlExpenseUpdate + params.expenseId + "/"; 
    const [formData, setFormData] = useState(data.fields);
    const categoryChoices = data.category_choices;
    const [formResponse, setFormResponse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(urlExpenseUpdateId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFormResponse(data);
    }

    return (
        <div className="container-fluid">
            <h1>Update Expense</h1>
            <form className="form needs-validation" onSubmit={handleSubmit}>
                <FormExpenseDescription formData={formData} setFormData={setFormData}/>
                <FormExpenseAmount formData={formData} setFormData={setFormData}/>
                <FormExpenseCategory formData={formData} setFormData={setFormData} categoryChoices={categoryChoices}/>
                <FormExpenseDate formData={formData} setFormData={setFormData}/>
                <FormExpenseApproved formData={formData} setFormData={setFormData}/>
                <br />
                <button type="submit" className="btn btn-primary">Update</button>
                <p></p>
                <Link to="/expenses">
                    <button type="button" className="btn btn-secondary">Back</button>
                </Link>
            </form>
            <div className="mt-3">
                {formResponse && <FormResponse formResponse={formResponse} formData={formData} />}
            </div>
        </div>
    )
}


function FormResponse ({formResponse, formData}) {
    if (formResponse["success"] === true) {
        return (
            <div className="alert alert-success" role="alert">
                <p>Expense "{formData["description"]}" created successfully.</p>
            </div>
        )
    } else if (formResponse["success"] === false) {
        return (
            <div className="alert alert-danger" role="alert">
                <p>Expense not created. See error details below.</p>
                <pre>{JSON.stringify(formResponse, null, 2)}</pre>
            </div>
        )
    }
}

