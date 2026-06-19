document.addEventListener('DOMContentLoaded', () => {
    console.log("INDANGA Script is perfectly connected! 🚀");
    const typeSelect = document.getElementById('typeSelect');
const budgetSelect = document.getElementById('budgetSelect');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetType = tab.getAttribute('data-target');
        
        if (targetType === 'homes') {
            locationInput.placeholder = "Where are you looking for a home?";
            typeSelect.innerHTML = `<option>All Types</option><option>Apartment</option><option>Villa</option><option>Townhouse</option>`;
            budgetSelect.innerHTML = `<option>Any Budget</option><option>Under 500k RWF</option><option>500k - 1.5M RWF</option><option>1.5M+ RWF</option>`;
        } 
        else if (targetType === 'hotels') {
            locationInput.placeholder = "Where are you going to stay?";
            typeSelect.innerHTML = `<option>All Stays</option><option>Resort</option><option>Boutique Hotel</option><option>Lodge</option>`;
            budgetSelect.innerHTML = `<option>Any Price</option><option>Under 50k RWF / night</option><option>50k - 150k RWF</option><option>150k+ RWF</option>`;
        } 
        else if (targetType === 'cars') {
            locationInput.placeholder = "Where do you want to pick up your car?";
            typeSelect.innerHTML = `<option>All Vehicles</option><option>SUV / 4x4</option><option>Sedan</option><option>Luxury Car</option>`;
            budgetSelect.innerHTML = `<option>Any Rate</option><option>Under 35k RWF / day</option><option>35k - 70k RWF</option><option>70k+ RWF</option>`;
            }
        
        // --- DYNAMIC MARKETPLACE GRID FILTERING CONNECTORS ---
        const marketplaceTitle = document.getElementById('marketplaceTitle');
        const marketplaceSubtitle = document.getElementById('marketplaceSubtitle');
        const allMarketplaceCards = document.querySelectorAll('.listing-item-card');

        if (targetType === 'homes') {
            if (marketplaceTitle) marketplaceTitle.textContent = "Featured Residential Homes";
            if (marketplaceSubtitle) marketplaceSubtitle.textContent = "Browse fully-furnished rentals, high-end apartments, and premium estate villas in Nyarutarama and Gacuriro.";
        } else if (targetType === 'hotels') {
            if (marketplaceTitle) marketplaceTitle.textContent = "Premium Hotels & Lodging";
            if (marketplaceSubtitle) marketplaceSubtitle.textContent = "Discover world-class luxury stays, business resorts, and boutique hospitality centers across Rwanda.";
        } else if (targetType === 'cars') {
            if (marketplaceTitle) marketplaceTitle.textContent = "Available Vehicles for Rent";
            if (marketplaceSubtitle) marketplaceSubtitle.textContent = "Select from rugged SUVs, high-end sedans, and secure transport services tailored for road trips.";
        }

        // Loop through cards and hide/show them based on the category clicked!
        allMarketplaceCards.forEach(card => {
            if (card.getAttribute('data-category') === targetType) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        });
    });
});
// Modal Control Logic
const modal = document.getElementById('authModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const overlay = document.querySelector('.modal-overlay');

// Select all action items that should trigger the popup
const triggerButtons = document.querySelectorAll('.btn-login, .gateway-cta-btn, .btn-explore-now');

triggerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
});

// Close modal function
const closeModal = () => modal.classList.remove('active');

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// ==========================================================================
    // NAVBAR SPLIT AUTH BUTTONS NAVIGATION (UPDATED)
    // ==========================================================================
    const navLoginBtn = document.getElementById('navLoginBtn');
    const navSignupBtn = document.getElementById('navSignupBtn');
    
    const loginModalElement = document.getElementById('loginModal');
    const registerModalElement = document.getElementById('authModal'); 

    // 1. Log In Button Click -> Opens Premium Login Modal
    if (navLoginBtn && loginModalElement) {
        navLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (registerModalElement) registerModalElement.classList.remove('active'); // Close registration if open
            loginModalElement.style.display = 'flex';
        });
    }

    // 2. Sign Up Button Click -> Opens Your Original Registration Modal
    if (navSignupBtn && registerModalElement) {
        navSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginModalElement) loginModalElement.style.display = 'none'; // Close login if open
            registerModalElement.classList.add('active'); // Uses your existing .active setup from line 41
        });
    }
    // 3. Switch Link inside Sign-Up Modal -> Closes Sign-Up, Opens Login
    const modalSwitchToLoginLink = document.querySelector('.auth-modal-form .switch-to-login-link') || 
                                   document.querySelector('.modal-overlay .login-link'); // Adjust selector to match your sign-up card footer link class

    if (modalSwitchToLoginLink && loginModalElement) {
        modalSwitchToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (registerModalElement) registerModalElement.classList.remove('active'); // Hide Sign-Up card
            loginModalElement.style.display = 'flex'; // Show Premium Login modal
        });
    }

    // ==========================================================================
    // BACKEND LOGIN REDIRECT TO USER PORTAL WORKSPACE
    // ==========================================================================
    const premiumLoginForm = document.getElementById('premiumLoginForm');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    
    const navbarBlock = document.querySelector('.main-navbar-container');
    const heroBlock = document.querySelector('.hero-gateway-section');
    const searchCardBlock = document.querySelector('.search-module-card');
    const hotelViewBlock = document.getElementById('hotelResultsSection');
    const userWorkspacePanel = document.getElementById('userDashboardPortal');

    // Close Premium Login Modal
    if (closeLoginBtn && loginModalElement) {
        closeLoginBtn.addEventListener('click', () => {
            loginModalElement.style.display = 'none';
        });
    }

    // Handle Form Submit & Portal Redirect
    if (premiumLoginForm) {
        premiumLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userEmail = document.getElementById('loginEmail').value;
            if (loginModalElement) loginModalElement.style.display = 'none';

            // Hide all public landing components
            if (navbarBlock) navbarBlock.style.display = 'none';
            if (heroBlock) heroBlock.style.display = 'none';
            if (searchCardBlock) searchCardBlock.style.display = 'none';
            if (hotelViewBlock) hotelViewBlock.style.display = 'none';

            // Reveal the dashboard portal panel
            if (userWorkspacePanel) {
                userWorkspacePanel.style.display = 'flex';
                
                const namePlaceholder = document.querySelector('.user-name-placeholder');
                if (namePlaceholder && userEmail) {
                    const extractedName = userEmail.split('@')[0];
                    namePlaceholder.textContent = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
                }
            }
        });
    }
    // ==========================================================================
    // INTERACTIVE BOOKING / REQUEST COUPLING SYSTEM
    // ==========================================================================
    const bookingButtons = document.querySelectorAll('.listing-item-card button, .btn-card-action-trigger, .btn-book-listing');
    const activityTimelineContainer = document.getElementById('dashboardActivityTimeline');

    if (bookingButtons.length > 0) {
        console.log(`Success: Found ${bookingButtons.length} booking buttons connected!`);
        bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 1. Traverse up the DOM to harvest the exact card info details safely
                const cardElement = button.closest('.listing-item-card');
                if (!cardElement) return;

                const itemTitle = cardElement.querySelector('h3').textContent;
                const itemPrice = priceElement ? priceElement.textContent : '$0';
                // 2. Format a brand new timestamp string dynamically
                const today = new Date();
                const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                // 3. Assemble a premium micro-interaction activity component template
                const newActivityHTML = `
                    <div class="activity-item" style="animation: slideInFade 0.4s ease forwards; background: #faf5ff; border-left: 3px solid #a855f7; padding-left: 0.5rem;">
                        <div class="activity-icon-circle purple-text">
                            <i class="fa-solid fa-bell"></i>
                        </div>
                        <div class="activity-details">
                            <h4 style="color: #a855f7;">New Request Pending</h4>
                            <p>Reservation request initiated for <strong>${itemTitle}</strong></p>
                            <span class="activity-date">${formattedDate} (Just Now)</span>
                        </div>
                        <span class="activity-price" style="color: #a855f7;">${itemPrice}</span>
                    </div>
                `;

        
                activityTimelineContainer.insertAdjacentHTML('afterbegin', newActivityHTML);

                // 5. Provide instant visual UX feedback to the user on the card
                const originalText = button.textContent;
                button.textContent = "✓ Requested";
                button.style.backgroundColor = "#22c55e";
                button.style.color = "#ffffff";
                button.disabled = true;

                // Alert the client gently so they know it worked
                alert(`✨ Luxury Link Connected! Your request for "${itemTitle}" has been dispatched to your profile dashboard panel context.`);
            });
            });

    // Wire up the sidebar logout action button
    const logoutBtn = document.getElementById('portalLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            location.reload(); 
        });
    }
    }
  // Hamburger slide trigger wrapper engine
document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("dashboardMenuToggle");
    const navigationDrawer = document.querySelector(".portal-sidebar-navigation");

    if (trigger && navigationDrawer) {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            navigationDrawer.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!navigationDrawer.contains(e.target) && !trigger.contains(e.target)) {
                navigationDrawer.classList.remove("active");
            }
        });
    }
});