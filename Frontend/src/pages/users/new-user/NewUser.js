import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import '../../../styles/new-edit-form.css';
import trimFormValues from '../../../utils/trimFormValues';

const NewUser = () => {
    localStorage.setItem('selectedView', 'users');
    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        const userVer = userVerification();
        if (!userVer.isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        } else if (!userVer.isAdmin) {
            navigate('/home');
            return;
        }
    }, [navigate]);

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        phoneNumber: '',
        email: '',
        admin: false
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const pwd = formData.password;
        const trimmedFormData = trimFormValues(formData);
        trimmedFormData.password = pwd;

        setSubmitDisabled(true);
        try {
            const response = await fetch(`${API}/api/v1/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
            });

            if (response.ok) {
                alert('User created successfully');
                navigate('/users');
                return;
            }
            alert("The user could not be created, please check the data");
            } catch (error) {
                console.log(error);
                alert("Error creating user");
            }
            
        setSubmitDisabled(false);
    }

    return (
        <div className="newUser-container">

<div className="text">New User</div>
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
                <label htmlFor="username">Username</label>
                <input
                    className="input"
                    type="text"
                    id="username"
                    maxLength="20"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-item">
                <label htmlFor="password">Password</label>
                <input
                    className="input"
                    type="password"
                    id="password"
                    maxLength="15"
                    value={formData.password}
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
                <label htmlFor="admin">Administrator</label>
                <select
                    className="input"
                    id="admin"
                    value={formData.admin}
                    onChange={handleChange}
                    required
                >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
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

export default NewUser;
