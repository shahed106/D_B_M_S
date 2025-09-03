import React, { useState } from 'react';
import './FarmerLogin.css';

function FarmerLogin({ language, onClose, onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const content = {
    bn: {
      title: 'কৃষক লগইন',
      phone: 'ফোন নম্বর',
      password: 'পাসওয়ার্ড',
      login: 'লগইন',
      cancel: 'বাতিল',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      noAccount: 'কোনো অ্যাকাউন্ট নেই?',
      register: 'নিবন্ধন করুন',
      rememberMe: 'আমাকে মনে রাখুন'
    },
    en: {
      title: 'Farmer Login',
      phone: 'Phone Number',
      password: 'Password',
      login: 'Login',
      cancel: 'Cancel',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      register: 'Register',
      rememberMe: 'Remember me'
    }
  };

  const t = content[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/api/farmer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password
        })
      });

      const result = await response.json();

      if (result.success) {
        // Login successful
        console.log('Login successful:', result.user);
        
        // Save user data locally
        localStorage.setItem('farmerProfile', JSON.stringify(result.user));
        localStorage.setItem('authToken', result.token);
        
        onClose();
        if (onLoginSuccess) {
          onLoginSuccess('farmer', result.user);
        }
      } else {
        // Check if requires registration
        if (result.requiresRegistration) {
          const shouldRegister = window.confirm(
            language === 'bn' 
              ? "কোন অ্যাকাউন্ট নেই। নিবন্ধন করতে চান?" 
              : "Don't have account. Do you want to Register?"
          );
          
          if (shouldRegister) {
            onClose();
            onSwitchToRegister();
          }
        } else {
          alert(result.message || (language === 'bn' ? 'ভুল ফোন নম্বর বা পাসওয়ার্ড!' : 'Invalid credentials!'));
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(language === 'bn' ? 'সার্ভার এর সাথে সংযোগে সমস্যা!' : 'Server connection error!');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-header">
          <h2>{t.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">{t.phone}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="01XXXXXXXXX"
              pattern="[0-9]{11}"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t.password}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder={t.password}
              minLength="6"
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkmark"></span>
              {t.rememberMe}
            </label>
            <button type="button" className="forgot-password">
              {t.forgotPassword}
            </button>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              {t.cancel}
            </button>
            <button type="submit" className="btn-login">
              {t.login}
            </button>
          </div>

          <div className="register-prompt">
            <p>
              {t.noAccount} 
              <button 
                type="button" 
                className="register-link" 
                onClick={onSwitchToRegister}
              >
                {t.register}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FarmerLogin;
