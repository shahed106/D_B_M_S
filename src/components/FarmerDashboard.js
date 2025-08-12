import React, { useEffect, useState } from 'react';
import './FarmerDashboard.css';
import MedicineShops from './MedicineShops';
import PaymentDashboard from './PaymentDashboard';
import OrderConfirmation from './OrderConfirmation';

function FarmerDashboard({ language = 'bn', onLogout }) {
  const t = {
    bn: {
      title: 'কৃষক ড্যাশবোর্ড',
      book: 'অ্যাপয়েন্টমেন্ট বুক',
      notifications: 'নোটিফিকেশন',
      history: 'ইতিহাস',
      profile: 'প্রোফাইল',
      prescriptions: 'প্রেসক্রিপশন',
      orders: 'ওষুধ অর্ডার',
      logout: 'লগআউট',
      bookTitle: 'অ্যাপয়েন্টমেন্ট বুক করুন',
      problem: 'আপনার সমস্যা',
      farmType: 'চাষাবাদের ধরন',
      details: 'বিস্তারিত (ঐচ্ছিক)',
      helper: 'তারিখ ও সময় স্বয়ংক্রিয়ভাবে ধরা হবে',
      select: 'নির্বাচন করুন',
  types: { rice: 'ধান', vegetables: 'সবজি', fruits: 'ফল', livestock: 'পশুপালন', fisheries: 'মৎস্য', other: 'অন্যান্য' },
  specifyFarmType: 'খামারের ধরন লিখুন',
      requestBtn: 'রিকোয়েস্ট সাবমিট করুন',
      requesting: 'রিকোয়েস্ট পাঠানো হচ্ছে…',
      none: 'এখনও কোন নোটিফিকেশন নেই',
      assignedTo: 'অ্যাসাইনড ডাক্তার',
      date: 'তারিখ',
      time: 'সময়',
      joinMeet: 'Google Meet যোগ দিন',
      histTitle: 'অ্যাপয়েন্টমেন্ট ইতিহাস',
      histNone: 'কোন ইতিহাস নেই',
      cols: { doctor: 'ডাক্তার', problem: 'সমস্যা', farmType: 'চাষাবাদ', status: 'অবস্থা', actions: 'অ্যাকশন' },
      urgency: 'অগ্রাধিকার',
      urgent: 'জরুরি',
      normal: 'সাধারণ',
  status: { 
    pending: 'অপেক্ষমান', 
    confirmed: 'নিশ্চিত', 
    accepted: 'গ্রহণ করা হয়েছে',
    payment_pending: 'পেমেন্ট প্রয়োজন',
    completed: 'সম্পন্ন'
  },
      profTitle: 'প্রোফাইল তথ্য',
  name: 'নাম', phone: 'ফোন', address: 'ঠিকানা', save: 'সংরক্ষণ করুন', edit: 'এডিট', cancel: 'বাতিল',
  fee: 'ফি', estimatedFee: 'আনুমানিক ফি',
      prescTitle: 'আমার প্রেসক্রিপশনস',
      prescNone: 'কোন প্রেসক্রিপশন নেই',
      prescNo: 'প্রেসক্রিপশন নং',
      diagnosis: 'রোগ নির্ণয়',
      treatment: 'চিকিৎসা',
      medicines: 'ওষুধসমূহ',
      instructions: 'নির্দেশনা',
      followUp: 'পরবর্তী ভিজিট',
      download: 'ডাউনলোড',
      orderMedicine: 'ওষুধ অর্ডার করুন',
      medicineOrders: 'ওষুধ অর্ডার সমূহ',
      noOrders: 'কোন অর্ডার নেই',
      paymentRequired: 'পেমেন্ট প্রয়োজন',
      payNow: 'এখনই পেমেন্ট করুন',
      paymentCompleted: 'পেমেন্ট সম্পন্ন',
      appointmentConfirmed: 'অ্যাপয়েন্টমেন্ট নিশ্চিত',
      validation: { problem: 'সমস্যা লিখুন', farmType: 'চাষাবাদের ধরন নির্বাচন করুন' }
    },
    en: {
      title: 'Farmer Dashboard',
      book: 'Book',
      notifications: 'Notifications',
      history: 'History',
      profile: 'Profile',
      prescriptions: 'Prescriptions',
      orders: 'Medicine Orders',
      logout: 'Logout',
      bookTitle: 'Book Appointment',
      problem: 'Your Problem',
      farmType: 'Farming Type',
      details: 'Details (optional)',
      helper: 'Date and time will be auto-assigned',
      select: 'Select',
  types: { rice: 'Rice', vegetables: 'Vegetables', fruits: 'Fruits', livestock: 'Livestock', fisheries: 'Fisheries', other: 'Other' },
  specifyFarmType: 'Specify Farm Type',
      requestBtn: 'Submit Request',
      requesting: 'Submitting…',
      none: 'No notifications yet',
      assignedTo: 'Assigned Doctor',
      date: 'Date',
      time: 'Time',
      joinMeet: 'Join Google Meet',
      histTitle: 'Appointment History',
      histNone: 'No history yet',
      cols: { doctor: 'Doctor', problem: 'Problem', farmType: 'Farming', status: 'Status', actions: 'Actions' },
      urgency: 'Priority',
      urgent: 'Urgent',
      normal: 'Normal',
  status: { 
    pending: 'Pending', 
    confirmed: 'Confirmed', 
    accepted: 'Accepted',
    payment_pending: 'Payment Required',
    completed: 'Completed'
  },
      profTitle: 'Profile Info',
  name: 'Name', phone: 'Phone', address: 'Address', save: 'Save', edit: 'Edit', cancel: 'Cancel',
  fee: 'Fee', estimatedFee: 'Estimated Fee',
      prescTitle: 'My Prescriptions',
      prescNone: 'No prescriptions yet',
      prescNo: 'Prescription No',
      diagnosis: 'Diagnosis',
      treatment: 'Treatment',
      medicines: 'Medicines',
      instructions: 'Instructions',
      followUp: 'Follow-up',
      download: 'Download',
      orderMedicine: 'Order Medicine',
      medicineOrders: 'Medicine Orders',
      noOrders: 'No orders yet',
      paymentRequired: 'Payment Required',
      payNow: 'Pay Now',
      paymentCompleted: 'Payment Completed',
      appointmentConfirmed: 'Appointment Confirmed',
      validation: { problem: 'Please enter a problem', farmType: 'Please select a farming type' }
    }
  }[language];

  const [active, setActive] = useState('book');
  const [profile, setProfile] = useState({ 
    name: language==='bn' ? 'কৃষক' : 'Farmer', 
    phone: '01XXXXXXXXX', 
    address: language==='bn' ? 'বাংলাদেশ' : 'Bangladesh', 
    farmType: '', 
    customFarmType: '' 
  });
  const [editMode, setEditMode] = useState(false);

  // Form state: only problem, farmType (+custom if other), urgency
  const [form, setForm] = useState({ problem: '', farmType: '', customFarmType: '', urgency: 'normal' });
  const [submitting, setSubmitting] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [history, setHistory] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicineOrderingStage, setMedicineOrderingStage] = useState(null); // null, 'shops', 'payment', 'confirmation'
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [medicineOrders, setMedicineOrders] = useState([]);

  const loadProfile = () => {
    const p = JSON.parse(localStorage.getItem('farmerProfile') || '{}');
    setProfile({
      name: p.name || (language==='bn' ? 'কৃষক' : 'Farmer'),
      phone: p.phone || '01XXXXXXXXX',
      address: p.address || (language==='bn' ? 'বাংলাদেশ' : 'Bangladesh'),
  farmType: p.farmType || '',
  customFarmType: p.customFarmType || ''
    });
  };
  const saveProfile = () => {
    localStorage.setItem('farmerProfile', JSON.stringify(profile));
    setEditMode(false);
  };

  const loadNotifications = () => {
    const all = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
    const accepted = all.filter(n => n.type === 'appointment_accepted');
    accepted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setNotifications(accepted);
    const unread = accepted.filter(n => !n.isRead).length;
    setUnreadCount(unread);
  };

  const loadPendingPayments = () => {
    if (!profile || !profile.phone) return;
    
    const all = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
    const paymentRequired = all.filter(n => 
      n.type === 'payment_required' && 
      n.farmerPhone === profile.phone &&
      !n.isPaid
    );
    paymentRequired.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setPendingPayments(paymentRequired);
  };

  const loadHistory = () => {
    const list = JSON.parse(localStorage.getItem('farmerAppointmentsHistory') || '[]');
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setHistory(list);
  };

  const loadPrescriptions = () => {
    console.log('LoadPrescriptions called');
    const farmerPhone = profile.phone || '01700000000'; // Default phone for testing
    console.log('Loading prescriptions for phone:', farmerPhone);
    const allPrescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    console.log('All prescriptions:', allPrescriptions);
    
    // Always add sample prescriptions for testing (remove this condition)
    const samplePrescriptions = [
      {
        id: `PRESC${Date.now()}`,
        prescriptionNo: `P001-${new Date().getFullYear()}`,
        farmerName: profile.name || 'কৃষক নাম',
        farmerPhone: farmerPhone,
        farmerAge: '35',
        farmerAddress: profile.address || 'ঢাকা, বাংলাদেশ',
        doctorName: 'Dr. Rahman Ahmed',
        diagnosis: 'গাছের পাতায় দাগ রোগ',
        treatment: 'ছত্রাকনাশক স্প্রে ও যত্ন',
        medicines: [
          {
            name: 'ম্যানকোজেব ৭৫% WP',
            dosage: '২ গ্রাম প্রতি লিটার পানিতে',
            duration: '৭ দিন',
            instructions: 'সকাল ও সন্ধ্যা স্প্রে করুন'
          },
          {
            name: 'কপার সালফেট',
            dosage: '১ গ্রাম প্রতি লিটার পানিতে',
            duration: '১০ দিন',
            instructions: 'পাতায় ভালোভাবে স্প্রে করুন'
          }
        ],
        instructions: 'নিয়মিত স্প্রে করুন এবং আক্রান্ত পাতা পরিষ্কার করুন',
        followUp: '১ সপ্তাহ পর',
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString('bn-BD')
      },
      {
        id: `PRESC${Date.now() + 1}`,
        prescriptionNo: `P002-${new Date().getFullYear()}`,
        farmerName: profile.name || 'কৃষক নাম',
        farmerPhone: farmerPhone,
        farmerAge: '35',
        farmerAddress: profile.address || 'ঢাকা, বাংলাদেশ',
        doctorName: 'Dr. Fatima Begum',
        diagnosis: 'মাছের রোগ প্রতিরোধ',
        treatment: 'পানি পরিষ্কার ও ওষুধ প্রয়োগ',
        medicines: [
          {
            name: 'পটাশিয়াম পারম্যাঙ্গানেট',
            dosage: '১ পিপিএম',
            duration: '৫ দিন',
            instructions: 'পুকুরে মিশিয়ে দিন'
          },
          {
            name: 'প্রোবায়োটিক',
            dosage: '১০ গ্রাম প্রতি একর',
            duration: '১৫ দিন',
            instructions: 'সাপ্তাহিক প্রয়োগ করুন'
          }
        ],
        instructions: 'পানির গুণমান নিয়মিত পরীক্ষা করুন',
        followUp: '২ সপ্তাহ পর',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        date: new Date(Date.now() - 86400000).toLocaleDateString('bn-BD')
      }
    ];
    
    // Clear existing and set new prescriptions for testing
    localStorage.setItem('prescriptions', JSON.stringify(samplePrescriptions));
    
    const myPrescriptions = samplePrescriptions.filter(p => p.farmerPhone === farmerPhone);
    myPrescriptions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log('My prescriptions:', myPrescriptions);
    setPrescriptions(myPrescriptions);
  };

  const loadMedicineOrders = () => {
    if (!profile || !profile.phone) {
      setMedicineOrders([]);
      return;
    }
    
    try {
      const orders = JSON.parse(localStorage.getItem('medicineOrders') || '[]');
      const farmerOrders = orders.filter(order => 
        order && 
        order.deliveryInfo && 
        order.deliveryInfo.phone && 
        order.deliveryInfo.phone === profile.phone
      );
      farmerOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setMedicineOrders(farmerOrders);
    } catch (error) {
      console.error('Error loading medicine orders:', error);
      setMedicineOrders([]);
    }
  };

  const handlePayment = (paymentNotification) => {
    setSelectedPayment(paymentNotification);
    setShowPaymentModal(true);
  };

  const processPayment = (paymentMethod) => {
    if (!selectedPayment) return;

    // Mark payment as paid
    const all = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
    const updated = all.map(n => 
      n.id === selectedPayment.id 
        ? { ...n, isPaid: true, paymentMethod, paidAt: new Date().toISOString() }
        : n
    );
    localStorage.setItem('farmerNotifications', JSON.stringify(updated));

    // Auto-confirm appointment
    const appointments = JSON.parse(localStorage.getItem('farmerAppointmentsHistory') || '[]');
    const appointmentUpdated = appointments.map(appt => 
      appt.id === selectedPayment.appointmentId
        ? { ...appt, status: 'confirmed', confirmedAt: new Date().toISOString() }
        : appt
    );
    localStorage.setItem('farmerAppointmentsHistory', JSON.stringify(appointmentUpdated));

    // Create confirmation notification
    const confirmationNotification = {
      id: Date.now() + Math.random(),
      type: 'appointment_confirmed',
      title: language === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিশ্চিত' : 'Appointment Confirmed',
      content: language === 'bn' 
        ? `আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে। ডাক্তার: ${selectedPayment.doctorName}`
        : `Your appointment has been confirmed. Doctor: ${selectedPayment.doctorName}`,
      timestamp: new Date().toISOString(),
      isRead: false,
      doctorName: selectedPayment.doctorName,
      appointmentDate: selectedPayment.appointmentDate,
      appointmentTime: selectedPayment.appointmentTime,
      googleMeetLink: selectedPayment.googleMeetLink,
      fee: selectedPayment.fee
    };

    updated.unshift(confirmationNotification);
    localStorage.setItem('farmerNotifications', JSON.stringify(updated));

    // Refresh data
    loadPendingPayments();
    loadNotifications();
    loadHistory();
    
    // Close modal
    setShowPaymentModal(false);
    setSelectedPayment(null);

    alert(language === 'bn' ? 'পেমেন্ট সম্পন্ন! অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে।' : 'Payment completed! Appointment confirmed.');
  };

  useEffect(() => {
    loadProfile();
    // Force add prescriptions immediately for testing
    const forcePrescriptions = [
      {
        id: 'FORCE1',
        prescriptionNo: 'P001-2025',
        farmerName: 'Test Farmer',
        farmerPhone: '01700000000',
        doctorName: 'Dr. Rahman Ahmed',
        diagnosis: 'গাছের পাতায় দাগ রোগ',
        treatment: 'ছত্রাকনাশক স্প্রে ও যত্ন',
        medicines: [
          {
            name: 'ম্যানকোজেব ৭৫% WP',
            dosage: '২ গ্রাম প্রতি লিটার পানিতে',
            duration: '৭ দিন',
            instructions: 'সকাল ও সন্ধ্যা স্প্রে করুন'
          }
        ],
        instructions: 'নিয়মিত স্প্রে করুন',
        followUp: '১ সপ্তাহ পর',
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString('bn-BD')
      }
    ];
    setPrescriptions(forcePrescriptions);
    localStorage.setItem('prescriptions', JSON.stringify(forcePrescriptions));
    
    // Load other data after a small delay to ensure profile is loaded
    setTimeout(() => {
      loadPrescriptions();
      loadMedicineOrders();
      loadNotifications();
      loadHistory();
    }, 100);
    // Seed a demo notification once
    const seeded = localStorage.getItem('farmerDemoSeeded');
    if (!seeded) {
      const now = new Date();
      const apptDate = now.toISOString().slice(0, 10);
      const apptTime = now.toTimeString().slice(0, 5);
      const doctors = ['Dr. Rahman Ahmed', 'Dr. Fatima Begum', 'Dr. Karim Hossain'];
      const doctorName = doctors[Math.floor(Math.random()*doctors.length)];
      const seg = () => Math.random().toString(36).slice(2,6);
      const googleMeetLink = `https://meet.google.com/${seg()}-${seg()}-${seg()}`;
      const demo = {
        id: Date.now(),
        type: 'appointment_accepted',
        title: language==='bn' ? 'ডেমো: অ্যাপয়েন্টমেন্ট গ্রহণ' : 'Demo: Appointment Accepted',
        content: language==='bn' ? `${apptDate} ${apptTime} — ডেমো নোটিফিকেশন` : `Demo notification for ${apptDate} ${apptTime}`,
        timestamp: now.toISOString(),
        isRead: false,
        doctorName,
        appointmentDate: apptDate,
        appointmentTime: apptTime,
        googleMeetLink,
        fee: 200
      };
      const existing = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
      existing.unshift(demo);
      localStorage.setItem('farmerNotifications', JSON.stringify(existing));
      localStorage.setItem('farmerDemoSeeded', '1');
    }
    // Seed sample appointments/history for understanding
    const samplesSeeded = localStorage.getItem('farmerSamplesSeeded');
    if (!samplesSeeded) {
      try {
        // Also seed demo doctors and login accounts if not already
        if (!localStorage.getItem('demoDoctorsSeeded')) {
          const demoDoctors = [
            { id: 1001, fullName: 'Dr. Rahman Ahmed', specialization: 'crop_production', availableDays: ['saturday','sunday','monday','tuesday','wednesday','thursday'], availableTimeFrom: '09:00', availableTimeTo: '17:00' },
            { id: 1002, fullName: 'Dr. Fatima Begum', specialization: 'crop_production', availableDays: ['saturday','monday','wednesday'], availableTimeFrom: '10:00', availableTimeTo: '18:00' },
            { id: 1003, fullName: 'Dr. Karim Hossain', specialization: 'livestock_health', availableDays: ['sunday','tuesday','thursday'], availableTimeFrom: '08:30', availableTimeTo: '16:30' }
          ];
          const existingDocs = JSON.parse(localStorage.getItem('doctors') || '[]');
          const merged = [...existingDocs, ...demoDoctors.filter(d => !existingDocs.some(e => e.id === d.id))];
          localStorage.setItem('doctors', JSON.stringify(merged));
          const doctorAccounts = JSON.parse(localStorage.getItem('doctorAccounts') || '{}');
          const mergedAccounts = {
            ...doctorAccounts,
            'rahman.ahmed@demo.com': { password: '123456', id: 1001, name: 'Dr. Rahman Ahmed' },
            'fatima.begum@demo.com': { password: '123456', id: 1002, name: 'Dr. Fatima Begum' },
            'karim.hossain@demo.com': { password: '123456', id: 1003, name: 'Dr. Karim Hossain' }
          };
          localStorage.setItem('doctorAccounts', JSON.stringify(mergedAccounts));
          localStorage.setItem('demoDoctorsSeeded', '1');
        }
        const prof = JSON.parse(localStorage.getItem('farmerProfile') || '{}');
        const genId = () => Date.now() + Math.floor(Math.random()*10000);
        const pad = (n) => String(n).padStart(2,'0');
        const now = new Date();
        const today = now.toISOString().slice(0,10);
        const tPlus = (mins) => {
          const d = new Date(now.getTime() + mins*60000);
          return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
        };
        const yesterday = new Date(now.getTime() - 24*60*60000).toISOString().slice(0,10);
        const sampleA = {
          id: genId(),
          createdAt: now.toISOString(),
          doctorName: 'Dr. Rahman Ahmed',
          appointmentDate: today,
          appointmentTime: tPlus(60),
          problem: 'ধানের পাতায় বাদামী দাগ',
          problemDescription: 'ধানের পাতায় বাদামী দাগ পড়ছে, কী করতে হবে?',
          farmType: 'rice',
          urgency: 'normal',
          googleMeetLink: generateMeetLink(),
          status: 'pending',
          fee: calculateFee('normal'),
          doctorId: 1001,
          farmerName: prof.name || 'Farmer', farmerPhone: prof.phone || '01XXXXXXXXX', farmerAddress: prof.address || 'Bangladesh'
        };
        const sampleB = {
          id: genId(),
          createdAt: now.toISOString(),
          doctorName: 'Dr. Fatima Begum',
          appointmentDate: today,
          appointmentTime: tPlus(120),
          problem: 'টমেটো গাছে পোকার আক্রমণ',
          problemDescription: 'টমেটো গাছে পোকার আক্রমণ হয়েছে',
          farmType: 'vegetables',
          urgency: 'urgent',
          googleMeetLink: generateMeetLink(),
          status: 'confirmed',
          fee: calculateFee('urgent'),
          doctorId: 1002,
          farmerName: prof.name || 'Farmer', farmerPhone: prof.phone || '01XXXXXXXXX', farmerAddress: prof.address || 'Bangladesh'
        };
        const sampleC = {
          id: genId(),
          createdAt: now.toISOString(),
          doctorName: 'Dr. Karim Hossain',
          appointmentDate: yesterday,
          appointmentTime: '10:30',
          problem: 'গরুর দুধ কমে গেছে',
          problemDescription: 'গরুর দুধ উৎপাদন কমে গেছে',
          farmType: 'livestock',
          urgency: 'normal',
          googleMeetLink: generateMeetLink(),
          status: 'completed',
          fee: calculateFee('normal'),
          doctorId: 1003,
          farmerName: prof.name || 'Farmer', farmerPhone: prof.phone || '01XXXXXXXXX', farmerAddress: prof.address || 'Bangladesh'
        };
        // Push to global appointments
        const allApts = JSON.parse(localStorage.getItem('appointments') || '[]');
        allApts.unshift(sampleA, sampleB, sampleC);
        localStorage.setItem('appointments', JSON.stringify(allApts));
        // Push to farmer history
        const hist = JSON.parse(localStorage.getItem('farmerAppointmentsHistory') || '[]');
        hist.unshift(sampleA, sampleB, sampleC);
        localStorage.setItem('farmerAppointmentsHistory', JSON.stringify(hist));
        // Add one accepted notification for the confirmed sample
        const farmerNotifs = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
        farmerNotifs.unshift({
          id: genId(),
          type: 'appointment_accepted',
          title: language==='bn' ? 'অ্যাপয়েন্টমেন্ট গ্রহণ করা হয়েছে' : 'Appointment Accepted',
          content: language==='bn' ? `${sampleB.appointmentDate} ${sampleB.appointmentTime} — জরুরি অনুরোধ গ্রহণ করা হয়েছে।` : `${sampleB.appointmentDate} ${sampleB.appointmentTime} — Urgent request accepted.`,
          timestamp: new Date().toISOString(),
          isRead: false,
          doctorName: sampleB.doctorName,
          appointmentDate: sampleB.appointmentDate,
          appointmentTime: sampleB.appointmentTime,
          googleMeetLink: sampleB.googleMeetLink,
          fee: sampleB.fee
        });
        
        // Add a payment required notification for demo
        farmerNotifs.unshift({
          id: genId(),
          type: 'payment_required',
          title: language==='bn' ? 'পেমেন্ট প্রয়োজন' : 'Payment Required',
          content: language==='bn' ? `${sampleA.appointmentDate} ${sampleA.appointmentTime} — পেমেন্ট সম্পন্ন করে অ্যাপয়েন্টমেন্ট নিশ্চিত করুন।` : `${sampleA.appointmentDate} ${sampleA.appointmentTime} — Complete payment to confirm appointment.`,
          timestamp: new Date().toISOString(),
          isRead: false,
          isPaid: false,
          doctorName: sampleA.doctorName,
          appointmentId: sampleA.id,
          appointmentDate: sampleA.appointmentDate,
          appointmentTime: sampleA.appointmentTime,
          googleMeetLink: sampleA.googleMeetLink,
          fee: sampleA.fee,
          farmerPhone: profile.phone || '01XXXXXXXXX'
        });
        
        localStorage.setItem('farmerNotifications', JSON.stringify(farmerNotifs));
        localStorage.setItem('farmerSamplesSeeded', '1');
      } catch (e) {
        console.warn('Sample appointments seeding failed', e);
      }
    }
    loadNotifications();
    loadHistory();
    loadPrescriptions();
    loadMedicineOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Load prescriptions when profile phone is available
  useEffect(() => {
    if (profile.phone) {
      loadPrescriptions();
      loadMedicineOrders();
      loadPendingPayments();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.phone]);

  // Mark notifications as read when the tab is opened
  useEffect(() => {
    if (active === 'notifications' && unreadCount > 0) {
      const all = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
      const updated = all.map(n => ({ ...n, isRead: true }));
      localStorage.setItem('farmerNotifications', JSON.stringify(updated));
      // refresh views
      loadNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const randomDoctor = () => {
  // Fallback random name if no registered doctors
  const names = ['Dr. Rahman Ahmed', 'Dr. Fatima Begum', 'Dr. Karim Hossain'];
  return names[Math.floor(Math.random() * names.length)];
  };
  const generateMeetLink = () => {
    const seg = () => Math.random().toString(36).slice(2, 6);
    return `https://meet.google.com/${seg()}-${seg()}-${seg()}`;
  };

  const calculateFee = (urgency) => {
    const base = 200; // ৳200 normal
    return urgency === 'urgent' ? base + 100 : base; // urgent +৳100
  };
  const formatFee = (fee) => `${language==='bn' ? '৳' : '৳'}${fee}`;

  const displayFarmType = (code, custom) => {
    if (code === 'other') return custom || (language==='bn' ? 'অন্যান্য' : 'Other');
    const map = (language==='bn')
      ? { rice: 'ধান', vegetables: 'সবজি', fruits: 'ফল', livestock: 'পশুপালন', fisheries: 'মৎস্য', other: 'অন্যান্য' }
      : { rice: 'Rice', vegetables: 'Vegetables', fruits: 'Fruits', livestock: 'Livestock', fisheries: 'Fisheries', other: 'Other' };
    return map[code] || code || (language==='bn' ? 'নির্ধারিত নয়' : 'Not set');
  };

  const downloadPrescription = (prescription) => {
    const content = `
গ্রামীণ কৃষি - ডিজিটাল প্রেসক্রিপশন
=====================================

প্রেসক্রিপশন নং: ${prescription.prescriptionNo}
তারিখ: ${prescription.date}
ডাক্তার: ${prescription.doctorName}

রোগীর তথ্য:
-----------
নাম: ${prescription.farmerName}
ফোন: ${prescription.farmerPhone}
সমস্যা: ${prescription.problem}

রোগ নির্ণয়:
-----------
${prescription.diagnosis}

চিকিৎসা পরামর্শ:
--------------
${prescription.treatment}

ওষুধসমূহ:
----------
${prescription.medicines.map((med, idx) => `${idx + 1}. ${med.name}
   মাত্রা: ${med.dosage}
   সময়কাল: ${med.duration}`).join('\n')}

${prescription.instructions ? `অতিরিক্ত নির্দেশনা:
-------------------
${prescription.instructions}` : ''}

${prescription.followUpDate ? `পরবর্তী ভিজিট:
--------------
${prescription.followUpDate}` : ''}

ডাক্তারের স্বাক্ষর: ${prescription.doctorName}

=====================================
গ্রামীণ কৃষি টেলি-মেডিসিন সেবা
www.grameen-krishi.com
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prescription-${prescription.prescriptionNo}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleOrderMedicine = (prescription) => {
    console.log('Order medicine clicked for prescription:', prescription);
    setSelectedPrescription(prescription);
    setMedicineOrderingStage('shops');
    console.log('Medicine ordering stage set to: shops');
  };

  const handleOrderShopSelected = (orderDetails) => {
    setOrderData(orderDetails);
    setMedicineOrderingStage('payment');
  };

  const handlePaymentComplete = (paymentInfo) => {
    setPaymentData(paymentInfo);
    setMedicineOrderingStage('confirmation');
  };

  const handleBackToShops = () => {
    setMedicineOrderingStage('shops');
    setOrderData(null);
  };

  const handleBackToDashboard = () => {
    setMedicineOrderingStage(null);
    setSelectedPrescription(null);
    setOrderData(null);
    setPaymentData(null);
    setActive('prescriptions'); // Go back to prescriptions section
  };

  // const handleOrderComplete = (orderData) => {
  //   loadMedicineOrders();
  //   loadNotifications(); // Refresh notifications for order confirmation
  // };

  const validate = () => {
    if (!form.problem) return t.validation.problem;
    if (!form.farmType) return t.validation.farmType;
  if (form.farmType === 'other' && !form.customFarmType.trim()) return language==='bn' ? 'খামারের ধরন লিখুন' : 'Please specify the farm type';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { console.warn('Validation:', err); return; }
    setSubmitting(true);

  const now = new Date();
    // Find a doctor by specialization and availability
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const farmToSpec = {
      rice: 'crop_production',
      vegetables: 'crop_production',
      fruits: 'crop_production',
      livestock: 'livestock_health',
      fisheries: 'fish_diseases',
      other: 'agricultural_extension'
    };
    const targetSpec = farmToSpec[form.farmType] || 'agricultural_extension';
    // Compute next available slot function
    // const weekdayIndex = { sunday:0, monday:1, tuesday:2, wednesday:3, thursday:4, friday:5, saturday:6 };
    const getNextSlot = (doc) => {
      const from = doc.availableTimeFrom || '09:00';
      const to = doc.availableTimeTo || '17:00';
      const days = (doc.availableDays || []).map(d => d.toLowerCase());
      if (!days.length) return null;
      const start = new Date(now);
      for (let add=0; add<=14; add++) { // search up to 2 weeks
        const d = new Date(start);
        d.setDate(start.getDate() + add);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        if (!days.includes(dayName)) continue;
        const hmNow = add === 0 ? now.toTimeString().slice(0,5) : '00:00';
        const schedHM = hmNow <= from ? from : (hmNow <= to ? hmNow : null);
        if (!schedHM) continue;
        const isoDate = d.toISOString().slice(0,10);
        return { date: isoDate, time: schedHM };
      }
      return null;
    };
    // Filter doctors by specialization and compute next slot
    const candidates = doctors.filter(d => d.specialization === targetSpec);
    let assignedDoctor = null;
    let slot = null;
    for (const d of candidates) {
      const s = getNextSlot(d);
      if (s) { assignedDoctor = d; slot = s; break; }
    }
    // If none found, keep null; will fallback to random doctor and now
    const doctorName = assignedDoctor?.fullName || randomDoctor();
    const apptDate = slot?.date || now.toISOString().slice(0,10);
    const apptTime = slot?.time || now.toTimeString().slice(0,5);
    const meet = generateMeetLink();
  const fee = calculateFee(form.urgency);
    const farmTypeForSave = form.farmType === 'other' ? (form.customFarmType || 'Other') : form.farmType;

    const notif = {
      id: Date.now(),
      type: 'appointment_accepted',
      title: language==='bn' ? 'অ্যাপয়েন্টমেন্ট গ্রহণ করা হয়েছে' : 'Appointment Accepted',
      content: language==='bn'
        ? `${apptDate} ${apptTime} — ${form.urgency==='urgent' ? 'জরুরি' : 'সাধারণ'} অনুরোধ গ্রহণ করা হয়েছে।`
        : `${apptDate} ${apptTime} — ${form.urgency==='urgent' ? 'Urgent' : 'Normal'} request accepted.`,
      timestamp: now.toISOString(),
      isRead: false,
  doctorName,
  doctorId: assignedDoctor?.id,
      appointmentDate: apptDate,
      appointmentTime: apptTime,
      googleMeetLink: meet,
      fee
    };
    const notifs = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
    notifs.unshift(notif);
    localStorage.setItem('farmerNotifications', JSON.stringify(notifs));

    const record = {
      id: notif.id,
      createdAt: now.toISOString(),
  doctorName,
  doctorId: assignedDoctor?.id,
      appointmentDate: apptDate,
      appointmentTime: apptTime,
      problem: form.problem,
  farmType: farmTypeForSave,
      urgency: form.urgency,
      googleMeetLink: meet,
  status: 'pending',
      fee
    };
    const hist = JSON.parse(localStorage.getItem('farmerAppointmentsHistory') || '[]');
    hist.unshift(record);
    localStorage.setItem('farmerAppointmentsHistory', JSON.stringify(hist));

  // Also persist a separate collection for doctor dashboards
  const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  allAppointments.unshift({ ...record, farmerName: profile.name, farmerPhone: profile.phone, farmerAddress: profile.address, problemDescription: form.problem });
  localStorage.setItem('appointments', JSON.stringify(allAppointments));

  setForm({ problem: '', farmType: '', customFarmType: '', urgency: 'normal' });
    setSubmitting(false);
    loadNotifications();
    loadHistory();
    setActive('notifications');
  };

  return (
    <div className="farmer-dashboard simple-layout">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>{t.title}</h1>
            {profile.name && <p>{profile.name}</p>}
          </div>
          <div className="header-actions">
            <button className="notification-btn" onClick={() => setActive('notifications')} aria-label="Notifications">
              🔔
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
            <button className="logout-btn" onClick={onLogout}>{t.logout}</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="app-shell">
          <aside className="sidebar">
            <nav className="nav">
              {/* Sidebar order fixed */}
              <button className={`nav-item ${active==='book'?'active':''}`} onClick={() => setActive('book')}>📅 {language==='bn'?'অ্যাপয়েন্টমেন্ট':'Book'}</button>
              <button className={`nav-item ${active==='notifications'?'active':''}`} onClick={() => setActive('notifications')}>
                🔔 {t.notifications}
                {unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
              </button>
              <button className={`nav-item ${active==='history'?'active':''}`} onClick={() => setActive('history')}>🗂️ {t.history}</button>
              <button className={`nav-item ${active==='prescriptions'?'active':''}`} onClick={() => setActive('prescriptions')}>📋 {t.prescriptions}</button>
              <button className={`nav-item ${active==='orders'?'active':''}`} onClick={() => setActive('orders')}>
                🛒 {t.orders}
                {medicineOrders.length > 0 && <span className="nav-badge">{medicineOrders.length}</span>}
              </button>
              <button className={`nav-item ${active==='profile'?'active':''}`} onClick={() => setActive('profile')}>👤 {t.profile}</button>
            </nav>
          </aside>

          <section className="main-pane">
            {active === 'book' && (
              <div className="card">
                <h2 style={{marginBottom: 8}}>{t.bookTitle}</h2>
                <p className="muted" style={{marginTop: 0}}>{t.helper}</p>
                <form onSubmit={handleSubmit} className="simple-form">
                  <div className="form-row">
                    <label htmlFor="farmType">{t.farmType}</label>
                    <select id="farmType" name="farmType" value={form.farmType} onChange={handleFormChange} required>
                      <option value="">{t.select}</option>
                      <option value="rice">{language==='bn'?'ধান':'Rice'}</option>
                      <option value="vegetables">{language==='bn'?'সবজি':'Vegetables'}</option>
                      <option value="fruits">{language==='bn'?'ফল':'Fruits'}</option>
                      <option value="livestock">{language==='bn'?'পশুপালন':'Livestock'}</option>
                      <option value="fisheries">{language==='bn'?'মৎস্য':'Fisheries'}</option>
                      <option value="other">{language==='bn'?'অন্যান্য':'Other'}</option>
                    </select>
                  </div>
                  {form.farmType === 'other' && (
                    <div className="form-row">
                      <label htmlFor="customFarmType">{t.specifyFarmType}</label>
                      <input id="customFarmType" name="customFarmType" type="text" value={form.customFarmType} onChange={handleFormChange} placeholder={language==='bn'?'যেমন: মশলা চাষ':'e.g., Spice Farming'} required />
                    </div>
                  )}
                  <div className="form-row">
                    <label htmlFor="problem">{t.problem}</label>
                    <input id="problem" name="problem" type="text" value={form.problem} onChange={handleFormChange} placeholder={language==='bn'?'সমস্যা লিখুন':'Describe your problem'} required />
                  </div>
                  <div className="form-row">
                    <label htmlFor="urgency">{t.urgency}</label>
                    <select id="urgency" name="urgency" value={form.urgency} onChange={handleFormChange}>
                      <option value="normal">{t.normal}</option>
                      <option value="urgent">{t.urgent}</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>{t.estimatedFee}</label>
                    <div><strong>{formatFee(calculateFee(form.urgency))}</strong></div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="primary-btn" disabled={submitting}>{submitting ? (language==='bn'?'রিকোয়েস্ট পাঠানো হচ্ছে…':'Submitting…') : (language==='bn'?'রিকোয়েস্ট সাবমিট করুন':'Submit Request')}</button>
                  </div>
                </form>
              </div>
            )}

            {active === 'notifications' && (
              <div className="card">
                <h2 style={{marginBottom: 16}}>{t.notifications}</h2>
                
                {/* Pending Payments Section */}
                {pendingPayments.length > 0 && (
                  <div className="pending-payments-section" style={{marginBottom: '2rem'}}>
                    <h3 style={{color: '#e74c3c', marginBottom: '1rem'}}>{t.paymentRequired}</h3>
                    {pendingPayments.map(payment => (
                      <div key={payment.id} className="payment-notification">
                        <div className="payment-info">
                          <div><strong>{t.assignedTo}:</strong> {payment.doctorName}</div>
                          <div><strong>{t.date}:</strong> {payment.appointmentDate} &nbsp; <strong>{t.time}:</strong> {payment.appointmentTime}</div>
                          <div><strong>{t.fee}:</strong> {formatFee(payment.fee || 200)}</div>
                        </div>
                        <button 
                          className="pay-now-btn"
                          onClick={() => handlePayment(payment)}
                        >
                          {t.payNow}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {notifications.length === 0 ? (
                  <div className="no-notifications">{t.none}</div>
                ) : (
                  <ul className="notification-list">
        {notifications.map(n => (
                      <li key={n.id} className="notification-item">
                        <div className="notification-main">
                          <div className="notification-title">{n.title}</div>
                          <div className="notification-content">
                            <div><strong>{t.assignedTo}:</strong> {n.doctorName}</div>
          <div><strong>{t.date}:</strong> {n.appointmentDate} &nbsp; <strong>{t.time}:</strong> {n.appointmentTime}</div>
          <div><strong>{t.fee}:</strong> {formatFee(n.fee || 200)} &nbsp; <strong>{t.urgency}:</strong> {n.appointmentTime && (n.content?.includes('জরুরি') || n.content?.includes('Urgent') ? (language==='bn'?'জরুরি':'Urgent') : (language==='bn'?'সাধারণ':'Normal'))}</div>
                          </div>
                        </div>
                        <div className="notification-actions">
                          <a className="meet-btn" href={n.googleMeetLink} target="_blank" rel="noreferrer">{t.joinMeet}</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {active === 'history' && (
              <div className="card">
                <h2 style={{marginBottom: 16}}>{t.histTitle}</h2>
                {history.length === 0 ? (
                  <div className="no-notifications">{t.histNone}</div>
                ) : (
                  <div className="table-wrap">
                    <table className="simple-table">
                      <thead>
                        <tr>
                          <th>{t.date}</th>
                          <th>{t.time}</th>
                          <th>{t.fee}</th>
                          <th>{language==='bn'?'অগ্রাধিকার':'Priority'}</th>
                          <th>{language==='bn'?'ডাক্তার':'Doctor'}</th>
                          <th>{language==='bn'?'সমস্যা':'Problem'}</th>
                          <th>{language==='bn'?'চাষাবাদ':'Farming'}</th>
                          <th>{language==='bn'?'অবস্থা':'Status'}</th>
                          <th>{language==='bn'?'অ্যাকশন':'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map(item => (
                          <tr key={item.id}>
                            <td>{item.appointmentDate}</td>
                            <td>{item.appointmentTime}</td>
                            <td>{formatFee(item.fee || calculateFee(item.urgency))}</td>
                            <td>{item.urgency === 'urgent' ? (language==='bn'?'জরুরি':'Urgent') : (language==='bn'?'সাধারণ':'Normal')}</td>
                            <td>{item.doctorName}</td>
                            <td>{item.problem}</td>
                            <td>{item.farmType}</td>
                            <td><span className="badge accepted">{t.status[item.status] || item.status}</span></td>
                            <td><a href={item.googleMeetLink} target="_blank" rel="noreferrer" className="link">Meet</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {active === 'profile' && (
              <div className="card">
                <h2 style={{marginBottom: 16}}>{t.profTitle}</h2>
                {!editMode ? (
                  <div className="simple-form">
                    <div className="form-row"><label>{t.name}</label><div>{profile.name}</div></div>
                    <div className="form-row"><label>{t.phone}</label><div>{profile.phone}</div></div>
                    <div className="form-row"><label>{t.address}</label><div>{profile.address}</div></div>
                    <div className="form-row"><label>{t.farmType}</label><div>{displayFarmType(profile.farmType, profile.customFarmType)}</div></div>
                    <div className="form-actions">
                      <button className="primary-btn" onClick={()=>setEditMode(true)}>{t.edit}</button>
                    </div>
                  </div>
                ) : (
                  <form className="simple-form" onSubmit={(e)=>{e.preventDefault(); saveProfile();}}>
                    <div className="form-row">
                      <label htmlFor="name">{t.name}</label>
                      <input id="name" name="name" value={profile.name} onChange={(e)=>setProfile(p=>({...p,name:e.target.value}))} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="phone">{t.phone}</label>
                      <input id="phone" name="phone" value={profile.phone} onChange={(e)=>setProfile(p=>({...p,phone:e.target.value}))} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="address">{t.address}</label>
                      <input id="address" name="address" value={profile.address} onChange={(e)=>setProfile(p=>({...p,address:e.target.value}))} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="farmType">{t.farmType}</label>
                      <select id="farmType" name="farmType" value={profile.farmType} onChange={(e)=>setProfile(p=>({...p,farmType:e.target.value}))}>
                        <option value="">{t.select}</option>
                        <option value="rice">{language==='bn'?'ধান':'Rice'}</option>
                        <option value="vegetables">{language==='bn'?'সবজি':'Vegetables'}</option>
                        <option value="fruits">{language==='bn'?'ফল':'Fruits'}</option>
                        <option value="livestock">{language==='bn'?'পশুপালন':'Livestock'}</option>
                        <option value="fisheries">{language==='bn'?'মৎস্য':'Fisheries'}</option>
                        <option value="other">{language==='bn'?'অন্যান্য':'Other'}</option>
                      </select>
                    </div>
                    {profile.farmType === 'other' && (
                      <div className="form-row">
                        <label htmlFor="customFarmType">{t.specifyFarmType}</label>
                        <input id="customFarmType" name="customFarmType" value={profile.customFarmType} onChange={(e)=>setProfile(p=>({...p,customFarmType:e.target.value}))} required />
                      </div>
                    )}
                    <div className="form-actions" style={{gap: '0.5rem'}}>
                      <button className="primary-btn" type="submit">{t.save}</button>
                      <button type="button" className="back-btn" onClick={()=>{setEditMode(false); loadProfile();}}>{t.cancel}</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {active === 'prescriptions' && (
              <div className="card">
                <h2 style={{marginBottom: 16, display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between'}}>
                  <span>📋 {t.prescTitle}</span>
                  <button 
                    onClick={loadPrescriptions} 
                    style={{
                      background: '#28a745', 
                      color: 'white', 
                      border: 'none', 
                      padding: '0.5rem 1rem', 
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    🔄 Refresh
                  </button>
                </h2>
                {prescriptions.length === 0 ? (
                  <div className="no-notifications">
                    <div className="empty-state">
                      <div className="empty-icon">💊</div>
                      <h3>{t.prescNone}</h3>
                      <p>{language === 'bn' ? 'ডাক্তারের সাথে পরামর্শের পর এখানে প্রেসক্রিপশন দেখা যাবে' : 'Prescriptions will appear here after doctor consultations'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="prescriptions-list">
                    {prescriptions.map(p => (
                      <div key={p.prescriptionNo} className="prescription-card">
                        <div className="prescription-header">
                          <div className="prescription-info">
                            <h3>📋 {t.prescNo}: {p.prescriptionNo}</h3>
                            <div className="prescription-meta">
                              <span className="date">📅 {p.date}</span>
                              <span className="doctor">👨‍⚕️ {t.doctor}: {p.doctorName}</span>
                            </div>
                          </div>
                          <div className="prescription-status">
                            <span className="status-badge">✅ {language === 'bn' ? 'সম্পূর্ণ' : 'Complete'}</span>
                          </div>
                        </div>
                        
                        <div className="prescription-body">
                          <div className="diagnosis-section">
                            <h4>🔍 {t.diagnosis}</h4>
                            <p className="diagnosis-text">{p.diagnosis}</p>
                          </div>
                          
                          <div className="treatment-section">
                            <h4>💊 {t.treatment}</h4>
                            <p className="treatment-text">{p.treatment}</p>
                          </div>
                          
                          <div className="medicines-section">
                            <h4>💉 {t.medicines}</h4>
                            <div className="medicines-grid">
                              {p.medicines.map((med, idx) => (
                                <div key={idx} className="medicine-item">
                                  <div className="medicine-name">💊 {med.name}</div>
                                  <div className="medicine-details">
                                    <span className="dosage">⏰ {med.dosage}</span>
                                    <span className="duration">📅 {med.duration}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {p.instructions && (
                            <div className="instructions-section">
                              <h4>📝 {t.instructions}</h4>
                              <p className="instructions-text">{p.instructions}</p>
                            </div>
                          )}
                          
                          {p.followUpDate && (
                            <div className="followup-section">
                              <h4>📅 {t.followUp}</h4>
                              <p className="followup-date">{p.followUpDate}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="prescription-actions">
                          <button className="download-btn" onClick={() => downloadPrescription(p)}>
                            📥 {t.download}
                          </button>
                          <button className="view-btn" onClick={() => window.print()}>
                            🖨️ {language === 'bn' ? 'প্রিন্ট' : 'Print'}
                          </button>
                          <button className="order-medicine-btn" onClick={() => handleOrderMedicine(p)}>
                            🛒 {t.orderMedicine}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {active === 'orders' && (
              <div className="card">
                <h2 style={{marginBottom: 16, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  🛒 {t.medicineOrders}
                </h2>
                {medicineOrders.length === 0 ? (
                  <div className="no-notifications">
                    <div className="empty-state">
                      <div className="empty-icon">🛒</div>
                      <h3>{t.noOrders}</h3>
                      <p>{language === 'bn' ? 'প্রেসক্রিপশন থেকে ওষুধ অর্ডার করুন' : 'Order medicines from prescriptions'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="orders-list">
                    {medicineOrders.map(order => (
                      <div key={order.orderId} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <h3>🛒 অর্ডার ID: {order.orderId}</h3>
                            <div className="order-meta">
                              <span className="date">📅 {order.orderDate.slice(0,10)}</span>
                              <span className="pharmacy">🏪 {order.pharmacy.name}</span>
                              <span className="total">💰 ৳{order.grandTotal}</span>
                            </div>
                          </div>
                          <div className="order-status">
                            <span className="status-badge confirmed">✅ {order.status === 'confirmed' ? (language === 'bn' ? 'নিশ্চিত' : 'Confirmed') : order.status}</span>
                          </div>
                        </div>
                        
                        <div className="order-body">
                          <div className="medicines-summary">
                            <h4>💊 ওষুধ সমূহ ({order.medicines.length}টি)</h4>
                            <div className="medicine-items">
                              {order.medicines.map((med, idx) => (
                                <div key={idx} className="medicine-item-small">
                                  <span className="med-name">{med.name}</span>
                                  <span className="med-qty">×{med.quantity}</span>
                                  <span className="med-price">৳{med.total}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="delivery-info-summary">
                            <div><strong>🚚 ডেলিভারি:</strong> {order.estimatedDelivery}</div>
                            <div><strong>💳 পেমেন্ট:</strong> {order.paymentMethod === 'cod' ? 'ডেলিভারিতে পেমেন্ট' : order.paymentMethod}</div>
                          </div>
                        </div>
                        
                        <div className="order-actions">
                          <button className="track-btn">
                            📍 {language === 'bn' ? 'ট্র্যাক করুন' : 'Track Order'}
                          </button>
                          <button className="reorder-btn" onClick={() => handleOrderMedicine({ 
                            prescriptionNo: order.prescriptionNo,
                            medicines: order.medicines.map(m => ({ name: m.name, dosage: m.dosage, duration: m.duration })),
                            doctorName: 'Previous Order',
                            date: order.orderDate.slice(0,10)
                          })}>
                            🔄 {language === 'bn' ? 'আবার অর্ডার' : 'Reorder'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      
      {/* Multi-Dashboard Medicine Ordering System */}
      {medicineOrderingStage === 'shops' && selectedPrescription && (
        <MedicineShops
          prescription={selectedPrescription}
          onGoBack={handleBackToDashboard}
          onShopSelected={handleOrderShopSelected}
        />
      )}
      
      {medicineOrderingStage === 'payment' && orderData && (
        <PaymentDashboard
          orderData={orderData}
          onGoBack={handleBackToShops}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
      
      {medicineOrderingStage === 'confirmation' && orderData && paymentData && (
        <OrderConfirmation
          orderData={orderData}
          paymentData={paymentData}
          onGoBackToDashboard={handleBackToDashboard}
        />
      )}
      
      {/* Appointment Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-modal-header">
              <h3>{t.paymentRequired}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowPaymentModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="payment-modal-content">
              <div className="appointment-details">
                <h4>অ্যাপয়েন্টমেন্ট বিবরণ</h4>
                <p><strong>ডাক্তার:</strong> {selectedPayment.doctorName}</p>
                <p><strong>তারিখ:</strong> {selectedPayment.appointmentDate}</p>
                <p><strong>সময়:</strong> {selectedPayment.appointmentTime}</p>
                <p><strong>ফি:</strong> {formatFee(selectedPayment.fee || 200)}</p>
              </div>
              
              <div className="payment-methods">
                <h4>পেমেন্ট পদ্ধতি নির্বাচন করুন</h4>
                <div className="payment-options">
                  <button 
                    className="payment-method-btn bkash"
                    onClick={() => processPayment('bKash')}
                  >
                    bKash
                  </button>
                  <button 
                    className="payment-method-btn nagad"
                    onClick={() => processPayment('Nagad')}
                  >
                    Nagad
                  </button>
                  <button 
                    className="payment-method-btn rocket"
                    onClick={() => processPayment('Rocket')}
                  >
                    Rocket
                  </button>
                  <button 
                    className="payment-method-btn card"
                    onClick={() => processPayment('Card')}
                  >
                    Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmerDashboard;
