const API_URL = 'https://portfoliogpt-2.onrender.com/chat';

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    try {
        // Show user message
        addMessage('user', userInput);
        
        // Clear input field
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

// Function to add messages to the chat
function addMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add event listeners when the document loads
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    const button = document.querySelector('button');

    // Handle Enter key press
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Handle button click
    button.addEventListener('click', sendMessage);
});
