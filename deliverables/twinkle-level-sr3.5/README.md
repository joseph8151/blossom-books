# Twinkle Level Test Prep Book — SR 3.5

Rewrite of the Twinkle Level test prep book at SR 3.5 (U.S. Grade 3.5 reading
level). Source files: `Twinkle_Level_40_pgsRevised.docx` and
`Twinkle_Level_answer_key_40_pgsRevised.docx`.

## What changed from the original

- **Reading passages** (8) rewritten from scratch at SR 3.5: Flesch-Kincaid
  grade ~2.9–3.9, average sentence length 8–14 words, high-frequency
  vocabulary with at most 1–2 lightly-glossed academic words per passage.
  Verified with `textstat`.
- **Vocabulary section** (60 items) and **Grammar section** (50 items)
  rewritten with SR 3.5-appropriate words and structures. The grammar
  section no longer uses future perfect, past perfect progressive, or
  third conditional — all replaced with simple present/past/future,
  present progressive, light present perfect, first conditional, and
  subject-verb agreement / pronoun / preposition / connector items.
- **Speaking (Interview) and Writing (Essay) prompts** are unchanged in
  wording. Model answers were rewritten to spec and moved out of the
  Student Book:
  - Interview model answers: ~90–110 words, first person, spoken register,
    Grade 2 level — Answer Key only.
  - Essay model answers: ~185–200 words, Intro/Body/Conclusion with
    connectors (first, next, then, also, because, so, however, for
    example, in the end, that is why), Grade 3 level — Answer Key only.
- **Bonus Vocabulary table** (100 words + Korean glosses) carried over
  from the original, since it was already SR 3.5-appropriate.

## Files

- `Twinkle_Level_Test_Prep_Book_SR3.5.docx` — Student Book (questions
  and prompts only; no Interview/Essay model answers).
- `Twinkle_Level_Test_Prep_Book_SR3.5_Answer_Key.docx` — Answer Key
  (reading/vocab/grammar answer rationale + all Interview and Essay
  model answers).

## Note on verification

This sandbox's LibreOffice install could not render any file to PDF
(`soffice --headless --convert-to pdf` fails even on a trivial plain-text
file), so the .docx output was verified by re-opening it with
`python-docx` and checking structure/content/word counts/reading-level
metrics programmatically, rather than by visual PDF proof.
