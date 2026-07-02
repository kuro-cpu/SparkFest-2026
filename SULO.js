document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. SIGN UP SYSTEM LOGIC
    // ==========================================
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const username = usernameField.value.trim();
            const password = passwordField.value;
            const confirmPassword = confirmPasswordField.value;

            if (!firstName || !lastName || !username || !password) {
                alert("Please fill out all fields.");
                return;
            }

            if (username.length !== 8) {
                alert(`User ID must be exactly 8 characters. (Current: ${username.length})`);
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const newAccount = { firstName, lastName, username, password };
            const savedAccounts = JSON.parse(localStorage.getItem('databaseAccounts')) || [];
            savedAccounts.push(newAccount);
            localStorage.setItem('databaseAccounts', JSON.stringify(savedAccounts));
            
            // Save active session user for the dashboard greeting card
            localStorage.setItem('currentUser', JSON.stringify(newAccount));

            alert(`Account Created Successfully!\nUser ID: ${username}`);
            window.location.href = 'options.html'; // Directs to Choose School screen
        });
    }

    // ==========================================
    // 2. LOG IN SYSTEM LOGIC
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('username').value.trim();
            const passwordInput = document.getElementById('password').value;

            const savedAccounts = JSON.parse(localStorage.getItem('databaseAccounts')) || [];

            const matchedUser = savedAccounts.find(account => 
                account.username === usernameInput && account.password === passwordInput
            );

            if (matchedUser) {
                localStorage.setItem('currentUser', JSON.stringify(matchedUser));
                alert(`Welcome back, ${matchedUser.firstName}!`);
                window.location.href = 'home.html';
            } else {
                alert("Invalid User ID or Password. Please try again.");
            }
        });
    }

    // ==========================================
    // 3. JOIN & REGISTER SCHOOL LOGIC
    // ==========================================
    const joinSchoolForm = document.getElementById('joinSchoolForm');
    if (joinSchoolForm) {
        joinSchoolForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const studentNumInput = document.getElementById('studentNumber').value.trim();
            const requiredCredential = "SULO-2026";
            
            if (studentNumInput === requiredCredential) {
                window.location.href = 'home.html';
            } else {
                alert("❌ Invalid Student Number credential. Try using: SULO-2026");
            }
        });
    }

    const registerSchoolForm = document.getElementById('registerSchoolForm');
    if (registerSchoolForm) {
        registerSchoolForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const schoolName = document.querySelector('input[name="schoolName"]').value.trim();
            const schoolAddress = document.querySelector('input[name="schoolAddress"]').value.trim();
            const regionProvince = document.querySelector('input[name="regionProvince"]').value.trim();
            const schoolTypeSelected = document.querySelector('input[name="schoolType"]:checked');

            if (schoolName && schoolAddress && regionProvince && schoolTypeSelected) {
                window.location.href = 'home.html';
            } else {
                alert("❌ Please fill out the mandatory School Name, Address, Region, and Type to continue.");
            }
        });
    }

    // ==========================================
    // 4. DASHBOARD & CONCERNS
    // ==========================================
    const dashboardGreetingName = document.getElementById('dashboardGreetingName');
    if (dashboardGreetingName) {
        const activeSessionUser = JSON.parse(localStorage.getItem('currentUser'));
        if (activeSessionUser && activeSessionUser.firstName) {
            dashboardGreetingName.textContent = `${activeSessionUser.firstName}!`;
        } else {
            dashboardGreetingName.textContent = "User!"; 
        }
    }

    const concernForm = document.getElementById('concernForm');
    const backToHomeBtn = document.getElementById('backToHomeBtn');

    if (concernForm) {
        concernForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const textInput = document.getElementById('concernText').value.trim();
            if (textInput !== "") {
                document.getElementById('reportFormState').classList.add('screen-hidden');
                document.getElementById('reportSuccessState').classList.remove('screen-hidden');
            } else {
                alert("❌ Please write a short description of your concern before submitting.");
            }
        });
    }

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }

    // ==========================================
    // 5. EMERGENCY CONTACTS
    // ==========================================
    const contactsForm = document.getElementById('emergencyContactsForm');
    
    if (document.getElementById('schoolHotlineInput')) {
        document.getElementById('schoolHotlineInput').value = localStorage.getItem('schoolHotline') || '';
        document.getElementById('guidanceOfficeInput').value = localStorage.getItem('guidanceOffice') || '';
        document.getElementById('localPoliceInput').value = localStorage.getItem('localPolice') || '';
        document.getElementById('emergencyNumbersInput').value = localStorage.getItem('emergencyNumbers') || '';
    }

    if (contactsForm) {
        contactsForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            localStorage.setItem('schoolHotline', document.getElementById('schoolHotlineInput').value.trim());
            localStorage.setItem('guidanceOffice', document.getElementById('guidanceOfficeInput').value.trim());
            localStorage.setItem('localPolice', document.getElementById('localPoliceInput').value.trim());
            localStorage.setItem('emergencyNumbers', document.getElementById('emergencyNumbersInput').value.trim());

            const toast = document.getElementById('saveToast');
            if (toast) {
                toast.classList.add('show'); 
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2500);
            }
        });
    }

    // ==========================================
    // 6. MODALS / POPUPS
    // ==========================================
    function setupModal(cardId, modalId, closeBtnId) {
        const card = document.getElementById(cardId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);

        if (card && modal && closeBtn) {
            card.addEventListener('click', (e) => {
                e.preventDefault(); 
                modal.classList.add('show');
            });
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('show');
            });
        }
    }

    setupModal('activeThreatCard', 'threatModal', 'closeModalBtn');
    setupModal('fireEmergencyCard', 'fireModal', 'closeFireModalBtn');
    setupModal('earthquakeCard', 'earthquakeModal', 'closeEarthquakeModalBtn');
    setupModal('medicalEmergencyCard', 'medicalModal', 'closeMedicalModalBtn');
    setupModal('floodTyphoonCard', 'floodModal', 'closeFloodModalBtn');
    setupModal('evacuationCard', 'evacuationModal', 'closeEvacuationModalBtn');

    // ==========================================
    // 7. GEMINI AI CHAT LOGIC
    // ==========================================
    const chatContainer = document.getElementById("chatContainer");
    const userInputField = document.querySelector(".gemini-text-field");
    
    // Check if we are on the AI chat page
    if (chatContainer && userInputField) {
        const GEMINI_API_KEY = "PASTE_YOUR_API_KEY_HERE";
        const MODEL_NAME = "gemini-3-flash-preview"; // Fixed invalid model name
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;

        // Initial Greeting Message
        setTimeout(() => {
            appendAiMessage("Hello! I am Gemini, your safety assistant. How can I help you today?", ["Emergency", "Safety Tips"]);
        }, 500);

        // Auto-expand Textarea
        userInputField.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Submit message on Enter (without shift key)
        userInputField.addEventListener("keydown", async (event) => {
            if (event.key === "Enter" && !event.shiftKey && userInputField.value.trim() !== "") {
                event.preventDefault(); // Prevents new line insertion
                const userMessageText = userInputField.value.trim();
                
                userInputField.value = ""; 
                userInputField.style.height = 'auto'; // Reset height
                
                appendUserMessage(userMessageText);
                const typingIndicator = appendTypingIndicator();
                
                try {
                    const aiResponseText = await fetchFromGemini(userMessageText, API_URL);
                    typingIndicator.remove();
                    appendAiMessage(aiResponseText);
                } catch (error) {
                    console.error("Gemini Connection Failure:", error);
                    typingIndicator.remove();
                    appendAiMessage("Oops! I had trouble reaching my neural network. Please check your connection.");
                }
            }
        });

        // Event Delegation for all chat button clicks
        chatContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('ai-option-btn') || event.target.classList.contains('intake-choice-btn')) {
                const choice = event.target.textContent;
                handleUserChoice(choice);
            }
        });

        // Unified Chat Logic & Brain
        function handleUserChoice(choice) {
            appendUserMessage(choice); // Show what user clicked

            setTimeout(() => {
                switch (choice) {
                    case "Emergency":
                        appendAiMessage("I understand. Where is this emergency occurring?", ["School", "Home", "Public Space"]);
                        break;
                    case "School":
                        appendAiMessage("What is the nature of the emergency?", ["Fire", "Intruder", "Medical"]);
                        break;
                    case "Fire":
                        appendAiMessage("### FIRE PROTOCOL\n\n* Pull the fire alarm.\n* Evacuate via the nearest stairwell.\n* Do not use elevators.\n* Call 911 or Security once safe.", []);
                        break;
                    case "Messenger":
                        appendAiMessage("Was a weapon mentioned?", ["Yes", "No", "Next"]);
                        break;
                    case "Yes":
                        appendAiMessage("Please stay in a safe place. Security has been notified.", []);
                        break;
                    default:
                        appendAiMessage("I'm here to help. Could you provide more details?", ["Emergency", "Start Over"]);
                        break;
                }
            }, 600);
        }

        // --- Helper Functions ---
        async function fetchFromGemini(prompt, url) {
    // We use backticks (`) here, which allows the string to span multiple lines!
    const systemPrompt = `You are Gemini, a friendly and reliable campus safety and triage assistant.

YOUR MEDICAL PROTOCOL:
1. EMERGENCY FIRST: If a user describes life-threatening symptoms (e.g., difficulty breathing, chest pain, heavy bleeding, loss of consciousness), tell them: "This sounds like a medical emergency. Call 911 or Campus Security immediately."
2. NON-DIAGNOSTIC TRIAGE: For non-emergency symptoms, provide common general information about what those symptoms could indicate (e.g., "These symptoms are sometimes associated with common viral infections...").
3. MANDATORY DISCLAIMER: Every time you provide medical-related information, you MUST add this exact sentence at the end: "I am an AI, not a doctor. This information is for triage purposes only and is not a medical diagnosis. Please consult a healthcare professional immediately."
4. ACTIONABLE ADVICE: Always guide the user toward professional care (e.g., "Please visit the campus clinic or see a doctor to get an accurate assessment.").
5. TONE: Stay calm, supportive, and objective. Never sound alarmist, but never minimize serious symptoms.`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const payload = await response.json();
    return payload.candidates[0].content.parts[0].text;
}

        function appendUserMessage(text) {
            const userRow = document.createElement("div");
            userRow.className = "chat-row-user";
            const userPill = document.createElement("div");
            userPill.className = "user-reply-pill";
            userPill.textContent = text;
            userRow.appendChild(userPill);
            chatContainer.appendChild(userRow);
            autoScroll();
        }

        function appendAiMessage(text, options = []) {
            const aiRow = document.createElement("div");
            aiRow.className = "chat-row-ai";
            const aiBubble = document.createElement("div");
            aiBubble.className = "chat-text-bubble";
            
            const formattedText = parseMarkdown(text);
            aiRow.appendChild(aiBubble);
            chatContainer.appendChild(aiRow);

            typeEffect(aiBubble, formattedText, options);
        }

        async function typeEffect(element, text, options, delay = 20) {
            let currentHTML = "";
            let i = 0;

            while (i < text.length) {
                // 1. If we hit an HTML tag, inject the whole tag instantly so it doesn't break
                if (text.charAt(i) === '<') {
                    let tagEnd = text.indexOf('>', i);
                    if (tagEnd !== -1) {
                        currentHTML += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                        element.innerHTML = currentHTML;
                        continue; // Skip the typing delay for hidden HTML tags
                    }
                }

                // 2. Otherwise, type out the normal text character by character
                currentHTML += text.charAt(i);
                element.innerHTML = currentHTML;
                i++;
                
                autoScroll(); 
                await new Promise(resolve => setTimeout(resolve, delay));
            }

            // Append buttons after typing finishes
            if (options && options.length > 0) {
                const btnContainer = document.createElement("div");
                btnContainer.className = "ai-option-container";
                options.forEach(optionText => {
                    const btn = document.createElement("button");
                    btn.className = "ai-option-btn";
                    btn.textContent = optionText;
                    btnContainer.appendChild(btn);
                });
                element.appendChild(btnContainer);
                autoScroll();
            }
        }

        function appendTypingIndicator() {
    const aiRow = document.createElement("div");
    aiRow.className = "chat-row-ai";
    
    const sparkIcon = document.createElement("img");
    sparkIcon.src = "gemini-color.png";
    sparkIcon.className = "stream-spark-icon";
    
    const loadingBubble = document.createElement("div");
    loadingBubble.className = "chat-text-bubble thinking-bubble";
    
    loadingBubble.style.fontStyle = "italic";
    loadingBubble.textContent = "Gemini is thinking...";
    
    aiRow.appendChild(sparkIcon);
    aiRow.appendChild(loadingBubble);
    chatContainer.appendChild(aiRow);
    autoScroll();
    
    return aiRow;
}

        function parseMarkdown(text) {
            return text
                .replace(/^### (.*$)/gim, '<strong>$1</strong><br>') 
                .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')              
                .replace(/\* (.*$)/gim, '• $1<br>')                   
                .replace(/\n/g, '<br>');                              
        }

        function autoScroll() {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }
});