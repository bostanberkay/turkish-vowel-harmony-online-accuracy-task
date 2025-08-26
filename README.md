# Turkish Vowel Harmony Online Accuracy Task for PCIbex

This repository contains the PCIbex experiment script for the online accuracy task used in the research:

**“Eyes on the Pupil Size: Pupillary Sensitivity to Morphophonological Mismatches in Turkish”**  
Ali Çağan Kaya, Berkay Bostan, İpek Pınar Uzun  
Hacettepe University, Ankara University  
alicagank@icloud.com, bostanberkay@outlook.com, pinarbekar@gmail.com

## Task Description

This experiment was developed as part of a broader study examining how vowel harmony mismatches in Turkish affect cognitive processing, particularly within different morphological domains (derivational vs. inflectional). This experiment constitutes the online accuracy task aimed at assessing participants’ explicit sensitivity to vowel harmony congruency.

### Procedure

- Trials were presented one at a time on the screen using PCIbex (farm.pcibex.net).
- Participants were instructed to press **1** for **harmonic** (i.e., acceptable) pseudowords, and **0** for **disharmonic** (i.e., unacceptable) ones.
- Both **accuracy** (1 or 0) and **reaction times** were recorded for each item.
- Items were randomized within three blocks (Part1, Part2, Part3) to control for order effects.
- Transitions between blocks included reminders and optional short breaks.

Participants began with an **ethics agreement form**, followed by instructions and a prompt for entering their ID. The experiment concluded with a debrief screen thanking them for their participation and saving their responses to the server.

This task complemented a pupillometry experiment conducted offline using auditory stimuli, which captured surprisal effects.

## Repository Contents

- `data_includes/main_experiment.js` – Main PCIbex experiment script
- `chunk_includes/Part1.csv`, `Part2.csv` – Dummy stimulus files showing the format (not actual csv files)
- `css_includes/` – Style files for form layout and trial presentation
- `js_includes/` – Supporting scripts for components like buttons, questions, and sentence displays
- `LICENSE` – MIT license
- `README.md` – Project documentation

## Notes

- The contents of `chunk_includes/` include **dummy pseudowords** for demonstration purposes only. The real stimuli used in the study are not included in this repository for ethical and confidentiality reasons.
- The actual code used to run the study is located in `data_includes/main_experiment.js`.
- No participant data is included.
- This repository is shared for transparency and academic reproducibility only.
