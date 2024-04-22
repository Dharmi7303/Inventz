import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import '../../../styles/new-edit-form.css';
import { API } from '../../../env';
import SearchSelect from '../../../components/search-select/SearchSelect';
import trimFormValues from '../../../utils/trimFormValues';
import Loading from '../../../components/loading/Loading';

const EditItem = () => {
    localStorage.setItem('selectedView', 'items');
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
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

    const [relationalData, setRelationalData] = useState({
        provider: {},
        category: {}
    });

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Query data
        (async () => {
            const url = new URL(`${API}/api/v1/article/${id}`);
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!data || data.error) {
                        navigate('/items');
                        return;
                    }
                    setFormData({
                        name: data.name,
                        brand: data.brand,
                        stock: data.stock,
                        purchasePrice: data.purchasePrice,
                        salePrice: data.salePrice,
                        weight: data.weight,
                        providerId: data.provider.providerId,
                        categoryId: data.category.categoryId
                    });
                    setRelationalData({
                        provider: data.provider,
                        category: data.category
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    navigate('/items');
                    return;
                })
        })();
    }, [id, navigate]);

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
            const response = await fetch(`${API}/api/v1/article/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
            });

            if (response.ok) {
                alert('Article updated successfully');
                navigate('/items');
                return;
            }
            alert("The article could not be updated, please check the data");
            
            } catch (error) {
                console.log(error);
                alert("Error updating the article");
            }
            setSubmitDisabled(false);
            }
            
            return (
                <div className="editItem-container">
            
                    <div className="text">Edit Item</div>
                    {!isLoading ? (
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
                                        placeholder="Search for provider..."
                                        onSelected={handleProviderSelect}
                                        apiUrl={`${API}/api/v1/provider`}
                                        optionsAttr="providers"
                                        initialSelectedOption={relationalData.provider}
                                        isRequired={true}
                                    />
            
                                    <SearchSelect
                                        label="Category"
                                        placeholder="Search for category..."
                                        onSelected={handleCategorySelect}
                                        apiUrl={`${API}/api/v1/category`}
                                        optionsAttr="categories"
                                        initialSelectedOption={relationalData.category}
                                        isRequired={true}
                                    />
                                </div>
            
                                <div className="button-container">
                                    <button className="btn" type="submit" disabled={submitDisabled}>
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <Loading />
                    )}
            
                </div>
            );
            }
            

export default EditItem;
