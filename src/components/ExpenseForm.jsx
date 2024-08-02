import { Form, Link } from 'react-router-dom';

export function ExpenseForm ({pk, fields, categoryChoices, type}) {
    let isEnabled = false;
    let backURL = "/expenses";
    if (type === "edit") {
        isEnabled = true;
        backURL = `/expenses/${pk}`;
    } else if (type === "create") {
        isEnabled = true;
        backURL = `/create`;
    } else if (type === "delete") {
        backURL = `/expenses/${pk}`;
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
    
    function FormDate () {
        return (
            <div className="form-group">
            <label className="form-label">
                <span>Date</span>
                {isEnabled ? (
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        defaultValue={fields.date}
                        required
                    />
                ) : (
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        defaultValue={fields.date}
                        disabled
                    />
                )}
            </label>
            </div>
        )
    }
    
    function FormApproved () {
        return (
            <div className="form-group">
                <label className="form-label">
                    <span>Approved </span>
                    {isEnabled ? (
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="approved"
                            defaultChecked={fields.approved}
                        />
                    ) : (
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="approved"
                            defaultChecked={fields.approved}
                            disabled
                        />
                    )}
                </label>
            </div>
        )
    }
    
    function FormButtons () {
        if (type === "edit") {
            return (
                <div className="row">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-primary">Update</button>
                    </div>
                    <div className="col-auto">
                        <Link to={backURL}>
                            <button type="button" className="btn btn-secondary">Cancel</button>
                        </Link>
                    </div>
                </div>
            )
        } else if (type === "create") {
            return (
                <div className="row">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-primary">Create</button>
                    </div>
                    <div className="col-auto">
                        <Link to={backURL}>
                            <button type="button" className="btn btn-secondary">Cancel</button>
                        </Link>
                    </div>
                </div>
            )
        } else if (type === "select") {
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
        } else if (type === "delete") {
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
                <FormButtons />
            </Form>
        </>
    )
}


