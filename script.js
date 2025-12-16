// script.js

// Optional Countdown Timer (assuming event date: January 15, 2026)
function countdown() {
    const eventDate = new Date('January 15, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = 'Event has started!';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s to the event`;
}

if (document.getElementById('countdown')) {
    setInterval(countdown, 1000);
    countdown();
}

// Form Validation and Submission
const form = document.getElementById('alumni-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation (HTML5 required handles most, but add custom if needed)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            gradYear: document.getElementById('gradYear').value,
            degree: document.getElementById('degree').value,
            designation: document.getElementById('designation').value,
            organization: document.getElementById('organization').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            attend: document.querySelector('input[name="attend"]:checked').value,
            message: document.getElementById('message').value
        };

        // Send to Google Apps Script (replace with your deployed web app URL)
        const scriptURL = 'https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec'; // Replace with actual URL

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // For CORS issues, but note: can't check response in no-cors
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Since no-cors, assume success if no error
            document.getElementById('success-message').style.display = 'block';
            form.reset();

            // Prevent duplicate by disabling button temporarily
            form.querySelector('button').disabled = true;
            setTimeout(() => {
                form.querySelector('button').disabled = false;
            }, 300000); // 5 minutes cooldown
        } catch (error) {
            console.error('Error!', error.message);
            alert('There was an error submitting the form. Please try again.');
        }
    });
}