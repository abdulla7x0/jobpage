/**
 * Traffic Arbitration Jobs Landing Page Controller
 * ------------------------------------------------
 * Easily customize the target offer link, duration, and questions below.
 */

// ===================== CONFIGURATION ===================== //
// 1. Enter your main target website / offer / affiliate URL here:
const DEFAULT_TARGET_URL = "https://job24dev.pages.dev/";

// 1.1 Upload CV / Resume specific target offer URL:
const UPLOAD_CV_TARGET_URL = "https://wwpa.giriuker.com/redirect-zone/b960d9aa";

// 2. Step delay in milliseconds (3000ms = 3 seconds)
const STEP_DELAY_MS = 3000;

// 3. Status messages shown during each 3-second transition
const LOADING_MESSAGES = {
  afterQualification: {
    title: "Checking Educational Match...",
    subtitle: "Filtering thousands of employer requirements for your qualification..."
  },
  afterExperience: {
    title: "Verifying Work Experience...",
    subtitle: "Matching current openings, work-from-home roles, and immediate onboarding slots..."
  },
  afterSalary: {
    title: "Generating Verified Job Matches...",
    subtitle: "Locking in top compensation packages and preparing your direct application links..."
  }
};
// ========================================================== //

// State management
const userSelections = {
  qualification: null,
  experience: null,
  salary: null
};

// DOM Elements
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const stepFinal = document.getElementById("stepFinal");
const loadingState = document.getElementById("loadingState");
const progressContainer = document.getElementById("progressContainer");

const progressBar = document.getElementById("progressBar");
const stepBadge = document.getElementById("stepBadge");
const progressPercent = document.getElementById("progressPercent");

const loaderTitle = document.getElementById("loaderTitle");
const loaderSubtitle = document.getElementById("loaderSubtitle");
const loaderProgressBar = document.getElementById("loaderProgressBar");
const loaderCountDown = document.getElementById("loaderCountDown");

const mainCtaButton = document.getElementById("mainCtaButton");
const uploadCtaButton = document.getElementById("uploadCtaButton");
const timerDisplay = document.getElementById("timerDisplay");
const liveUserCount = document.getElementById("liveUserCount");
const toastNotification = document.getElementById("toastNotification");
const toastText = document.getElementById("toastText");
const matchedCount = document.getElementById("matchedCount");

/**
 * Builds the final URL with all incoming UTM and tracking parameters forwarded.
 * This is crucial for affiliate & traffic arbitrage tracking.
 */
function getFinalOfferUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const customDest = urlParams.get("dest") || urlParams.get("target") || DEFAULT_TARGET_URL;
  
  try {
    const finalUrl = new URL(customDest);
    urlParams.forEach((value, key) => {
      if (key !== "dest" && key !== "target") {
        finalUrl.searchParams.set(key, value);
      }
    });

    if (userSelections.qualification) finalUrl.searchParams.set("edu", userSelections.qualification);
    if (userSelections.experience) finalUrl.searchParams.set("exp", userSelections.experience);
    if (userSelections.salary) finalUrl.searchParams.set("sal", userSelections.salary);

    return finalUrl.toString();
  } catch (e) {
    return customDest;
  }
}

/**
 * Builds the Upload CV URL with forwarded UTM parameters.
 */
function getUploadCvUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const customDest = urlParams.get("cv_dest") || UPLOAD_CV_TARGET_URL;
  
  try {
    const finalUrl = new URL(customDest);
    urlParams.forEach((value, key) => {
      if (key !== "cv_dest" && key !== "dest" && key !== "target") {
        finalUrl.searchParams.set(key, value);
      }
    });

    if (userSelections.qualification) finalUrl.searchParams.set("edu", userSelections.qualification);
    if (userSelections.experience) finalUrl.searchParams.set("exp", userSelections.experience);
    if (userSelections.salary) finalUrl.searchParams.set("sal", userSelections.salary);

    return finalUrl.toString();
  } catch (e) {
    return customDest;
  }
}

/**
 * Switch active step card
 */
function hideAllCards() {
  step1.classList.add("hidden");
  step1.classList.remove("active");
  step2.classList.add("hidden");
  step2.classList.remove("active");
  step3.classList.add("hidden");
  step3.classList.remove("active");
  loadingState.classList.add("hidden");
  loadingState.classList.remove("active");
  stepFinal.classList.add("hidden");
  stepFinal.classList.remove("active");
}

function showCard(element) {
  hideAllCards();
  element.classList.remove("hidden");
  element.classList.add("active");
}

/**
 * Executes a 3-second animated loading phase before moving to the next view
 */
function run3SecondLoader(messages, onComplete) {
  // Update loader texts
  loaderTitle.textContent = messages.title;
  loaderSubtitle.textContent = messages.subtitle;
  
  // Reset loader progress bar
  loaderProgressBar.style.transition = 'none';
  loaderProgressBar.style.width = '0%';
  loaderCountDown.textContent = '3s';

  showCard(loadingState);

  // Trigger progress bar transition after short layout tick
  requestAnimationFrame(() => {
    loaderProgressBar.style.transition = `width ${STEP_DELAY_MS}ms linear`;
    loaderProgressBar.style.width = '100%';
  });

  // Countdown timer from 3s -> 1s
  let secondsRemaining = 3;
  const interval = setInterval(() => {
    secondsRemaining--;
    if (secondsRemaining > 0) {
      loaderCountDown.textContent = `${secondsRemaining}s`;
    } else {
      loaderCountDown.textContent = `Done!`;
      clearInterval(interval);
    }
  }, 1000);

  // Complete after STEP_DELAY_MS (3000ms)
  setTimeout(() => {
    clearInterval(interval);
    onComplete();
  }, STEP_DELAY_MS);
}

// ----------------------------------------------------
// EVENT HANDLERS
// ----------------------------------------------------

// Step 1: Qualification Clicked
step1.querySelectorAll(".option-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    userSelections.qualification = btn.getAttribute("data-value");

    // Update Progress Indicator
    progressBar.style.width = "66%";
    stepBadge.textContent = "Step 2 of 3";
    progressPercent.textContent = "66% Completed";

    // 3-Second Wait
    run3SecondLoader(LOADING_MESSAGES.afterQualification, () => {
      showCard(step2);
    });
  });
});

// Step 2: Experience Clicked
step2.querySelectorAll(".option-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    userSelections.experience = btn.getAttribute("data-value");

    // Update Progress Indicator
    progressBar.style.width = "95%";
    stepBadge.textContent = "Step 3 of 3";
    progressPercent.textContent = "95% Completed";

    // 3-Second Wait
    run3SecondLoader(LOADING_MESSAGES.afterExperience, () => {
      showCard(step3);
    });
  });
});

// Step 3: Salary Clicked
step3.querySelectorAll(".option-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    userSelections.salary = btn.getAttribute("data-value");

    // Randomize matched job count slightly for realism (between 18 and 32)
    const randomMatches = Math.floor(Math.random() * 15) + 18;
    if (matchedCount) matchedCount.textContent = randomMatches;

    // 3-Second Wait before showing final page
    run3SecondLoader(LOADING_MESSAGES.afterSalary, () => {
      progressContainer.classList.add("hidden"); // hide step progress on results
      
      // Update destination links on the CTAs
      const targetUrl = getFinalOfferUrl();
      const uploadCvUrl = getUploadCvUrl();
      if (mainCtaButton) mainCtaButton.href = targetUrl;
      if (uploadCtaButton) uploadCtaButton.href = uploadCvUrl;

      showCard(stepFinal);
      startCountdown(5 * 60); // 5 minutes countdown
    });
  });
});

// ----------------------------------------------------
// URGENCY COUNTDOWN TIMER (5 minutes)
// ----------------------------------------------------
function startCountdown(durationInSeconds) {
  let timer = durationInSeconds;
  const countdownInterval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    if (timerDisplay) {
      timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }

    if (--timer < 0) {
      clearInterval(countdownInterval);
      if (timerDisplay) timerDisplay.textContent = "00:00";
    }
  }, 1000);
}

// ----------------------------------------------------
// SOCIAL PROOF & LIVE ACTIVITY SIMULATION
// ----------------------------------------------------
function initSocialProof() {
  // Fluctuate live active user counter slightly
  if (liveUserCount) {
    setInterval(() => {
      const current = parseInt(liveUserCount.textContent.replace(/,/g, ""), 10) || 1840;
      const variation = Math.floor(Math.random() * 9) - 4; // -4 to +4
      const nextVal = Math.max(1200, current + variation);
      liveUserCount.textContent = nextVal.toLocaleString();
    }, 4000);
  }

  // Live Toast Notifications
  const sampleNames = ["Rahul S.", "Priya M.", "Amit K.", "Neha P.", "Vikram R.", "Ananya S.", "Rohan D.", "Sneha G."];
  const sampleLocations = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Noida", "Gurgaon"];
  const sampleSalaries = ["₹35,000/mo", "₹50,000/mo", "₹65,000/mo", "₹85,000/mo", "₹1,20,000/mo"];
  const sampleRoles = ["Work From Home Specialist", "Data Operations", "Project Coordinator", "Customer Support Lead", "Operations Analyst", "Back-office Executive"];

  if (toastNotification && toastText) {
    setInterval(() => {
      const name = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      const loc = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
      const salary = sampleSalaries[Math.floor(Math.random() * sampleSalaries.length)];
      const role = sampleRoles[Math.floor(Math.random() * sampleRoles.length)];

      toastNotification.style.opacity = '0';
      toastNotification.style.transform = 'translateY(10px)';

      setTimeout(() => {
        toastText.textContent = `${name} from ${loc} matched with a ${salary} ${role} role`;
        toastNotification.style.opacity = '0.9';
        toastNotification.style.transform = 'translateY(0)';
      }, 300);
    }, 6000);
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initSocialProof();
});
