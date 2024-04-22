import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './searchbox.css';

const SearchBox = ({ onSearch, disabled }) => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        onSearch(searchQuery);
    }, [searchQuery, onSearch]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleClearClick = () => {
        setSearchQuery('');
    }

    return (
        <div className="search-box">
            <FontAwesomeIcon
                icon={faSearch}
                className="icon"
            />
            <input 
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange}
                disabled={disabled || false}
            />

            {searchQuery && (
                <FontAwesomeIcon
                    icon={faTimes}
                    className="clear-icon"
                    onClick={handleClearClick}
                />
            )}
        </div>
    );
};

export default SearchBox;
