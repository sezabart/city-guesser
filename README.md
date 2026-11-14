# Guess the City

**Live: https://sezabart.github.io/city-guesser/**

A city-guessing game for a TV and a remote control. Ten photographs per round,
drawn at random from a bank of forty-three, seven choices each, and nothing to go on
but streets, roofs and skylines. Plain HTML, one stylesheet, and a small piece
of deliberately old-fashioned JavaScript.

## Play it

Open `index.html`, or point the TV browser at the URL above.

- **← ↑ → ↓** move the highlight (up/down jump a whole row)
- **OK / Enter** answer
- **1–7** answer directly

If you are testing on a laptop, the arrow keys work there too — the game moves
the highlight itself instead of relying on the browser.

## How it works

| File | What it is |
| --- | --- |
| `index.html` | The only page; renders every screen |
| `quiz-data.js` | The quiz: 43 cities, facts, seven options each, photo credits |
| `game.js` | The engine: shuffle, screens, keyboard, score, what has been seen |
| `style.css` | The whole design, sized for a TV |
| `images/` | 1600×900 JPEGs, pre-cropped |

Each round draws ten out of the bank, unseen photographs first, and shuffles the
seven options for every question — so two rounds are never quite the same, while
the answer is always in the same place in the data (`city`).

JavaScript is ES5 on purpose: `var`, functions, `document.createElement`.
No modules, no arrow functions, no template strings, no `fetch`, no
`classList`, no frameworks. That is the level of JavaScript an older smart-TV
browser is likely to run.

Answers are ignored for 400 ms after a new photo appears, so a held-down remote
OK button cannot answer for you before you have looked at the picture.

## What you have already seen

A round prefers photographs you have not been shown yet. Repeats only turn up
once the unseen ones run out — the oldest first — and once the whole bank has
been played the cycle starts again from nothing.

The record is a list of city names in the browser's `localStorage`, under
`cityguesser.seen.v1`: no account, no server, nothing to sign into. The title
screen says how many photographs are still new and has a **Forget what I have
seen** button (the arrow keys reach it) for a clean slate. If a browser has no
storage the game still skips within the session; it just forgets between
visits.

`SEEN_SEED` at the top of `game.js` holds the cities played before the game
remembered anything. It is written into the store on the first run and then
stops mattering — trim or empty it once the history has taken over.

## Add a city

Add an entry to `quiz-data.js`, drop a 1600×900 JPEG in `images/`, done. The
round size lives at the top of `game.js` (`ROUND_SIZE`).

```js
{
  city: "Paris",
  image: "images/01-paris.jpg",
  fact: "Shown on the verdict screen.",
  choices: ["Paris", "Lyon", "Bordeaux", "Brussels", "Vienna", "Milan", "Barcelona"],
  credit: { author: "Pline", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/..." }
}
```

## Design notes

- Sized in `vh`/`vw` with the outer 3–4% kept clear, so 720p, 1080p and
  overscanning TVs all work.
- The focused answer goes solid yellow with a white ring — readable from a sofa.
- Photos are deliberately not postcard landmarks, and distractors are cities on
  the same continent or with similar building stock.
- All photographs are from Wikimedia Commons (CC0, CC BY, CC BY-SA); authors and
  licences are listed on the in-game credits screen.

## Publish

Pages serves `main` from the repo root — push and it rebuilds in about a minute.
No build step, no Actions workflow.
