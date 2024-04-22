import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../../assets/avatar.svg';
import '../login.css';
import LoginLayout from '../Layout';

const AccessValidation = () => {
  // State for the input code
  const [inputCode, setInputCode] = useState('');

  // Navigation hook
  const navigate = useNavigate();

  // Effect for managing input focus
  useEffect(() => {
    const inputs = document.querySelectorAll('.input');

    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value === '') {
        parent.classList.remove('focus');
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', addcl);
      input.addEventListener('blur', remcl);
    });

    return () => {
      // Cleanup event listeners
      inputs.forEach((input) => {
        input.removeEventListener('focus', addcl);
        input.removeEventListener('blur', remcl);
      });
    };
  }, []);

  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();

    const accessCode = localStorage.getItem('code');

    if (inputCode === accessCode) {
      window.localStorage.clear(); // Clear storage
      navigate('/home'); // Navigate to home page
      setTimeout(() => {
        alert("Change your password in user settings");
      }, 0);
      return;
    }
    setInputCode('');
    alert("The access code does not match");
  }

  // Handle input change
  function handleInputChange(event) {
    setInputCode(event.target.value);
  }

  return (
    <LoginLayout>
      <div className="login-content">
        <form onSubmit={handleFormSubmit}>
          <img src={avatar} alt="login-avatar" />
          <h2 className="title">Recover your account</h2>
          <p>Enter the access code sent to your email</p>
          <div className="input-div one">
            <div className="icon">
              <FontAwesomeIcon icon={faUser} className="i" />
            </div>
            <div className="div">
              <h5>Access Code</h5>
              <input
                type="text"
                minLength="4"
                maxLength="4"
                className="input"
                value={inputCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </LoginLayout>
  );
}

export default AccessValidation;
