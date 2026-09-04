# QA checklist

1. Run `node --check app.js`.
2. Serve with `python -m http.server 8788`.
3. Confirm the default simulation renders three metrics, two trajectory lines, a recommendation, and comparison bars.
4. Change `Gaming removed`, `Screens only`, and `Exercise only`; confirm the scenario tag, trajectory, and metrics change.
5. Click each learner preset; confirm the sliders, trajectory, recommendation, and counterfactual change.
6. Move school pressure; confirm the trajectory and metrics update immediately.
7. Click `Export scenario`; confirm a JSON download contains profile, scenario, trajectory, and `external_data: false`.
