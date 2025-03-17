// Page Loader
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        // Only wait for above-the-fold content
        const criticalImages = Array.from(document.querySelectorAll('.header-circle img'));
        
        // If there are critical images, wait for them
        if (criticalImages.length > 0) {
            Promise.all(
                criticalImages
                    .filter(img => !img.complete)
                    .map(img => new Promise(resolve => {
                        img.onload = img.onerror = resolve;
                    }))
            ).then(() => {
                hideLoader();
            });
        } else {
            // If no critical images, remove loader quickly
            hideLoader();
        }
        
        // Fallback: Remove loader after 2 seconds maximum
        setTimeout(hideLoader, 2000);
        
        function hideLoader() {
            if (loader && !loader.classList.contains('hiding')) {
                loader.classList.add('hiding');
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    loader.remove(); // Completely remove the loader
                }, 500);
            }
        }
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    // Debug log to check if elements are found
    console.log('mobileMenuButton:', mobileMenuButton);
    console.log('mobileMenu:', mobileMenu);

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('active');
            console.log('Menu clicked, isMenuOpen:', isMenuOpen); // Debug log

            // Change burger icon to X when menu is open
            mobileMenuButton.innerHTML = isMenuOpen 
                ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                   </svg>`
                : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                   </svg>`;
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.remove('active');
                isMenuOpen = false;
                mobileMenuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>`;
            }
        });

        // Close menu when clicking a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                isMenuOpen = false;
                mobileMenuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>`;
            });
        });
    }

    // Navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - sectionHeight/3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // You can add your form submission logic here
            // For example, sending to an email service or your backend
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Clear the form
            this.reset();
        });
    }

    // Product filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (categoryButtons.length && productCards.length) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const selectedCategory = button.getAttribute('data-category');
                
                productCards.forEach(card => {
                    if (selectedCategory === 'all') {
                        card.style.display = 'block';
                        // Optional: Add animation
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === selectedCategory) {
                            card.style.display = 'block';
                            // Optional: Add animation
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            card.style.display = 'none';
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                        }
                    }
                });
            });
        });
    }
});

// Before/After Image Toggle
document.addEventListener('DOMContentLoaded', () => {
    const beforeBtn = document.querySelector('.before-btn');
    const afterBtn = document.querySelector('.after-btn');
    const afterImage = document.querySelector('.after-image');
    
    if (beforeBtn && afterBtn && afterImage) {
        // Show Before image
        beforeBtn.addEventListener('click', () => {
            afterImage.style.opacity = '0';
            beforeBtn.classList.add('ring-2', 'ring-offset-2');
            afterBtn.classList.remove('ring-2', 'ring-offset-2');
        });
        
        // Show After image
        afterBtn.addEventListener('click', () => {
            afterImage.style.opacity = '1';
            afterBtn.classList.add('ring-2', 'ring-offset-2');
            beforeBtn.classList.remove('ring-2', 'ring-offset-2');
        });
        
        // Set initial state
        beforeBtn.click();
    }
});

// Review System Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Star Rating Selection
    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        const stars = starRating.querySelectorAll('span');
        let selectedRating = 0;
        
        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                highlightStars(rating);
            });
            
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.getAttribute('data-rating'));
                highlightStars(selectedRating);
                star.classList.add('scale-125'); // Add pop effect
                setTimeout(() => star.classList.remove('scale-125'), 200);
            });
            
            star.addEventListener('mouseout', () => {
                highlightStars(selectedRating);
            });
        });
        
        function highlightStars(count) {
            stars.forEach((star, index) => {
                if (index < count) {
                    star.classList.add('text-yellow-400');
                    star.classList.remove('text-gray-300');
                } else {
                    star.classList.add('text-gray-300');
                    star.classList.remove('text-yellow-400');
                }
            });
        }
    }
    
    // Review Modal
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const closeReviewModal = document.getElementById('closeReviewModal');
    const reviewForm = document.getElementById('reviewForm');
    
    if (writeReviewBtn && reviewModal && closeReviewModal) {
        function openModal() {
            reviewModal.classList.remove('hidden');
            setTimeout(() => {
                reviewModal.classList.remove('opacity-0');
                reviewModal.querySelector('.bg-white').classList.remove('scale-95');
            }, 10);
        }
        
        function closeModal() {
            reviewModal.classList.add('opacity-0');
            reviewModal.querySelector('.bg-white').classList.add('scale-95');
            setTimeout(() => {
                reviewModal.classList.add('hidden');
            }, 300);
        }
        
        writeReviewBtn.addEventListener('click', openModal);
        closeReviewModal.addEventListener('click', closeModal);
        
        // Close modal when clicking outside
        reviewModal.addEventListener('click', (e) => {
            if (e.target === reviewModal) {
                closeModal();
            }
        });
        
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(reviewForm);
                const reviewData = {
                    name: formData.get('name'),
                    rating: selectedRating,
                    review: formData.get('review'),
                    date: new Date().toLocaleDateString()
                };
                
                // Add new review to the page
                addNewReview(reviewData);
                
                // Reset form and close modal
                reviewForm.reset();
                closeModal();
                
                // Show success message
                showNotification('Thank you for your review!');
            });
        }
    }
    
    function addNewReview(reviewData) {
        const reviewsList = document.querySelector('.grid.gap-6');
        if (reviewsList) {
            const newReview = document.createElement('div');
            newReview.className = 'bg-[#FFF8F8] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow transform translate-y-4 opacity-0';
            
            newReview.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="font-playfair font-semibold text-lg mb-2">${reviewData.name}</h4>
                        <div class="flex text-yellow-400 mb-2">
                            ${'★'.repeat(reviewData.rating)}${'☆'.repeat(5-reviewData.rating)}
                        </div>
                        <div class="text-gray-500 text-sm">Just now</div>
                    </div>
                </div>
                <p class="text-gray-700 leading-relaxed">${reviewData.review}</p>
            `;
            
            reviewsList.insertBefore(newReview, reviewsList.firstChild);
            
            // Animate the new review
            setTimeout(() => {
                newReview.classList.remove('translate-y-4', 'opacity-0');
            }, 10);
        }
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-y-full', 'opacity-0');
        }, 10);
        
        setTimeout(() => {
            notification.classList.add('translate-y-full', 'opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});

// Skincare Quiz Functionality
document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizModal = document.getElementById('quizModal');
    const closeQuizBtn = document.getElementById('closeQuizBtn');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const nextBtn = document.querySelector('.quiz-next-btn');
    const prevBtn = document.querySelector('.quiz-prev-btn');
    const progressBar = document.querySelector('.quiz-progress');
    const shopRecommendations = document.getElementById('shopRecommendations');
    
    let currentStep = 1;
    const totalSteps = quizSteps.length - 1; // Excluding result step
    const userAnswers = {};
    
    if (startQuizBtn && quizModal) {
        // Open quiz modal
        startQuizBtn.addEventListener('click', () => {
            quizModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        // Close quiz modal
        closeQuizBtn.addEventListener('click', () => {
            quizModal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
        
        // Option selection
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Get all options in the current step
                const currentStepOptions = document.querySelector(`.quiz-step[data-step="${currentStep}"]`).querySelectorAll('.quiz-option');
                
                // Remove selected class from all options in current step
                currentStepOptions.forEach(opt => {
                    opt.classList.remove('border-[#FF6F61]', 'bg-[#FFF0F0]');
                    opt.classList.add('border-gray-200');
                });
                
                // Add selected class to clicked option
                option.classList.remove('border-gray-200');
                option.classList.add('border-[#FF6F61]', 'bg-[#FFF0F0]');
                
                // Store answer
                const questionKey = `question${currentStep}`;
                userAnswers[questionKey] = option.getAttribute('data-value');
            });
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            // Check if an option is selected
            const currentStepOptions = document.querySelector(`.quiz-step[data-step="${currentStep}"]`).querySelectorAll('.quiz-option');
            const isSelected = Array.from(currentStepOptions).some(opt => 
                opt.classList.contains('border-[#FF6F61]')
            );
            
            if (!isSelected) {
                alert('Please select an option before continuing.');
                return;
            }
            
            // Hide current step
            document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('hidden');
            
            if (currentStep === totalSteps) {
                // Show results
                showResults();
                document.querySelector('.quiz-step[data-step="result"]').classList.remove('hidden');
                nextBtn.classList.add('hidden');
            } else {
                // Show next step
                currentStep++;
                document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('hidden');
            }
            
            // Update progress bar
            progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
            
            // Show back button after first step
            if (currentStep > 1) {
                prevBtn.classList.remove('hidden');
            }
        });
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            // Hide current step
            document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('hidden');
            
            // Show previous step
            currentStep--;
            document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('hidden');
            
            // Update progress bar
            progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
            
            // Hide back button on first step
            if (currentStep === 1) {
                prevBtn.classList.add('hidden');
            }
            
            // Show next button if coming back from results
            nextBtn.classList.remove('hidden');
        });
        
        // Close modal when clicking outside content
        quizModal.addEventListener('click', (e) => {
            if (e.target === quizModal) {
                quizModal.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
        
        // Shop recommendations button
        if (shopRecommendations) {
            shopRecommendations.addEventListener('click', () => {
                quizModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Function to show personalized results
        function showResults() {
            const skinProfile = document.getElementById('skinProfile');
            const recommendedProducts = document.getElementById('recommendedProducts');
            
            if (skinProfile && recommendedProducts) {
                // Clear previous results
                skinProfile.innerHTML = '';
                recommendedProducts.innerHTML = '';
                
                // Map skin type
                const skinTypeMap = {
                    'dry': 'Dry Skin',
                    'oily': 'Oily Skin',
                    'combination': 'Combination Skin',
                    'normal': 'Normal Skin'
                };
                
                // Map concerns
                const concernMap = {
                    'aging': 'Fine Lines & Wrinkles',
                    'acne': 'Acne & Breakouts',
                    'hyperpigmentation': 'Dark Spots & Hyperpigmentation',
                    'sensitive': 'Sensitivity & Redness'
                };
                
                // Map routine
                const routineMap = {
                    'minimal': 'Minimal Skincare Routine',
                    'standard': 'Standard Skincare Routine',
                    'advanced': 'Advanced Skincare Routine'
                };
                
                // Create skin profile list
                const skinType = document.createElement('li');
                skinType.textContent = skinTypeMap[userAnswers.question1] || 'Not specified';
                skinProfile.appendChild(skinType);
                
                const concern = document.createElement('li');
                concern.textContent = concernMap[userAnswers.question2] || 'No specific concerns';
                skinProfile.appendChild(concern);
                
                const routine = document.createElement('li');
                routine.textContent = routineMap[userAnswers.question3] || 'Routine not specified';
                skinProfile.appendChild(routine);
                
                // Create product recommendations based on skin type and concerns
                let recommendedProductsList = [];
                
                // Simple recommendation logic
                if (userAnswers.question1 === 'dry') {
                    recommendedProductsList.push({
                        name: 'Hydra-Boost Moisturizer',
                        description: 'Intense hydration for dry skin',
                        price: '$32.99',
                        icon: 'fas fa-tint'
                    });
                }
                
                if (userAnswers.question1 === 'oily') {
                    recommendedProductsList.push({
                        name: 'Oil Control Serum',
                        description: 'Balances sebum production',
                        price: '$29.99',
                        icon: 'fas fa-leaf'
                    });
                }
                
                if (userAnswers.question2 === 'aging') {
                    recommendedProductsList.push({
                        name: 'Anti-Aging Night Cream',
                        description: 'Reduces fine lines and wrinkles',
                        price: '$39.99',
                        icon: 'fas fa-moon'
                    });
                }
                
                if (userAnswers.question2 === 'acne') {
                    recommendedProductsList.push({
                        name: 'Blemish Clear Gel',
                        description: 'Targets and treats acne spots',
                        price: '$22.99',
                        icon: 'fas fa-magic'
                    });
                }
                
                // Always recommend the hero product
                recommendedProductsList.push({
                    name: 'Glow Hydrating Face Serum',
                    description: 'Our bestseller for all skin types',
                    price: '$34.99',
                    icon: 'fas fa-star'
                });
                
                // Display recommendations
                recommendedProductsList.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'flex items-center p-4 border border-gray-200 rounded-xl';
                    
                    productCard.innerHTML = `
                        <div class="text-[#FF6F61] text-2xl mr-4">
                            <i class="${product.icon}"></i>
                        </div>
                        <div class="flex-grow">
                            <h5 class="font-semibold">${product.name}</h5>
                            <p class="text-gray-600 text-sm">${product.description}</p>
                        </div>
                        <div class="font-bold">${product.price}</div>
                    `;
                    
                    recommendedProducts.appendChild(productCard);
                });
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation for sections
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      section.classList.add('fade-section');
      observer.observe(section);
    });
  });

  // Add to main.js
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    
    if (!cookieChoice && cookieBanner) {
      // Show the banner after a short delay
      setTimeout(() => {
        cookieBanner.style.transform = 'translateY(0)';
      }, 1000);
      
      // Handle accept button
      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookieChoice', 'accepted');
          cookieBanner.style.transform = 'translateY(full)';
          setTimeout(() => {
            cookieBanner.style.display = 'none';
          }, 300);
        });
      }
      
      // Handle decline button
      if (declineBtn) {
        declineBtn.addEventListener('click', () => {
          localStorage.setItem('cookieChoice', 'declined');
          cookieBanner.style.transform = 'translateY(full)';
          setTimeout(() => {
            cookieBanner.style.display = 'none';
          }, 300);
        });
      }
    }
  });

// Enhanced WhatsApp Product Sharing
function createEnhancedWhatsAppLink(product) {
    const baseUrl = "https://wa.me/96181749400";
    
    // Create a nicely formatted message with emoji
    const message = `
🛍️ *${product.name}* 🛍️
💰 Price: ${product.price}

✨ *Product Details*:
${product.description}

🔍 *Key Features*:
${product.features.map(feature => `• ${feature}`).join('\n')}

🌟 *From Sarah's Beauty Store* 🌟
`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    return `${baseUrl}?text=${encodedMessage}`;
}

// Update WhatsApp buttons with enhanced sharing
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-footer span').textContent;
            const productDescription = productCard.querySelector('p').textContent;
            
            // Extract features
            const featureElements = productCard.querySelectorAll('li');
            const features = Array.from(featureElements).map(li => li.textContent.trim());
            
            const product = {
                name: productName,
                price: productPrice,
                description: productDescription,
                features: features
            };
            
            // Update the href attribute
            button.href = createEnhancedWhatsAppLink(product);
        }
    });
});

// Add to main.js
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('subscriberEmail');
    const emailError = document.getElementById('emailError');
    const subscribeSuccess = document.getElementById('subscribeSuccess');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate email
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
          // Show error
          emailError.classList.remove('hidden');
          emailInput.classList.add('border-red-400');
          return;
        }
        
        // Hide error if previously shown
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-400');
        
        // Simulate newsletter subscription (replace with actual API call)
        setTimeout(() => {
          // Show success message
          subscribeSuccess.classList.remove('hidden');
          emailInput.value = '';
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            subscribeSuccess.classList.add('hidden');
          }, 3000);
        }, 500);
      });
      
      // Clear error on input focus
      emailInput.addEventListener('focus', () => {
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-400');
      });
    }
  });

// Recently Viewed Products Functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize recently viewed products from sessionStorage or empty array
  let recentlyViewedProducts = JSON.parse(sessionStorage.getItem('recentlyViewed')) || [];
  const maxRecentProducts = 4; // Maximum number of recent products to show
  
  // Function to add a product to recently viewed
  function addToRecentlyViewed(productData) {
    // Check if product is already in the list
    const existingIndex = recentlyViewedProducts.findIndex(p => p.id === productData.id);
    
    if (existingIndex > -1) {
      // Remove it so we can put it at the beginning (most recent)
      recentlyViewedProducts.splice(existingIndex, 1);
    }
    
    // Add to beginning of array
    recentlyViewedProducts.unshift(productData);
    
    // Limit the array length
    if (recentlyViewedProducts.length > maxRecentProducts) {
      recentlyViewedProducts = recentlyViewedProducts.slice(0, maxRecentProducts);
    }
    
    // Save to sessionStorage
    sessionStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewedProducts));
    
    // Update the UI
    updateRecentlyViewedUI();
  }
  
  // Function to update the Recently Viewed UI
  function updateRecentlyViewedUI() {
    const recentlyViewedSection = document.getElementById('recentlyViewed');
    const recentlyViewedContainer = document.getElementById('recentlyViewedProducts');
    
    if (!recentlyViewedProducts.length) {
      recentlyViewedSection.classList.add('hidden');
      return;
    }
    
    // Show the section if there are products
    recentlyViewedSection.classList.remove('hidden');
    
    // Clear the container
    recentlyViewedContainer.innerHTML = '';
    
    // Add products to the container
    recentlyViewedProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.setAttribute('data-category', product.category || 'all');
      
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        </div>
        <div class="p-4 product-content">
          <h3 class="text-lg font-playfair font-semibold mb-2">${product.name}</h3>
          <p class="text-gray-600 text-sm mb-2">${product.description}</p>
          <div class="product-footer flex items-center justify-between">
            <span class="text-lg font-bold">${product.price}</span>
            <button class="whatsapp-btn" onclick="showDemoMessage()">
              <i class="fab fa-whatsapp"></i>
              Order on WhatsApp <span class="text-xs ml-1">(Demo)</span>
            </button>
          </div>
        </div>
      `;
      
      recentlyViewedContainer.appendChild(productCard);
    });
    
    // Update the WhatsApp buttons in the main product cards
    const whatsappButtons = recentlyViewedContainer.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
      button.innerHTML = '<i class="fab fa-whatsapp"></i> Order on WhatsApp <span class="text-xs ml-1">(Demo)</span>';
      button.onclick = showDemoMessage;
    });
  }
  
  // Add click handlers to all product cards to track views
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Only track if clicking the card itself, not on the WhatsApp button
      if (!e.target.closest('.whatsapp-btn')) {
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.product-footer span').textContent;
        const productDescription = card.querySelector('p').textContent;
        const productImage = card.querySelector('img').src;
        const productLink = card.querySelector('.whatsapp-btn').href;
        const productCategory = card.getAttribute('data-category');
        
        // Extract features
        const featureElements = card.querySelectorAll('li');
        const features = Array.from(featureElements).map(li => li.textContent.trim());
        
        addToRecentlyViewed({
          id: `product-${index}`,
          name: productName,
          price: productPrice,
          description: productDescription,
          image: productImage,
          link: productLink,
          category: productCategory,
          features: features
        });
      }
    });
  });
});

// Quick View Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickView = document.getElementById('closeQuickView');
  const quickViewTitle = document.getElementById('quickViewTitle');
  const quickViewImage = document.getElementById('quickViewImage');
  const quickViewPrice = document.getElementById('quickViewPrice');
  const quickViewDescription = document.getElementById('quickViewDescription');
  const quickViewFeatures = document.getElementById('quickViewFeatures');
  const quickViewButton = document.getElementById('quickViewButton');
  const viewDetailsBtn = document.getElementById('viewDetailsBtn');
  
  // Product data mapping (for additional details)
  const productDetails = {
    'Glow Hydrating Face Serum': {
      image: './images/Glow Serum.webp',
      price: '$34.99',
      description: 'A lightweight, fast-absorbing serum with hyaluronic acid and vitamin C that deeply hydrates skin while bringing a natural glow to your complexion. Perfect for daily use in your morning and evening skincare routine.',
      features: [
        'Suitable for all skin types',
        'Made with Hyaluronic Acid, Vitamin C, Aloe Vera',
        'Lightweight and fast-absorbing formula',
        'Hydrates and brightens skin'
      ],
      whatsappLink: "https://wa.me/96181749400?text=I'm%20interested%20in%20the%20Glow%20Hydrating%20Face%20Serum%20($34.99).%0A%0AKey%20Features:%0A-%20Lightweight%20and%20fast-absorbing%0A-%20Contains%20Hyaluronic%20Acid%20and%20Vitamin%20C%0A-%20Suitable%20for%20all%20skin%20types"
    },
    'Velvet Rose Body Butter': {
      image: './images/Velvet Rose Body Butter.webp',
      price: '$28.50',
      description: 'Rich whipped body butter with shea butter and rose oil that provides intense and long-lasting hydration. Its velvety texture absorbs quickly without feeling greasy, leaving your skin soft, nourished, and delicately scented.',
      features: [
        'With Shea Butter, Cocoa Butter, Rose Oil',
        'Long-lasting hydration',
        'Non-greasy formula',
        'Delicate rose scent'
      ],
      whatsappLink: "https://wa.me/96181749400?text=I'm%20interested%20in%20the%20Velvet%20Rose%20Body%20Butter%20($28.50).%0A%0AKey%20Features:%0A-%20Rich%20whipped%20body%20butter%0A-%20Contains%20Shea%20Butter,%20Cocoa%20Butter,%20Rose%20Oil%0A-%20Long-lasting%20hydration"
    },
    'Luxe Matte Liquid Lipstick': {
      image: './images/Luxe Matte Liquid Lipstick.webp',
      price: '$19.99',
      description: 'Nude Blush - 12-hour wear matte lipstick that delivers intense color with a single swipe. The lightweight formula feels comfortable on lips and doesn\'t dry them out, while providing a gorgeous velvety matte finish that lasts all day.',
      features: [
        'Vegan & Cruelty-Free',
        'Velvety smooth finish',
        '12-hour long wear',
        'Comfortable, non-drying formula'
      ],
      whatsappLink: "https://wa.me/96181749400?text=I'm%20interested%20in%20the%20Luxe%20Matte%20Liquid%20Lipstick%20($19.99).%0A%0AKey%20Features:%0A-%20Vegan%20&%20Cruelty-Free%0A-%20Velvety%20smooth%20finish%0A-%2012-hour%20wear"
    }
  };
  
  // Add quick view buttons to product cards
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Create Quick View button
    const quickViewBtn = document.createElement('button');
    quickViewBtn.className = 'absolute top-4 right-4 bg-white bg-opacity-80 text-[#FF6F61] p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all z-20';
    quickViewBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>';
    
    // Add it to the product image container
    const imageContainer = card.querySelector('.product-image-container');
    if (imageContainer) {
      imageContainer.style.position = 'relative';
      imageContainer.appendChild(quickViewBtn);
    }
    
    // Add click event
    quickViewBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering card click
      
      // Extract product data
      const productName = card.querySelector('h3').textContent;
      const productDetails = getProductDetails(productName);
      
      // Populate modal
      quickViewTitle.textContent = productName;
      quickViewImage.innerHTML = `<img src="${productDetails.image}" alt="${productName}" class="w-full rounded-lg">`;
      quickViewPrice.textContent = productDetails.price;
      quickViewDescription.textContent = productDetails.description;
      
      // Populate features
      quickViewFeatures.innerHTML = '<h4 class="font-semibold mb-2">Key Features:</h4><ul class="space-y-2">';
      productDetails.features.forEach(feature => {
        quickViewFeatures.innerHTML += `<li class="flex items-center"><span class="text-[#FF6F61] mr-2">•</span>${feature}</li>`;
      });
      quickViewFeatures.innerHTML += '</ul>';
      
      // Set button link
      quickViewButton.href = productDetails.whatsappLink;
      
      // Show modal
      quickViewModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
  
  // Helper function to get product details from our database
  function getProductDetails(productName) {
    if (productDetails[productName]) {
      return productDetails[productName];
    }
    
    // Fallback if product not found in our database
    const defaultProduct = {
      image: './images/Glow Serum.webp',
      price: '$34.99',
      description: 'Premium quality beauty product from Sarah\'s Beauty Store.',
      features: ['Premium quality', 'Natural ingredients', 'Cruelty-free'],
      whatsappLink: `https://wa.me/96181749400?text=I'm%20interested%20in%20the%20${encodeURIComponent(productName)}`
    };
    
    return defaultProduct;
  }
  
  // Close modal
  if (closeQuickView) {
    closeQuickView.addEventListener('click', () => {
      quickViewModal.classList.add('hidden');
      document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Close when clicking outside content
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // View Details Button - scroll to product section
  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', () => {
      quickViewModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
      
      // Scroll to product section
      const productSection = document.getElementById('bestSellers');
      if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Add this function at the beginning of the file
function showDemoMessage() {
    alert("This is a portfolio demo. In a real implementation, this button would connect to the client's WhatsApp for ordering.");
}

