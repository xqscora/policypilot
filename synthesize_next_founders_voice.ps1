param(
  [string]$Output = "$PSScriptRoot\demo\next_founders_narration.wav"
)

Add-Type -AssemblyName System.Speech
$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voice.SelectVoice('Microsoft Zira Desktop')
$voice.Rate = -1
$voice.Volume = 100
$voice.SetOutputToWaveFile($Output)
$text = @'
This is PolicyPilot: a decision-support tool for school learning-support teams.

The problem is simple but costly. Education policies are often evaluated as if every learner has the same reachable coping channels. A rule can look reasonable on paper while making the next useful action inaccessible for a particular learner. Schools usually discover that difference only after a student has to live with the policy.

PolicyPilot makes the assumption visible before rollout. It is a browser-local simulation using synthetic profiles, not real student records. A learning-support coordinator chooses a continuous learner profile, selects which relief channels a policy permits, and runs a fourteen-day trajectory. The product reports mean load, peak load, high-load days, a reachable next channel, and the equation behind the result.

Let us walk through the product. On the left, the user can shape a learner without assigning a personality label. The sliders represent depth seeking, novelty seeking, action energy, social recharge, emotional sensitivity, and sensory sensitivity. These are transparent model inputs, not a hidden score.

The default scenario keeps all channels available. When we run the policy test, the chart shows the custom learner's trajectory and a counterfactual learner under the same policy. The recommendation identifies the lowest-friction next channel for this profile. The model receipt below explains the update: pressure times profile sensitivity, minus reachable relief, minus natural decay.

Now we remove gaming. This is not a claim that gaming is good or bad. It is a controlled policy question: what changes when one available relief channel disappears? The trajectory, metrics, and recommendation update immediately. A team can compare the result instead of arguing from a universal assumption.

Next, we switch to the action learner preset. The policy has not changed. The learner profile has. The counterfactual bars make the central product claim visible: the same intervention can produce different effects for different profiles.

Technically, the prototype is deliberately small. It uses HTML5 Canvas, vanilla JavaScript, CSS, local JSON export, and the Pressure-Relief Model. Each day updates unresolved load from pressure, profile-specific sensitivity, reachable relief, activation cost, and natural decay. The browser can export a scenario receipt, and the receipt marks external data as false. The student-facing view does not expose the research model's sensitive NSSI variable.

The first customer is a school learning-support team. The first user is a coordinator preparing a policy-review meeting. The initial wedge is a twenty-minute scenario review: compare two policy ideas, surface assumptions, and decide what evidence or student feedback is still needed.

The business model has a free local lab for synthetic scenarios and a paid organisation tier. The paid tier would add versioned policy scenarios, reviewer permissions, configurable templates, audit receipts, and aggregated pilot analytics. A four-to-six-week pilot could measure time to agreement, assumptions surfaced, student correction rate, and policies revised before rollout. PolicyPilot is not a marketplace for individual risk scores.

The product can scale without changing the user-facing contract. A future tenant-isolated service could run the same versioned scenario model behind an API, while keeping retention limits, explicit consent, and a human review gate. Schools would get a policy workflow, not a diagnostic label.

There are important limits. PolicyPilot is an educational simulation, not a mental-health assessment, risk score, diagnosis, or treatment recommender. Its trajectories are synthetic. The parameters require empirical validation, professional review, and participatory design with students. The safest first use is to make assumptions visible and reversible before a real student has to live with them.

PolicyPilot turns a one-size-fits-all policy into a testable hypothesis. It gives learning-support teams a small, inspectable tool for asking a better question: what should we verify before we apply this rule?
'@
$voice.Speak($text)
$voice.Dispose()
Write-Output "Created $Output"
