import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../../assets/avatar.svg';
import '../login.css';
import LoginLayout from '../Layout';

const ForgotLogin = () => {
  useEffect(() => {
    // Management of the focus on the inputs
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
      // Remove event listeners
      inputs.forEach((input) => {
        input.removeEventListener('focus', addcl);
        input.removeEventListener('blur', remcl);
      });
    };
  }, []);

  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();
    const code = '1234'; // Mock code for example

    // In a real app, here you would check the user's email/phone/username

    // For this example, we'll just set a mock code in localStorage
    localStorage.setItem('code', code);

    // Navigate to access validation view
    navigate('/access-validation');
  }

  return (
    <LoginLayout>
      <div className="login-content">
        <form onSubmit={handleFormSubmit}>
          <img src={avatar} alt="login-avatar" />
          <h2 className="title">Find your account</h2>
          <p>
            Enter the email, phone number, or username associated with your
            account to change your password.
          </p>
          <div className="input-div one">
            <div className="icon">
              <FontAwesomeIcon icon={faUser} className="i" />
            </div>
            <div className="div">
              <h5>Email, phone, or username</h5>
              <input
                type="text"
                className="input"
                placeholder="Enter email, phone, or username"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn">
            Next
          </button>
        </form>
      </div>
    </LoginLayout>
  );
};

export default ForgotLogin;
