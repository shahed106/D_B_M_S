// Direct localStorage injection for testing
// This simulates clicking the "Add Test Notification" button

// Create test notification
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
    appointmentTime: '14:30',
    doctorName: 'Dr. Rahman Ahmed',
    communicationLink: true,
    farmerName: 'রহিম উদ্দিন (Test)',
    avatar: '👨‍⚕️'
};

// Save to localStorage (simulating browser storage)
const notificationData = JSON.stringify([testNotification]);

// Write to a file that can be loaded into localStorage
module.exports = { testNotification, notificationData };
