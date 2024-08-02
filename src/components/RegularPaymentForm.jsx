import { Form, Link } from 'react-router-dom';

export function RegularPaymentForm ({pk, fields, categoryChoices, intervalChoices, type}) {
    let isEnabled = false;
    let isCreate = false;
    let isEdit = false;
    let isSelect = false;
    let isDelete = false;
    if (type === "edit") {
        isEnabled = true;
        isEdit = true;
    } else if (type === "create") {
        isEnabled = true;
        isCreate = true;
    } else if (type === "select") {
        isSelect = true;
    } else if (type === "delete") {
        isDelete = true;
    }

    function FormDescription () {
        return (
            <div className="form-group">
                <label className="form-label">
                    <span>Description</span>
                    {isEnabled ? (
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            defaultValue={fields.description}
                            required
                        />
                    ) : (
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            defaultValue={fields.description}
                            disabled
                        />
                    )}
                </label>
            </div>
        )
    }
    
    function FormAmount () {
        return (
            <div className="form-group">
                <label className="form-label">
                <span>Amount</span>
                {isEnabled ? (
                    <input 
                        type="decimal"
                        className="form-control"
                        name="amount"
                        defaultValue={fields.amount}
                        required
                    />
                ) : (
                    <input 
                        type="decimal"
                        className="form-control"
                        name="amount"
                        defaultValue={fields.amount}
                        disabled
                    />
                )}
            </label>
          </div>
        )
    }
    
    function FormCategory () {
        return (
            <div className="form-group">
                <label className="form-label">
                    <span>Category</span>
                    {isEnabled ? (
                        <select
                            id="categorySelect"
                            className="form-control"
                            name="category"
                            defaultValue={fields.category}
                            required
                        >
                            {Object.entries(categoryChoices).map(([key, value]) => (
                            <option key={key}>{value.toString()}</option>

                            ))}
                        </select>
                    ) : (
                        <input
                            id="categorySelect"
                            className="form-control"
                            name="category"
                            defaultValue={fields.category}
                            disabled
                        />
                    )}
            </label>
        </div>
        )
    }

    function FormInterval () {
        return (
            <div className="form-group">
            <label>Interval
                {isEnabled ? (
                    <select
                        id="intervalSelect"
                        className="form-control"
                        name="interval"
                        required
                    >
                        {Object.entries(intervalChoices).map(([key, value]) => (
                            <option key={key}>{value.toString()}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        id="intervalSelect"
                        className="form-control"
                        name="interval"
                        defaultValue={fields.interval}
                        disabled
                    />    
                )}
            </label>
        </div>
        )
    }

    function FormFirstPaymentDate () {
        return (
            <div className="form-group">
                <label htmlFor="date">First Payment Date
                    {isEnabled ? (
                        <input
                            type="date"
                            className="form-control"
                            name="first_payment_date"
                            required
                        />
                    ) : (
                        <input
                            type="date"
                            className="form-control"
                            name="first_payment_date"
                            disabled
                        />
                    )}
                </label>
            </div>
        )
    }
    
    function FormNextPaymentDate () {
        return (
            <div className="form-group">
                <label htmlFor="date">Next Payment Date
                    {isEnabled ? (
                        <input
                            type="date"
                            className="form-control"
                            name="next_payment_date"
                            required
                        />
                    ) : (
                        <input
                            type="date"
                            className="form-control"
                            name="next_payment_date"
                            disabled
                        />                    
                    )}
                </label>
            </div>
        )
    }
    
    function FormButtonsEdit() {
        return (
            <div className="row">
                <div className="col-auto">
                    <button type="submit" className="btn btn-outline-primary">Update</button>
                </div>
                <div className="col-auto">
                    <Link to={`/regularpayments/${pk}`}>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </Link>
                </div>
            </div>
        )
    }

    function FormButtonsCreate () {
        return (
            <div className="row">
                <div className="col-auto">
                    <button type="submit" className="btn btn-outline-primary">Create</button>
                </div>
                <div className="col-auto">
                    <Link to={"/create"}>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </Link>
                </div>
            </div>
        )
    }

    function FormButtonsSelect () {
        return (
            <div className="row">
                <div className="col-auto">
                    <Link to={`/expenses/${pk}/edit`}>
                        <button type="button" className="btn btn-outline-primary">Edit</button>
                    </Link>
                </div>
                <div className="col-auto">
                    <Link to={`/expenses/${pk}/delete`}>   
                        <button type="button" className="btn btn-outline-danger">Delete</button>
                    </Link>
                </div>
                <div className="col-auto">
                    <Link to={`/expenses`}>   
                        <button type="button" className="btn btn-outline-secondary">Back</button>
                    </Link>
                </div>
            </div>
        )
    }

    function FormButtonsDelete () {
        return (
            <>
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
                    <Link to={`/expenses/${pk}`}>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </Link>
                </div>
            </div>
            </>
        )
    }

    return (
        <>
            <Form className="form" method="post">
                <FormDescription />
                <FormAmount />
                <FormCategory />
                <FormDate />
                <FormApproved />
                <br />
                {if type === "edit" : 
                
                }
                <FormButtons />
            </Form>
        </>
    )
}


