# LoadPath - Prom Fall Classic submission draft

## Project title

LoadPath: Same Policy, Different Learner

## Tagline

An interactive pressure-relief simulator for testing personalized learning policies before they reach a real student.

## Built with

HTML5 Canvas, vanilla JavaScript, CSS3, local JSON export, Pressure-Relief Model (PRM)

## Inspiration

Education policies often treat a learner's coping channels as interchangeable. But removing one relief channel can make a different channel inaccessible, especially when pressure is already high. I built LoadPath to make that hidden interaction visible before adults turn a simple rule into a universal policy.

## What it does

LoadPath lets a student or learning-support team shape a continuous learner profile, choose an available-channel policy, and run a 14-day pressure trajectory. It compares the custom learner with a second learner under the identical policy. The interface exposes mean load, peak load, high-load days, a reachable next channel, and the equation behind the result.

## How it uses AI/ML ideas

Instead of hiding a recommendation behind a language model, LoadPath uses an inspectable agent-based/dynamical model. Continuous individual differences modify channel capacity and activation cost. Each day updates unresolved load using pressure, relief, and natural decay. The counterfactual makes the model's most important claim testable: the same intervention can have different effects across profiles.

## Why it matters

The first audience is learning-support teams and educators who need to compare accommodation ideas without collecting sensitive student data. A pilot could measure whether the lab improves the quality of policy discussions, catches inaccessible “alternatives,” and helps students participate in decisions about their own learning environment.

## Limitations

The trajectories are synthetic and not a clinical or predictive model. PRM parameters need empirical validation, and real implementation would need student governance, professional review, and subgroup audits. The demo intentionally does not expose the research paper's NSSI output as a student-facing score.

## AI use disclosure

AI coding assistance was used for implementation drafting and debugging. The project owner reviewed the code and remains responsible for understanding the model, assumptions, and limitations.

## Two-minute demo path

1. Run the default Deep learner / All channels simulation and point to the equation and the teal trajectory.
2. Switch to `Gaming removed`; show that the policy changes the trajectory and the model recommendation.
3. Click `Action learner`; show the same policy and the counterfactual bars changing.
4. Explain that the product is a policy lab, not a label: it reveals assumptions before they affect a real student.
