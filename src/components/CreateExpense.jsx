import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../static/bootstrap.min.css';


export default function CreateExpense ({
    urlExpenseCreate,
    urlExpenseCategoryChoices,
    urlRegularPayments
}) {
    // holds the form data
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        date: '',
        approved: false,
        regularPaymentToggle: false,
        regularPaymentDescription: '',
    });

    // holds data associated with fetching
    const [categoryChoices, setCategoryChoices] = useState([]);
    const [regularPayments, setRegularPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // holds the response from the form submit post request
    const [formResponse, setFormResponse] = useState(null);

    useEffect(() => {

        // fetch the expense category choices on initial render only
        const fetchCategoryChoices = async () => {
            try {
                const response = await fetch(urlExpenseCategoryChoices, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategoryChoices(data);
                // console.log(categoryChoices)
                // setFormData({...formData, category: data[0]});
                // if (data.length > 0) {
                //     setFormData({...formData, category: data[0]});
                //     console.log(data[0]);
                // } else {
                //     console.log('Empty list of choices, not setting initial form data');
                // }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        // fetch the regular payments on initial render only
        const fetchRegularPayments = async () => {
            try {
                const response = await fetch(urlRegularPayments, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRegularPayments(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        

        // fetch the category choices and regular payments on initial render from API
        fetchCategoryChoices();
        fetchRegularPayments();

        setFormData({...formData, category: categoryChoices[0]});

        // // set initial form data using the fetched data
        // if (categoryChoices.length > 0) {
        //     setFormData({...formData, category: categoryChoices[0]});
        //     console.log(categoryChoices[0]);
        // } else {
        //     console.log('Empty list of choices, not setting initial form data');
        // }

        // if (regularPayments.length > 0) {
        //     setFormData({...formData, regularPaymentDescription: regularPayments[0].fields.description.toString()});
        //     console.log(regularPayments[0].fields.description.toString());
        // } else {
        //     console.log('Empty list of regular payments, not setting initial form data');
        // }

    }, [urlExpenseCreate, urlExpenseCategoryChoices, urlRegularPayments]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        alert(formData);

        try {
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
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    // console.log(formData)
    // console.log(categoryChoices)
    // console.log(regularPayments)

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <h1>Create Expense</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <FormDescription formData={formData} setFormData={setFormData}/>
                    <FormAmount formData={formData} setFormData={setFormData}/>
                    <FormCategory formData={formData} setFormData={setFormData} categoryChoices={categoryChoices}/>
                    <FormDate formData={formData} setFormData={setFormData}/>
                    <FormApproved formData={formData} setFormData={setFormData}/>
                    <FormRegularPayment formData={formData} setFormData={setFormData} regularPayments={regularPayments}/>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="mt-3">
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error}</div>}
                    {formResponse && <FormResponse formResponse={formResponse} formData={formData} />}
                </div>

            </div>
        </div>
    )
}

function FormDescription ({formData, setFormData}) {
    return (
        <div className="form-group">
            <label>Description</label>
            <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            />
        </div>
    )
}

function FormAmount ({formData, setFormData}) {
    return (
        <div className="form-group">
            <label>Amount</label>
            <input
                type="number"
                className="form-control"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(event) => setFormData({ ...formData, amount: parseFloat(event.target.value) || 0 })}
            />
        </div>
    )
}

function FormCategory ({formData, setFormData, categoryChoices}) {

    function handleInitialCategorySelect () {
        setFormData({...formData, category: categoryChoices[0]});
    }

    return (
        
        <div className="form-group">
            {/* {handleInitialCategorySelect} */}
            <label id="categoryLabel" htmlFor="categorySelect">Category</label>
            <select
                id="categorySelect"
                className="form-control"
                name="category"
                value={formData.category}
                onChange={(event) => setFormData({ ...formData, category: event.target.value })}
            >
                {Object.entries(categoryChoices).map(([key, value]) => (
                    <option key={key}>{value.toString()}</option>
                ))}
            </select>
    </div>
    )
}

function FormDate ({formData, setFormData}) {
    return (
        <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
                type="date"
                className="form-control"
                name="date"
                placeholder="Enter date"
                value={formData.date}
                onChange={(event) => setFormData({ ...formData, date: event.target.value })}
            />
        </div>
    )
}

function FormApproved ({formData, setFormData}) {
    return (
        <div className="form-group">
            <input
                type="checkbox"
                className="form-check-input"
                name="approved"
                value={formData.approved}
                onChange={(event) => setFormData({ ...formData, approved: event.target.checked })}
            />
            <label className="form-check-label">Approved</label>
        </div>
    )
}

function FormRegularPayment ({formData, setFormData, regularPayments}) {
    return (
        <>
            <RegularPaymentToggle formData={formData} setFormData={setFormData}/>
            <RegularPaymentSelect formData={formData} setFormData={setFormData} regularPayments={regularPayments}/>
        </>
    )
}



function RegularPaymentToggle ({formData, setFormData}) {
    return (
        <div className="form-group">
            <input
                type="checkbox"
                className="form-check-input"
                name="toggle"
                value={formData.regularPaymentToggle}
                onChange={(event) => setFormData({ ...formData, regularPaymentToggle: event.target.checked })}
            />
            <label className="form-check-label">Connected to a Regular Payment</label>
        </div>
    )
}

function RegularPaymentSelect ({formData, setFormData, regularPayments}) {

    return (
        <div className="form-group">
            <select
                id="categorySelect"
                className="form-select"
                aria-label="Select regular payment"
                name="category"
                value={formData.regularPaymentDescription}
                onChange={(event) => setFormData({ ...formData, regularPaymentDescription: event.target.value })}
                disabled={!formData.regularPaymentToggle}
            >
                {/* <option value="">--</option> */}
                {regularPayments.map((regularPayment) => (
                    <option 
                        key={regularPayment.pk}
                        value={regularPayment.fields.description}
                    >
                        {regularPayment.fields.description}
                    </option>
                ))}
            </select>
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

