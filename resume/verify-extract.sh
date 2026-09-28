#!/usr/bin/env bash
# Print a resume URL to PDF (Chrome headless) and extract text with pdftotext.
# Usage:
#   ./resume/verify-extract.sh                         # canonical full
#   ./resume/verify-extract.sh compact                 # canonical compact
#   ./resume/verify-extract.sh full abebooks           # variant full
#   ./resume/verify-extract.sh compact abebooks        # variant compact
#
# Requires: local server on PORT (default 8000), Google Chrome, poppler (pdftotext).
# Output: resume/_verify-<label>.pdf + stdout text (gitignored via resume/**/*.pdf).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MODE="${1:-full}"
VARIANT="${2:-}"
PORT="${PORT:-8000}"
BASE="http://127.0.0.1:${PORT}/resume/"

if [[ "$MODE" != "full" && "$MODE" != "compact" ]]; then
  echo "Usage: $0 [full|compact] [variant-name]" >&2
  exit 1
fi

QUERY="mode=${MODE}"
LABEL="${MODE}"
if [[ -n "$VARIANT" ]]; then
  if [[ ! "$VARIANT" =~ ^[a-z0-9-]+$ ]]; then
    echo "Invalid variant name: $VARIANT" >&2
    exit 1
  fi
  QUERY="${QUERY}&variant=${VARIANT}"
  LABEL="${MODE}-${VARIANT}"
fi

URL="${BASE}?${QUERY}"
OUT_PDF="${ROOT}/resume/_verify-${LABEL}.pdf"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [[ ! -x "$CHROME" ]]; then
  echo "Chrome not found at: $CHROME" >&2
  echo "Set CHROME=/path/to/chrome or install Google Chrome." >&2
  exit 1
fi

if ! command -v pdftotext >/dev/null 2>&1; then
  echo "pdftotext not found. Install with: brew install poppler" >&2
  exit 1
fi

if ! curl -sf -o /dev/null "$URL"; then
  echo "Cannot reach $URL — start a server first: python3 -m http.server ${PORT}" >&2
  exit 1
fi

# Give JS (and optional variant script) time to render before print.
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=5000 \
  --print-to-pdf="$OUT_PDF" \
  "$URL" >/dev/null 2>&1

echo "=== PDF: $OUT_PDF ==="
echo "=== URL: $URL ==="
echo "=== pdftotext (layout) ==="
pdftotext -layout "$OUT_PDF" -
echo
echo "=== Section order check ==="
TEXT="$(pdftotext "$OUT_PDF" -)"
python3 - "$TEXT" <<'PY'
import sys
text = sys.argv[1]
# Section titles are CSS text-transform: uppercase in the PDF
markers = [
    "SELECTED WORK",
    "PRODUCT EXPERIENCE",
    "SKILLS & TOOLS",
    "EDUCATION & CERTIFICATIONS",
    "VOLUNTEERING",
]
upper = text.upper()
positions = []
ok = True
for m in markers:
    i = upper.find(m)
    positions.append((m, i))
    if i < 0:
        print(f"MISSING: {m}")
        ok = False

for a, b in zip(positions, positions[1:]):
    if a[1] >= 0 and b[1] >= 0 and a[1] > b[1]:
        print(f"OUT OF ORDER: {a[0]!r} (pos {a[1]}) after {b[0]!r} (pos {b[1]})")
        ok = False

if ok and all(p[1] >= 0 for p in positions):
    print("OK: sections appear top-to-bottom in expected order")
    for m, i in positions:
        print(f"  {i:5d}  {m}")
else:
    sys.exit(2)
PY
