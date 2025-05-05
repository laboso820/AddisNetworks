// Live Chat Widget

document.addEventListener('DOMContentLoaded', () => {
  initChatWidget();
});

function initChatWidget() {
  const chatWidget = document.getElementById('chat-widget');
  const chatHeader = document.querySelector('.chat-header');
  const chatInput = document.querySelector('.chat-input input');
  const sendButton = document.querySelector('.send-message');
  const messagesContainer = document.querySelector('.chat-messages');
  
  if (!chatWidget || !chatHeader || !chatInput || !sendButton || !messagesContainer) {
    return;
  }
  
  // Toggle chat window
  chatHeader.addEventListener('click', (e) => {
    if (e.target.closest('.chat-toggle') || e.target === chatHeader) {
      chatWidget.classList.toggle('collapsed');
      
      // Focus input when opening
      if (!chatWidget.classList.contains('collapsed')) {
        chatInput.focus();
      }
    }
  });
  
  // Send message
  function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message) {
      // Add user message
      addMessage(message, 'user');
      
      // Clear input
      chatInput.value = '';
      
      // Get automated response
      getResponse(message);
    }
  }
  
  // Add message to chat
  function addMessage(text, sender, delay = 0) {
    setTimeout(() => {
      const messageElement = document.createElement('div');
      messageElement.className = `message ${sender}`;
      
      // Format links in messages
      const formattedText = formatMessageText(text);
      
      messageElement.innerHTML = `
        <div class="message-content">
          <p>${formattedText}</p>
        </div>
        <span class="message-time">${getCurrentTime()}</span>
      `;
      
      // Initially invisible
      messageElement.style.opacity = '0';
      messageElement.style.transform = 'translateY(10px)';
      
      messagesContainer.appendChild(messageElement);
      
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Animate in
      setTimeout(() => {
        messageElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
      }, 50);
    }, delay);
  }
  
  // Get automated response
  function getResponse(message) {
    // Simulate typing indication
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message agent typing';
    typingIndicator.innerHTML = `
      <div class="message-content">
        <p>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </p>
      </div>
    `;
    
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Message keywords for simple response logic
    const keywords = {
      greeting: ['hi', 'hello', 'hey', 'howdy'],
      plans: ['plan', 'price', 'cost', 'package', 'pricing'],
      speed: ['speed', 'fast', 'slow', 'mbps', 'gbps'],
      coverage: ['area', 'available', 'coverage', 'service', 'location'],
      support: ['help', 'issue', 'problem', 'support', 'ticket'],
      installation: ['install', 'setup', 'technician', 'appointment'],
      wifi: ['wifi', 'router', 'wireless', 'connection']
    };
    
    // Determine response based on keywords
    let responseText = '';
    const lowerMessage = message.toLowerCase();
    
    if (keywords.greeting.some(word => lowerMessage.includes(word))) {
      responseText = "Hello! Welcome to VelocityNet support. How can I assist you today?";
    } else if (keywords.plans.some(word => lowerMessage.includes(word))) {
      responseText = "We offer several plans starting at $39/month for our Basic package up to $89/month for our Ultimate package with gigabit speeds. Would you like more details about specific plans?";
    } else if (keywords.speed.some(word => lowerMessage.includes(word))) {
      responseText = "Our plans offer speeds ranging from 100Mbps to 1Gbps for residential customers, and up to 10Gbps for business customers. All plans include unlimited data with no throttling.";
    } else if (keywords.coverage.some(word => lowerMessage.includes(word))) {
      responseText = "VelocityNet is currently available in most major metropolitan areas and rapidly expanding to suburban and rural communities. You can check if service is available at your address using our coverage checker tool on the website.";
    } else if (keywords.support.some(word => lowerMessage.includes(word))) {
      responseText = "I'm sorry to hear you're experiencing an issue. For technical support, please provide your account number or service address, and briefly describe what's happening. Our support team is available 24/7.";
    } else if (keywords.installation.some(word => lowerMessage.includes(word))) {
      responseText = "Professional installation is included with all our plans. The installation process typically takes 1-2 hours, and most customers get service installed within 2-3 business days after ordering.";
    } else if (keywords.wifi.some(word => lowerMessage.includes(word))) {
      responseText = "All our plans include a Wi-Fi router. Basic plans come with a standard dual-band router, Premium plans include an advanced tri-band router, and Ultimate plans include a high-performance mesh Wi-Fi system for whole-home coverage.";
    } else {
      responseText = "Thank you for your message. One of our customer service representatives will connect with you shortly. If you have an urgent matter, please call us at (800) 555-1234.";
    }
    
    // Remove typing indicator and add response after a delay
    setTimeout(() => {
      messagesContainer.removeChild(typingIndicator);
      addMessage(responseText, 'agent');
    }, 1500);
  }
  
  // Get current time
  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes} ${ampm}`;
  }
  
  // Format message text (convert URLs to links, etc.)
  function formatMessageText(text) {
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
  }
  
  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Add welcome message after a delay
  setTimeout(() => {
    addMessage("👋 Hi there! How can I help you today with AddisNetworks internet services?", 'agent');
  }, 1000);
  
  // Add chat widget opening animation
  const openChatButton = document.createElement('button');
  openChatButton.className = 'open-chat-button';
  openChatButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    <span>Chat with Us</span>
  `;
  
  // Style the button
  openChatButton.style.position = 'fixed';
  openChatButton.style.bottom = '2rem';
  openChatButton.style.right = '2rem';
  openChatButton.style.backgroundColor = 'var(--color-primary)';
  openChatButton.style.color = 'white';
  openChatButton.style.borderRadius = 'var(--radius-md)';
  openChatButton.style.padding = '0.75rem 1rem';
  openChatButton.style.display = 'flex';
  openChatButton.style.alignItems = 'center';
  openChatButton.style.gap = '0.5rem';
  openChatButton.style.boxShadow = 'var(--shadow-lg)';
  openChatButton.style.cursor = 'pointer';
  openChatButton.style.border = 'none';
  openChatButton.style.zIndex = '999';
  
  // Add pulse animation
  openChatButton.style.animation = 'pulse 2s infinite';
  
  document.body.appendChild(openChatButton);
  
  openChatButton.addEventListener('click', () => {
    chatWidget.classList.remove('collapsed');
    openChatButton.style.display = 'none';
    chatInput.focus();
  });
  
  // Add CSS for typing animation
  const style = document.createElement('style');
  style.textContent = `
    .typing-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--color-gray-400);
      margin-right: 3px;
      animation: typingAnimation 1.5s infinite ease-in-out;
    }
    
    .typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes typingAnimation {
      0% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  
  document.head.appendChild(style);
}