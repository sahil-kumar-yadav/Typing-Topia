/**
 * Typing-Topia - Main Application Script
 * A modern typing speed test application with theme support
 * @module TypingTopia
 */

// DOM Elements
const typingText = document.querySelector(".typing-text p"),
    inpField = document.getElementById("typing-input"),
    timeTag = document.getElementById("time-display"),
    mistakeTag = document.getElementById("mistake-display"),
    wpmTag = document.getElementById("wpm-display"),
    cpmTag = document.getElementById("cpm-display"),
    accuracyTag = document.getElementById("accuracy-display"),
    progressBar = document.getElementById("progress-bar"),
    tryAgainBtn = document.getElementById("restart-btn"),
    tryAgainBtn2 = document.getElementById("try-again-btn"),
    timeSelect = document.getElementById("time-select"),
    themeToggle = document.getElementById("theme-toggle"),
    themeIcon = document.querySelector(".theme-icon"),
    resultsModal = document.getElementById("results-modal"),
    modalClose = document.getElementById("modal-close"),
    modalWpm = document.getElementById("modal-wpm"),
    modalAccuracy = document.getElementById("modal-accuracy"),
    modalCpm = document.getElementById("modal-cpm"),
    modalMistakes = document.getElementById("modal-mistakes");

// Timer variables
let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = 0,
    mistakes = 0,
    isTyping = 0,
    correctChars = 0;

// High score storage
let highScore = localStorage.getItem('typingTopiaHighScore') || 0;

/**
 * Initialize theme from localStorage
 */
function initTheme() {
    const savedTheme = localStorage.getItem('typingTopiaTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('typingTopiaTheme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
}

/**
 * Update time duration based on selection
 */
function updateTimeDuration() {
    maxTime = parseInt(timeSelect.value);
    timeLeft = maxTime;
    timeTag.innerText = timeLeft;
    resetGame();
}

/**
 * Loads a random paragraph from the paragraphs array
 * and displays it with each character wrapped in a span element
 */
function randomParagraph() {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";

    paragraphs[randIndex].split("").forEach(character => {
        const spanTag = `<span>${character}</span>`;
        typingText.innerHTML += spanTag;
    });

    const spans = typingText.querySelectorAll("span");
    if (spans.length > 0) {
        spans[0].classList.add("active");
    }

    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

/**
 * Initializes the typing functionality
 * Handles character validation and updates stats
 */
function initTyping() {
    const characters = typingText.querySelectorAll("span");
    const typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                    correctChars = Math.max(0, correctChars - 1);
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }
        else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
                correctChars++;
            }
            else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        if (characters[charIndex]) {
            characters[charIndex].classList.add("active");
        }

        // Calculate stats
        const timeElapsed = maxTime - timeLeft;
        
        // WPM: (correct characters / 5) / time elapsed in minutes
        let wpm = timeElapsed > 0 
            ? Math.round(((correctChars / 5) / timeElapsed) * 60)
            : 0;
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        // Accuracy calculation
        const totalTyped = charIndex;
        const accuracy = totalTyped > 0 
            ? Math.round((correctChars / totalTyped) * 100) 
            : 100;

        // Update progress bar
        const progress = (charIndex / characters.length) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';

        // Update display
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = correctChars;
        accuracyTag.innerText = accuracy + '%';
        
        // Add pop animation to stats
        addPopAnimation(wpmTag);
        addPopAnimation(accuracyTag);
    }
    else {
        inpField.value = "";
        clearInterval(timer);
        isTyping = 0;
        showResults();
    }
}

/**
 * Add pop animation to element
 */
function addPopAnimation(element) {
    element.classList.add('pop');
    setTimeout(() => element.classList.remove('pop'), 300);
}

/**
 * Initializes and manages the countdown timer
 */
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        
        // Update progress bar based on time
        const timeProgress = ((maxTime - timeLeft) / maxTime) * 100;
        progressBar.style.width = Math.max(progressBar.offsetWidth / progressBar.parentElement.offsetWidth * 100, timeProgress) + '%';
        
        if (isTyping && charIndex > 0) {
            const timeElapsed = maxTime - timeLeft;
            let wpm = Math.round(((correctChars / 5) / timeElapsed) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            wpmTag.innerText = wpm;
        }
    }
    else {
        clearInterval(timer);
        isTyping = 0;
        inpField.value = "";
        showResults();
    }
}

/**
 * Display results in modal
 */
function showResults() {
    const wpm = parseInt(wpmTag.innerText);
    const accuracy = parseInt(accuracyTag.innerText);
    const cpm = parseInt(cpmTag.innerText);
    const mistakeCount = parseInt(mistakeTag.innerText);
    
    // Update modal values
    modalWpm.innerText = wpm;
    modalAccuracy.innerText = accuracy + '%';
    modalCpm.innerText = cpm;
    modalMistakes.innerText = mistakeCount;
    
    // Check for high score
    if (wpm > highScore) {
        highScore = wpm;
        localStorage.setItem('typingTopiaHighScore', highScore);
    }
    
    // Show modal
    resultsModal.classList.add('active');
}

/**
 * Hide results modal
 */
function hideResults() {
    resultsModal.classList.remove('active');
}

/**
 * Resets the game to initial state
 */
function resetGame() {
    clearInterval(timer);
    
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    correctChars = 0;
    isTyping = 0;

    timeTag.innerText = timeLeft;
    mistakeTag.innerText = 0;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    accuracyTag.innerText = '100%';
    progressBar.style.width = '0%';
    
    inpField.value = "";
    
    randomParagraph();
    inpField.focus();
    
    hideResults();
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(event) {
    // Enter to restart
    if (event.key === "Enter") {
        event.preventDefault();
        if (resultsModal.classList.contains('active')) {
            resetGame();
        } else if (!isTyping || timeLeft === 0) {
            resetGame();
        }
    }
    // Escape to restart anytime
    if (event.key === "Escape") {
        resetGame();
    }
}

// Initialize the game on page load
document.addEventListener("DOMContentLoaded", () => {
    randomParagraph();
    initTheme();
    inpField.focus();
});

// Event Listeners
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
tryAgainBtn2.addEventListener("click", resetGame);
timeSelect.addEventListener("change", updateTimeDuration);
themeToggle.addEventListener("click", toggleTheme);
modalClose.addEventListener("click", resetGame);
document.addEventListener("keydown", handleKeyboardShortcuts);

// Prevent form submission on Enter
inpField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

// Close modal when clicking outside
resultsModal.addEventListener("click", (e) => {
    if (e.target === resultsModal) {
        resetGame();
    }
});

