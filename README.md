# Guess the City

**Live: https://sezabart.github.io/city-guesser/**

A city-guessing game for a TV and a remote control. Ten photographs per round,
drawn at random from a bank of sixteen, seven choices each, and nothing to go on
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
| `quiz-data.js` | The quiz: 16 cities, facts, seven options each, photo credits |
| `game.js` | The engine: shuffle, screens, keyboard, score |
| `style.css` | The whole design, sized for a TV |
| `images/` | 1600×900 JPEGs, pre-cropped |

Each round shuffles the full bank, takes ten, and shuffles the seven options for
every question — so two rounds are never quite the same, while the answer is
always in the same place in the data (`city`).

JavaScript is ES5 on purpose: `var`, functions, `document.createElement`.
No modules, no arrow functions, no template strings, no `fetch`, no
`classList`, no frameworks. That is the level of JavaScript an older smart-TV
browser is likely to run.

Answers are ignored for 400 ms after a new photo appears, so a held-down remote
OK button cannot answer for you before you have looked at the picture.

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
