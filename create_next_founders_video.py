from __future__ import annotations

import shutil
import subprocess
import sys
import time
from pathlib import Path

from imageio_ffmpeg import get_ffmpeg_exe
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).parent
DEMO = ROOT / "demo"
SILENT = DEMO / "next_founders_policypilot_silent.webm"
AUDIO = DEMO / "next_founders_narration.wav"
FINAL = DEMO / "next_founders_policypilot_5min.webm"


def record() -> Path:
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", "8898"],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        time.sleep(1.0)
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            context = browser.new_context(
                viewport={"width": 1440, "height": 900},
                record_video_dir=str(DEMO),
                record_video_size={"width": 1440, "height": 900},
            )
            page = context.new_page()
            page.goto("http://127.0.0.1:8898/?demo=1", wait_until="networkidle")
            page.wait_for_timeout(4000)

            # Product framing and the initial state.
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(26000)

            # Baseline interaction.
            page.locator("#runBtn").click()
            page.wait_for_timeout(58000)

            # Policy counterfactual: remove one channel.
            page.select_option("#scenario", "no_gaming")
            page.locator("#runBtn").click()
            page.wait_for_timeout(52000)

            # Profile counterfactual under the same policy.
            page.get_by_role("button", name="Action learner").click()
            page.wait_for_timeout(50000)

            # Show the receipt and research grounding.
            page.evaluate("window.scrollTo(0, 760)")
            page.wait_for_timeout(44000)

            # Show the business wedge and privacy boundary.
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(44000)

            # Return to the live output for the close.
            page.evaluate("window.scrollTo(0, 220)")
            page.wait_for_timeout(38000)

            page.close()
            video_path = Path(page.video.path())
            context.close()
            browser.close()
            shutil.copyfile(video_path, SILENT)
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
    return SILENT


def mux() -> None:
    ffmpeg = get_ffmpeg_exe()
    command = [
        ffmpeg,
        "-y",
        "-i",
        str(SILENT),
        "-i",
        str(AUDIO),
        "-map",
        "0:v:0",
        "-map",
        "1:a:0",
        "-c:v",
        "libvpx-vp9",
        "-b:v",
        "1.4M",
        "-c:a",
        "libopus",
        "-b:a",
        "96k",
        "-shortest",
        str(FINAL),
    ]
    subprocess.run(command, check=True)


if __name__ == "__main__":
    DEMO.mkdir(exist_ok=True)
    if not AUDIO.exists():
        raise SystemExit(f"Missing narration: {AUDIO}")
    record()
    mux()
    print(f"Created {FINAL}")
