# LoadPath

LoadPath is a browser-based educational simulator built from Cora Zeng's Pressure-Relief Model (PRM). It teaches one core idea: the same study or screen policy can produce different outcomes for different learners because pressure sensitivity, relief capacity, and activation cost are not identical.

## What is new for this competition

The source research models 13 continuous individual-difference dimensions and 11 restriction scenarios across 2,000 simulated agents. LoadPath turns that mechanism into a classroom policy lab:

- six continuous learner tendencies instead of categorical personality labels
- a 14-day discrete-time pressure-relief simulation
- policy scenarios that remove or retain specific relief channels
- a counterfactual comparison against another learner under the same policy
- transparent equation, recommendation, and model receipt
- local JSON export for a study or accommodation discussion

This is a distinct education product from SignalBridge Classroom. SignalBridge learns a learner's voice-to-support mapping; LoadPath simulates how an environment interacts with a learner profile before a policy is applied.

## Run

```powershell
python -m http.server 8788
```

Open `http://127.0.0.1:8788/`.

## Responsible boundary

LoadPath is an educational simulation, not a mental-health assessment, risk score, diagnosis, or treatment recommender. The PRM's NSSI variable is not exposed in the classroom UI. The demo uses synthetic trajectories and no student data. Real-world use would require validation, professional review, and participatory design with students.

## Research basis

The model receipt shows:

```text
dU/dt = P(t) * psi - sum R_i(t) - lambda U
```

The full research implementation and simulation results live in `paper-PRM/`. This project uses the same conceptual dynamics but keeps the web experience small enough to inspect and test in one sitting.
