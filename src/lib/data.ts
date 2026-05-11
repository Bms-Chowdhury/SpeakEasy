import { RawPost, CategoryInfo, LevelInfo } from './types';

export const categories: CategoryInfo[] = [
  { slug: 'daily-conversation', name: 'Daily Conversation', description: 'Practice everyday English conversations', icon: '💬', color: 'text-blue-600', },
  { slug: 'job-interview', name: 'Job Interview', description: 'Ace your next English interview', icon: '💼', color: 'text-purple-600', },
  { slug: 'grammar-tips', name: 'Grammar Tips', description: 'Master English grammar rules easily', icon: '📝', color: 'text-emerald-600', },
  { slug: 'real-life-dialogues', name: 'Real-Life Dialogues', description: 'Authentic conversations from real situations', icon: '🎭', color: 'text-orange-600', },
  { slug: 'vocabulary', name: 'Vocabulary', description: 'Expand your English word power', icon: '📚', color: 'text-rose-600', },
  { slug: 'speaking-tips', name: 'Speaking Tips', description: 'Speak English with confidence', icon: '🗣️', color: 'text-cyan-600', },
];

export const levels: LevelInfo[] = [
  { slug: 'beginner', name: 'Beginner', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/30' },
  { slug: 'intermediate', name: 'Intermediate', color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-950/30' },
  { slug: 'advanced', name: 'Advanced', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-950/30' },
];

export const seedPosts: RawPost[] = [
  {
    id: '1',
    title: 'How to Introduce Yourself in English — A Complete Guide',
    slug: 'how-to-introduce-yourself-in-english',
    excerpt: 'Learn the best ways to introduce yourself in any situation — from casual meetings to job interviews. Includes scripts and pronunciation tips.',
    content: `Introducing yourself in English can feel scary, but it doesn't have to be. Whether you're meeting someone new, starting a class, or going to a job interview, a good introduction sets the tone.

## The Basic Structure

Every self-introduction follows a simple pattern:

- **Greeting** — "Hello" or "Hi, my name is..."
- **Your name** — Say it clearly and slowly
- **Something about you** — Your job, hobby, or where you're from
- **A closing** — "Nice to meet you!"

## Casual Introduction

> "Hi! I'm [Name]. I'm from [City/Country]. I work as a [Job]. Nice to meet you!"

This works in most everyday situations. Keep it simple and friendly.

## Professional Introduction

> "Good morning. My name is [Name], and I'm a [Job Title] at [Company]. I have [X] years of experience in [Field]. I'm excited to be here."

Use this in interviews, meetings, or networking events.

## Key Tips

- **Smile** — It makes you sound more confident
- **Speak slowly** — Don't rush your words
- **Make eye contact** — Shows you're confident
- **Practice** — Say it 10 times until it feels natural

## Common Mistakes to Avoid

1. Speaking too fast
2. Using complicated words
3. Forgetting to smile
4. Not practicing beforehand

Remember: A simple, clear introduction is always better than a long, complicated one. Start with the basics and add more as you get comfortable.`,
    category: 'daily-conversation',
    level: 'beginner',
    readingTime: 4,
    featuredImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-15',
    tags: ['introduction', 'beginner', 'speaking', 'confidence'],
    type: 'blog',
  },
  {
    id: '2',
    title: 'Ordering Food at a Restaurant — English Dialogue Script',
    slug: 'ordering-food-at-restaurant-english-dialogue',
    excerpt: 'Practice ordering food in English with this realistic restaurant dialogue. Perfect for beginners who want to feel confident dining out.',
    content: `Going to a restaurant in an English-speaking country? This dialogue will help you order food confidently and naturally.

## The Dialogue

Practice this conversation with a friend or by yourself. Read each line out loud!

## Key Phrases to Remember

- "I'd like to order..." — A polite way to start ordering
- "Could I have...?" — Another polite request
- "What do you recommend?" — Ask for suggestions
- "I'll have the..." — Confirm your order
- "Could we get the check, please?" — Ask for the bill

## Pronunciation Tips

- "I'd like" sounds like "I like" — the 'd' is soft
- "Could I" sounds like "Could-eye" — smooth and connected
- "The check" — the 'ch' sounds like in 'chair'

## Cultural Notes

In English-speaking countries:
- It's normal to make small talk with the waiter
- You don't need to call them "sir" or "madam"
- Tipping 15-20% is expected in the US
- Saying "please" and "thank you" is very important`,
    category: 'real-life-dialogues',
    level: 'beginner',
    readingTime: 3,
    featuredImage: 'https://images.pexels.com/photos/6262402/pexels-photo-6262402.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-14',
    tags: ['restaurant', 'ordering', 'food', 'dialogue'],
    type: 'script',
    dialogues: [
      { speaker: 'Waiter', line: 'Good evening! Welcome to The Golden Spoon. Table for two?', translation: '' },
      { speaker: 'You', line: 'Yes, please. A table for two.', translation: '' },
      { speaker: 'Waiter', line: 'Right this way. Here are your menus. Can I get you something to drink?', translation: '' },
      { speaker: 'You', line: 'I\'d like a glass of water, please. And maybe some iced tea.', translation: '' },
      { speaker: 'Waiter', line: 'Of course. One water and one iced tea. Are you ready to order, or do you need a few minutes?', translation: '' },
      { speaker: 'You', line: 'I think we need a couple more minutes. What do you recommend?', translation: '' },
      { speaker: 'Waiter', line: 'Our grilled salmon is very popular, and the pasta carbonara is excellent today.', translation: '' },
      { speaker: 'You', line: 'The salmon sounds great. I\'ll have that with a side salad, please.', translation: '' },
      { speaker: 'Waiter', line: 'Excellent choice. And for you, sir?', translation: '' },
      { speaker: 'Friend', line: 'I\'ll have the pasta carbonara, please.', translation: '' },
      { speaker: 'Waiter', line: 'Perfect. I\'ll put those orders in right away.', translation: '' },
      { speaker: 'You', line: 'Thank you! Oh, could we also get some bread?', translation: '' },
      { speaker: 'Waiter', line: 'Absolutely. I\'ll bring that right out.', translation: '' },
    ],
  },
  {
    id: '3',
    title: '10 Grammar Mistakes Even Advanced English Learners Make',
    slug: 'grammar-mistakes-advanced-learners-make',
    excerpt: 'Still making these common grammar errors? You are not alone. Learn how to fix the top 10 mistakes that trip up even experienced English speakers.',
    content: `Even after years of studying English, some grammar mistakes are incredibly hard to shake. Let's fix the most common ones.

## 1. "I have been to Paris last year" ❌

**Correct:** "I went to Paris last year."

When you mention a specific time (last year, yesterday, in 2020), use the simple past, not present perfect.

## 2. "She said me that..." ❌

**Correct:** "She told me that..." or "She said that..."

"Say" doesn't take a direct object for a person. "Tell" does.

## 3. "I am agree with you" ❌

**Correct:** "I agree with you."

"Agree" is already a verb. You don't need "am" before it.

## 4. "If I will have time, I will go" ❌

**Correct:** "If I have time, I will go."

After "if," use present tense, not future.

## 5. "He is good in math" ❌

**Correct:** "He is good at math."

We use "good at" for skills and abilities.

## 6. "I look forward to meet you" ❌

**Correct:** "I look forward to meeting you."

After "look forward to," use the -ing form.

## 7. "Less people" ❌

**Correct:** "Fewer people."

Use "fewer" for countable nouns and "less" for uncountable nouns.

## 8. "Its a beautiful day" ❌

**Correct:** "It's a beautiful day."

"It's" = "It is." "Its" = possessive pronoun.

## 9. "I didn't went there" ❌

**Correct:** "I didn't go there."

After "didn't," use the base form of the verb.

## 10. "Me and my friend went" ❌

**Correct:** "My friend and I went."

Put yourself last when listing people. Use "I" as the subject.

## How to Remember

The best way to fix these mistakes is:
- **Read a lot** — Seeing correct grammar helps it stick
- **Write daily** — Even a short journal entry
- **Get feedback** — Use apps or language partners
- **Be patient** — Mistakes are part of learning!`,
    category: 'grammar-tips',
    level: 'intermediate',
    readingTime: 6,
    featuredImage: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-13',
    tags: ['grammar', 'mistakes', 'intermediate', 'correction'],
    type: 'blog',
  },
  {
    id: '4',
    title: 'Job Interview — Tell Me About Yourself Script',
    slug: 'job-interview-tell-me-about-yourself',
    excerpt: 'The most common interview question made easy. Practice this proven script to answer "Tell me about yourself" with confidence.',
    content: `"Tell me about yourself" is the most common interview question — and the most important one to nail. Here's a proven script you can adapt.

## The Present-Past-Future Formula

The best answers follow this structure:
1. **Present** — What you're doing now
2. **Past** — Relevant experience that brought you here
3. **Future** — Why you're excited about this opportunity

## Key Tips

- Keep it to 60-90 seconds
- Focus on professional, not personal, details
- Highlight achievements, not just duties
- Connect your story to the job you want
- Practice until it sounds natural, not rehearsed`,
    category: 'job-interview',
    level: 'intermediate',
    readingTime: 5,
    featuredImage: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-12',
    tags: ['interview', 'job', 'speaking', 'confidence'],
    type: 'script',
    dialogues: [
      { speaker: 'Interviewer', line: 'So, tell me about yourself.' },
      { speaker: 'You', line: 'Sure! My name is [Name], and I\'m currently working as a [Current Job] at [Current Company]. I\'ve been there for [X] years, where I\'ve been responsible for [Key Responsibility].' },
      { speaker: 'You', line: 'Before that, I studied [Field] at [University], and I also worked at [Previous Company], where I learned a lot about [Skill/Area].' },
      { speaker: 'You', line: 'What really excites me about this position is [Reason]. I feel my experience in [Area] would allow me to contribute from day one, and I\'m eager to grow with your team.' },
      { speaker: 'Interviewer', line: 'That sounds great. Can you tell me about a challenge you faced at work?' },
      { speaker: 'You', line: 'Of course. At my current job, we had a situation where [Situation]. My task was to [Your Task]. What I did was [Action]. As a result, [Positive Result].' },
      { speaker: 'Interviewer', line: 'Excellent. Why do you want to leave your current position?' },
      { speaker: 'You', line: 'I\'ve learned a lot at my current company, but I\'m looking for a new challenge where I can [Goal]. This role at your company really aligns with where I want to take my career.' },
    ],
  },
  {
    id: '5',
    title: '50 Essential English Phrases for Travelers',
    slug: 'essential-english-phrases-for-travelers',
    excerpt: 'Traveling to an English-speaking country? These 50 essential phrases will help you navigate airports, hotels, restaurants, and more.',
    content: `Traveling can be stressful, but knowing the right English phrases makes everything easier. Here are the 50 most useful phrases for travelers.

## At the Airport

1. "Where is the check-in counter for [Airline]?"
2. "I'd like to check in for my flight."
3. "Can I get a window seat, please?"
4. "How many bags can I check?"
5. "Where is gate [Number]?"
6. "My flight has been delayed. What should I do?"
7. "Is this flight on time?"
8. "I need to change my flight."

## At the Hotel

9. "I have a reservation under [Name]."
10. "I'd like to check in, please."
11. "What time is breakfast?"
12. "Could I have an extra towel?"
13. "Is there WiFi in the room?"
14. "I'd like to check out."
15. "Can I store my luggage here?"

## Getting Around

16. "How do I get to [Place]?"
17. "Is it within walking distance?"
18. "Where is the nearest bus stop?"
19. "How much is a taxi to [Place]?"
20. "Can you show me on the map?"

## At the Restaurant

21. "A table for two, please."
22. "May I see the menu?"
23. "What do you recommend?"
24. "I'll have the [Dish], please."
25. "Could I have the check, please?"

## Shopping

26. "How much does this cost?"
27. "Do you accept credit cards?"
28. "Can I try this on?"
29. "Do you have a smaller size?"
30. "I'm just looking, thanks."

## Emergencies

31. "I need help!"
32. "Where is the nearest hospital?"
33. "I've lost my passport."
34. "Can you call the police?"
35. "I'm allergic to [Food]."

## Making Friends

36. "Hi, I'm [Name]. Where are you from?"
37. "Is this your first time in [City]?"
38. "What do you recommend I visit?"
39. "Would you like to grab a coffee?"
40. "It was nice meeting you!"

## Polite Expressions

41. "Excuse me, could you help me?"
42. "I'm sorry, I don't understand."
43. "Could you speak more slowly, please?"
44. "Thank you so much!"
45. "I really appreciate it."

## Numbers & Time

46. "What time is it?"
47. "How far is it?"
48. "Can you repeat that, please?"
49. "I don't speak English very well."
50. "Have a great day!"

## Pro Tip

Write down the phrases you think you'll use most and keep them in your phone. Practice saying them out loud before your trip!`,
    category: 'vocabulary',
    level: 'beginner',
    readingTime: 7,
    featuredImage: 'https://images.pexels.com/photos/1009090/pexels-photo-1009090.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-11',
    tags: ['travel', 'phrases', 'vocabulary', 'beginner'],
    type: 'blog',
  },
  {
    id: '6',
    title: 'Small Talk at a Party — Natural English Conversation',
    slug: 'small-talk-at-party-natural-english',
    excerpt: 'Learn how to make natural small talk at parties and social events. This dialogue shows you real English conversation patterns.',
    content: `Small talk is one of the hardest skills to master in English. This dialogue will help you sound natural and confident at any social event.

## The Dialogue

Practice this conversation! Try to match the natural rhythm and tone.

## Small Talk Tips

- Ask open-ended questions (not yes/no questions)
- Show genuine interest in the other person
- Share a little about yourself too
- Avoid controversial topics (politics, religion)
- Know when to gracefully exit the conversation`,
    category: 'daily-conversation',
    level: 'intermediate',
    readingTime: 4,
    featuredImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-10',
    tags: ['small-talk', 'party', 'social', 'conversation'],
    type: 'script',
    dialogues: [
      { speaker: 'Host', line: 'Hey! I don\'t think we\'ve met. I\'m Sarah.' },
      { speaker: 'You', line: 'Hi Sarah, nice to meet you! I\'m [Name]. I work with Alex.' },
      { speaker: 'Host', line: 'Oh, you work with Alex? That\'s awesome! How do you like it there?' },
      { speaker: 'You', line: 'It\'s great! The team is really friendly. How do you know Alex?' },
      { speaker: 'Host', line: 'We went to college together. We\'ve been friends for years.' },
      { speaker: 'You', line: 'That\'s cool! Did you study the same thing?' },
      { speaker: 'Host', line: 'Yeah, we both studied business. But I ended up in marketing. What about you?' },
      { speaker: 'You', line: 'I\'m in software development. I actually started as a designer, but I switched to coding a few years ago.' },
      { speaker: 'Host', line: 'That\'s such a cool transition! Do you ever miss designing?' },
      { speaker: 'You', line: 'Sometimes! But I like building things from scratch. Have you always been in marketing?' },
      { speaker: 'Host', line: 'Pretty much! I love the creative side of it. Hey, have you tried the food? The cheese platter is amazing.' },
      { speaker: 'You', line: 'Not yet! I\'ll definitely check it out. Thanks for the recommendation!' },
    ],
  },
  {
    id: '7',
    title: 'How to Speak English Fast — 7 Proven Techniques',
    slug: 'how-to-speak-english-fast',
    excerpt: 'Want to think and speak in English faster? These 7 proven techniques will help you reduce translation time and speak more naturally.',
    content: `Speaking English fluently means thinking in English. If you translate from your native language, you'll always be slow. Here are 7 techniques to speed up.

## 1. Think in English

Start narrating your day in English. "I'm making coffee. I need to buy milk. The bus is late."

This trains your brain to skip translation.

## 2. Learn Phrases, Not Words

Instead of learning "appointment," learn:
- "Make an appointment"
- "Cancel an appointment"
- "I have an appointment at 3"

Phrases are ready to use. Words need assembly.

## 3. Use the Shadowing Technique

Listen to a native speaker and repeat what they say immediately after them. Try to match their speed, rhythm, and intonation.

## 4. Speak to Yourself

Talk to yourself in English. Describe what you see, what you're doing, or what you're thinking. It feels weird, but it works!

## 5. Set a "No Native Language" Timer

Pick 30 minutes each day where you only use English. Think, speak, and even text in English.

## 6. Learn Connectors

These words buy you time and sound natural:
- "Well..."
- "Actually..."
- "You know..."
- "I mean..."
- "Let me think..."

## 7. Don't Fear Mistakes

Perfectionism kills fluency. Speak even if it's not perfect. Native speakers make mistakes too!

## The 30-Day Challenge

Try this for 30 days:
- Week 1: Think in English for 10 min/day
- Week 2: Shadow 15 min/day
- Week 3: Have a 10-min conversation daily
- Week 4: Go a full hour using only English

You'll be amazed at the improvement!`,
    category: 'speaking-tips',
    level: 'intermediate',
    readingTime: 5,
    featuredImage: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-09',
    tags: ['speaking', 'fluency', 'speed', 'techniques'],
    type: 'blog',
  },
  {
    id: '8',
    title: 'At the Doctor — Medical English Dialogue',
    slug: 'at-the-doctor-medical-english-dialogue',
    excerpt: 'Need to visit a doctor in an English-speaking country? This dialogue covers everything from making an appointment to describing your symptoms.',
    content: `Visiting a doctor in a foreign country can be scary. This dialogue will help you communicate your symptoms clearly and understand what the doctor says.

## The Dialogue

Practice each line until you feel comfortable. Pay attention to the medical vocabulary.

## Key Medical Vocabulary

- **Symptoms** — How you feel (headache, fever, cough)
- **Prescription** — Medicine the doctor tells you to take
- **Appointment** — A scheduled visit
- **Pharmacy** — Where you buy medicine
- **Follow-up** — A return visit to check your progress`,
    category: 'real-life-dialogues',
    level: 'intermediate',
    readingTime: 4,
    featuredImage: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-health-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-08',
    tags: ['medical', 'doctor', 'health', 'dialogue'],
    type: 'script',
    dialogues: [
      { speaker: 'Receptionist', line: 'Good morning. How can I help you?' },
      { speaker: 'You', line: 'Hi, I\'d like to make an appointment to see a doctor, please.' },
      { speaker: 'Receptionist', line: 'Is it an emergency?' },
      { speaker: 'You', line: 'No, not an emergency. But I\'ve been feeling unwell for a few days.' },
      { speaker: 'Receptionist', line: 'We have an opening at 2:30 PM today. Does that work?' },
      { speaker: 'You', line: 'Yes, that works. Thank you.' },
      { speaker: 'Doctor', line: 'Hello, I\'m Dr. Johnson. What brings you in today?' },
      { speaker: 'You', line: 'I\'ve had a headache and a sore throat for about three days. I also feel a bit tired.' },
      { speaker: 'Doctor', line: 'Do you have a fever?' },
      { speaker: 'You', line: 'I\'m not sure. I haven\'t taken my temperature.' },
      { speaker: 'Doctor', line: 'Let me check... You do have a slight fever. I\'ll prescribe some medication. Take it twice a day for five days.' },
      { speaker: 'You', line: 'Okay. Should I come back if I don\'t feel better?' },
      { speaker: 'Doctor', line: 'Yes, please schedule a follow-up if symptoms persist after five days. Get plenty of rest and drink lots of water.' },
      { speaker: 'You', line: 'Thank you, Doctor. I appreciate your help.' },
    ],
  },
  {
    id: '9',
    title: 'Present Perfect vs. Past Simple — Finally Explained Simply',
    slug: 'present-perfect-vs-past-simple-explained',
    excerpt: 'Still confused about when to use present perfect or past simple? This clear guide with examples will help you finally understand the difference.',
    content: `Present perfect and past simple confuse almost every English learner. But the difference is actually simple once you understand the key rule.

## The Key Question

**Is the time period finished or unfinished?**

- **Finished time** → Past Simple
- **Unfinished time** → Present Perfect

## Past Simple — Finished Time

Use past simple when the time period is over:

- "I visited London **last year**." ✅
- "She called me **yesterday**." ✅
- "They moved here **in 2020**." ✅

Keywords: yesterday, last week, in 2020, two days ago, when I was young

## Present Perfect — Unfinished Time

Use present perfect when the time period is still happening:

- "I have visited London **three times**." ✅ (In my life — my life isn't over!)
- "She has called me **today**." ✅ (Today isn't over)
- "They have lived here **since 2020**." ✅ (They still live here)

Keywords: today, this week, this month, ever, never, already, yet, since, for

## The Life Experience Rule

When talking about experiences in your whole life, use present perfect:

- "I have been to Japan." ✅ (At some point in my life)
- "I went to Japan." ✅ (But this implies a specific time)

## Common Mistake

❌ "I have seen that movie yesterday."
✅ "I saw that movie yesterday."

You can't use present perfect with a specific finished time!

## Quick Test

Fill in the blank with past simple or present perfect:

1. I ___ (never/try) sushi before. → "I have never tried sushi before."
2. She ___ (graduate) in 2019. → "She graduated in 2019."
3. They ___ (live) here for 5 years. → "They have lived here for 5 years."
4. We ___ (go) to Paris last summer. → "We went to Paris last summer."

Got it? The key is: **finished time = past simple, unfinished time = present perfect.**`,
    category: 'grammar-tips',
    level: 'intermediate',
    readingTime: 5,
    featuredImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-07',
    tags: ['grammar', 'tenses', 'present-perfect', 'past-simple'],
    type: 'blog',
  },
  {
    id: '10',
    title: 'Asking for Directions — English Dialogue for Beginners',
    slug: 'asking-for-directions-english-dialogue',
    excerpt: 'Lost in an English-speaking city? Learn how to ask for and understand directions with this practical beginner dialogue.',
    content: `Getting lost is normal when traveling. The important thing is knowing how to ask for help in English. This dialogue will prepare you.

## The Dialogue

Practice these phrases before you travel. Being able to ask for directions confidently can save your trip!

## Direction Words to Know

- **Turn left / Turn right** — Change direction
- **Go straight** — Continue in the same direction
- **Block** — The area between two streets
- **Intersection** — Where two roads meet
- **Landmark** — A recognizable building or feature
- **Across from** — On the opposite side`,
    category: 'real-life-dialogues',
    level: 'beginner',
    readingTime: 3,
    featuredImage: 'https://images.pexels.com/photos/2259917/pexels-photo-2259917.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-06',
    tags: ['directions', 'travel', 'beginner', 'dialogue'],
    type: 'script',
    dialogues: [
      { speaker: 'You', line: 'Excuse me, could you help me? I\'m looking for the train station.' },
      { speaker: 'Local', line: 'Sure! The train station is about 10 minutes from here. Do you see that big church at the end of the street?' },
      { speaker: 'You', line: 'Yes, I see it.' },
      { speaker: 'Local', line: 'Walk towards the church, then turn left at the intersection. Go straight for two blocks.' },
      { speaker: 'You', line: 'Turn left at the intersection, then straight for two blocks. Got it.' },
      { speaker: 'Local', line: 'You\'ll see a park on your right. The train station is right across from the park. You can\'t miss it!' },
      { speaker: 'You', line: 'Across from the park. Thank you so much! Is there also a bus that goes there?' },
      { speaker: 'Local', line: 'Yes! Bus number 7 stops right over there. It goes directly to the station.' },
      { speaker: 'You', line: 'That\'s perfect. Thanks again for your help!' },
      { speaker: 'Local', line: 'No problem! Have a great day!' },
    ],
  },
  {
    id: '11',
    title: 'Advanced Business Meeting — Professional English Script',
    slug: 'advanced-business-meeting-professional-english',
    excerpt: 'Master professional English for business meetings. This advanced dialogue covers presentations, disagreements, and negotiation language.',
    content: `Business meetings require a different level of English. You need to be professional, clear, and persuasive. This script shows you how.

## The Dialogue

This is an advanced-level script. Practice each line multiple times to get the professional tone right.

## Professional Phrases

- "I'd like to address..." — Introduce a topic
- "From my perspective..." — Share your opinion
- "I see your point, but..." — Disagree politely
- "Could you elaborate on that?" — Ask for more detail
- "Let's move forward with..." — Make a decision`,
    category: 'job-interview',
    level: 'advanced',
    readingTime: 5,
    featuredImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-05',
    tags: ['business', 'meeting', 'professional', 'advanced'],
    type: 'script',
    dialogues: [
      { speaker: 'Manager', line: 'Thank you all for joining. Let\'s get started. I\'d like to address our Q2 performance and discuss our strategy for Q3.' },
      { speaker: 'You', line: 'Before we begin, I wanted to share some key findings from the market research we conducted last month.' },
      { speaker: 'Manager', line: 'Of course, go ahead.' },
      { speaker: 'You', line: 'Our research indicates that customer satisfaction has declined by 12% since the new pricing model was introduced. The primary concern seems to be the lack of flexibility in our subscription plans.' },
      { speaker: 'Colleague', line: 'I see your point, but we also need to consider that revenue increased by 8% during the same period.' },
      { speaker: 'You', line: 'That\'s a valid point. However, if customer churn continues at this rate, those short-term gains won\'t be sustainable. I\'d recommend we pilot a tiered pricing model in Q3.' },
      { speaker: 'Manager', line: 'Could you elaborate on what that would look like?' },
      { speaker: 'You', line: 'Absolutely. We\'d offer three tiers — Basic, Professional, and Enterprise — with flexible add-ons. This would give customers more control while maintaining our revenue targets.' },
      { speaker: 'Manager', line: 'I like the direction. Let\'s have a proposal on my desk by Friday. Good work, everyone.' },
    ],
  },
  {
    id: '12',
    title: 'Conditional Sentences — The Complete Guide with Examples',
    slug: 'conditional-sentences-complete-guide',
    excerpt: 'Master all four types of conditional sentences in English. Clear explanations, real examples, and practice exercises included.',
    content: `Conditional sentences ("if" sentences) are essential in English. There are four main types, each with a different meaning. Let's break them down.

## Zero Conditional — Facts

**Structure:** If + present simple, present simple

Use this for things that are always true:

- "If you heat water to 100°C, it boils."
- "If it rains, the ground gets wet."

## First Conditional — Real Possibilities

**Structure:** If + present simple, will + base verb

Use this for things that could really happen:

- "If I study hard, I will pass the test."
- "If it rains tomorrow, we will stay home."

## Second Conditional — Unreal Situations

**Structure:** If + past simple, would + base verb

Use this for imaginary or unlikely situations:

- "If I had a million dollars, I would travel the world."
- "If I were you, I would accept the job."

Note: Use "were" (not "was") for all subjects in formal English.

## Third Conditional — Past Regrets

**Structure:** If + past perfect, would have + past participle

Use this for things that didn't happen in the past:

- "If I had studied harder, I would have passed the test."
- "If we had left earlier, we would have caught the flight."

## Quick Reference Table

| Type | Time | Reality | Example |
|------|------|---------|--------|
| Zero | Always | Fact | If you heat ice, it melts |
| First | Future | Possible | If it rains, I'll stay home |
| Second | Present/Future | Unreal | If I were rich, I'd travel |
| Third | Past | Impossible | If I had known, I would've helped |

## Practice

Complete these sentences:
1. If I ___ (know) her number, I would call her. → knew
2. If it rains, we ___ (stay) inside. → will stay
3. If I had studied, I ___ (pass) the exam. → would have passed`,
    category: 'grammar-tips',
    level: 'advanced',
    readingTime: 6,
    featuredImage: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2025-01-04',
    tags: ['grammar', 'conditionals', 'advanced', 'if-clauses'],
    type: 'blog',
  },
];

export const trendingSlugs = ['how-to-speak-english-fast', 'grammar-mistakes-advanced-learners-make', 'essential-english-phrases-for-travelers'];

// Legacy helpers — these now delegate to the Zustand store when available,
// but also work standalone for SSR / initial load scenarios.
// Pages should prefer using usePostStore() directly.

export function getPostBySlug(slug: string): RawPost | undefined {
  return seedPosts.find(p => p.slug === slug);
}

export function getPostsByType(type: 'blog' | 'script'): RawPost[] {
  return seedPosts.filter(p => p.type === type);
}

export function getPostsByCategory(category: string): RawPost[] {
  return seedPosts.filter(p => p.category === category);
}

export function getPostsByLevel(level: string): RawPost[] {
  return seedPosts.filter(p => p.level === level);
}

export function getTrendingPosts(): RawPost[] {
  return seedPosts.filter(p => trendingSlugs.includes(p.slug));
}

export function getRelatedPosts(post: RawPost, limit = 3): RawPost[] {
  return seedPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.level === post.level))
    .slice(0, limit);
}
