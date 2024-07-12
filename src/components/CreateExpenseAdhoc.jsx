import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormExpenseDescription } from "./FormElements"
import { FormExpenseAmount } from "./FormElements"
import { FormExpenseCategory } from "./FormElements"
import { FormExpenseDate } from "./FormElements"
import { FormExpenseApproved } from "./FormElements"
import '../static/bootstrap.min.css';


export default function CreateExpenseAdhoc ({urlExpenseCreate, urlExpenseCategoryChoices}) {

    // initialise the date for the date form component
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];

    // initialise the form data to be submitted
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        date: todayFormatted,
        approved: true,
    });

    // holds the expense categories, requires fetching from backend
    const [categoryChoices, setCategoryChoices] = useState([]);
    const [loading, setLoading] = useState(true);

    // holds the response from the form submit post request
    const [formResponse, setFormResponse] = useState(null);
    const [error, setError] = useState(null);


    // fetch expense category choices from the backend API
    useEffect(() => {
        async function fetchCategoryChoices() {
            const response = await fetch(urlExpenseCategoryChoices, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!ignore) {
                const data = await response.json();
                setCategoryChoices(data);
                setLoading(false)
                // setFormData({...formData, category: Object.values(data)[0]})
            }
        }

        let ignore = false;
        fetchCategoryChoices();
        // setTimeout(fetchCategoryChoices, 2000);
        return () => {
            ignore = true;
        }
    }, [urlExpenseCategoryChoices]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(urlExpenseCreate, {
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

    if (loading) {
        return (
                <div className="container-fluid">
                    <h1>Loading the form...</h1>
                </div>
        )
    } else {
        return (
                <div className="container-fluid">
                    <h1>Create Expense</h1>
                    <form className="form needs-validation" onSubmit={handleSubmit}>
                        <FormExpenseDescription formData={formData} setFormData={setFormData}/>
                        <FormExpenseAmount formData={formData} setFormData={setFormData}/>
                        <FormExpenseCategory formData={formData} setFormData={setFormData} categoryChoices={categoryChoices}/>
                        <FormExpenseDate formData={formData} setFormData={setFormData}/>
                        <FormExpenseApproved formData={formData} setFormData={setFormData}/>
                        <br />
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <p></p>
                        <Link to="/expenses">
                            <button type="button" className="btn btn-secondary">Cancel</button>
                        </Link>
                    </form>
                    <div className="mt-3">
                        {formResponse && <FormResponse formResponse={formResponse} formData={formData} />}
                    </div>
                </div>
        )
    }
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

