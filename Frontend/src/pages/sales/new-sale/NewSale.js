import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import '../../../styles/new-edit-form.css';
import { API } from '../../../env';
import SearchSelect from '../../../components/search-select/SearchSelect';
import './new-sale.css';
import ItemSelection from './item-selection/ItemSelection';

const NewSale = () => {
    localStorage.setItem('selectedView', 'sales');
    const navigate = useNavigate();

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [formData, setFormData] = useState({
        customerId: 0,
        articles: [],
        sessionUserId: 0
    });

    useEffect(() => {
        // Permission validation
        const userVer = userVerification();
        if (!userVer.isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Initialize form data
        setFormData({
            ...formData,
            sessionUserId: userVer.user.userId
        });
        // eslint-disable-next-line
    }, [navigate]);

    const handleCustomerSelect = (customer) => {
        setFormData({
            ...formData,
            customerId: customer.customerId
        });
    }

    const onSelectionChange = (articles) => {
        setFormData({
            ...formData,
            articles: articles.map(a => ({articleId: a.articleId, articleQuantity: a.quantity}))
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.articles.length === 0) {
            alert('You must select at least one item');
            return;
        }
        setSubmitDisabled(true);
        try {
            const response = await fetch(`${API}/api/v1/sale`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert('Sale successfully registered');
                navigate('/sales');
                return;
            }
            alert("The sale could not be registered, please check the data");
        } catch (error) {
            console.log(error);
            alert("Error registering the sale");
        }
        setSubmitDisabled(false);
    }
    
    return (
        <div className="newSale-container">
    
            <div className="text">New Sale</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <SearchSelect
                            label="Customer"
                            placeholder="Search for customer..."
                            onSelected={handleCustomerSelect}
                            apiUrl={`${API}/api/v1/customer`}
                            optionsAttr="customers"
                            isRequired={true}
                        />
                    </div>
    
                    <ItemSelection onSelectionChange={onSelectionChange} />
    
                    {formData.articles.length > 0 && (
                        <div className="button-container">
                            <button className="btn" type="submit" disabled={submitDisabled}>
                                Create
                            </button>
                        </div>
                    )}
                </form>
            </div>
    
        </div>
    );
} 

export default NewSale;
