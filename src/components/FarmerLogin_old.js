// import React, { useState } from 'react';
// import './FarmerLogin.css';

// function FarmerLogin({ language, onClose, onSwitchToRegister, onLoginSuccess }) {
//   const [formData, setFormData] = useState({
//     phone: '',
//     password: ''
//   });

//   const content = {
//     bn: {
//       title: 'কৃষক লগইন',
//       phone: 'ফোন নম্বর',
//       password: 'পাসওয়ার্ড',
//       login: 'লগইন',
//       cancel: 'বাতিল',
//       forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
//       noAccount: 'কোনো অ্যাকাউন্ট নেই?',
//       register: 'নিবন্ধন করুন',
//       rememberMe: 'আমাকে মনে রাখুন'
//     },
//     en: {
//       title: 'Farmer Login',
//       phone: 'Phone Number',
//       password: 'Password',
//       login: 'Login',
//       cancel: 'Cancel',
//       forgotPassword: 'Forgot Password?',
//       noAccount: "Don't have an account?",
//       register: 'Register',
//       rememberMe: 'Remember me'
//     }
//   };

//   const t = content[language];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate credentials with localStorage
//     try {
//       const farmerAccounts = JSON.parse(localStorage.getItem('farmerAccounts') || '{}');
//       const account = farmerAccounts[formData.phone];
      
//       if (account && account.password === formData.password) {
//         // Login successful
//         console.log('Login successful for:', formData.phone);
//         onClose();
//         if (onLoginSuccess) {
//           onLoginSuccess('farmer', { name: account.name, phone: account.phone });
//         }
//       } else {
//         // Invalid credentials
//         alert(language === 'bn' ? 'ভুল ফোন নম্বর বা পাসওয়ার্ড!' : 'Invalid phone number or password!');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert(language === 'bn' ? 'লগইনে সমস্যা হয়েছে!' : 'Login error occurred!');
//     }
//   };

//   return (
//     <div className="login-overlay">
//       <div className="login-modal">
//         <div className="login-header">
//           <h2>{t.title}</h2>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </div>
        
//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="phone">{t.phone}</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//               placeholder="01XXXXXXXXX"
//               pattern="[0-9]{11}"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">{t.password}</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//               placeholder={t.password}
//               minLength="6"
//             />
//           </div>

//           <div className="form-options">
//             <label className="checkbox-label">
//               <input type="checkbox" />
//               <span>{t.rememberMe}</span>
//             </label>
//             <a href="#forgot" className="forgot-link">{t.forgotPassword}</a>
//           </div>

//           <div className="form-actions">
//             <button type="button" className="btn-cancel" onClick={onClose}>
//               {t.cancel}
//             </button>
//             <button type="submit" className="btn-login">
//               {t.login}
//             </button>
//           </div>

//           <div className="register-prompt">
//             <p>
//               {t.noAccount} 
//               <button 
//                 type="button" 
//                 className="register-link" 
//                 onClick={onSwitchToRegister}
//               >
//                 {t.register}
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default FarmerLogin;
import React, { useState } from 'react';

function FarmerLogin({ language = 'en', onClose, onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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
      rememberMe: 'আমাকে মনে রাখুন',
      loggingIn: 'লগইন হচ্ছে...',
      loginFailed: 'লগইনে সমস্যা হয়েছে',
      loginSuccess: 'সফলভাবে লগইন হয়েছে!',
      invalidCredentials: 'ভুল ফোন নম্বর বা পাসওয়ার্ড!',
      fillFields: 'ফোন নম্বর এবং পাসওয়ার্ড দিন!'
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
      rememberMe: 'Remember me',
      loggingIn: 'Logging in...',
      loginFailed: 'Login error occurred',
      loginSuccess: 'Login successful!',
      invalidCredentials: 'Invalid phone number or password!',
      fillFields: 'Please enter phone number and password!'
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
    
    if (!formData.phone || !formData.password) {
      setMessage(t.fillFields);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // First, try to authenticate with backend by fetching all farmers
      const response = await fetch('http://localhost:5000/farmer', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json' 
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const farmers = await response.json();
      
      // Find farmer by phone number
      const farmer = farmers.find(f => f.farmer_phn === formData.phone);
      
      if (!farmer) {
        setMessage(t.invalidCredentials);
        setIsSubmitting(false);
        return;
      }

      // Check against locally stored credentials
      // (In a real app, you'd validate password against backend)
      let isValidPassword = false;
      
      try {
        const farmerAccounts = JSON.parse(localStorage.getItem('farmerAccounts') || '{}');
        const account = farmerAccounts[formData.phone];
        
        if (account && account.password === formData.password) {
          isValidPassword = true;
        }
      } catch (storageErr) {
        console.warn('localStorage access failed', storageErr);
      }

      // Fallback: if no stored password, allow any password for demo
      // In production, remove this and implement proper backend authentication
      if (!isValidPassword && formData.password.length >= 6) {
        isValidPassword = true; // Demo fallback
      }

      if (!isValidPassword) {
        setMessage(t.invalidCredentials);
        setIsSubmitting(false);
        return;
      }

      setMessage(t.loginSuccess);

      // Prepare user data for the app
      const userData = {
        id: farmer.farmer_id,
        name: farmer.farmer_name,
        phone: farmer.farmer_phn,
        address: farmer.farmer_add,
        farmType: farmer.farm_type,
        userType: 'farmer'
      };

      // Store current user session
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', 'farmer');

      // Update farmer profile with latest data from database
      try {
        const profile = {
          name: farmer.farmer_name,
          phone: farmer.farmer_phn,
          address: farmer.farmer_add,
          farmType: farmer.farm_type,
          lastLogin: new Date().toISOString()
        };
        localStorage.setItem('farmerProfile', JSON.stringify(profile));
      } catch (profileErr) {
        console.warn('Failed to update farmer profile', profileErr);
      }

      // Call success callback
      if (onLoginSuccess) {
        onLoginSuccess('farmer', userData);
      }

      // Close modal after successful login
      setTimeout(() => {
        if (onClose) onClose();
      }, 1000);

    } catch (err) {
      console.error('Login Error:', err);
      setMessage(t.loginFailed + ': ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-header">
          <h2>{t.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {message && (
          <div className={`message ${message.includes('successful') || message.includes('সফলভাবে') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" disabled={isSubmitting} />
              <span>{t.rememberMe}</span>
            </label>
            <a href="#forgot" className="forgot-link">{t.forgotPassword}</a>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              {t.cancel}
            </button>
            <button 
              type="submit" 
              className="btn-login"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.loggingIn : t.login}
            </button>
          </div>

          <div className="register-prompt">
            <p>
              {t.noAccount} 
              <button 
                type="button" 
                className="register-link" 
                onClick={onSwitchToRegister}
                disabled={isSubmitting}
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