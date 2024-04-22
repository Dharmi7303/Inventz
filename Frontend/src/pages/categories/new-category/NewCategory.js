import React, { useEffect, useState } from 'react';
import '../../../styles/new-edit-form.css';
import './new-category.css';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import trimFormValues from '../../../utils/trimFormValues';

const NewCategory = () => {
    localStorage.setItem('selectedView', 'categories');
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
        name: ''
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
            const response = await fetch(`${API}/api/v1/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
            });

            if (response.ok) {
                alert('Category created successfully');
                navigate('/categories');
                return;
            }
            alert("The category could not be created, please check the data");
        } catch (error) {
            console.log(error);
            alert("Error creating the category");
        }
        setSubmitDisabled(false);
    }

    return (
        <div className="newCategory-container">

            <div className="text">New Category</div>
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

export default NewCategory;
