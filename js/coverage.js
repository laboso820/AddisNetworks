// Coverage Checker Functionality

document.addEventListener('DOMContentLoaded', () => {
  initCoverageChecker();
});

function initCoverageChecker() {
  const coverageForm = document.getElementById('coverage-form');
  const coverageResult = document.getElementById('coverage-result');
  
  if (coverageForm && coverageResult) {
    coverageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkCoverage();
    });
  }
}

function checkCoverage() {
  const addressInput = document.getElementById('address');
  const coverageResult = document.getElementById('coverage-result');
  
  if (!addressInput || !coverageResult) return;
  
  const address = addressInput.value.trim();
  
  if (!address) {
    alert('Please enter an address or postal code');
    return;
  }
  
  // Show loading state
  addressInput.disabled = true;
  const submitButton = document.querySelector('#coverage-form button');
  const originalButtonText = submitButton.innerText;
  submitButton.innerText = 'Checking...';
  
  // Simulate API call with a delay
  setTimeout(() => {
    // In a real application, this would be an API call to check coverage
    // For demo purposes, we'll simulate a positive result
    showCoverageResult(true, address);
    
    // Reset form
    addressInput.disabled = false;
    submitButton.innerText = originalButtonText;
  }, 1500);
}

function showCoverageResult(hasCoverage, address) {
  const coverageForm = document.getElementById('coverage-form');
  const coverageResult = document.getElementById('coverage-result');
  const resultIcon = coverageResult.querySelector('.result-icon');
  const resultTitle = coverageResult.querySelector('h3');
  const resultMessage = coverageResult.querySelector('p');
  const resultButton = coverageResult.querySelector('.btn');
  
  // Update the result content based on coverage status
  if (hasCoverage) {
    resultIcon.className = 'result-icon success';
    resultIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    resultTitle.innerText = 'Great News!';
    resultMessage.innerText = `VelocityNet is available at ${address}. Choose a plan to get started with lightning-fast internet today.`;
    resultButton.innerText = 'View Plans';
    resultButton.href = '#plans';
  } else {
    resultIcon.className = 'result-icon warning';
    resultIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    resultTitle.innerText = 'Coming Soon';
    resultMessage.innerText = `We're not in ${address} yet, but we're expanding quickly! Join our waitlist to be notified when we arrive in your area.`;
    resultButton.innerText = 'Join Waitlist';
    resultButton.href = '#contact';
  }
  
  // Show the result with animation
  coverageForm.style.display = 'none';
  coverageResult.classList.remove('hidden');
  
  // Add entrance animation
  coverageResult.style.opacity = '0';
  coverageResult.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    coverageResult.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    coverageResult.style.opacity = '1';
    coverageResult.style.transform = 'translateY(0)';
  }, 100);
  
  // Add reset option
  const resetButton = document.createElement('button');
  resetButton.className = 'coverage-reset';
  resetButton.innerText = 'Check Another Address';
  resetButton.style.backgroundColor = 'transparent';
  resetButton.style.border = 'none';
  resetButton.style.color = 'var(--color-primary)';
  resetButton.style.marginTop = '1rem';
  resetButton.style.textDecoration = 'underline';
  resetButton.style.cursor = 'pointer';
  
  resetButton.addEventListener('click', () => {
    // Reset the form
    document.getElementById('address').value = '';
    coverageForm.style.display = 'block';
    coverageResult.classList.add('hidden');
    
    // Remove the reset button
    resetButton.remove();
  });
  
  coverageResult.appendChild(resetButton);
}