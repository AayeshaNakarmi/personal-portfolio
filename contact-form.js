/**
 * Contact Form Handler
 * Handles form validation, submission, and user feedback
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Setup form submission handler
    setupFormSubmission();
    
    // Setup real-time validation
    setupRealTimeValidation();
});

/**
 * Setup form submission event listener
 */
function setupFormSubmission() {
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            subject: formData.get('subject').trim(),
            message: formData.get('message').trim()
        };
        
        // Validate form
        const errors = validateForm(data);
        
        if (errors.length > 0) {
            showErrors(errors);
            return;
        }
        
        // Show loading state
        showLoading();
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitForm(data);
        }, 1500);
    });
}

/**
 * Setup real-time validation for form fields
 */
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error state when user starts typing
            if (this.classList.contains('border-red-500')) {
                this.classList.remove('border-red-500', 'bg-red-50');
                this.classList.add('border-gray-300');
                
                const errorDiv = this.nextElementSibling;
                if (errorDiv && errorDiv.classList.contains('error-message')) {
                    errorDiv.classList.add('hidden');
                }
            }
        });
    });
}

/**
 * Validate entire form
 * @param {Object} data - Form data object
 * @returns {Array} Array of error objects
 */
function validateForm(data) {
    const errors = [];
    
    if (!data.name) {
        errors.push({ field: 'name', message: 'Name is required' });
    } else if (data.name.length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
    }
    
    if (!data.email) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (!isValidEmail(data.email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    if (!data.subject) {
        errors.push({ field: 'subject', message: 'Subject is required' });
    } else if (data.subject.length < 3) {
        errors.push({ field: 'subject', message: 'Subject must be at least 3 characters' });
    }
    
    if (!data.message) {
        errors.push({ field: 'message', message: 'Message is required' });
    } else if (data.message.length < 10) {
        errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
    }
    
    return errors;
}

/**
 * Validate single form field
 * @param {HTMLElement} field - The field element to validate
 */
function validateSingleField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let error = null;
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                error = 'Name is required';
            } else if (value.length < 2) {
                error = 'Name must be at least 2 characters';
            }
            break;
        case 'email':
            if (!value) {
                error = 'Email is required';
            } else if (!isValidEmail(value)) {
                error = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (!value) {
                error = 'Subject is required';
            } else if (value.length < 3) {
                error = 'Subject must be at least 3 characters';
            }
            break;
        case 'message':
            if (!value) {
                error = 'Message is required';
            } else if (value.length < 10) {
                error = 'Message must be at least 10 characters';
            }
            break;
    }
    
    if (error) {
        field.classList.add('border-red-500', 'bg-red-50');
        field.classList.remove('border-gray-300');
        
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = error;
            errorDiv.classList.remove('hidden');
        }
    }
}

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display form errors
 * @param {Array} errors - Array of error objects
 */
function showErrors(errors) {
    const errorMessage = document.getElementById('error-message');
    const errorList = document.getElementById('error-list');
    
    // Clear previous errors
    errorList.innerHTML = '';
    
    // Add new errors
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error.message;
        errorList.appendChild(li);
        
        // Highlight the field
        const field = document.getElementById(error.field);
        if (field) {
            field.classList.add('border-red-500', 'bg-red-50');
            field.classList.remove('border-gray-300');
            
            // Show individual error message
            const errorDiv = field.nextElementSibling;
            if (errorDiv && errorDiv.classList.contains('error-message')) {
                errorDiv.textContent = error.message;
                errorDiv.classList.remove('hidden');
            }
        }
    });
    
    // Show error message
    errorMessage.classList.remove('hidden');
    errorMessage.classList.add('slide-in');
    
    // Shake the form
    const form = document.getElementById('contact-form');
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
    
    // Scroll to top of form
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Clear all error messages and styling
 */
function clearErrors() {
    // Hide error messages
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('success-message').classList.add('hidden');
    
    // Clear field errors
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.classList.remove('border-red-500', 'bg-red-50');
            field.classList.add('border-gray-300');
            
            const errorDiv = field.nextElementSibling;
            if (errorDiv && errorDiv.classList.contains('error-message')) {
                errorDiv.classList.add('hidden');
            }
        }
    });
}

/**
 * Show loading state on submit button
 */
function showLoading() {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const icon = submitBtn.querySelector('i');
    
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    icon.setAttribute('data-lucide', 'loader-2');
    icon.classList.add('animate-spin');
    
    // Re-initialize icons to update the loader
    lucide.createIcons();
}

/**
 * Submit form data (replace with actual API call)
 * @param {Object} data - Form data to submit
 */
function submitForm(data) {
    // Here you would typically send the data to your server
    // Example:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     if (result.success) {
    //         showSuccessMessage();
    //     } else {
    //         showErrorMessage(result.message);
    //     }
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     showErrorMessage('Something went wrong. Please try again.');
    // });
    
    // For demo purposes, we'll just show a success message
    console.log('Form submitted:', data);
    
    // Reset form
    document.getElementById('contact-form').reset();
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.classList.remove('hidden');
    successMessage.classList.add('slide-in');
    
    // Reset button
    resetButton();
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
}

/**
 * Reset submit button to normal state
 */
function resetButton() {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const icon = submitBtn.querySelector('i');
    
    submitBtn.disabled = false;
    btnText.textContent = 'Launch Message';
    icon.setAttribute('data-lucide', 'send');
    icon.classList.remove('animate-spin');
    
    // Re-initialize icons
    lucide.createIcons();
}

/**
 * Configuration object for easy customization
 */
const ContactFormConfig = {
    validationRules: {
        name: { minLength: 2, required: true },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        subject: { minLength: 3, required: true },
        message: { minLength: 10, required: true }
    },
    
    messages: {
        success: 'Message sent successfully!',
        sending: 'Sending...',
        submitButton: 'Launch Message'
    },
    
    // API endpoint for form submission
    apiEndpoint: '/api/contact',
    
    // Timeout for simulated submission (demo only)
    simulationTimeout: 1500
};

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactFormConfig };
}