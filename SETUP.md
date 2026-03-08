# Marisa Peer Quiz Funnel — Setup Guide

## Quick Start (Get Running in 10 Minutes)

### Step 1: Create a Replit Project
1. Go to [replit.com](https://replit.com) and sign in
2. Click **+ Create Repl**
3. Choose **Next.js** template
4. Name it `marisa-peer-quiz`
5. Delete all the template files that come with it

### Step 2: Upload These Files
Upload the entire contents of this folder to your Replit project.
The file structure should look like:
```
/app
  /quiz/page.tsx
  /results/page.tsx
  /report/[id]/page.tsx
  /api/quiz/submit/route.ts
  /api/report/generate/route.ts
  /api/email/capture/route.ts
  layout.tsx
  page.tsx
  globals.css
/lib
  questions.ts
  scoring.ts
  archetypes.ts
  supabase.ts
  report-prompt.ts
/components
  (empty for now — add custom components here)
/public
  (add Marisa Peer logo and images here)
package.json
next.config.js
tsconfig.json
tailwind.config.js
postcss.config.js
.env.example
```

### Step 3: Install Dependencies
In the Replit shell, run:
```bash
npm install
```

### Step 4: Test Locally
```bash
npm run dev
```
The quiz will work immediately — scoring, question flow, and results all work without any external services. You'll see a fallback report instead of AI-generated ones until you connect the services below.

---

## Connecting External Services

### 1. Supabase (Free Database)

**What it does:** Stores quiz responses, user profiles, and generated reports.

**Setup:**
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project**, name it `marisa-peer-quiz`
3. Wait for it to set up (~2 minutes)
4. Go to **Settings → API** and copy:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → this is your `SUPABASE_SERVICE_KEY`

5. Go to **SQL Editor** and run this to create the tables:

```sql
-- Users table
CREATE TABLE quiz_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  first_name VARCHAR(100),
  age_range VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),

  -- Archetype scores
  healer_score INT DEFAULT 0,
  powerhouse_score INT DEFAULT 0,
  freedom_score INT DEFAULT 0,
  deep_feeler_score INT DEFAULT 0,
  renaissance_score INT DEFAULT 0,

  -- Conversion scores
  rtt_intent INT DEFAULT 0,
  readiness_score INT DEFAULT 0,
  investment_readiness INT DEFAULT 0,
  pain_intensity INT DEFAULT 0,

  -- Profile results
  primary_archetype VARCHAR(50),
  conversion_path VARCHAR(10),
  primary_belief VARCHAR(100),
  primary_fear VARCHAR(100),
  primary_desire VARCHAR(100),
  body_pattern VARCHAR(100),
  relationship_pattern VARCHAR(100),
  money_belief VARCHAR(100),
  origin_pattern VARCHAR(100),
  purpose_energy VARCHAR(100),
  healer_ability VARCHAR(100),

  -- Report
  report_content TEXT,
  report_viewed BOOLEAN DEFAULT FALSE,

  -- Tracking
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  referral_code VARCHAR(50),

  -- Conversion tracking
  email_captured BOOLEAN DEFAULT FALSE,
  cta_clicked BOOLEAN DEFAULT FALSE,
  product_purchased BOOLEAN DEFAULT FALSE,
  call_booked BOOLEAN DEFAULT FALSE
);

-- Individual answers
CREATE TABLE quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES quiz_users(id),
  question_number INT,
  answer_key VARCHAR(5),
  answer_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_quiz_users_email ON quiz_users(email);
CREATE INDEX idx_quiz_users_archetype ON quiz_users(primary_archetype);
CREATE INDEX idx_quiz_users_conversion ON quiz_users(conversion_path);
CREATE INDEX idx_quiz_answers_user ON quiz_answers(user_id);

-- Enable Row Level Security (recommended)
ALTER TABLE quiz_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything
CREATE POLICY "Service role access" ON quiz_users FOR ALL USING (true);
CREATE POLICY "Service role access" ON quiz_answers FOR ALL USING (true);
```

### 2. OpenAI (AI Report Generation)

**What it does:** Generates the deeply personalised coaching reports that reference each person's specific answers.

**Setup:**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to **API Keys** and click **Create new secret key**
4. Copy the key → this is your `OPENAI_API_KEY`
5. Add a payment method and set a usage limit (the quiz uses GPT-4o at ~$0.02-0.05 per report)

**Cost estimate:**
- Each report costs approximately $0.03-0.05 to generate
- 1,000 reports = ~$30-50
- 10,000 reports = ~$300-500

### 3. Resend (Email Delivery) — Optional

**What it does:** Sends the welcome email with the link to their coaching report.

**Setup:**
1. Go to [resend.com](https://resend.com) and create a free account
2. Free tier: 3,000 emails/month (plenty to start)
3. Go to **API Keys** and create one → this is your `RESEND_API_KEY`
4. You'll need to verify a domain to send from — follow their setup guide
5. Update the `from` address in `/app/api/email/capture/route.ts`

### 4. Add Environment Variables in Replit

1. In your Replit project, click the **Secrets** tab (lock icon in sidebar)
2. Add each key-value pair:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `SUPABASE_SERVICE_KEY` = your Supabase service role key
   - `OPENAI_API_KEY` = your OpenAI API key
   - `RESEND_API_KEY` = your Resend API key (optional)
   - `NEXT_PUBLIC_APP_URL` = your Replit app URL (e.g., https://marisa-peer-quiz.yourusername.repl.co)

---

## Deploying

### On Replit:
1. Click the **Deploy** button in the top right
2. Choose **Reserved VM** for best performance
3. Your quiz will be live at your Replit URL

### Custom Domain (Optional):
1. In Replit deployment settings, click **Custom Domain**
2. Add your domain (e.g., quiz.marisapeer.com)
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` to match

---

## Customisation Guide

### Updating Questions
Edit `/lib/questions.ts` — each question has clearly labelled scores and framework mappings.

### Updating Archetypes
Edit `/lib/archetypes.ts` — descriptions, colours, share text, and percentages.

### Updating the AI Report Prompt
Edit `/lib/report-prompt.ts` — this is the master prompt that generates personalised coaching reports. The prompt structure follows Marisa's therapeutic framework.

### Updating CTA/Offer URLs
Edit the `conversionCTAs` object in `/app/report/[id]/page.tsx` — update button text, URLs, and messaging for each conversion path (A through E).

### Adding Marisa's Branding
1. Add logo file to `/public/logo.png`
2. Add Marisa's photo to `/public/marisa.jpg`
3. Reference in components as `<img src="/logo.png" />`

### Changing Colors
Edit `tailwind.config.js` — the `brand` color palette controls the entire look.

---

## What to Do Next

1. **Test the full flow** — take the quiz yourself, check all 5 archetype results
2. **Connect Supabase** — so responses are saved
3. **Connect OpenAI** — so reports are AI-generated and personalised
4. **Update CTA URLs** — point to actual Marisa Peer product/booking pages
5. **Add UTM tracking** — the quiz already captures utm_source/medium/campaign from URL params
6. **Set up Meta Pixel** — add to layout.tsx for retargeting
7. **Build email sequences** — use the conversion_path data to segment your email nurture flows
8. **A/B test** — try different question wordings, archetype names, and CTA copy
