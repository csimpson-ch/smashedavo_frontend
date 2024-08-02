import React from 'react';
import { Link } from 'react-router-dom';
import '../static/bootstrap.min.css';

// TODO - replace the window.location.href with a proper react router redirect to the new page

export default function Create() {
    return (
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className="card">
                            <div className="card-body">
                                <h4 className='card-title'>Expense</h4>
                                <p className='card-text'>Create a new adhoc expense, such as a grocery or other payment.</p>
                                <Link to="/expenses/create">
                                    <button type="button" className="btn btn-outline-primary">Create</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className="card">
                            <div className="card-body">
                                <h4 className='card-title'>Regular Payment</h4>
                                <p className='card-text'>Create a new regular payment.</p>
                                <Link to="/regularpayments/create">
                                    <button type="button" className="btn btn-outline-primary">Create</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className="card">
                            <div className="card-body">
                                <h4 className='card-title'>Loan</h4>
                                <p className='card-text'>Create a new loan.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    )
}


