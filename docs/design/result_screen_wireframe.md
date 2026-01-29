# Wireframe: Result Screen (The Loot)

**Context:** Appears after `BattleScreen` ends.
**Goal:** Reward the player and encourage sharing (Growth Loop).

## 1. Visual Layout (Card Style)
The screen resembles a "Gacha Reveal" or "Trading Card" opening.

*   **Header:**
    *   **Victory:** "SCAM NEUTRALIZED" (Neon Green)
    *   **Defeat:** "YOU GOT SCAMMED" (Glitch Red)
    *   **Draw:** "TARGET ESCAPED" (Yellow)

*   **The Card (Center Stage):**
    *   A rotating 3D-style card (CSS transform).
    *   **Front:** Monster Image, Name, "DECEASED" stamp (if victory).
    *   **Stats:**
        *   Risk Level: ★★★★★
        *   Bounty: +50 ₿
        *   XP: +100

*   **Analysis (The Educational Part):**
    *   "Weakness Exposed": Brief text explaining *why* the critical hit worked (e.g., "Deepfake video calls cannot replicate complex hand movements").

## 2. Actions (Footer)
*   **Primary Button (Share):** "📸 Share Incident Report" (Generates an image).
*   **Secondary Button:** "🔍 Scan Next Target".

## 3. FX
*   **Victory:** Confetti or "Digital Coins" raining down.
*   **Defeat:** Screen cracks.
