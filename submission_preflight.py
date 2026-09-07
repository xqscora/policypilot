from pathlib import Path
import json
import subprocess


ROOT = Path(__file__).parent
REQUIRED = ["index.html", "styles.css", "app.js", "README.md", "SUBMISSION.md"]


def main() -> None:
    missing = [name for name in REQUIRED if not (ROOT / name).exists()]
    if missing:
        raise SystemExit(f"missing files: {', '.join(missing)}")

    payload = ROOT / "DEVPOST_FIELD_PAYLOAD.json"
    json.loads(payload.read_text(encoding="utf-8"))

    subprocess.run(["node", "--check", "app.js"], cwd=ROOT, check=True)

    demo_dir = ROOT / "demo"
    screenshots = [
        demo_dir / "policypilot_start.png",
        demo_dir / "policypilot_gaming_removed.png",
        demo_dir / "policypilot_counterfactual.png",
    ]
    missing_screenshots = [str(path.relative_to(ROOT)) for path in screenshots if not path.exists()]
    if missing_screenshots:
        raise SystemExit(f"missing demo screenshots: {', '.join(missing_screenshots)}")

    video = demo_dir / "next_founders_policypilot_5min.webm"
    if not video.exists() or video.stat().st_size < 1000:
        raise SystemExit("missing or empty demo video")

    scenario = json.loads((demo_dir / "policypilot-scenario.json").read_text(encoding="utf-8"))
    if scenario.get("external_data") is not False:
        raise SystemExit("scenario export must declare external_data=false")

    print("PolicyPilot submission preflight: OK (local-only data boundary)")


if __name__ == "__main__":
    main()
