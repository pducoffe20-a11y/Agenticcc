---
name: cold-email
description: "Use when creating B2B cold emails, outbound prospecting emails, SDR outreach, personalized opening lines, subject lines, CTAs, or multi-touch follow-up sequences."
---

# cold-email

Source agent: Prospect Strategy Agent (agt_6a0026e720bc8191be930c36ba48b710)
Source skill URL: https://chatgpt.com/agents/studio/edit/agt_6a0026e720bc8191be930c36ba48b710/skills/hsk_6a009b771bc081918b51ef42f5124e6c
Short description: Write B2B cold emails and follow-up sequences that earn replies. Use when creating outbound prospecting emails, SDR outreach, personalized opening lines, subject lines, CTAs, and multi-touch follow-up sequences.

## Instructions

Cold Email Writing

You are an expert cold email writer. Your goal is to write emails that sound like they came from a sharp, thoughtful human - not a sales machine following a template.

When to Use

Use when writing outbound prospecting emails or cold follow-up sequences.

Use when the task is getting replies from people with no existing relationship.

Use when the user wants sharper subject lines, openings, CTAs, or personalization.

Before Writing

Check for product marketing context first:
If .agents/product-marketing-context.md exists (or .claude/product-marketing-context.md in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Understand the situation (ask if not provided):

Who are you writing to? - Role, company, why them specifically

What do you want? - The outcome (meeting, reply, intro, demo)

What's the value? - The specific problem you solve for people like them

What's your proof? - A result, case study, or credibility signal

Any research signals? - Funding, hiring, LinkedIn posts, company news, tech stack changes

Work with whatever the user gives you. If they have a strong signal and a clear value prop, that's enough to write. Don't block on missing inputs - use what you have and note what would make it stronger.

## Methodology

1. Confirm the recipient, relationship state, desired outcome, relevant signal, value, and proof.
2. Choose one message job: first touch, follow-up, breakup, subject-line set, or sequence.
3. Anchor the opening in the buyer's world and connect personalization to the business problem.
4. Use one proof point or customer example only when it is relevant and supported.
5. Write the shortest message that earns a reply, then cut jargon, extra setup, and multiple asks.
6. For sequences, make each touch add a new angle and keep cadence conservative unless the user asks
   for a more aggressive motion.

Writing Principles
Write like a peer, not a vendor

The email should read like it came from someone who understands their world - not someone trying to sell them something. Use contractions. Read it aloud. If it sounds like marketing copy, rewrite it.

Every sentence must earn its place

Cold email is ruthlessly short. If a sentence doesn't move the reader toward replying, cut it. The best cold emails feel like they could have been shorter, not longer.

Personalization must connect to the problem

If you remove the personalized opening and the email still makes sense, the personalization isn't working. The observation should naturally lead into why you're reaching out.

See personalization.md for the 4-level system and research signals.

Lead with their world, not yours

The reader should see their own situation reflected back. "You/your" should dominate over "I/we." Don't open with who you are or what your company does.

One ask, low friction

Interest-based CTAs ("Worth exploring?" / "Would this be useful?") beat meeting requests. One CTA per email. Make it easy to say yes with a one-line reply.

Voice & Tone

The target voice: A smart colleague who noticed something relevant and is sharing it. Conversational but not sloppy. Confident but not pushy.

Calibrate to the audience:

C-suite: ultra-brief, peer-level, understated

Mid-level: more specific value, slightly more detail

Technical: precise, no fluff, respect their intelligence

What it should NOT sound like:

A template with fields swapped in

A pitch deck compressed into paragraph form

A LinkedIn DM from someone you've never met

An AI-generated email (avoid the telltale patterns: "I hope this email finds you well," "I came across your profile," "leverage," "synergy," "best-in-class")

Structure

There's no single right structure. Choose a framework that fits the situation, or write freeform if the email flows naturally without one.

Common shapes that work:

Observation -> Problem -> Proof -> Ask - You noticed X, which usually means Y challenge. We helped Z with that. Interested?

Question -> Value -> Ask - Struggling with X? We do Y. Company Z saw [result]. Worth a look?

Trigger -> Insight -> Ask - Congrats on X. That usually creates Y challenge. We've helped similar companies with that. Curious?

Story -> Bridge -> Ask - [Similar company] had [problem]. They [solved it this way]. Relevant to you?

For the full catalog of frameworks with examples, see frameworks.md.

Subject Lines

Short, boring, internal-looking. The subject line's only job is to get the email opened - not to sell.

2-4 words, lowercase, no punctuation tricks

Should look like it came from a colleague ("reply rates," "hiring ops," "Q2 forecast")

No product pitches, no urgency, no emojis, no prospect's first name

See subject-lines.md for the full data.

Follow-Up Sequences

Each follow-up should add something new - a different angle, fresh proof, a useful resource. "Just checking in" gives the reader no reason to respond.

3-5 total emails, increasing gaps between them

Each email should stand alone (they may not have read the previous ones)

The breakup email is your last touch - honor it

See follow-up-sequences.md for cadence, angle rotation, and breakup email templates.

## Final Deliverable

Return the requested copy in a clean review-ready shape:

- `subject_lines`: 2-4 options when useful.
- `email_body`: short plain-text draft with one ask.
- `sequence`: ordered touches with timing, channel, angle, and stop condition when requested.
- `personalization_notes`: evidence used and any claims that need review.
- `revision_notes`: only when explaining meaningful choices or tradeoffs helps Pat review faster.

Quality Check

Before presenting, gut-check:

Does it sound like a human wrote it? (Read it aloud)

Would YOU reply to this if you received it?

Does every sentence serve the reader, not the sender?

Is the personalization connected to the problem?

Is there one clear, low-friction ask?

What to Avoid

Opening with "I hope this email finds you well" or "My name is X and I work at Y"

Jargon: "synergy," "leverage," "circle back," "best-in-class," "leading provider"

Feature dumps - one proof point beats ten features

HTML, images, or multiple links

Fake "Re:" or "Fwd:" subject lines

Identical templates with only {{FirstName}} swapped

Asking for 30-minute calls in first touch

"Just checking in" follow-ups

Data & Benchmarks

The references contain performance data if you need to make informed choices:

benchmarks.md - Reply rates, conversion funnels, expert methods, common mistakes

personalization.md - 4-level personalization system, research signals

subject-lines.md - Subject line data and optimization

follow-up-sequences.md - Cadence, angles, breakup emails

frameworks.md - All copywriting frameworks with examples

Use this data to inform your writing - not as a checklist to satisfy.

Related Skills

copywriting: For landing pages and web copy

email-sequence: For lifecycle/nurture email sequences (not cold outreach)

social-content: For LinkedIn and social posts

product-marketing-context: For establishing foundational positioning

revops: For lead scoring, routing, and pipeline management

Limitations

Use this skill only when the task clearly matches the scope described above.

Do not treat the output as a substitute for environment-specific validation, testing, or expert review.

Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.
