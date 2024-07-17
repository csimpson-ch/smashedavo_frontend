// TODO - deprecated, can delete later

export function FormExpenseDescription ({formData, setFormData}) {
    return (
        <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                required
            />
        </div>
    )
}

export function FormExpenseAmount ({formData, setFormData}) {
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
                required
            />
        </div>
    )
}

export function FormExpenseCategory ({formData, setFormData, categoryChoices}) {
    return (
        <div className="form-group" id="categorySelect">
            <label id="categoryLabel" htmlFor="categorySelect">Category</label>
            <select
                id="categorySelect"
                className="form-select"
                name="category"
                value={formData.category}
                placeholder="Enter category"
                onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                required
            >
                <option disabled value="">Choose...</option>
                {Object.entries(categoryChoices).map(([key, value]) => (
                    <option key={key}>{value.toString()}</option>
                ))}
            </select>
        </div>
    )
}

export function FormExpenseDate ({formData, setFormData}) {
    return (
        <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
                id="date"
                type="date"
                className="form-control"
                value={formData.date}
                onChange={(event) => setFormData({ ...formData, date: event.target.value })}
                required
            />
        </div>
    )
}

export function FormExpenseApproved ({formData, setFormData}) {
    return (
        <div className="form-group form-switch">
            <input
                id="flexSwitchCheckChecked"
                type="checkbox"
                className="form-check-input"
                name="approved"
                checked={formData.approved}
                onChange={(event) => setFormData({ ...formData, approved: event.target.checked })}
            />
            <label className="form-check-label"htmlFor="flexSwitchCheckChecked">Approved</label>
        </div>
    )
}

