import React, { useEffect, useMemo, useState } from 'react';
import './DoctorDashboard.css';
import PrescriptionWriter from './PrescriptionWriter';
// Chat/Consultation removed; doctors will join via Google Meet links attached to appointments

function DoctorDashboard({ language = 'bn', onLogout, doctorData }) {

  // Pull appointments from localStorage and filter by this doctor
  const [appointments, setAppointments] = useState([]);
  const doctorId = doctorData?.id; // expect id set at login from registration
  const [doctorInfo, setDoctorInfo] = useState(null);
  // Prescription states
  const [showPrescription, setShowPrescription] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // simplified view: no filters

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('appointments') || '[]');
    // If doctorId known, filter by doctorId; else by name
    let filtered = all.filter(a => (doctorId ? a.doctorId === doctorId : (doctorData?.name ? a.doctorName === doctorData.name : true)));
    // Seed two demo appointments for this doctor if none exist yet (first visit only)
    const seedKey = `doctorSamplesSeeded_${doctorId || (doctorData?.name || 'anon')}`;
    if (filtered.length === 0 && !localStorage.getItem(seedKey)) {
      const docName = doctorData?.name || 'Doctor';
      const docId = doctorId || null;
      const prof = JSON.parse(localStorage.getItem('farmerProfile') || '{}');
      const samples = [
        { farmType: 'rice', problem: 'ধানের পাতায় দাগ', problemDescription: 'ধানের পাতায় বাদামী দাগ পড়ছে', status: 'pending', offset: 60, fee: 200, urgency: 'normal' },
        { farmType: 'vegetables', problem: 'টমেটোতে পোকার আক্রমণ', problemDescription: 'টমেটো গাছে পোকা', status: 'confirmed', offset: 120, fee: 300, urgency: 'urgent' }
      ].map(b => ({
        id: genId(),
        createdAt: new Date().toISOString(),
        doctorName: docName,
        doctorId: docId,
        appointmentDate: todayISO(),
        appointmentTime: tPlus(b.offset),
        problem: b.problem,
        problemDescription: b.problemDescription,
        farmType: b.farmType,
        urgency: b.urgency,
        googleMeetLink: generateMeetLink(),
        status: b.status,
        fee: b.fee,
        farmerName: prof.name || 'Farmer',
        farmerPhone: prof.phone || '01XXXXXXXXX',
        farmerAddress: prof.address || 'Bangladesh'
      }));
      const updatedAll = [...samples, ...all];
      localStorage.setItem('appointments', JSON.stringify(updatedAll));
      // mirror into farmer history so farmer screens show consistent demo
      const hist = JSON.parse(localStorage.getItem('farmerAppointmentsHistory') || '[]');
      localStorage.setItem('farmerAppointmentsHistory', JSON.stringify([...samples, ...hist]));
      localStorage.setItem(seedKey, '1');
      filtered = updatedAll.filter(a => (doctorId ? a.doctorId === doctorId : (doctorData?.name ? a.doctorName === doctorData.name : true)));
    }
    setAppointments(filtered);
  }, [doctorId, doctorData?.name]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('doctors') || '[]');
    const doc = doctorId ? list.find(d => d.id === doctorId) : list.find(d => d.fullName === doctorData?.name);
    setDoctorInfo(doc || null);
  }, [doctorId, doctorData?.name]);

  const content = {
    bn: {
      welcome: 'স্বাগতম',
      dashboard: 'ডাক্তার ড্যাশবোর্ড',
      myAppointments: 'আমার অ্যাপয়েন্টমেন্ট',
      todaysAppointments: 'আজকের অ্যাপয়েন্টমেন্ট',
      upcomingAppointments: 'আসন্ন অ্যাপয়েন্টমেন্ট',
      completedAppointments: 'সম্পন্ন অ্যাপয়েন্টমেন্ট',
      profile: 'প্রোফাইল',
      logout: 'লগআউট',
      appointmentStatus: {
        pending: 'অপেক্ষমান',
        confirmed: 'নিশ্চিত',
        completed: 'সম্পন্ন',
        cancelled: 'বাতিল'
      },
      urgencyLevels: {
        normal: 'সাধারণ',
        urgent: 'জরুরি',
        emergency: 'জরুরি অবস্থা'
      },
      farmTypes: {
        rice: 'ধান চাষ',
        vegetables: 'সবজি চাষ',
        fruits: 'ফল চাষ',
        livestock: 'পশুপালন',
        poultry: 'মুরগি পালন',
        fish: 'মাছ চাষ'
      },
      joinConsultation: 'পরামর্শে যোগ দিন',
      viewDetails: 'বিস্তারিত দেখুন',
      addNotes: 'নোট যোগ করুন',
      approveAppointment: 'অ্যাপয়েন্টমেন্ট অনুমোদন',
      rejectAppointment: 'অ্যাপয়েন্টমেন্ট বাতিল',
      writePrescription: 'প্রেসক্রিপশন লিখুন',
      prescriptionGiven: 'প্রেসক্রিপশন দেওয়া হয়েছে',
      noAppointments: 'কোন অ্যাপয়েন্টমেন্ট নেই',
      farmerName: 'কৃষকের নাম',
      farmerPhone: 'ফোন নম্বর',
      farmerAddress: 'ঠিকানা',
      appointmentDate: 'তারিখ',
      appointmentTime: 'সময়',
      problem: 'সমস্যা',
      urgency: 'জরুরি অবস্থা',
      farmType: 'খামারের ধরন',
      consultationNotes: 'পরামর্শের নোট',
      backToDashboard: 'ড্যাশবোর্ডে ফিরুন',
      totalAppointments: 'মোট অ্যাপয়েন্টমেন্ট',
      todayCount: 'আজকের',
      pendingCount: 'অপেক্ষমান',
      completedCount: 'সম্পন্ন',
      messages: 'বার্তা',
      chatWithFarmers: 'কৃষকদের সাথে কথা বলুন'
    },
    en: {
      welcome: 'Welcome',
      dashboard: 'Doctor Dashboard',
      myAppointments: 'My Appointments',
      todaysAppointments: "Today's Appointments",
      upcomingAppointments: 'Upcoming Appointments',
      completedAppointments: 'Completed Appointments',
      profile: 'Profile',
      logout: 'Logout',
      appointmentStatus: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        completed: 'Completed',
        cancelled: 'Cancelled'
      },
      urgencyLevels: {
        normal: 'Normal',
        urgent: 'Urgent',
        emergency: 'Emergency'
      },
      farmTypes: {
        rice: 'Rice Farming',
        vegetables: 'Vegetable Farming',
        fruits: 'Fruit Farming',
        livestock: 'Livestock',
        poultry: 'Poultry',
        fish: 'Fish Farming'
      },
      joinConsultation: 'Join Consultation',
      viewDetails: 'View Details',
      addNotes: 'Add Notes',
      approveAppointment: 'Approve',
      rejectAppointment: 'Reject',
      writePrescription: 'Write Prescription',
      prescriptionGiven: 'Prescription Given',
      noAppointments: 'No appointments found',
      farmerName: 'Farmer Name',
      farmerPhone: 'Phone Number',
      farmerAddress: 'Address',
      appointmentDate: 'Date',
      appointmentTime: 'Time',
      problem: 'Problem',
      urgency: 'Urgency',
      farmType: 'Farm Type',
      consultationNotes: 'Consultation Notes',
      backToDashboard: 'Back to Dashboard',
      totalAppointments: 'Total Appointments',
      todayCount: 'Today',
      pendingCount: 'Pending',
      completedCount: 'Completed',
      messages: 'Messages',
      chatWithFarmers: 'Chat with Farmers'
    }
  };

  const t = content[language];

  // Helpers to seed demo appointments for first-time doctor view
  const pad2 = (n) => String(n).padStart(2, '0');
  const genId = () => Date.now() + Math.floor(Math.random() * 10000);
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const tPlus = (mins) => {
    const d = new Date(Date.now() + mins * 60000);
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  };
  const generateMeetLink = () => {
    const seg = () => Math.random().toString(36).slice(2, 6);
    return `https://meet.google.com/${seg()}-${seg()}-${seg()}`;
  };

  // no separate views; doctors join via Meet link directly

  // Chat/Message center removed

  const updateFarmerHistoryStatus = (appointmentId, newStatus, patch = {}) => {
    try {
      const hist = JSON.parse(localStorage.getItem('farmerAppointmentsHistory') || '[]');
      const idx = hist.findIndex(h => h.id === appointmentId);
      if (idx !== -1) {
        hist[idx].status = newStatus;
        // apply any patch fields like new date/time/link
        hist[idx] = { ...hist[idx], ...patch };
        localStorage.setItem('farmerAppointmentsHistory', JSON.stringify(hist));
      }
    } catch (e) {
      console.warn('updateFarmerHistoryStatus failed', e);
    }
  };

  const approveAppointment = (appointmentId) => {
    try {
      const all = JSON.parse(localStorage.getItem('appointments') || '[]');
      const idx = all.findIndex(a => a.id === appointmentId);
      if (idx !== -1) {
        const appt = all[idx];
        // compute next available slot respecting doctor's availability and existing confirmed slots
        const findDoc = () => {
          if (doctorInfo) return doctorInfo;
          const list = JSON.parse(localStorage.getItem('doctors') || '[]');
          return doctorId ? list.find(d => d.id === doctorId) : list.find(d => d.fullName === doctorData?.name);
        };
        const doc = findDoc();
        const slotMinutes = 30; // each consultation = 30 minutes
        const addMinutes = (hm, add) => {
          const [h, m] = (hm || '00:00').split(':').map(Number);
          const total = h * 60 + m + add;
          const hh = String(Math.floor(total / 60)).padStart(2, '0');
          const mm = String(total % 60).padStart(2, '0');
          return `${hh}:${mm}`;
        };
        const roundUpToSlot = (timeHM) => {
          const [h, m] = (timeHM || '00:00').split(':').map(Number);
          const rem = m % slotMinutes;
          const add = rem === 0 ? 0 : (slotMinutes - rem);
          return addMinutes(timeHM, add);
        };
        const getDayName = (dateObj) => dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const getNextSlot = () => {
          const daysAllowed = (doc?.availableDays || []).map(d => d.toLowerCase());
          const from = doc?.availableTimeFrom || '09:00';
          const to = doc?.availableTimeTo || '17:00';
          const start = new Date();
          for (let add=0; add<=14; add++) {
            const d = new Date(start.getTime() + add*24*60*60000);
            const dayName = getDayName(d);
            if (daysAllowed.length && !daysAllowed.includes(dayName)) continue;
            const dateISO = d.toISOString().slice(0,10);
            const todaysConfirmed = all.filter(x => (doctorId ? x.doctorId === doctorId : x.doctorName === doctorData?.name) && x.status === 'confirmed' && x.appointmentDate === dateISO);
            const taken = new Set(todaysConfirmed.map(x => x.appointmentTime));
            let startHM = from;
            if (add === 0) {
              const nowHM = roundUpToSlot(new Date().toTimeString().slice(0,5));
              if (nowHM > startHM) startHM = nowHM;
            }
            // iterate slots
            for (let t=startHM; t<=to; t = addMinutes(t, slotMinutes)) {
              // ensure t+slot within window
              const endHM = addMinutes(t, slotMinutes);
              if (endHM > to) break;
              if (!taken.has(t)) return { date: dateISO, time: t };
            }
          }
          // fallback: keep existing
          return { date: appt.appointmentDate || todayISO(), time: appt.appointmentTime || '10:00' };
        };
        const next = getNextSlot();
        all[idx] = {
          ...appt,
          status: 'payment_pending',
          appointmentDate: next.date,
          appointmentTime: next.time,
          googleMeetLink: appt.googleMeetLink || generateMeetLink()
        };
        localStorage.setItem('appointments', JSON.stringify(all));
        updateFarmerHistoryStatus(appointmentId, 'payment_pending', { appointmentDate: next.date, appointmentTime: next.time, googleMeetLink: all[idx].googleMeetLink });
      }
      // Notify farmer: send payment required notification instead of acceptance
      const apt = all[idx];
      if (apt) {
        const paymentNotif = {
          id: Date.now(),
          type: 'payment_required',
          title: language === 'bn' ? 'পেমেন্ট প্রয়োজন' : 'Payment Required',
          content: language === 'bn' ? `${apt.appointmentDate} ${apt.appointmentTime} — পেমেন্ট সম্পন্ন করে অ্যাপয়েন্টমেন্ট নিশ্চিত করুন।` : `${apt.appointmentDate} ${apt.appointmentTime} — Complete payment to confirm appointment.`,
          timestamp: new Date().toISOString(),
          isRead: false,
          isPaid: false,
          doctorName: apt.doctorName,
          appointmentId: apt.id,
          appointmentDate: apt.appointmentDate,
          appointmentTime: apt.appointmentTime,
          googleMeetLink: apt.googleMeetLink,
          fee: apt.fee,
          farmerPhone: apt.farmerPhone
        };
        const farmerNotifs = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
        farmerNotifs.unshift(paymentNotif);
        localStorage.setItem('farmerNotifications', JSON.stringify(farmerNotifs));
      }
      // Refresh local state
      const refreshed = JSON.parse(localStorage.getItem('appointments') || '[]').filter(a => (doctorId ? a.doctorId === doctorId : (doctorData?.name ? a.doctorName === doctorData.name : true)));
      setAppointments(refreshed);
    } catch (e) {
      console.warn('approveAppointment failed', e);
    }
  };

  // Prescription handlers
  const handleCreatePrescription = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPrescription(true);
  };

  const handlePrescriptionSave = (prescriptionData) => {
    try {
      // Update appointment status to include prescription
      const allApts = JSON.parse(localStorage.getItem('appointments') || '[]');
      const updated = allApts.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, prescriptionGiven: true, prescriptionNo: prescriptionData.prescriptionNo }
          : apt
      );
      localStorage.setItem('appointments', JSON.stringify(updated));
      
      // Update farmer history as well
      updateFarmerHistoryStatus(selectedAppointment.id, null, { prescriptionGiven: true, prescriptionNo: prescriptionData.prescriptionNo });
      
      setShowPrescription(false);
      setSelectedAppointment(null);
      
      // Refresh appointments
      const refreshed = JSON.parse(localStorage.getItem('appointments') || '[]').filter(a => (doctorId ? a.doctorId === doctorId : (doctorData?.name ? a.doctorName === doctorData.name : true)));
      setAppointments(refreshed);
    } catch (e) {
      console.warn('handlePrescriptionSave failed', e);
    }
  };

  const rejectAppointment = (appointmentId) => {
    try {
      const all = JSON.parse(localStorage.getItem('appointments') || '[]');
      const idx = all.findIndex(a => a.id === appointmentId);
      if (idx !== -1) {
        all[idx].status = 'cancelled';
        localStorage.setItem('appointments', JSON.stringify(all));
        updateFarmerHistoryStatus(appointmentId, 'cancelled');
      }
      const refreshed = JSON.parse(localStorage.getItem('appointments') || '[]').filter(a => (doctorId ? a.doctorId === doctorId : (doctorData?.name ? a.doctorName === doctorData.name : true)));
      setAppointments(refreshed);
    } catch (e) {
      console.warn('rejectAppointment failed', e);
    }
  };

  const completeAppointment = (appointmentId) => {
    try {
      const all = JSON.parse(localStorage.getItem('appointments') || '[]');
      const idx = all.findIndex(a => a.id === appointmentId);
      if (idx !== -1) {
        all[idx].status = 'completed';
        localStorage.setItem('appointments', JSON.stringify(all));
        updateFarmerHistoryStatus(appointmentId, 'completed');
      }
      const refreshed = JSON.parse(localStorage.getItem('appointments') || '[]').filter(a => (doctorId ? a.doctorId === doctorId : (doctorData?.name ? a.doctorName === doctorData.name : true)));
      setAppointments(refreshed);
    } catch (e) {
      console.warn('completeAppointment failed', e);
    }
  };

  // Check if appointment is ready for consultation
  const isConsultationReady = (appointment) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    const minutesDiff = timeDiff / (1000 * 60);
    
    return minutesDiff <= 15 && minutesDiff >= -120 && appointment.status === 'confirmed';
  };

  // Get today's date
  // Sort by date then time
  const sortedAppointments = useMemo(() => {
    const toKey = (a) => `${a.appointmentDate || ''} ${a.appointmentTime || ''}`;
    return [...appointments].sort((x, y) => (toKey(x) > toKey(y) ? 1 : -1));
  }, [appointments]);

  // Consultation room removed; doctors use Meet link directly

  // Unified single-page view with sidebar
  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>{t.welcome}, {doctorData?.name || 'ডাক্তার সাহেব'}!</h1>
            <p>{t.dashboard}</p>
          </div>
          <div className="header-actions">
            <button className="profile-btn">{t.profile}</button>
            <button className="logout-btn" onClick={onLogout}>{t.logout}</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="app-shell">
          <aside className="sidebar">
            <nav className="nav">
              <button className="nav-item active">🗓️ {t.myAppointments}</button>
            </nav>
          </aside>

          <section className="main-pane">
            {doctorInfo && (
              <div className="card" style={{marginBottom:'0.5rem'}}>
                <h3 style={{margin:'0 0 .5rem 0'}}>{language==='bn'?'আপনার সেবার সময়সূচি':'Your Availability'}</h3>
                <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
                  <div><strong>{language==='bn'?'দিন':'Days'}:</strong> {doctorInfo.availableDays?.join(', ') || '-'}</div>
                  <div><strong>{language==='bn'?'সময়':'Time'}:</strong> {doctorInfo.availableTimeFrom} - {doctorInfo.availableTimeTo}</div>
                  <div><strong>{language==='bn'?'বিশেষত্ব':'Specialization'}:</strong> {doctorInfo.specialization}</div>
                </div>
              </div>
            )}

            <div className="card">
              <h2 style={{marginTop:0}}>{t.myAppointments}</h2>
              {sortedAppointments.length === 0 ? (
                <div className="no-appointments"><p>{t.noAppointments}</p></div>
              ) : (
                <div className="appointments-grid">
                  {sortedAppointments.map(appointment => {
                    const canJoin = appointment.status === 'confirmed' && !!appointment.googleMeetLink;
                    return (
                      <div key={appointment.id} className={`appointment-card doctor-card ${appointment.status}`}>
                        <div className="appointment-header">
                          <h3>{appointment.farmerName || 'Farmer'}</h3>
                          <div className="appointment-meta">
                            <span className={`status-badge ${appointment.status}`}>{t.appointmentStatus[appointment.status]}</span>
                            <span className={`urgency-badge ${appointment.urgency}`}>{t.urgencyLevels[appointment.urgency]}</span>
                          </div>
                        </div>
                        <div className="appointment-details">
                          <div className="detail-row"><strong>{t.appointmentDate}:</strong><span>{appointment.appointmentDate}</span></div>
                          <div className="detail-row"><strong>{t.appointmentTime}:</strong><span>{appointment.appointmentTime}</span></div>
                          <div className="detail-row"><strong>{t.farmerPhone}:</strong><span>{appointment.farmerPhone}</span></div>
                          <div className="detail-row"><strong>{t.farmType}:</strong><span>{t.farmTypes[appointment.farmType] || appointment.farmType}</span></div>
                          <div className="detail-row"><strong>{t.problem}:</strong><span>{appointment.problemDescription}</span></div>
                        </div>
                        <div className="appointment-actions">
                          {appointment.status === 'pending' && (
                            <>
                              <button className="approve-btn" onClick={() => approveAppointment(appointment.id)}>{t.approveAppointment}</button>
                              <button className="reject-btn" onClick={() => rejectAppointment(appointment.id)}>{t.rejectAppointment}</button>
                            </>
                          )}
                          <a
                            className={`join-consultation-btn ${canJoin ? 'active' : 'disabled'}`}
                            href={appointment.googleMeetLink || '#'}
                            onClick={(e)=>{ 
                              if(!canJoin || !appointment.googleMeetLink){ 
                                e.preventDefault(); 
                                alert(language==='bn' ? 'Google Meet লিংক পাওয়া যায়নি' : 'Google Meet link not available');
                              } 
                            }}
                            target="_blank" rel="noreferrer"
                            title={canJoin ? (language==='bn'?'Google Meet এ যোগ দিন':'Join Google Meet consultation') : (language==='bn'?'প্রথমে অ্যাপয়েন্টমেন্ট কনফার্ম করুন':'Please confirm appointment first')}
                          >
                            🎥 {language==='bn'?'Google Meet যোগ দিন':'Join Google Meet'}
                          </a>
                          {appointment.status === 'confirmed' && (
                            <>
                              <button className="view-details-btn" onClick={() => completeAppointment(appointment.id)}>{language==='bn'?'সম্পন্ন করুন':'Mark Completed'}</button>
                              {appointment.prescriptionGiven ? (
                                <div className="prescription-status">
                                  ✅ {t.prescriptionGiven}
                                </div>
                              ) : (
                                <button className="prescription-btn" onClick={() => handleCreatePrescription(appointment)}>
                                  📋 {t.writePrescription}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      {/* Simplified: single page, no chat, no extra filters */}
      
      {/* Prescription Writer Modal */}
      {showPrescription && selectedAppointment && (
        <PrescriptionWriter
          appointment={selectedAppointment}
          doctorData={doctorData}
          language={language}
          onClose={() => setShowPrescription(false)}
          onSave={handlePrescriptionSave}
        />
      )}
    </div>
  );
}

export default DoctorDashboard;
