from pathlib import Path
import shutil

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).parent
OUT = ROOT / "demo"
TARGET = OUT / "loadpath_demo_2026-09-06.webm"


def main() -> None:
    OUT.mkdir(exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            record_video_dir=str(OUT),
            record_video_size={"width": 1440, "height": 900},
        )
        page = context.new_page()
        video = page.video
        page.goto("http://127.0.0.1:8788/?demo=1", wait_until="networkidle")
        page.wait_for_timeout(1600)
        assert page.get_by_role("heading", name="Pressure trajectory").is_visible()
        assert page.get_by_text("Mean unresolved load").is_visible()
        page.screenshot(path=str(OUT / "loadpath_start.png"), full_page=False)

        page.select_option("#scenario", "no_gaming")
        page.get_by_role("button", name="Run 14-day simulation").click()
        page.wait_for_timeout(1300)
        assert page.locator("#scenarioTag").get_by_text("Gaming removed").is_visible()
        page.screenshot(path=str(OUT / "loadpath_gaming_removed.png"), full_page=False)

        page.get_by_role("button", name="Action learner").click()
        page.wait_for_timeout(1300)
        assert page.get_by_text("Same policy, another learner").is_visible()
        page.screenshot(path=str(OUT / "loadpath_counterfactual.png"), full_page=False)

        with page.expect_download() as download_info:
            page.get_by_role("button", name="Export scenario").click()
        download = download_info.value
        assert download.suggested_filename == "loadpath-scenario.json"
        download.save_as(str(OUT / "loadpath-scenario.json"))

        page.close()
        context.close()
        source = Path(video.path())
        if source != TARGET:
            shutil.copyfile(source, TARGET)
        browser.close()
    print(f"Captured {TARGET}")


if __name__ == "__main__":
    main()
