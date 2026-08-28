# High-Converting Jobs Traffic Arbitrage Landing Page

A fast, mobile-optimized quiz/survey funnel landing page built specifically for job traffic arbitration, affiliate marketing, and CPA/CPL campaigns.

---

## 🚀 Features & Funnel Flow

1. **Step 1 (Qualification)**: User selects their educational background.
2. **3-Second Animated Loader**: Displays scanning animation ("Checking Educational Match...") with a 3-second animated progress bar and countdown.
3. **Step 2 (Experience)**: User selects their work experience level.
4. **3-Second Animated Loader**: Displays scanning animation ("Verifying Career Experience...").
5. **Step 3 (Salary)**: User selects their expected compensation range.
6. **3-Second Animated Loader**: Displays scanning animation ("Generating Verified Job Matches...").
7. **Final Results & CTA**:
   - Displays congratulations card with randomized job match count (e.g. *24 Open Positions Found*).
   - High-converting glowing CTA button linking to your target job/offer website.
   - 5-Minute urgency countdown timer.
   - **UTM & Tracking Pass-Through**: Automatically passes all incoming UTM parameters (`utm_source`, `utm_campaign`, `click_id`, `subid`, etc.) plus user answers directly to your final offer URL.

---

## ⚙️ How to Change the Target Website Link

Open [`script.js`](file:///home/abdullax080/jbpg/script.js) and update line 9:

```javascript
// Target affiliate / offer URL:
const DEFAULT_TARGET_URL = "https://job24dev.pages.dev/";
```

### Dynamic URL Override Support
You can also override the destination URL dynamically directly via query parameters:
```
https://your-landing-page.com/?dest=https://custom-offer-link.com&utm_source=facebook&click_id=12345
```

---

## 📁 File Structure

```
.
├── index.html       # Main HTML landing page structure
├── style.css        # Responsive styling & button shimmer animations
├── script.js        # 3-second step controller, timer, UTM forwarder
└── README.md        # Documentation & setup guide
```

---

## 🌐 How to Preview & Test Locally

You can run any local static HTTP server (e.g., Python):

```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.
