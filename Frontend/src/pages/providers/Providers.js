import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import './providers.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { API } from '../../env';
import Loading from '../../components/loading/Loading';

const Providers = () => {
    localStorage.setItem('selectedView', 'providers');
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
        const fetchData = async () => {
            try {
                const data = new FormData();
                if (query.length > 0) {
                    data.append('searchCriteria', query);
                }
                data.append('page', page);
                data.append('pageSize', pageSize);

                const url = new URL(`${API}/api/v1/provider`);
                url.search = new URLSearchParams(data).toString();
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                setPaginator(responseData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [navigate, query, page]);

    const handleSearch = (query) => {
        setQuery(query);
        setPage(1); // Reset page to 1 when performing a new search
    }

    const handlePage = (page) => {
        setPage(page);
    }

    return (
        <div className="providers-container">
            <div className="text">Providers</div>
            <div className="options">
                <SearchBox onSearch={handleSearch} disabled={isLoading} />
                <Link to="/new-provider" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">New Provider</span>
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
                            <th>ADDRESS</th>
                            <th>STATE</th>
                            <th>CITY</th>
                            <th>EDIT</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginator.providers && paginator.providers.length > 0 ? (
                            paginator.providers.map(provider => (
                                <tr key={provider.providerId}>
                                    <td>{provider.providerId}</td>
                                    <td>{provider.name}</td>
                                    <td>{provider.phoneNumber}</td>
                                    <td>{provider.email}</td>
                                    <td>{provider.address}</td>
                                    <td>{provider.state}</td>
                                    <td>{provider.city}</td>
                                    <td>
                                        <Link to={`/edit-provider/${provider.providerId}`}>
                                            <FontAwesomeIcon icon={faPen} className="pen-icon"/>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No results found</td>
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

export default Providers;
