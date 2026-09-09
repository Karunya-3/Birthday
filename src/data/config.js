/**
 * ==============================================================================
 * CONVERSATIONAL SIBLING EXPERIENCE CONFIGURATION & DATA FILE
 * ==============================================================================
 */

export const siteConfig = {
  // ---------------------------------------------------------------------------
  // 1. NAMES & ROLES
  // ---------------------------------------------------------------------------
  herName: "Keertana",
  nickname: "Keeru",
  sisterTitle: "AKKAAAAA",
  brotherName: "Nani",

  // ---------------------------------------------------------------------------
  // 2. STEP 1: OPENING CELEBRATION (PREVIOUS MINIMAL OPENING)
  // ---------------------------------------------------------------------------
  opening: {
    titleWords: ["HAPPY", "BIRTHDAY"],
    targetName: "Keeru",
    subtextLine1: "Today is technically your day.",
    subtextLine2: "So I made you something.",
    startButtonText: "START",
    introHeroPhoto: "/images/photo1.jpeg"
  },

  // ---------------------------------------------------------------------------
  // 3. STEP 2: WE NEED TO TALK (THE PIVOT)
  // ---------------------------------------------------------------------------
  weNeedToTalk: {
    mainHeader: "WE NEED TO TALK.",
    line1: "Don't worry. Nothing bad happened.",
    line2: "I just realized there are a few things I've never properly told you.",
    buttonText: "OKAY... WHAT IS IT?"
  },

  // ---------------------------------------------------------------------------
  // 4. STEP 3: "FIRST OF ALL..." (ANNNOYING SISTER CONFESSION + MEMORIES)
  // ---------------------------------------------------------------------------
  firstOfAll: {
    header: "First of all...",
    quote: "You're genuinely one of the most annoying people I know.",
    subtext: "Here is the indisputable evidence on public record:",
    annoyingHabits: [
      {
        title: "Pink Saree Protocol",
        detail: "She sat on that sofa like a chief guest and waited for the photographer to notice her.",
        photo: "/images/photo2.jpeg",
        caption: "She served elegant energy in pink saree and ate the whole look up.",
        objectPosition: "center"
      },
      {
        title: "OG Duo Origin Story",
        detail: "The elder one was in full angry mode, the younger one thought it was a fashion show.",
        photo: "/images/photo3.jpeg",
        caption: "They had no idea they'd be taking the same pose 20 years later.",
        objectPosition: "center"
      },
      {
        title: "The Full House Final Boss",
        detail: "They tried to get one normal family selfie where everyone looks at the camera.",
        photo: "/images/photo5.jpeg",
        caption: "They got chaos, snacks on the table, and everyone half-cropped.",
        objectPosition: "center"
      }
    ],
    nextButton: "BUT..."
  },

  // ---------------------------------------------------------------------------
  // 5. STEP 4: "BUT..." (THE APPRECIATION & PROOF)
  // ---------------------------------------------------------------------------
  butSection: {
    header: "But...",
    quote: "You're also the person I can always count on.",
    subtext: "No matter how much we argue, some memories mean everything to me:",
    memories: [
      {
        id: "mem-1",
        url: "/images/photo1.jpeg",
        title: "Farewell Stage Fiasco",
        caption: "She decided to do a full dramatic dance pose",
        story: "She was the main character and the whole batch still remembers it."
      },
      {
        id: "mem-2",
        url: "/images/photo4.jpeg",
        title: "Sibling Hostage Situation",
        caption: "She said it was a cute sibling photo, but he was not agreeing to it.",
        story: "He was suffering with that fake smile, she was thriving. Classic big-sis energy."
      }
    ],
    nextButton: "AND THERE'S SOMETHING ELSE..."
  },

  // ---------------------------------------------------------------------------
  // 6. STEP 5: UNEXPECTED RAPID PHOTO FLASHBACK
  // ---------------------------------------------------------------------------
  unexpected: {
    triggerText: "I almost forgot something.",
    buttonText: "WAIT... WHAT?",
    rapidMemories: [
      { text: "Farewell Stage Fiasco", image: "/images/photo1.jpeg" },
      { text: "Pink Saree Protocol", image: "/images/photo2.jpeg" },
      { text: "OG Duo Origin Story", image: "/images/photo3.jpeg" },
      { text: "Sibling Hostage Situation", image: "/images/photo4.jpeg" },
      { text: "The Full House Final Boss", image: "/images/photo5.jpeg" },
      { text: "Night Out Selfie Supreme", image: "/images/photo6.jpeg" },
      { text: "Cycle Path Aesthetic", image: "/images/photo7.jpeg" },
      { text: "Temple Run But Make It Fashion", image: "/images/photo8.jpeg" }
    ],
    silencePhoto: "/images/photo7.jpeg",
    silenceCaption: "She borrowed a cycle to get a Pinterest-y photo with the pink flowers."
  },

  // ---------------------------------------------------------------------------
  // 7. STEP 6: "AND THERE'S SOMETHING ELSE..." (THE GAME / QUESTION)
  // ---------------------------------------------------------------------------
  somethingElse: {
    header: "And there's something else... FUN QUESTION",
    question: "LET'S SETTLE SOMETHING ONCE AND FOR ALL.",
    subQuestion: "When you say you need 5 min to get ready, how much time you actually take?",
    options: [
      {
        label: "A",
        text: "5min! Obviously!",
        verdict: "Delusional. We both know the truth, but nice try."
      },
      {
        label: "B",
        text: "20-30min",
        verdict: "Correct recognition of reality! Logged into public record."
      },
      {
        label: "C",
        text: "1 hour",
        verdict: "Conditional truth detected. Accurate assessment."
      }
    ],
    nextButton: "OKAY, LAST THING."
  },

  // ---------------------------------------------------------------------------
  // 7. STEP 6: "OKAY, LAST THING." (EMOTIONAL CONFESSION)
  // ---------------------------------------------------------------------------
  lastThing: {
    header: "Okay, last thing.",
    quote: "Out of all the people in the world...",
    confession: "I'm really glad I got you as my sister.",
    personalNote: `Dear Keeru,

Thank you for being my constant partner-in-crime, my favorite person to annoy, and the strongest pillar in our family.

No matter how loud we argue or how old we get, you'll always be my favorite sister. I hope this year brings you infinite laughter, success, and happiness!`,
    nextButton: "REVEAL FINAL WISH ❤️"
  },

  // ---------------------------------------------------------------------------
  // 8. STEP 7: "HAPPY BIRTHDAY, AKKAAAAA ❤️" (FINALE & REPLAY)
  // ---------------------------------------------------------------------------
  finale: {
    mainHeading: "HAPPY BIRTHDAY, AKKAAAAA ❤️",
    subtext: "That's the whole story.",
    replayButton: "EXPERIENCE IT AGAIN"
  }
};
