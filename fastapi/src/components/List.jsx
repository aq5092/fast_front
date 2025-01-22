import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from './api'

function ListUser() {
  const [transactions, setTransaction] = useState([])
  const [formdata, setFormdata] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
    is_income: false
  })
  const fetchTransactions = async () => {
    const response = await api.get('/transaction/')
    setTransaction(response.data)
  }
    useEffect(() => {
    fetchTransactions()
    }, [])
    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormdata({
            ...formdata,
            [e.target.name]: value
        })
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        await api.post('/transaction/', formdata)
        fetchTransactions();
        setFormdata({
            amount: '',
            category: '',
            date: '',
            description: '',
            is_income: false
        });
    }

    return (
    <div>
        <nav className='navbar navbar-dark bg-primary'>
            <div className='container-fluid'>
                <Link to='/' className='navbar-brand'>FastAPI + React</Link>
                <h1>hello world</h1>
            </div>
        </nav>
        <div className="container">
            <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="amount">Amount</label>
            </div>
            <input type="text" id='amount' name='amount' onChange={handleInputChange} value={formdata.amount} />
            <div>
                <label htmlFor="category">Category</label> 
                <input type="text" name='category' id='category' onChange={handleInputChange} value={formdata.category} /> 
            </div>
           
            <div>
                <label htmlFor="description">Description</label> 
                <input type="text" name='description' id='description' onChange={handleInputChange} value={formdata.description} /> 
            </div>
           

            <div>
                <label htmlFor="is_income">Income</label> 
                <input type="checkbox" name='is_income' id='is_income' onChange={handleInputChange} value={formdata.is_income} /> 
            </div>
           
            <div>
                <label htmlFor="date">Date</label> 
                <input type="text" name='date' id='date' onChange={handleInputChange} value={formdata.date} /> 
            </div>
            <button type="submit">Submit</button>
            </form>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Income</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListUser