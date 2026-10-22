# BatchNotes v2

A free class study space. Live: https://dev-stack12692.github.io/batchnotes/

- Teacher and student email/password accounts; notebooks follow the account across devices.
- 8-character batch codes, teacher approval, member revocation.
- Browser-encrypted PDFs, titles, class announcements and saved notebook marks.
- PDF pen, highlighter, text, sticky notes, mark eraser, undo/redo, zoom, autosave and annotated PDF export.
- Find answers: local PDF text search with quoted passages and clickable page references. No model or API required.
- Optional experimental WebLLM local AI: explicit download consent, no API key or server inference. SmolLM2-360M-Instruct-q4f16_1-MLC, about 207 MB model files plus runtime/cache overhead. Requires WebGPU and shader-f16 support. Not validated on physical Android tablets. Quality is limited; verify citations. Default local search remains available.

## Privacy model
New v2 content uses AES-256-GCM and a 256-bit key derived from a separate batch passphrase with PBKDF2-SHA256 (310,000 rounds and a random per-batch salt). The passphrase/key remains in tab memory and must be re-entered after reload. Firebase access rules require approved membership or batch ownership to fetch content. Copies are readable only by their owner's account; the encryption key itself is shared by the batch, not individually derived for each student.

This is client-side batch encryption, NOT independently audited E2EE. Account emails, batch names, membership, timestamps and sizes are metadata visible to Firebase. Teachers must share passphrases separately and approve only known students. A revoked member may retain downloaded content and the old key; no automatic key rotation exists. Create a new batch/passphrase for confidential future material after revocation. Lost passphrases cannot be recovered. A compromised client, altered app code or malicious member can expose content. Dependencies load from public CDNs.

Legacy v1 is preserved at `legacy.html`, in separate original Firebase collections. Legacy data is NOT encrypted and retains its old access model. It is never silently migrated. Start new secure batches for v2.

## Free-plan limits
Firebase Spark Auth + Firestore, GitHub Pages hosting. No billing card, paid storage, API key or paid inference. PDFs remain capped at 4 MB; Firestore total storage and daily operations are shared quotas, not unlimited capacity. Base64/encryption adds storage overhead. Image-only scans need OCR before text search works. Eraser only removes added annotations, never PDF source text. Export embeds marks but is not redaction; Latin text is supported by the bundled export font, some non-Latin characters may require keeping the online notebook. Not a full Samsung Notes replacement.

## Setup
Static HTML/JS; serve with any local server. Firebase config is public project configuration, not a server secret. Publish `firestore.rules` in Firebase before using v2. Do not add privileged credentials to source. New secure collections are `v2users`, `v2codes`, `v2batches`.

## Screenshots
![Teacher dashboard v1](shots/teacher.png)
![Student notebook v1](shots/student.png)
