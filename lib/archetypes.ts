import { Archetype } from './scoring';

export interface ArchetypeData {
  name: string;
  tagline: string;
  emoji: string;
  color: string;
  colorBg: string;
  percentage: string;
  shortDescription: string;
  fullDescription: string;
  shareText: string;
}

export const archetypes: Record<Archetype, ArchetypeData> = {
  born_healer: {
    name: "The Born Healer",
    tagline: "You don't just understand people — you transform them.",
    emoji: "✦",
    color: "#C9A96E",
    colorBg: "from-amber-50 to-amber-100",
    percentage: "17%",
    shortDescription: "You have a rare and extraordinary gift. People open up to you in ways they don't with anyone else. You see beneath the surface of what people say to what's really going on — and you've been doing it your whole life.",
    fullDescription: "You've always been the person others come to. Friends pour their hearts out to you. Strangers open up to you within minutes. You absorb other people's pain and somehow help them see clearly.\n\nYou've probably been told \"you should be a therapist\" more times than you can count. The truth is — they're right. But not just any kind of therapist.\n\nYou have a rare gift for seeing the ROOT of what's holding someone back, not just the surface symptoms. While others see the anxiety, you see the little girl who was told she wasn't enough. While others hear the complaint about work, you hear the woman who's terrified of being seen.\n\nThis isn't a skill you learned. It's who you ARE. And it's time the world benefited from it — including you.",
    shareText: "I just found out I'm a Born Healer — only 17% of women have this gift. What were YOU actually born to do?",
  },
  quiet_powerhouse: {
    name: "The Quiet Powerhouse",
    tagline: "You have more power than you've ever allowed yourself to use.",
    emoji: "◆",
    color: "#4A2040",
    colorBg: "from-purple-50 to-purple-100",
    percentage: "27%",
    shortDescription: "You're brilliant, capable, and everyone around you knows it — except you. Somewhere along the way, you learned to shrink. To play small. To let others take the spotlight while you did the real work.",
    fullDescription: "You're brilliant, capable, and everyone around you knows it — except you. Somewhere along the way, you learned to shrink. To play small. To let others take the spotlight while you did the real work behind the scenes.\n\nYou're not lacking talent or intelligence. You're lacking permission. Permission to be seen. To take up space. To finally say: I am enough, exactly as I am.\n\nThe world doesn't need you to try harder. It doesn't need another version of you that's more polished, more qualified, more ready. It needs the you that already exists — unleashed.\n\nYour superpower isn't achieving despite your self-doubt. It's what you'll be capable of once you release it entirely.",
    shareText: "Turns out I'm a Quiet Powerhouse — I've been playing small my whole life. What were YOU actually born to do?",
  },
  freedom_chaser: {
    name: "The Freedom Chaser",
    tagline: "You weren't built for the 9-to-5. You were built for the life you keep dreaming about.",
    emoji: "❖",
    color: "#2D6A4F",
    colorBg: "from-emerald-50 to-emerald-100",
    percentage: "22%",
    shortDescription: "There's a version of your life that keeps showing up in your daydreams. The restlessness you feel isn't a flaw — it's your intuition screaming that you're capable of building something extraordinary on your own terms.",
    fullDescription: "There's a version of your life that keeps showing up in your daydreams. Maybe it's working for yourself. Maybe it's travelling while you earn. Maybe it's finally building something that's YOURS.\n\nYou're not lazy or ungrateful. You're a Freedom Chaser. Your soul is literally allergic to being boxed in.\n\nThe restlessness you feel isn't a flaw. It's your intuition screaming that you're capable of building something extraordinary on your own terms.\n\nYou don't need another job. You need a vehicle for your freedom. Something that lets you earn on YOUR terms, work from anywhere, and build a life that's genuinely yours — not a watered-down version of someone else's blueprint.",
    shareText: "I'm a Freedom Chaser — I was never built for the 9-to-5. What were YOU actually born to do?",
  },
  deep_feeler: {
    name: "The Deep Feeler",
    tagline: "Your sensitivity isn't your weakness. It's your superpower waiting to be unlocked.",
    emoji: "✧",
    color: "#D4A0A0",
    colorBg: "from-rose-50 to-rose-100",
    percentage: "23%",
    shortDescription: "You feel everything deeply — other people's moods, the energy in a room, the weight of the world. For years you've been told you're \"too sensitive.\" But your depth isn't a burden. It's a gift.",
    fullDescription: "You feel everything deeply. Other people's moods. The energy in a room. The weight of the world.\n\nFor years you've been told you're \"too sensitive\" or \"too emotional\" — so you've built walls, numbed out, or poured all your energy into taking care of everyone else.\n\nBut here's what 30 years of working with the subconscious mind has revealed: the people who feel the most are the people who are designed to heal the most. Your depth isn't a burden. It's a gift that the world desperately needs.\n\nWhat if the thing you've been trying to fix about yourself is actually the thing that makes you extraordinary? What if your sensitivity is the very thing that's been trying to guide you toward your purpose this whole time?",
    shareText: "I'm a Deep Feeler — my sensitivity is actually my superpower. What were YOU actually born to do?",
  },
  renaissance_soul: {
    name: "The Renaissance Soul",
    tagline: "You're not \"all over the place.\" You're a visionary who hasn't found their vehicle yet.",
    emoji: "✶",
    color: "#5B6ABF",
    colorBg: "from-indigo-50 to-indigo-100",
    percentage: "11%",
    shortDescription: "You've had more ideas, hobbies, interests, and \"phases\" than anyone you know. People call you scattered. But multi-passionate people aren't broken — they're visionaries looking for a vehicle big enough to hold ALL of who they are.",
    fullDescription: "You've had more ideas, hobbies, interests, and \"phases\" than anyone you know. You've started businesses, courses, creative projects — and left most of them half-finished.\n\nPeople call you scattered. You call yourself a failure-to-launch.\n\nBut here's what working with thousands of high-achievers has revealed: multi-passionate people aren't broken. They're visionaries looking for a vehicle big enough to hold ALL of who they are.\n\nYou don't need to \"pick one thing.\" You need one thing that lets you use EVERYTHING — your curiosity, your emotional intelligence, your ability to see connections others miss, your drive to keep learning and growing.\n\nThe Renaissance Soul is the rarest type — only 11% of women who take this assessment share it. You're not scattered. You're searching for something worthy of your complexity.",
    shareText: "I'm a Renaissance Soul — the rarest type at only 11%. What were YOU actually born to do?",
  },
};
