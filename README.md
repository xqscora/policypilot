# PolicyPilot

PolicyPilot is a browser-local decision-support prototype for school learning-support teams. It uses Cora Zeng's Pressure-Relief Model to compare a proposed policy across synthetic learner profiles before the policy reaches a real student.

## Product wedge

Schools already spend time discussing accommodations, but the discussion often loses the assumptions: which relief channel is available, what activation cost is realistic, and which learner profile is being imagined. PolicyPilot turns that conversation into a small, inspectable policy test.

The first market is international schools and small learning-support teams. A paid pilot would add team workspaces, versioned policy receipts, and exportable meeting records. The core product remains intentionally bounded: it is not a diagnosis, risk score, or treatment recommender.

## Technical approach

- Six continuous learner tendencies instead of categorical personality labels
- A 14-day discrete-time pressure-relief simulation
- Counterfactual comparison under the same policy
- Visible equation, assumptions, and recommendation receipt
- Browser-local JSON export with `external_data: false`
- Plain HTML, CSS, and vanilla JavaScript with no API key or server dependency

## Run locally

```powershell
python -m http.server 8788
```

Open `http://127.0.0.1:8788/`.

## Responsible boundary

All demo trajectories are synthetic. PolicyPilot does not assess mental health, diagnose a learner, or upload student writing. Real-world deployment would require validation, professional review, and participatory design with students and learning-support staff.
