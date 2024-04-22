import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import './customers.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { API } from '../../env';
import Loading from '../../components/loading/Loading';

const Customers = () => {
    localStorage.setItem('selectedView', 'customers');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [isLoading, setIsLoading] = useState(true);

    const [paginator, setPaginator] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Query paginated data
        const data = new FormData();
        if (query.length > 0) {
            data.append('searchCriteria', query);
        }
        data.append('page', page);
        data.append('pageSize', pageSize);

        const url = new URL(`${API}/api/v1/customer`);
        url.search = new URLSearchParams(data).toString();
        (async () => {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setPaginator(data);
                    setIsLoading(false);
                })
                .catch(error => console.log(error))
        })();
    }, [navigate, query, page]);

    const handleSearch = (query) => { 
        setQuery(query);
    }
    
    const handlePage = (page) => {
        setPage(page);
    }

    return (
        <div className="customers-container">

            <div className="text">Customer</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} disabled={isLoading} />
                <Link to="/new-customer" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">New customer</span>
                </Link>
            </div>

            {!isLoading ? (
                <div className="table-container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>ID NUMBER</th>
                            <th>ADDRESS</th>
                            <th>STATE</th>
                            <th>CITY</th>
                            <th>EDIT</th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginator.customers && paginator.customers.length > 0 ? (
                                paginator.customers.map(customer => (
                                    <tr key={customer.customerId}>
                                        <td>{customer.customerId}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.phoneNumber}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.document}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.state}</td>
                                        <td>{customer.city}</td>
                                        <td>
                                            <Link to={`/edit-customer/${customer.customerId}`}>
                                                <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9">No results found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Pagination paginator={paginator} onChangePage={handlePage} />
                </div>
            ) : (
                <Loading />
            )}

        </div>
    );
}

export default Customers;
