const CHANNELS = {
  gaming: { label: "Gaming", capacity: 0.16, activation: 0.14 },
  music: { label: "Music", capacity: 0.08, activation: 0.05 },
  novels: { label: "Reading", capacity: 0.12, activation: 0.42 },
  scrolling: { label: "Scrolling", capacity: 0.05, activation: 0.03 },
  exercise: { label: "Exercise", capacity: 0.17, activation: 0.78 },
  social: { label: "Social connection", capacity: 0.1, activation: 0.34 }
};

const PRESETS = {
  deep: { depth: 0.82, novelty: 0.32, action: 0.28, social: 0.36, emotional: 0.66, sensory: 0.58 },
  action: { depth: 0.28, novelty: 0.7, action: 0.86, social: 0.65, emotional: 0.34, sensory: 0.55 },
  mixed: { depth: 0.55, novelty: 0.5, action: 0.52, social: 0.5, emotional: 0.5, sensory: 0.5 }
};

const state = { profile: { ...PRESETS.deep }, scenario: "all", pressure: 0.58, result: null };
const els = {
  scenario: document.querySelector("#scenario"), pressure: document.querySelector("#pressure"), pressureValue: document.querySelector("#pressureValue"), runBtn: document.querySelector("#runBtn"), exportBtn: document.querySelector("#exportBtn"), scenarioTag: document.querySelector("#scenarioTag"), meanMetric: document.querySelector("#meanMetric"), peakMetric: document.querySelector("#peakMetric"), daysMetric: document.querySelector("#daysMetric"), recommendation: document.querySelector("#recommendation"), recommendationWhy: document.querySelector("#recommendationWhy"), chart: document.querySelector("#chart"), comparisonBars: document.querySelector("#comparisonBars")
};

function init() {
  Object.keys(state.profile).forEach((key) => {
    const input = document.querySelector(`#${key}`);
    const output = document.querySelector(`#${key}Value`);
    input.addEventListener("input", () => { state.profile[key] = Number(input.value); output.value = Number(input.value).toFixed(2); run(); });
  });
  document.querySelectorAll(".preset").forEach((button) => button.addEventListener("click", () => applyPreset(button.dataset.preset, button)));
  els.scenario.addEventListener("change", () => { state.scenario = els.scenario.value; run(); });
  els.pressure.addEventListener("input", () => { state.pressure = Number(els.pressure.value); els.pressureValue.value = state.pressure.toFixed(2); run(); });
  els.runBtn.addEventListener("click", run);
  els.exportBtn.addEventListener("click", exportScenario);
  run();
}

function applyPreset(name, button) {
  state.profile = { ...PRESETS[name] };
  Object.entries(state.profile).forEach(([key, value]) => { document.querySelector(`#${key}`).value = value; document.querySelector(`#${key}Value`).value = value.toFixed(2); });
  document.querySelectorAll(".preset").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  run();
}

function availableChannels(scenario) {
  if (scenario === "no_gaming") return ["music", "novels", "exercise", "social", "scrolling"];
  if (scenario === "screen_only") return ["gaming", "scrolling", "music"];
  if (scenario === "exercise_only") return ["exercise"];
  return Object.keys(CHANNELS);
}

function adjustedChannel(name, profile) {
  const base = CHANNELS[name];
  let capacity = base.capacity;
  let activation = base.activation;
  if (name === "gaming") capacity *= 0.55 + profile.depth * 0.55 + profile.action * 0.2;
  if (name === "music") capacity *= 0.55 + profile.emotional * 0.5 + profile.sensory * 0.4;
  if (name === "novels") capacity *= 0.45 + profile.depth * 0.7 + profile.emotional * 0.2;
  if (name === "scrolling") capacity *= Math.max(0.15, 0.35 + profile.novelty * 0.65 - profile.depth * 0.45);
  if (name === "exercise") { capacity *= 0.55 + profile.action * 0.7; activation *= Math.max(0.35, 1.15 - profile.action * 0.55); }
  if (name === "social") { capacity *= 0.35 + profile.social * 0.9; activation *= Math.max(0.4, 1.1 - profile.social * 0.45); }
  return { ...base, capacity, activation };
}

function simulate(profile, scenario) {
  let load = 0.3;
  const series = [];
  const channels = availableChannels(scenario).map((name) => adjustedChannel(name, profile));
  const sensitivity = 0.63 + profile.emotional * 0.28 + profile.depth * 0.08;
  for (let day = 0; day < 14; day += 1) {
    const weekday = day % 7 < 5;
    const pressure = state.pressure * (weekday ? 1.2 : 0.72);
    const reachableRelief = channels.reduce((sum, channel) => {
      const barrier = Math.max(0.12, 1 - channel.activation * (0.65 + load * 0.55));
      return sum + channel.capacity * barrier;
    }, 0);
    load = Math.max(0, Math.min(1.5, load + pressure * sensitivity - reachableRelief - load * 0.12));
    series.push(load);
  }
  const mean = series.reduce((sum, value) => sum + value, 0) / series.length;
  const peak = Math.max(...series);
  const highDays = series.filter((value) => value >= 0.8).length;
  const best = channels.slice().sort((a, b) => (b.capacity / (b.activation + 0.08)) - (a.capacity / (a.activation + 0.08)))[0];
  return { series, mean, peak, highDays, best, channels };
}

function run() {
  state.result = simulate(state.profile, state.scenario);
  const alternate = simulate(PRESETS.action, state.scenario);
  els.scenarioTag.textContent = { all: "All channels", no_gaming: "Gaming removed", screen_only: "Screens only", exercise_only: "Exercise only" }[state.scenario];
  els.meanMetric.textContent = state.result.mean.toFixed(2);
  els.peakMetric.textContent = state.result.peak.toFixed(2);
  els.daysMetric.textContent = `${state.result.highDays} / 14`;
  els.recommendation.textContent = state.result.best ? `Start with ${state.result.best.label.toLowerCase()}.` : "No channel is available.";
  els.recommendationWhy.textContent = state.result.best ? `Highest reachable relief for this profile: capacity ${state.result.best.capacity.toFixed(2)}, activation cost ${state.result.best.activation.toFixed(2)}.` : "Add an available relief channel before applying a restriction.";
  drawChart(state.result.series, alternate.series);
  renderComparison(state.result, alternate);
}

function drawChart(primary, alternate) {
  const canvas = els.chart;
  const context = canvas.getContext("2d");
  const width = canvas.clientWidth || 820;
  const height = 200;
  const scale = window.devicePixelRatio || 1;
  canvas.width = width * scale; canvas.height = height * scale; context.setTransform(scale, 0, 0, scale, 0, 0);
  context.clearRect(0, 0, width, height);
  context.strokeStyle = "#e0e8ed"; context.lineWidth = 1;
  [0.25, 0.5, 0.75, 1].forEach((value) => { const y = height - value / 1.5 * height; context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); });
  plot(context, primary, width, height, "#087f83", true); plot(context, alternate, width, height, "#d05c4b", false);
  context.fillStyle = "#63758b"; context.font = "10px system-ui"; context.fillText("load", 5, 13);
}

function plot(context, series, width, height, color, fill) {
  const points = series.map((value, index) => [index / (series.length - 1) * width, height - value / 1.5 * height]);
  context.beginPath(); points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
  if (fill) { context.lineTo(width, height); context.lineTo(0, height); context.closePath(); context.fillStyle = "rgba(8,127,131,.08)"; context.fill(); context.beginPath(); points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y)); }
  context.strokeStyle = color; context.lineWidth = 2.5; context.stroke();
}

function renderComparison(primary, alternate) {
  els.comparisonBars.replaceChildren();
  const rows = [["Custom learner", primary.mean, "primary"], ["Action learner", alternate.mean, "alt"], ["Custom peak", primary.peak, "primary"], ["Action peak", alternate.peak, "alt"]];
  rows.forEach(([label, value, tone]) => {
    const row = document.createElement("div"); row.className = `bar-row ${tone}`;
    const text = document.createElement("span"); text.textContent = label;
    const track = document.createElement("div"); track.className = "bar-track";
    const fill = document.createElement("div"); fill.className = "bar-fill"; fill.style.width = `${Math.min(100, value / 1.5 * 100)}%`; track.append(fill);
    const metric = document.createElement("strong"); metric.textContent = value.toFixed(2);
    row.append(text, track, metric); els.comparisonBars.append(row);
  });
}

function exportScenario() {
  const payload = { product: "PolicyPilot", scenario: state.scenario, pressure: state.pressure, learner_profile: state.profile, simulation: state.result?.series || [], external_data: false, generated_at: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "loadpath-scenario.json"; link.click(); URL.revokeObjectURL(link.href);
}

window.addEventListener("resize", () => { if (state.result) drawChart(state.result.series, simulate(PRESETS.action, state.scenario).series); });
init();
