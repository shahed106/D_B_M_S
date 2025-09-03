// import React, { useState } from 'react';
// import './FarmerRegistration.css';

// function FarmerRegistration({ language, onClose, onSwitchToLogin }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     address: '',
//     farmType: '',
//   customFarmType: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const content = {
//     bn: {
//       title: 'কৃষক নিবন্ধন',
//       name: 'নাম',
//       phone: 'ফোন নম্বর',
//       address: 'ঠিকানা',
//       farmType: 'খামারের ধরন',
//   specifyFarmType: 'খামারের ধরন লিখুন',
//       password: 'পাসওয়ার্ড',
//       confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
//       register: 'নিবন্ধন করুন',
//       cancel: 'বাতিল',
//       haveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
//       login: 'লগইন করুন',
//       farmTypes: [
//         { value: '', label: 'খামারের ধরন নির্বাচন করুন' },
//         { value: 'rice', label: 'ধান চাষ' },
//         { value: 'wheat', label: 'গম চাষ' },
//         { value: 'vegetables', label: 'সবজি চাষ' },
//         { value: 'fruits', label: 'ফল চাষ' },
//         { value: 'livestock', label: 'পশুপালন' },
//         { value: 'poultry', label: 'মুরগি পালন' },
//         { value: 'fish', label: 'মাছ চাষ' },
//         { value: 'mixed', label: 'মিশ্র চাষ' },
//         { value: 'other', label: 'অন্যান্য' }
//       ]
//     },
//     en: {
//       title: 'Farmer Registration',
//       name: 'Name',
//       phone: 'Phone Number',
//       address: 'Address',
//       farmType: 'Farm Type',
//   specifyFarmType: 'Specify Farm Type',
//       password: 'Password',
//       confirmPassword: 'Confirm Password',
//       register: 'Register',
//       cancel: 'Cancel',
//       haveAccount: 'Already have an account?',
//       login: 'Login',
//       farmTypes: [
//         { value: '', label: 'Select Farm Type' },
//         { value: 'rice', label: 'Rice Farming' },
//         { value: 'wheat', label: 'Wheat Farming' },
//         { value: 'vegetables', label: 'Vegetable Farming' },
//         { value: 'fruits', label: 'Fruit Farming' },
//         { value: 'livestock', label: 'Livestock' },
//         { value: 'poultry', label: 'Poultry' },
//         { value: 'fish', label: 'Fish Farming' },
//         { value: 'mixed', label: 'Mixed Farming' },
//         { value: 'other', label: 'Other' }
//       ]
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
    
//     // Check if passwords match
//     if (formData.password !== formData.confirmPassword) {
//       alert(language === 'bn' ? 'পাসওয়ার্ড মিলছে না!' : 'Passwords do not match!');
//       return;
//     }
//     // If other is selected, custom is required
//     if (formData.farmType === 'other' && !formData.customFarmType.trim()) {
//       alert(language === 'bn' ? 'অনুগ্রহ করে খামারের ধরন লিখুন' : 'Please specify the farm type');
//       return;
//     }
    
//     // Persist non-sensitive profile info locally for the dashboard profile
//     try {
//       const profile = {
//         name: formData.name,
//         phone: formData.phone,
//         address: formData.address,
//         farmType: formData.farmType,
//         customFarmType: formData.customFarmType || ''
//       };
//       localStorage.setItem('farmerProfile', JSON.stringify(profile));
      
//       // Also create farmer account for login
//       const farmerAccounts = JSON.parse(localStorage.getItem('farmerAccounts') || '{}');
//       farmerAccounts[formData.phone] = {
//         password: formData.password,
//         name: formData.name,
//         phone: formData.phone,
//         registeredAt: new Date().toISOString()
//       };
//       localStorage.setItem('farmerAccounts', JSON.stringify(farmerAccounts));
      
//     } catch (err) {
//       console.warn('Failed saving farmer data to localStorage', err);
//     }

//     // Here you would typically send the data to your backend as well
//     console.log('Farmer Registration Data:', { ...formData, password: '***', confirmPassword: '***' });
    
//     // Show success message
//     alert(language === 'bn' ? 'সফলভাবে নিবন্ধন সম্পন্ন হয়েছে!' : 'Registration completed successfully!');
    
//     // Direct registration without alert – close modal
//     onClose();
//   };

//   return (
//     <div className="registration-overlay">
//       <div className="registration-modal">
//         <div className="registration-header">
//           <h2>{t.title}</h2>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </div>
        
//         <form className="registration-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">{t.name}</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//               placeholder={t.name}
//             />
//           </div>

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
//             <label htmlFor="address">{t.address}</label>
//             <textarea
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               required
//               placeholder={t.address}
//               rows="3"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="farmType">{t.farmType}</label>
//             <select
//               id="farmType"
//               name="farmType"
//               value={formData.farmType}
//               onChange={handleInputChange}
//               required
//             >
//               {t.farmTypes.map((type) => (
//                 <option key={type.value} value={type.value}>
//                   {type.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {formData.farmType === 'other' && (
//             <div className="form-group">
//               <label htmlFor="customFarmType">{t.specifyFarmType}</label>
//               <input
//                 type="text"
//                 id="customFarmType"
//                 name="customFarmType"
//                 value={formData.customFarmType}
//                 onChange={handleInputChange}
//                 placeholder={t.specifyFarmType}
//                 required
//               />
//             </div>
//           )}

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

//           <div className="form-group">
//             <label htmlFor="confirmPassword">{t.confirmPassword}</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               required
//               placeholder={t.confirmPassword}
//               minLength="6"
//             />
//           </div>

//           <div className="form-actions">
//             <button type="button" className="btn-cancel" onClick={onClose}>
//               {t.cancel}
//             </button>
//             <button type="submit" className="btn-register">
//               {t.register}
//             </button>
//           </div>

//           <div className="login-prompt">
//             <p>
//               {t.haveAccount} 
//               <button 
//                 type="button" 
//                 className="login-link" 
//                 onClick={onSwitchToLogin}
//               >
//                 {t.login}
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default FarmerRegistration;



import React, { useState } from 'react';

function FarmerRegistration({ language = 'en', onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    farmType: '',
    customFarmType: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const content = {
    bn: {
      title: 'কৃষক নিবন্ধন',
      name: 'নাম',
      phone: 'ফোন নম্বর',
      address: 'ঠিকানা',
      farmType: 'খামারের ধরন',
      specifyFarmType: 'খামারের ধরন লিখুন',
      password: 'পাসওয়ার্ড',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      register: 'নিবন্ধন করুন',
      cancel: 'বাতিল',
      haveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
      login: 'লগইন করুন',
      registering: 'নিবন্ধন হচ্ছে...',
      passwordMismatch: 'পাসওয়ার্ড মিলছে না!',
      specifyFarmTypeRequired: 'অনুগ্রহ করে খামারের ধরন লিখুন',
      registrationFailed: 'কৃষক নিবন্ধন ব্যর্থ হয়েছে',
      registrationSuccess: 'সফলভাবে নিবন্ধন সম্পন্ন হয়েছে!',
      farmTypes: [
        { value: '', label: 'খামারের ধরন নির্বাচন করুন' },
        { value: 'Crop Farming', label: 'ধান চাষ' },
        { value: 'Livestock', label: 'পশুপালন' },
        { value: 'Poultry', label: 'মুরগি পালন' },
        { value: 'Dairy', label: 'দুগ্ধ খামার' },
        { value: 'Mixed Farming', label: 'মিশ্র চাষ' },
        { value: 'Organic Farming', label: 'জৈব চাষ' },
        { value: 'Aquaculture', label: 'মাছ চাষ' },
        { value: 'Horticulture', label: 'ফল ও সবজি চাষ' },
        { value: 'other', label: 'অন্যান্য' }
      ]
    },
    en: {
      title: 'Farmer Registration',
      name: 'Name',
      phone: 'Phone Number',
      address: 'Address',
      farmType: 'Farm Type',
      specifyFarmType: 'Specify Farm Type',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      register: 'Register',
      cancel: 'Cancel',
      haveAccount: 'Already have an account?',
      login: 'Login',
      registering: 'Registering...',
      passwordMismatch: 'Passwords do not match!',
      specifyFarmTypeRequired: 'Please specify the farm type',
      registrationFailed: 'Failed to register farmer',
      registrationSuccess: 'Registration completed successfully!',
      farmTypes: [
        { value: '', label: 'Select Farm Type' },
        { value: 'Crop Farming', label: 'Crop Farming' },
        { value: 'Livestock', label: 'Livestock' },
        { value: 'Poultry', label: 'Poultry' },
        { value: 'Dairy', label: 'Dairy' },
        { value: 'Mixed Farming', label: 'Mixed Farming' },
        { value: 'Organic Farming', label: 'Organic Farming' },
        { value: 'Aquaculture', label: 'Aquaculture' },
        { value: 'Horticulture', label: 'Horticulture' },
        { value: 'other', label: 'Other' }
      ]
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
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage(t.passwordMismatch);
      return;
    }

    // If other is selected, custom is required
    if (formData.farmType === 'other' && !formData.customFarmType.trim()) {
      setMessage(t.specifyFarmTypeRequired);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    // Prepare data for backend (matching your server.js farmer endpoint)
    const farmerData = {
      farmer_name: formData.name,
      farmer_phn: formData.phone,
      farmer_add: formData.address,
      farm_type: formData.farmType === 'other' ? formData.customFarmType : formData.farmType
    };

    try {
      const response = await fetch('http://localhost:5000/farmer', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(farmerData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setMessage(t.registrationSuccess);

      // Store additional data locally for your app's use
      try {
        const profile = {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          farmType: formData.farmType,
          customFarmType: formData.customFarmType || '',
          registeredAt: new Date().toISOString()
        };
        localStorage.setItem('farmerProfile', JSON.stringify(profile));
        
        // Also create farmer account for login
        const farmerAccounts = JSON.parse(localStorage.getItem('farmerAccounts') || '{}');
        farmerAccounts[formData.phone] = {
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          registeredAt: new Date().toISOString()
        };
        localStorage.setItem('farmerAccounts', JSON.stringify(farmerAccounts));
      } catch (storageErr) {
        console.warn('Failed saving farmer data to localStorage', storageErr);
      }

      // Close modal after successful registration
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);

    } catch (err) {
      console.error('Registration Error:', err);
      setMessage(t.registrationFailed + ': ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-overlay">
      <div className="registration-modal">
        <div className="registration-header">
          <h2>{t.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {message && (
          <div className={`message ${message.includes('successfully') || message.includes('সফলভাবে') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder={t.name}
              disabled={isSubmitting}
            />
          </div>

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
            <label htmlFor="address">{t.address}</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder={t.address}
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="farmType">{t.farmType}</label>
            <select
              id="farmType"
              name="farmType"
              value={formData.farmType}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            >
              {t.farmTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {formData.farmType === 'other' && (
            <div className="form-group">
              <label htmlFor="customFarmType">{t.specifyFarmType}</label>
              <input
                type="text"
                id="customFarmType"
                name="customFarmType"
                value={formData.customFarmType}
                onChange={handleInputChange}
                placeholder={t.specifyFarmType}
                required
                disabled={isSubmitting}
              />
            </div>
          )}

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

          <div className="form-group">
            <label htmlFor="confirmPassword">{t.confirmPassword}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder={t.confirmPassword}
              minLength="6"
              disabled={isSubmitting}
            />
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
              className="btn-register"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.registering : t.register}
            </button>
          </div>

          <div className="login-prompt">
            <p>
              {t.haveAccount} 
              <button 
                type="button" 
                className="login-link" 
                onClick={onSwitchToLogin}
                disabled={isSubmitting}
              >
                {t.login}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FarmerRegistration;