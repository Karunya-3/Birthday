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
    introHeroPhoto: "/images/photo1.jpg"
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
        title: "Chronological Fraud",
        detail: "Saying 'I'll be ready in 5 minutes' while still lying in bed on TikTok.",
        photo: "/images/photo2.jpg",
        caption: "Snack theft probability: 100%"
      },
      {
        title: "Decibel Decisive Victory",
        detail: "Winning arguments purely by speaking at 300 words per minute until everyone surrenders.",
        photo: "/images/photo3.jpg",
        caption: "Peak chaos achieved here."
      },
      {
        title: "Unsolicited Reel Spam",
        detail: "Sending 47 Instagram reels at 2:14 AM without a single word of context.",
        photo: "/images/photo5.jpg",
        caption: "Pretending to be normal for 5 seconds."
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
        url: "/images/photo1.jpg",
        title: "Golden Hour Chaos",
        caption: "One of my favorite days.",
        story: "We spent 20 minutes trying to take a cool photo, only to burst out laughing. Unfiltered core memory."
      },
      {
        id: "mem-2",
        url: "/images/photo4.jpg",
        title: "Fairy Lights & Smiles",
        caption: "She actually looks innocent here.",
        story: "A rare moment of pure peace when we weren't actively fighting over food or directions."
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
      { text: "remember this?", image: "/images/photo1.jpg" },
      { text: "and this?", image: "/images/photo2.jpg" },
      { text: "okay this one was embarrassing", image: "/images/photo3.jpg" },
      { text: "I still can't believe we did this.", image: "/images/photo4.jpg" },
      { text: "time really flies...", image: "/images/photo5.jpg" }
    ],
    silencePhoto: "/images/photo4.jpg",
    silenceCaption: "Some memories stay forever."
  },

  // ---------------------------------------------------------------------------
  // 7. STEP 6: "AND THERE'S SOMETHING ELSE..." (THE GAME / QUESTION)
  // ---------------------------------------------------------------------------
  somethingElse: {
    header: "And there's something else...",
    question: "LET'S SETTLE SOMETHING ONCE AND FOR ALL.",
    subQuestion: "Who is actually Mom's favorite child?",
    options: [
      {
        label: "A",
        text: "Me (Keertana), obviously!",
        verdict: "Delusional. We both know the truth, but nice try."
      },
      {
        label: "B",
        text: "You (Your brother), unfortunately...",
        verdict: "Correct recognition of reality! Logged into public record."
      },
      {
        label: "C",
        text: "Whoever cleaned their room last",
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
