import React from 'react';
import Navbar from './Navbar';
import '../static/bootstrap.min.css';

export default function Create() {
    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className="card">
                            <div className="card-body">
                                <h4 className='card-title'>Expense</h4>
                                <p className='card-text'>Create a new adhoc expense, such as a grocery or other payment.</p>
                                <button type="button" class="btn btn-primary" onClick={() => window.location.href = '/create/expense'}>Create</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className="card">
                            <div className="card-body">
                                <h4 className='card-title'>Regular Payment</h4>
                                <p className='card-text'>Create a new regular payment.</p>
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
        </div>
    )
}


