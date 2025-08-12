// Auto-execute test notification script
(function() {
    console.log('🚀 Adding test notification automatically...');
    
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

    // Add to localStorage
    const existingNotifications = JSON.parse(localStorage.getItem('farmerNotifications') || '[]');
    existingNotifications.unshift(testNotification);
    localStorage.setItem('farmerNotifications', JSON.stringify(existingNotifications));
    
    console.log('✅ Test notification added successfully!');
    console.log('📋 Notification details:', testNotification);
    console.log('📦 Total farmer notifications:', existingNotifications.length);
    
    // Show success message in DOM
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed; 
            top: 20px; 
            right: 20px; 
            background: #4CAF50; 
            color: white; 
            padding: 15px 20px; 
            border-radius: 8px; 
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
        ">
            <h3 style="margin: 0 0 10px 0;">✅ Test Notification Added!</h3>
            <p style="margin: 0; font-size: 14px;">
                Now login as <strong>Farmer</strong> and click the notification bell 🔔
            </p>
        </div>
    `;
    document.body.appendChild(successDiv);
    
    // Auto remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    return testNotification;
})();
