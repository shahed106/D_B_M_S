// import React, { useState } from 'react';
// import './DoctorLogin.css';

// function DoctorLogin({ language, onClose, onSwitchToRegister, onLoginSuccess }) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const content = {
//     bn: {
//       title: 'ডাক্তার লগইন',
//       email: 'ইমেইল',
//       password: 'পাসওয়ার্ড',
//       login: 'লগইন',
//       cancel: 'বাতিল',
//       forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
//       noAccount: 'কোনো অ্যাকাউন্ট নেই?',
//       register: 'নিবন্ধন করুন',
//       rememberMe: 'আমাকে মনে রাখুন'
//     },
//     en: {
//       title: 'Doctor Login',
//       email: 'Email',
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
//     console.log('Doctor Login Data:', formData);
    
//     if (formData.email && formData.password) {
//       // Try local demo accounts
//       try {
//         const accounts = JSON.parse(localStorage.getItem('doctorAccounts') || '{}');
//         const entry = accounts[formData.email];
//         if (entry && entry.password === formData.password) {
//           onLoginSuccess('doctor', { id: entry.id, name: entry.name, email: formData.email });
//           onClose();
//           return;
//         }
//       } catch {}
//       // Fallback: proceed without id (name from email prefix)
//       const nameGuess = formData.email.split('@')[0].replace(/\./g,' ');
//       onLoginSuccess('doctor', { name: nameGuess });
//       onClose();
//     } else {
//       alert(language === 'bn' ? 'ইমেইল এবং পাসওয়ার্ড দিন!' : 'Please enter email and password!');
//     }
//   };

//   return (
//     <div className="doctor-login-overlay">
//       <div className="doctor-login-modal">
//         <div className="doctor-login-header">
//           <h2>{t.title}</h2>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </div>
        
//         <form className="doctor-login-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">{t.email}</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               placeholder="doctor@example.com"
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

// export default DoctorLogin;
import React, { useState } from 'react';

function DoctorLogin({ language = 'en', onClose, onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const content = {
    bn: {
      title: 'ডাক্তার লগইন',
      phone: 'ফোন নম্বর',
      password: 'পাসওয়ার্ড',
      login: 'লগইন',
      cancel: 'বাতিল',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      noAccount: 'কোনো অ্যাকাউন্ট নেই?',
      register: 'নিবন্ধন করুন',
      rememberMe: 'আমাকে মনে রাখুন',
      loggingIn: 'লগইন হচ্ছে...',
      loginFailed: 'লগইন ব্যর্থ হয়েছে',
      loginSuccess: 'সফলভাবে লগইন হয়েছে!',
      invalidCredentials: 'ভুল ফোন নম্বর বা পাসওয়ার্ড!',
      fillFields: 'ফোন নম্বর এবং পাসওয়ার্ড দিন!'
    },
    en: {
      title: 'Doctor Login',
      phone: 'Phone Number',
      password: 'Password',
      login: 'Login',
      cancel: 'Cancel',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      register: 'Register',
      rememberMe: 'Remember me',
      loggingIn: 'Logging in...',
      loginFailed: 'Login failed',
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
      // First, try to authenticate with backend by fetching all doctors
      const response = await fetch('http://localhost:5000/doctor', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json' 
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const doctors = await response.json();
      
      // Find doctor by phone number
      const doctor = doctors.find(doc => doc.doctor_phn === formData.phone);
      
      if (!doctor) {
        setMessage(t.invalidCredentials);
        setIsSubmitting(false);
        return;
      }

      // Check against locally stored credentials
      // (In a real app, you'd validate password against backend)
      let isValidPassword = false;
      
      try {
        const doctorAccounts = JSON.parse(localStorage.getItem('doctorAccounts') || '{}');
        const account = doctorAccounts[formData.phone];
        
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
        id: doctor.doctor_id,
        name: doctor.doctor_name,
        phone: doctor.doctor_phn,
        specialization: doctor.doctor_spec,
        address: doctor.doctor_add,
        userType: 'doctor'
      };

      // Store current user session
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', 'doctor');

      // Call success callback
      if (onLoginSuccess) {
        onLoginSuccess('doctor', userData);
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
    <div className="doctor-login-overlay">
      <div className="doctor-login-modal">
        <div className="doctor-login-header">
          <h2>{t.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {message && (
          <div className={`message ${message.includes('successful') || message.includes('সফলভাবে') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <form className="doctor-login-form" onSubmit={handleSubmit}>
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

export default DoctorLogin;