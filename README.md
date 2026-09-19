# SevaSaathi — Universal AI Browser Assistant

> **"Tell me what you want to do. I'll help you do it."**

SevaSaathi is a web application designed to help ordinary users understand and navigate the internet with on-screen visual spotlights, step-by-step guidance, plain-language explanations, and strict safety guardrails.

---

## 🛡️ Agentic Threat Modeling & Security Summary

| Threat Zone | Identified Risks | Countermeasures & Guardrails |
| :--- | :--- | :--- |
| **Input Surfaces** | Malicious prompts, XSS injection via webpage text, unauthorized script payloads | Strict schema validation, sanitization of input strings, escaping of all rendered prompt text. |
| **Planning & Guidance** | System instruction bypass, unauthorized automatic actions, credential harvesting | **Zero-Credential Guarantee**: AI NEVER requests, inspects, or processes passwords, OTPs, PINs, or CVVs. Clear step-by-step user review. |
| **Tool Execution** | Unchecked transaction execution, state tampering | Explicit confirmation dialogs before any financial, reservation, or destructive action. User retains 100% control. |
| **Memory & State** | Cross-user session leakage, unvalidated task history | Local isolation of session state, sanitization of sensitive values, owner-bound task audit trails. |
| **Inter-System Comms** | API key leakage, token exposure | Server-side API proxies, zero client-side private secrets. |

---

## 🌟 Key Features

1. **Visual Spotlight Technology ("Show, Don't Just Tell")**:
   - Puts a glowing, animated spotlight indicator on the exact button or form control to click next.
   - Replaces walls of text with intuitive visual guidance.

2. **One Thing at a Time**:
   - Breaks complex web workflows (bills, train reservations, government certificates, product returns) into bite-sized, sequential instructions.

3. **Zero-Credential Guarantee**:
   - Built to uphold user trust: SevaSaathi will never ask for passwords, SMS OTPs, ATM PINs, or credit card CVVs.

4. **Multi-Domain Simulated Scenarios**:
   - ⚡ **PowerGrid Energy**: View bill tariffs, select UPI/QR payment, authorize transaction, download receipt.
   - 🏦 **Apex National Bank**: View statements, choose 3-month date range, export official PDF statement.
   - 🚆 **RailWay Express**: Route search, check live seat availability, select Rajdhani 2A berth, confirm reservation.
   - 🛒 **SwiftCart Store**: Locate order, choose return reason, schedule free home courier pickup.
   - 🏛 **GovPortal Citizen Services**: Retrieve and download digitally signed birth & residence certificates.

5. **Accessibility & Usability**:
   - Spoken voice readout via Web Speech API (`SpeechSynthesis`).
   - High Contrast Mode toggle.
   - Large text readability mode.
   - Reduced motion toggle for sensitive users.
   - Comprehensive audit timeline recording all actions with verified timestamps.

---

## 🚀 Google Cloud Run Deployment Guide

### Prerequisites
- Google Cloud SDK (`gcloud` CLI installed and authenticated)
- A Google Cloud Project with Cloud Run and Secret Manager enabled

```bash
# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable required Google Cloud APIs
gcloud services enable run.googleapis.com secretmanager.googleapis.com
```

### Deploy to Cloud Run
```bash
# Build and deploy the containerized service
gcloud run deploy sevasaathi \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --update-labels=dev-tutorial=cloud-run-ai-challenge
```

---

## 🧪 Functional Walkthrough & Test Script

1. **Landing Page Navigation**:
   - Open `/` → Verify hero headline, browser spotlight preview card, and feature cards.
   - Click **"See how it works"** → Navigates to `/demo`.

2. **Electricity Bill Flow (Demo Page)**:
   - On `/demo`, click **"Pay Bill Now"** (highlighted with amber pulse ring).
   - In Step 2, click **"Instant UPI"** card.
   - In Step 3, click **"Authorize & Pay ₹2,450"** → Confirmation modal opens.
   - Click **"Confirm & Pay"** → Success receipt appears with confetti celebration.
   - Click **"Download Receipt (PDF)"** → Step 4 completes.

3. **Banking Statement Flow**:
   - Switch scenario tab to **"Download Bank Statement"**.
   - Click spotlighted **"Statements & Reports"** tab.
   - Select **"Last 3 Months (Q3)"** option.
   - Click **"Download PDF Statement"** → Success notification pops up.

4. **Assistant Input & Voice Search**:
   - Navigate to `/app`. Type `"Help me book a train ticket"`.
   - Press Enter or click the arrow → Automatically loads Railway Express booking simulator with step 1 highlighted.

5. **Audit History Review**:
   - Navigate to `/app/tasks`.
   - Click on past tasks (Electricity bill, Bank statement, Train reservation) to inspect step timeline and audit event timestamps.
