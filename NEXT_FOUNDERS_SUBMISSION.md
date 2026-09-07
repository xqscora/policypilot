# Next Founders Hackathon — PolicyPilot

## Project identity

- **Project name:** PolicyPilot
- **Tagline:** Test a learning policy before it reaches a real student.
- **Repository:** https://github.com/xqscora/policypilot (pending public deployment)
- **Live demo:** https://xqscora.github.io/policypilot/?demo=1 (pending public deployment)
- **Primary customer:** school learning-support teams and education organisations
- **Initial user:** a learning-support coordinator comparing two or three proposed classroom policies

## The founder story

Education teams often choose a single policy for a whole class and only discover later that the same rule creates very different pressure for different learners. PolicyPilot is a small policy lab that makes those differences visible before a decision reaches a real student. It uses synthetic profiles and an inspectable pressure-relief simulation, so a team can compare assumptions without uploading sensitive learner data.

## Product and wedge

The first product is a browser-local scenario lab. A user adjusts a continuous learner profile, selects which relief channels a policy permits, runs a 14-day simulation, and compares the result with another learner under the same policy. The product returns peak load, high-load days, a reachable next channel, the equation behind the result, and a local JSON receipt.

The initial wedge is a 20-minute policy-review meeting. PolicyPilot does not try to become a student information system or a diagnostic platform. It earns trust by answering one narrow question: **what assumptions should we test before applying this policy?**

## Market and business model

- **Beachhead:** independent schools and tutoring / learning-support organisations that already hold case-review meetings but lack a lightweight scenario tool.
- **Buyer:** director of learning support or school innovation lead.
- **User:** learning-support coordinator, counsellor, or teacher working with synthetic or consented scenarios.
- **Free tier:** local browser lab with synthetic profiles, scenario export, and a limited set of policy templates.
- **Paid tier:** organisation workspace with versioned policy scenarios, reviewer permissions, audit receipts, configurable templates, and aggregated pilot analytics.
- **Pilot model:** a paid 4–6 week design pilot with one support team; success is measured by time-to-agreement, number of assumptions surfaced, student correction rate, and policies revised before rollout.
- **Expansion:** district / multi-campus governance, with no sale of individual risk scores and no requirement to centralise raw student writing.

## Technical execution and scalability

The current prototype is a static browser application using HTML5 Canvas, vanilla JavaScript, CSS, local JSON export, and the Pressure-Relief Model. The simulation is deterministic and inspectable: every day updates unresolved load from pressure, profile sensitivity, reachable relief, activation cost, and natural decay. The product can scale without changing the user-facing contract by moving scenario execution behind a versioned API, adding a tenant-scoped policy store, and retaining the same model receipt for every run.

The privacy-preserving boundary is deliberate. Synthetic scenarios work offline today; a future hosted mode would require explicit consent, tenant isolation, retention limits, and a human review gate. PolicyPilot is an educational simulation, not a mental-health assessment, risk score, diagnosis, or treatment recommender.

## AI-use disclosure

AI coding assistance was used for implementation drafting and debugging. The project owner reviewed the code, model assumptions, claims, and limitations and remains responsible for the submission.

## Five-minute video script

**0:00–0:35 — Problem.** Learning policies are often evaluated as if every learner has the same reachable coping channels. A policy can look reasonable on paper while making the next useful action inaccessible for a particular learner. PolicyPilot is designed to expose that assumption before the policy is applied.

**0:35–1:20 — Product.** This is a browser-local policy lab for learning-support teams. It uses synthetic profiles, not real student records. The user chooses a profile and a policy, then runs a 14-day trajectory. The screen reports mean and peak unresolved load, high-load days, a reachable next channel, and the equation used by the simulation.

**1:20–2:35 — Live demo.** Start with the default learner and all channels. Run the simulation and point to the trajectory, recommendation, and model receipt. Switch to `Gaming removed`, run it again, and show how the same learner changes when one relief channel disappears. Select `Action learner` and show the counterfactual bars: the same policy can produce a different result for a different profile.

**2:35–3:35 — Code and architecture.** The prototype is HTML5 Canvas, vanilla JavaScript, CSS, and local JSON export. The simulation is a transparent daily update rather than a hidden score. The browser keeps the scenario local, and the export marks `external_data: false`. The student-facing view deliberately does not expose the research model's sensitive NSSI variable.

**3:35–4:25 — Business and scale.** The beachhead customer is a school learning-support team. A free local lab supports synthetic policy review; a paid organisation tier adds versioned scenarios, reviewer permissions, audit receipts, templates, and aggregated pilot analytics. A pilot measures whether teams reach agreement faster and revise more assumptions before rollout. The same scenario contract can later run in a tenant-isolated service without selling individual risk scores.

**4:25–5:00 — Limits and close.** PolicyPilot is not a diagnosis, risk score, or treatment recommender. Its trajectories are synthetic and require empirical validation, professional review, and participatory design with students. The product's first job is modest but useful: make the assumptions behind a learning policy visible, testable, and reversible before a real student has to live with them.
