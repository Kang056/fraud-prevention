# Wireframe: Battle Interface (Extermination Mode)

**Target Device:** Mobile (Portrait Mode) - optimized for "scrollers".
**Visual Theme:** Cyberpunk / Glitch Art / Retro-Terminal.

---

## 1. HUD Layout (Heads-Up Display)
The screen simulates a high-tech tactical visor.

*   **Top Bar (Status):**
    *   [Top Left] `HP Bar`: Segmented green blocks. Glitches red when hit.
    *   [Top Right] `Credit`: ₿ 0000 (Animated counter).
    *   [Center] `Threat Level`: ★★★☆☆ (Flashing warning icon).
*   **Background:**
    *   Deep purple/black grid (Net grid) moving slowly in perspective (Retro-wave style).
    *   Occasional "Digital Rain" or "Bad Sector" artifacts overlay.

---

## 2. Phase A: The Encounter (Monster Appearance)

**Trigger:** Post-scanner "Red Alert".

*   **Center Screen (The Glitch Monster):**
    *   **Visual:** A pixelated, shifting silhouette initially. It stabilizes into the specific monster (e.g., "The Crying Son" - a grotesquely crying face made of phone icons and tear-emojis).
    *   **Animation:** Breathing effect + periodic RGB color splitting (Chromatic Aberration).
*   **Dialog Box (Monster Speech):**
    *   **Style:** Retro RPG text box at the bottom (Black bg, Green border).
    *   **Text:** Typewriter effect. Words like "Money", "Hurry", "Account" appear larger or in red.
    *   *Example:* "Dad! It's me! I'm in [TROUBLE]! Send [CASH] now!"

---

## 3. Phase B: Tactical Response (The Player's Turn)

**Trigger:** Monster finishes taunting. "YOUR TURN" flashes in neon cyan.

*   **The Deck (Bottom Area):**
    *   Three "Cards" slide up from the bottom.
    *   **Timer:** A shrinking bar above the cards (10s countdown).

### Card Designs:
*   **Card A [TRAP] (Left):**
    *   **Color:** Red border/glow.
    *   **Icon:** Panic face / Broken shield.
    *   **Text:** "Transfer Immediately" / "Give ID Number".
    *   **Visual Cue:** Looks "tempting" or "urgent" (maybe bigger font), testing player impulse.
*   **Card B [DEFENSE] (Center):**
    *   **Color:** Yellow/Orange border.
    *   **Icon:** Shield / Phone hangup.
    *   **Text:** "Hang Up" / "Ignore".
*   **Card C [CRITICAL] (Right):**
    *   **Color:** Neon Green/Cyber Blue border.
    *   **Icon:** Sword / magnifying glass / Brain.
    *   **Text:** "Video Call Me?" / "What's my name?" (Context-aware counter).

---

## 4. Phase C: Execution & Feedback

*   **Player Interaction:** Tap a card.
    *   **Input Feedback:** The card glows blindingly white, others darken.

*   **Outcomes:**
    *   **If TRAP (Fail):** Screen cracks (CSS effect). Visual "HACKED" overlay. HP drops to 0. Game Over screen with "You lost $30,000".
    *   **If DEFENSE (Draw):** Monster fades away with a "Tch..." sound. Shield icon appears. Text: "Safe... for now."
    *   **If CRITICAL (Win):**
        *   **Animation:** A laser beam or "Logic Bomb" shoots from the card to the monster.
        *   **Monster Reaction:** Monster sprite disintegrates into binary code (`010101`).
        *   **Text:** "CRITICAL HIT! SCAM DESTROYED."

---

## 5. Result Screen (The Loot)

*   **Visual:** "Mission Complete" stamp.
*   **Rewards:**
    *   `+ EXP` (Level up notification).
    *   `+ Bounty` (Gold coins sound).
    *   **The Card Drop:** The defeated monster wraps into a collectible card.
*   **Share Button (CTA):** "Share Kill" (Instagram/social icon).

---

## 6. Micro-Interactions & FX (Juice)
*   **Sound:** Heavy bass thud on selecting cards. High-pitch "ping" on safe scan.
*   **Haptics:** Phone vibrates on "Danger" alert and "Game Over".
*   **Glitch:** Random text characters in the UI change briefly (e.g., "Menu" -> "M3nu" -> "Menu").
