import React, { useEffect, useState } from 'react';
import '../../../styles/new-edit-form.css';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import SearchSelect from '../../../components/search-select/SearchSelect';
import trimFormValues from '../../../utils/trimFormValues';

const NewItem = () => {
    localStorage.setItem('selectedView', 'items');
    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }
    }, [navigate]);

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        stock: 0,
        purchasePrice: 0,
        salePrice: 0,
        weight: '',
        providerId: 0,
        categoryId: 0
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleProviderSelect = (provider) => {
        setFormData({
            ...formData,
            providerId: provider.providerId
        });
    }

    const handleCategorySelect = (category) => {
        setFormData({
            ...formData,
            categoryId: category.categoryId
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedFormData = trimFormValues(formData);

        setSubmitDisabled(true);
        try {
            const response = await fetch(`${API}/api/v1/article`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
            });

            if (response.ok) {
                alert('Item created successfully');
                navigate('/items');
                return;
            }
            alert("The item could not be created, please check the data");
            } catch (error) {
                console.log(error);
                alert("Error creating the item");
            }
            setSubmitDisabled(false);
            }
            
            return (
            <div className="newItem-container">
                <div className="text">New Item</div>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="grid-form">
                            <div className="form-item">
                                <label htmlFor="name">Name</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="name"
                                    maxLength="45"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
            
                            <div className="two-together">
                                <div className="form-item">
                                    <label htmlFor="stock">Stock</label>
                                    <input
                                        className="input"
                                        type="number"
                                        id="stock"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="weight">Weight</label>
                                    <input
                                        className="input"
                                        type="text"
                                        id="weight"
                                        maxLength="15"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
            
                            <div className="form-item">
                                <label htmlFor="brand">Brand</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="brand"
                                    maxLength="45"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
            
                            <div className="two-together">
                                <div className="form-item">
                                    <label htmlFor="purchasePrice">Purchase Price</label>
                                    <input
                                        className="input"
                                        type="number"
                                        id="purchasePrice"
                                        min="0"
                                        value={formData.purchasePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="salePrice">Sale Price</label>
                                    <input
                                        className="input"
                                        type="number"
                                        id="salePrice"
                                        min="0"
                                        value={formData.salePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
            
                            <SearchSelect
                                label="Provider"
                                placeholder="Search provider..."
                                onSelected={handleProviderSelect}
                                apiUrl={`${API}/api/v1/provider`}
                                optionsAttr="providers"
                                isRequired={true}
                            />
            
                            <SearchSelect
                                label="Category"
                                placeholder="Search category..."
                                onSelected={handleCategorySelect}
                                apiUrl={`${API}/api/v1/category`}
                                optionsAttr="categories"
                                isRequired={true}
                            />
                        </div>
            
                        <div className="button-container">
                            <button className="btn" type="submit" disabled={submitDisabled}>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            );
            }
            

export default NewItem;
