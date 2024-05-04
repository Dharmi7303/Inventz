import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import '../../../styles/new-edit-form.css';
import trimFormValues from '../../../utils/trimFormValues';

const NewProvider = () => {
    localStorage.setItem('selectedView', 'providers');
    const navigate = useNavigate();

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        state: '',
        city: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedFormData = trimFormValues(formData);

        setSubmitDisabled(true);
        try {
            const response = await fetch(`${API}/api/v1/provider`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
            });

            if (response.ok) {
                alert('Provider created successfully');
                navigate('/providers');
                return;
            }
            alert("The provider could not be created, please check the data");
        } catch (error) {
            console.log(error);
            alert("Error creating the provider");
        }
        setSubmitDisabled(false);
    }

    return (
        <div className="newProvider-container">

            <div className="text">New Provider</div>
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

                        <div className="form-item">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                className="input"
                                type="text"
                                id="phoneNumber"
                                maxLength="20"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="email">Email</label>
                            <input
                                className="input"
                                type="email"
                                id="email"
                                maxLength="100"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="address">Address</label>
                            <input
                                className="input"
                                type="text"
                                id="address"
                                maxLength="100"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="state">State</label>
                            <input
                                className="input"
                                type="text"
                                id="state"
                                maxLength="100"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="city">City</label>
                            <input
                                className="input"
                                type="text"
                                id="city"
                                maxLength="100"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
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

export default NewProvider;
