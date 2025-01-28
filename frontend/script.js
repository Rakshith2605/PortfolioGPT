const API_URL = 'https://your-app-name.onrender.com/chat';

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    try {
        addMessage('user', userInput);
        document.getElementById('user-input').value = '';

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addMessage('bot', data.response);

    } catch (error) {
        console.error('Error:', error);
        addMessage('error', 'Sorry, something went wrong. Please try again.');
    }
}
