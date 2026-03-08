import { Archetype } from './scoring';

export interface ArchetypeData {
  name: string;
  tagline: string;
  emoji: string;
  color: string;
  colorBg: string;
  percentage: string;
  bornToDo: string;        // what they were born to do — how they show up, not a job title
  howYouHelp: string;      // how they naturally help and impact people
  howToStepIn: string;     // what stepping into this looks like in daily life
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
    bornToDo: "You were born to hold space for people in a way that very few can. When someone is lost, overwhelmed, or stuck in a pattern they can't see — you're the person who can sit with them, see what's really going on beneath the surface, and help them find their way back to themselves. This isn't something you learned. It's something you've always done — with friends, with family, with strangers who open up to you within minutes.",
    howYouHelp: "You help people by seeing what they can't see in themselves. Where others hear a complaint about work, you hear someone who's terrified of being seen. Where others see anxiety, you see a child who was told they weren't enough. You have an extraordinary ability to connect the dots between someone's past and their present — and to help them understand why they feel the way they do. People don't just feel heard around you. They feel understood at a level they didn't know was possible.",
    howToStepIn: "Stepping into this means trusting that this gift is real — and that it deserves to be used, not just given away for free over coffee. It means learning how to channel this natural ability into something structured and powerful. Whether that's through formal training, coaching, mentoring, or simply showing up differently in every relationship you have — this is how you were designed to move through the world.",
    shortDescription: "You have a rare and extraordinary gift. People open up to you in ways they don't with anyone else. You see beneath the surface of what people say to what's really going on — and you've been doing it your whole life.",
    fullDescription: "You've always been the person others come to. Friends pour their hearts out to you. Strangers open up to you within minutes. You absorb other people's pain and somehow help them see clearly.\n\nYou've probably been told \"you should be a therapist\" more times than you can count. The truth is — they're right. But not just any kind of therapist.\n\nYou have a rare gift for seeing the ROOT of what's holding someone back, not just the surface symptoms. While others see the anxiety, you see the child who was told they weren't enough. While others hear the complaint about work, you hear someone who's terrified of being seen.\n\nThis isn't a skill you learned. It's who you ARE. And it's time the world benefited from it — including you.",
    shareText: "I just found out I'm a Born Healer — only 17% of people have this gift. What were YOU actually born to do?",
  },
  quiet_powerhouse: {
    name: "The Quiet Powerhouse",
    tagline: "You have more power than you've ever allowed yourself to use.",
    emoji: "◆",
    color: "#4A2040",
    colorBg: "from-purple-50 to-purple-100",
    percentage: "27%",
    bornToDo: "You were born to lead — not with noise, but with depth. You show up for people by being the one who actually gets things done, who sees what needs to happen when everyone else is talking in circles. Your power isn't loud. It's the quiet kind that moves mountains while nobody's watching. The problem isn't that you lack ability. It's that somewhere along the way, you learned to make yourself smaller than you are.",
    howYouHelp: "You help people by being the steady, capable force they can lean on. You're the one who holds it together when things fall apart. The one who sees the solution when everyone else sees the problem. You lead through competence, not performance — and the people around you trust you more than you trust yourself. Your impact isn't flashy, but it's deep. When you show up fully, you change the energy of every room you walk into.",
    howToStepIn: "Stepping into this means giving yourself permission to be visible. To stop waiting until you feel 'ready' or 'qualified enough.' It means speaking up in the meeting, taking the lead on the project, charging what you're worth, and letting people see the full version of you — not the dimmed-down one you've been showing the world. You don't need to become someone new. You just need to stop hiding who you already are.",
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
    bornToDo: "You were born to show people that there's another way to live. Not by preaching it — by building it. The restlessness you feel isn't a flaw. It's your soul telling you that the conventional path was never designed for someone like you. You show up best in the world when you're free — free to create, free to move, free to design your days around what matters to you. And when you live that way, you unconsciously give everyone around you permission to want more too.",
    howYouHelp: "You help people by being proof that it's possible. You challenge the assumptions everyone else accepts without questioning — that you have to trade your time for money, that security means a salary, that 'responsible' means staying in something that drains you. Your energy is contagious. When you're in your element, you inspire the people around you to question their own cages. You also help through action — you're the one who actually builds the thing, takes the leap, and figures it out along the way.",
    howToStepIn: "Stepping into this means trusting the restlessness instead of medicating it. It means building something — a business, a practice, a creative life — that gives you the autonomy you crave. Not recklessly. Deliberately. The life you keep daydreaming about isn't fantasy. It's a blueprint. The only thing stopping you from building it is the belief that you don't deserve it.",
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
    bornToDo: "You were born to bring depth to a world that keeps skimming the surface. You feel things that other people miss — the unspoken tension in a room, the sadness behind someone's smile, the real reason a friend keeps cancelling plans. This depth isn't a burden, even though it's been treated like one your whole life. It's the very thing that allows you to connect with people at a level that most never experience. You were born to show people what it looks like to feel fully — and to prove that vulnerability is strength.",
    howYouHelp: "You help people by making them feel safe enough to be real. In a world of small talk and surface-level connections, you create space for truth. People tell you things they've never told anyone. They cry in front of you and feel better, not embarrassed. You have an intuitive sense of what someone needs — sometimes before they know it themselves. Your emotional intelligence isn't just a personality trait. It's a gift that, when channelled properly, can genuinely transform the people around you.",
    howToStepIn: "Stepping into this means stop trying to be less sensitive and start learning how to use your sensitivity with intention. It means setting boundaries so your empathy doesn't drain you. It means recognising that the depth you carry is exactly what the world needs — not in spite of how much you feel, but because of it. Your next chapter isn't about numbing down. It's about powering up.",
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
    bornToDo: "You were born to see connections that nobody else can see — and to use them to create something original. You're not scattered. You're a pattern-spotter, a dot-connector, a synthesiser. While everyone else is deep in one lane, you're the one who can see across all of them and pull together ideas that shouldn't work — but do. You show up best when you're allowed to use everything you are, not just one fraction of it.",
    howYouHelp: "You help people by showing them possibilities they couldn't see on their own. Your wide-ranging interests mean you bring insights from unexpected places — a concept from psychology applied to business, a creative technique applied to healing, an idea from travel applied to relationships. People around you feel energised and expanded. You make them think bigger. And when you find your vehicle — the thing that lets you channel all of your interests into one purposeful direction — you become unstoppable.",
    howToStepIn: "Stepping into this means forgiving yourself for every 'failed' project and half-finished idea. Those weren't failures. They were research. You were gathering the pieces of something bigger. Now the work is finding the vehicle that uses all of them — your curiosity, your emotional intelligence, your creative instincts, your need for variety. It exists. And when you find it, everything you've ever done will suddenly make sense.",
    shortDescription: "You've had more ideas, hobbies, interests, and \"phases\" than anyone you know. People call you scattered. But multi-passionate people aren't broken — they're visionaries looking for a vehicle big enough to hold ALL of who they are.",
    fullDescription: "You've had more ideas, hobbies, interests, and \"phases\" than anyone you know. You've started businesses, courses, creative projects — and left most of them half-finished.\n\nPeople call you scattered. You call yourself a failure-to-launch.\n\nBut here's what working with thousands of high-achievers has revealed: multi-passionate people aren't broken. They're visionaries looking for a vehicle big enough to hold ALL of who they are.\n\nYou don't need to \"pick one thing.\" You need one thing that lets you use EVERYTHING — your curiosity, your emotional intelligence, your ability to see connections others miss, your drive to keep learning and growing.\n\nThe Renaissance Soul is the rarest type — only 11% of people who take this assessment share it. You're not scattered. You're searching for something worthy of your complexity.",
    shareText: "I'm a Renaissance Soul — the rarest type at only 11% of people. What were YOU actually born to do?",
  },
};
