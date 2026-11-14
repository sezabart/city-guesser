#!/usr/bin/env python3
"""Generate the Guess the City game as pure HTML.

No JavaScript anywhere. The score is carried in the *filename* of the page
(q3-2.html = question 3, two right so far), so every state the game can be in
is a real, linkable, cacheable HTML file. That is the whole trick.

Run:  python3 build.py
"""

import json
import os
import random

HERE = os.path.dirname(os.path.abspath(__file__))
QUESTIONS = 8

# --------------------------------------------------------------------------
# The quiz. First city in `choices` is always the correct answer;
# the order is shuffled per question at build time (fixed seed = stable site).
# --------------------------------------------------------------------------

QUIZ = [
    dict(
        city="Paris",
        image="images/01-paris.jpg",
        fact="Grey zinc mansard roofs, a forest of chimney pots, and the same "
             "cream stone facade repeating for kilometres. Haussmann rebuilt the "
             "city in the 1860s and it never stopped looking like this.",
        choices=["Paris", "Lyon", "Bordeaux", "Brussels", "Vienna", "Milan", "Barcelona"],
    ),
    dict(
        city="Porto",
        image="images/02-porto.jpg",
        fact="Terracotta roofs stacked up a granite hillside, with staircases "
             "squeezed between the houses. Portugal's second city, on the Douro.",
        choices=["Porto", "Lisbon", "Bilbao", "Málaga", "Vigo", "Cádiz", "A Coruña"],
    ),
    dict(
        city="Istanbul",
        image="images/03-istanbul.jpg",
        fact="Painted timber bay windows — cumbalar — draped in vines. These are "
             "the old apartment hills above the Golden Horn.",
        choices=["Istanbul", "İzmir", "Ankara", "Thessaloniki", "Baku", "Beirut", "Sofia"],
    ),
    dict(
        city="Tbilisi",
        image="images/04-tbilisi.jpg",
        fact="Entire floors hang out over the cliff on wooden balconies. "
             "Tbilisi's Old Town does not believe in straight walls.",
        choices=["Tbilisi", "Yerevan", "Batumi", "Baku", "Trabzon", "Tehran", "Tashkent"],
    ),
    dict(
        city="Chicago",
        image="images/05-chicago.jpg",
        fact="The skyscraper was invented here. The river runs through a canyon "
             "of steel and glass, with bascule bridges crossing it every block.",
        choices=["Chicago", "Toronto", "Boston", "Philadelphia", "Minneapolis",
                 "Cleveland", "Seattle"],
    ),
    dict(
        city="São Paulo",
        image="images/06-saopaulo.jpg",
        fact="No sea, no famous monument, no horizon — just an ocean of high-rises "
             "running past the haze in every direction.",
        choices=["São Paulo", "Mexico City", "Bogotá", "Lima", "Rio de Janeiro",
                 "Buenos Aires", "Santiago"],
    ),
    dict(
        city="Seoul",
        image="images/07-seoul.jpg",
        fact="Rows of near-identical apartment blocks along the Han, with granite "
             "hills and a TV tower poking up behind them.",
        choices=["Seoul", "Tokyo", "Busan", "Osaka", "Taipei", "Fukuoka", "Beijing"],
    ),
    dict(
        city="Hong Kong",
        image="images/08-hongkong.jpg",
        fact="Red public minibuses and signboards stacked storey upon storey up a "
             "Mong Kok street.",
        choices=["Hong Kong", "Singapore", "Shenzhen", "Macau", "Guangzhou",
                 "Taipei", "Kuala Lumpur"],
    ),
]

RATINGS = {
    8: ("Honorary local", "Eight out of eight. You could give the walking tour."),
    7: ("Seasoned traveller", "Almost perfect — one city slipped past you."),
    6: ("Seasoned traveller", "Strong. You read buildings, not guidebooks."),
    5: ("Weekend explorer", "Solid. A few of these were genuinely obscure."),
    4: ("Weekend explorer", "Not bad — half the world is still foreign to you."),
    3: ("Tourist with a map", "The architecture was talking; try listening next time."),
    2: ("Tourist with a map", "Rough round. At least the photos were nice."),
    1: ("Armchair tourist", "One point is still a point."),
    0: ("Armchair tourist", "Did you press the buttons at all?"),
}

CH = "choices"  # shorthand used below


def shuffle_choices(index, options):
    """Deterministic shuffle so rebuilding the site doesn't reshuffle answers."""
    opts = list(options)
    random.Random(1000 + index).shuffle(opts)
    return opts


def head(title):
    return (
        "<!doctype html>\n"
        '<html lang="en">\n'
        "<head>\n"
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
        f"<title>{title}</title>\n"
        '<link rel="stylesheet" href="style.css">\n'
        "</head>\n"
    )


def hud(question, score, total=QUESTIONS, extreme=False):
    pips = []
    for i in range(total):
        if i < question - 1:
            cls = "done"
        elif i == question - 1:
            cls = "now"
        else:
            cls = ""
        pips.append(f'<i class="{cls}"></i>' if cls else "<i></i>")
    qtext = "Final score" if extreme else f"Question {question} of {total}"
    return (
        '<div class="hud">'
        f"<span>{qtext}</span>"
        f'<span class="pips">{"".join(pips)}</span>'
        f'<span class="score">Score <b>{score}</b></span>'
        "</div>\n"
    )


def question_page(qi, score):
    """qi is 0-based question index, score is correct answers so far."""
    q = QUIZ[qi]
    n = qi + 1
    opts = shuffle_choices(qi, q[CH])
    rows = []
    for k, name in enumerate(opts):
        num = k + 1
        if name == q["city"]:
            href = f"q{n}-{score}-right.html"
        else:
            href = f"q{n}-{score}-wrong.html"
        rows.append(
            f'<a class="choice" href="{href}" accesskey="{num}">'
            f'<span class="n">{num}</span>{name}</a>'
        )

    body = (
        "<body>\n"
        '<div class="wrap">\n'
        + hud(n, score)
        + f'<div class="photo" style="background-image:url(\'{q["image"]}\')" '
          'role="img" aria-label="Photograph of an unidentified city"></div>\n'
        '<div class="ask">Which city is this?</div>\n'
        '<div class="choices">\n  ' + "\n  ".join(rows) + "\n</div>\n"
        '<div class="hint">ARROWS TO MOVE &middot; OK TO ANSWER &middot; OR PRESS NUMBERS 1&ndash;7</div>\n'
        "</div>\n"
        "</body>\n"
        "</html>\n"
    )
    return head(f"Guess the City &middot; {n}/{QUESTIONS}") + body


def verdict_page(qi, score, correct):
    q = QUIZ[qi]
    n = qi + 1
    if correct:
        new_score = score + 1
        badge = '<div class="badge ok">&#10003; Correct</div>'
        kicker = "That was"
        fact = q["fact"]
    else:
        new_score = score
        badge = '<div class="badge no">&#10007; Not quite</div>'
        kicker = "It was"
        fact = q["fact"]

    if n < QUESTIONS:
        href = f"q{n + 1}-{new_score}.html"
        label = f"Next photo &nbsp;&rarr;&nbsp; {n + 1}/{QUESTIONS}"
    else:
        href = f"end-{new_score}.html"
        label = "See your score &nbsp;&rarr;"

    body = (
        "<body>\n"
        '<div class="wrap">\n'
        + hud(n, new_score)
        + '<div class="fb">\n'
        f'  <div class="photo" style="background-image:url(\'{q["image"]}\')" role="img"'
        f' aria-label="Photograph of {q["city"]}"></div>\n'
        '  <div class="col">\n'
        f"    {badge}\n"
        f'    <div class="kicker">{kicker}</div>\n'
        f'    <h1>{q["city"]}</h1>\n'
        f'    <p class="fact">{fact}</p>\n'
        f'    <a class="next" href="{href}" autofocus>{label}</a>\n'
        "  </div>\n"
        "</div>\n"
        "</div>\n"
        "</body>\n"
        "</html>\n"
    )
    verdict = "Correct" if correct else "Not quite"
    return head(f"{verdict} &middot; {q['city']}") + body


def index_page():
    prefetch = "\n".join(
        f'<link rel="prefetch" href="{q["image"]}">' for q in QUIZ
    )
    body = (
        "<body>\n"
        '<div class="wrap center">\n'
        '<h1 class="title">GUESS<br>THE <span>CITY</span></h1>\n'
        '<p class="sub">Eight photographs. Seven choices each. '
        "No landmarks, no flags, no signs pointing the way &mdash; "
        "just streets, roofs and skylines.</p>\n"
        '<a class="start" href="q1-0.html" autofocus>Start</a>\n'
        '<div class="small">ARROWS TO MOVE &middot; OK TO CHOOSE &middot; '
        'NUMBER KEYS 1&ndash;7 ALSO WORK &middot; <a href="credits.html">PHOTO CREDITS</a></div>\n'
        "</div>\n"
        "</body>\n"
        "</html>\n"
    )
    return head("Guess the City") + body.replace(
        '<link rel="stylesheet" href="style.css">',
        '<link rel="stylesheet" href="style.css">\n' + prefetch,
    )


def end_page(score):
    title, blurb = RATINGS[score]
    body = (
        "<body>\n"
        '<div class="wrap center end">\n'
        + '<div class="kicker">Final score</div>\n'
        + '<div class="scoreline">' + str(score) + "<small>/" + str(QUESTIONS) + "</small></div>\n"
        + f'<h1 class="endtitle">{title}</h1>\n'
        + f'<p class="sub">{blurb}</p>\n'
        + '<a class="start" href="index.html" autofocus>Play again</a>\n'
        + '<div class="small"><a href="credits.html">PHOTO CREDITS</a></div>\n'
        "</div>\n"
        "</body>\n"
        "</html>\n"
    )
    return head(f"{score}/{QUESTIONS} &middot; Guess the City") + body


def credits_page():
    try:
        with open(os.path.join(HERE, "images", "credits.json"), encoding="utf-8") as fh:
            data = json.load(fh)
    except (IOError, ValueError):
        data = []
    city_of = {
        q["image"].split("/")[-1]: q["city"] for q in QUIZ
    }
    items = []
    for c in data:
        city = city_of.get(c["file"], c["file"])
        items.append(
            f'<li><b>{city}</b> &mdash; {c["title"]}, by {c["author"]} '
            f'({c["license"]}), via '
            f'<a href="{c["page"]}">Wikimedia Commons</a>.</li>'
        )
    if not items:
        items = ["<li>Photo credits unavailable.</li>"]
    body = (
        "<body>\n"
        '<div class="credits">\n'
        "<h1>Photo credits</h1>\n"
        "<p>All photographs come from Wikimedia Commons and are used under the "
        "licences listed below.</p>\n"
        "<ul>\n" + "\n".join(items) + "\n</ul>\n"
        '<p class="small"><a href="index.html">&larr; back to the game</a></p>\n'
        "</div>\n"
        "</body>\n"
        "</html>\n"
    )
    return head("Photo credits &middot; Guess the City") + body


def main():
    written = 0
    pages = {"index.html": index_page(), "credits.html": credits_page()}

    for qi in range(QUESTIONS):
        n = qi + 1
        for score in range(qi + 1):          # score can be 0..qi before question n
            pages[f"q{n}-{score}.html"] = question_page(qi, score)
            pages[f"q{n}-{score}-right.html"] = verdict_page(qi, score, True)
            pages[f"q{n}-{score}-wrong.html"] = verdict_page(qi, score, False)

    for score in range(QUESTIONS + 1):
        pages[f"end-{score}.html"] = end_page(score)

    for name, content in pages.items():
        with open(os.path.join(HERE, name), "w", encoding="utf-8") as fh:
            fh.write(content)
        written += 1

    print(f"wrote {written} pages")


if __name__ == "__main__":
    main()
