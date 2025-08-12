// Test script to create a communication link notification
// Run this in browser console to test the communication link feature

const testNotification = {
  id: Date.now(),
  type: 'appointment',
  title: 'অ্যাপয়েন্টমেন্ট অনুমোদিত (TEST)',
  message: 'ডাঃ Rahman Ahmed আপনার অ্যাপয়েন্টমেন্ট অনুমোদন করেছেন। নির্ধারিত সময়ে ডাক্তারের সাথে যোগাযোগ করুন।',
  time: new Date(),
  timestamp: new Date().toISOString(),
  isRead: false,
  appointmentId: 4,
  appointmentDate: '2025-08-09',
  appointmentTime: '14:30', // Adjust this to current time for testing
  doctorName: 'Dr. Rahman Ahmed',
  communicationLink: true,
  farmerName: 'রহিম উদ্দিন (Test)',
  avatar: '👨‍⚕️'
};

// Add to farmer notifications
const existingNotifications = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
existingNotifications.unshift(testNotification);
localStorage.setItem('farmerNotifications', JSON.stringify(existingNotifications));

console.log('Test notification added! Switch to farmer dashboard and check notification bell.');
