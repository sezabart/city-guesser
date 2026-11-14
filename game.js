/* Guess the City — game engine.
 *
 * Deliberately plain ES5: no modules, no arrow functions, no template strings,
 * no fetch, no classList, no addEventListener chaining. Everything is built with
 * document.createElement. This is the kind of JavaScript a 10-year-old TV
 * browser can actually run: it just needs var, functions and getTime().
 *
 * Keyboard model (works with a remote or a normal keyboard):
 *   arrows      move the highlight in the grid
 *   1–7         answer directly
 *   OK / Enter  press the highlighted button
 */
(function () {
  "use strict";

  var ROUND_SIZE = 10;   // questions per round; the bank may be larger
  var PER_ROW = 4;       // choices per row, so up/down can jump a whole row
  var GUARD_MS = 400;    // ignore answers this soon after a new photo appears,
                         // otherwise a held-down remote OK answers for you

  var QUIZ = window.QUIZ || [];
  var app = document.getElementById("app");
  var st = null;

  /* ---------------------------------------------------------------- helpers */

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.appendChild(document.createTextNode(text));
    return node;
  }

  function clear() {
    while (app.firstChild) app.removeChild(app.firstChild);
  }

  function shuffle(list) {
    var i, j, tmp;
    for (i = list.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list;
  }

  function now() {
    return new Date().getTime();
  }

  /* ------------------------------------------------------- what was seen */

  // The bank is bigger than a round, so a round prefers photographs that have
  // not come up yet and only repeats when the unseen ones run out. Progress is
  // kept in localStorage; a browser without storage still skips within the
  // session, it just forgets between visits.
  var STORE = "cityguesser.seen.v1";
  var SEP = "|";

  // Photographs played before the game kept track of itself. Written into the
  // store once, on the first run after this ships, so the TV does not hand back
  // a city that has already been seen. "Forget what I have seen" clears it.
  var SEEN_SEED = [
    "Paris", "Porto", "Istanbul", "Tbilisi", "Chicago", "S\u00e3o Paulo",
    "Seoul", "Hong Kong", "Valletta", "Havana", "Hanoi", "Marrakesh",
    "Naples", "Rotterdam", "Bergen", "Cairo", "Reykjav\u00edk", "Genoa",
    "Krak\u00f3w", "Bangkok", "Taipei", "Mexico City", "Jerusalem",
    "Valpara\u00edso", "Zanzibar City", "Buenos Aires", "Montreal",
    "Melbourne", "Athens", "Moscow", "Lisbon", "Berlin", "Riga",
    "Bucharest", "Bogota", "Busan", "Auckland", "Accra", "Kolkata"
  ];

  var seenMem = null;   // stands in for localStorage where there is none

  function inList(list, value) {
    var i;
    for (i = 0; i < list.length; i++) if (list[i] === value) return true;
    return false;
  }

  function seenRead() {
    var raw = null, parts, out = [], i;
    try { raw = window.localStorage.getItem(STORE); } catch (e) { raw = null; }
    if (raw === null) return null;
    parts = String(raw).split(SEP);
    for (i = 0; i < parts.length; i++) if (parts[i]) out.push(parts[i]);
    return out;
  }

  function seenWrite(list) {
    seenMem = list;
    try { window.localStorage.setItem(STORE, list.join(SEP)); } catch (e) {}
  }

  function seenList() {
    var list = seenRead();
    if (list === null) {                 // first run here, or no storage at all
      list = seenMem ? seenMem.slice() : SEEN_SEED.slice();
      seenWrite(list);
    }
    return list;
  }

  function seenAdd(city) {
    var list = seenList();
    if (inList(list, city)) return;
    list.push(city);
    seenWrite(list);
  }

  function seenForget() {
    seenWrite([]);
  }

  function unseenCount() {
    var seen = seenList(), n = 0, i;
    for (i = 0; i < QUIZ.length; i++) if (!inList(seen, QUIZ[i].city)) n++;
    return n;
  }

  function buttons() {
    return app.getElementsByTagName("button");
  }

  function focusedIndex() {
    var all = buttons(), i;
    for (i = 0; i < all.length; i++) {
      if (all[i] === document.activeElement) return i;
    }
    return -1;
  }

  function setFocus(index) {
    var all = buttons();
    if (index < 0 || index >= all.length) return;
    st.focus = index;
    try { all[index].focus(); } catch (e) {}
  }

  function focusNode(node) {
    try { node.focus(); } catch (e) {}
  }

  function photo(src, label) {
    var node = el("div", "photo");
    node.style.backgroundImage = "url('" + src + "')";
    node.setAttribute("role", "img");
    node.setAttribute("aria-label", label);
    return node;
  }

  function preloadAhead(offset) {
    var i = st.pos + offset;
    if (i < st.order.length) {
      var img = new Image();
      img.src = QUIZ[st.order[i]].image;
    }
  }

  /* -------------------------------------------------------------------- hud */

  function hud() {
    var total = st.order.length;
    var bar = el("div", "hud");

    bar.appendChild(el("span", "", "Question " + (st.pos + 1) + " of " + total));

    var pips = el("span", "pips"), i;
    for (i = 0; i < total; i++) {
      pips.appendChild(el("i", i < st.pos ? "done" : (i === st.pos ? "now" : "")));
    }
    bar.appendChild(pips);

    var score = el("span", "score", "Score ");
    score.appendChild(el("b", "", String(st.score)));
    bar.appendChild(score);

    return bar;
  }

  /* --------------------------------------------------------------- screens */

  function showTitle() {
    st = { screen: "title" };
    clear();

    var wrap = el("div", "wrap center");

    var title = el("h1", "title");
    title.appendChild(document.createTextNode("GUESS"));
    title.appendChild(el("br"));
    title.appendChild(document.createTextNode("THE "));
    title.appendChild(el("span", "", "CITY"));
    wrap.appendChild(title);

    wrap.appendChild(el("p", "sub",
      "Ten photographs out of a bank of " + QUIZ.length + ", in a different " +
      "order every round. Seven choices each, and nothing to go on but " +
      "streets, roofs and skylines."));

    var fresh = unseenCount();
    if (fresh === 0) {
      wrap.appendChild(el("p", "note", "Every photograph in the bank has been " +
        "played. The next round starts the cycle again \u2014 or forget the " +
        "history below."));
    } else if (fresh < ROUND_SIZE) {
      wrap.appendChild(el("p", "note", "Only " + fresh + " photograph" +
        (fresh === 1 ? "" : "s") + " left that you have not seen, so this " +
        "round fills up with repeats."));
    } else {
      wrap.appendChild(el("p", "note", fresh + " of the " + QUIZ.length +
        " photographs are still new to you. Those come up before any repeat."));
    }

    var go = el("button", "start");
    go.type = "button";
    go.appendChild(document.createTextNode("Start"));
    go.onclick = start;
    wrap.appendChild(go);

    var forget = el("button", "ghost");
    forget.type = "button";
    forget.appendChild(document.createTextNode("Forget what I have seen"));
    forget.onclick = function () { seenForget(); showTitle(); };
    wrap.appendChild(forget);

    wrap.appendChild(el("div", "hint",
      "ARROWS TO MOVE BETWEEN BUTTONS \u00b7 OK TO CHOOSE"));

    var links = el("div", "small");
    var credits = el("a", "", "PHOTO CREDITS");
    credits.href = "#";
    credits.onclick = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      showCredits();
      return false;
    };
    links.appendChild(credits);
    wrap.appendChild(links);

    app.appendChild(wrap);
    focusNode(go);
  }

  function start() {
    var seen = seenList(), fresh = [], old = [], i, order;

    // unseen photographs first, then the ones seen longest ago (the store is
    // kept in the order they were played, so old[0] is the oldest)
    for (i = 0; i < QUIZ.length; i++) {
      if (inList(seen, QUIZ[i].city)) old.push(i);
      else fresh.push(i);
    }

    if (!fresh.length) {          // whole bank played: begin the cycle again
      seenForget();
      fresh = old;
      old = [];
    }

    shuffle(fresh);
    order = fresh.concat(old).slice(0, Math.min(ROUND_SIZE, QUIZ.length));
    shuffle(order);

    st = {
      screen: "q",
      order: order,
      pos: 0,
      score: 0,
      results: [],
      options: [],
      focus: 0,
      lock: 0,
      advanceBtn: null
    };
    showQuestion();
  }

  function showQuestion() {
    var q = QUIZ[st.order[st.pos]];
    var i, btn;

    seenAdd(q.city);
    st.options = shuffle(q.choices.slice());
    st.screen = "q";
    st.lock = now() + GUARD_MS;
    clear();

    var wrap = el("div", "wrap");
    wrap.appendChild(hud());
    wrap.appendChild(photo(q.image, "Photograph of an unidentified city"));
    wrap.appendChild(el("div", "ask", "Which city is this?"));

    var box = el("div", "choices");
    for (i = 0; i < st.options.length; i++) {
      btn = el("button", "choice");
      btn.type = "button";
      btn.appendChild(el("span", "n", String(i + 1)));
      btn.appendChild(document.createTextNode(st.options[i]));
      btn.onclick = makeChooser(i);
      btn.onfocus = makeFocuser(i);
      box.appendChild(btn);
    }
    wrap.appendChild(box);
    wrap.appendChild(el("div", "hint",
      "ARROWS TO MOVE \u00b7 OK TO ANSWER \u00b7 OR PRESS NUMBERS 1\u20137"));

    app.appendChild(wrap);

    setFocus(0);
    preloadAhead(1);
    preloadAhead(2);
  }

  function makeChooser(index) {
    return function () { choose(index); };
  }

  function makeFocuser(index) {
    return function () {
      if (st && st.screen === "q") st.focus = index;
    };
  }

  function choose(index) {
    if (!st || st.screen !== "q") return;
    if (now() < st.lock) return;

    var city = st.options[index];
    if (!city) return;

    var answer = QUIZ[st.order[st.pos]].city;
    var ok = city === answer;

    if (ok) st.score++;
    st.results.push({ city: answer, ok: ok, picked: city });

    showVerdict(ok, city);
  }

  function showVerdict(ok, picked) {
    var q = QUIZ[st.order[st.pos]];
    var last = st.pos === st.order.length - 1;

    st.screen = "v";
    clear();

    var wrap = el("div", "wrap");
    wrap.appendChild(hud());

    var body = el("div", "fb");
    body.appendChild(photo(q.image, "Photograph of " + q.city));

    var col = el("div", "col");
    col.appendChild(el("div", ok ? "badge ok" : "badge no",
      ok ? "\u2713 Correct" : "\u2717 Not quite"));
    col.appendChild(el("div", "kicker", ok ? "That was" : "It was"));
    col.appendChild(el("h1", "", q.city));
    if (!ok) col.appendChild(el("p", "picked", "You picked " + picked + "."));
    col.appendChild(el("p", "fact", q.fact));

    var next = el("button", "next");
    next.type = "button";
    next.appendChild(document.createTextNode(
      last ? "See your score" : "Next photo"));
    next.appendChild(el("span", "arw", "\u00a0\u00a0\u2192"));
    next.onclick = advance;
    col.appendChild(next);

    body.appendChild(col);
    wrap.appendChild(body);
    app.appendChild(wrap);

    st.advanceBtn = next;
    focusNode(next);
  }

  function showFinal() {
    var total = st.order.length;
    var r = rating(st.score, total);
    var i;

    st.screen = "final";
    clear();

    var wrap = el("div", "wrap center end");

    wrap.appendChild(el("div", "kicker", "Final score"));

    var big = el("div", "scoreline", String(st.score));
    big.appendChild(el("small", "", "/" + total));
    wrap.appendChild(big);

    wrap.appendChild(el("h1", "endtitle", r[0]));
    wrap.appendChild(el("p", "sub", r[1]));

    var list = el("div", "answers");
    for (i = 0; i < st.results.length; i++) {
      list.appendChild(el("span", st.results[i].ok ? "ok" : "no",
        (st.results[i].ok ? "\u2713 " : "\u2717 ") + st.results[i].city));
    }
    wrap.appendChild(list);

    var again = el("button", "start");
    again.type = "button";
    again.appendChild(document.createTextNode("Play again"));
    again.onclick = start;
    wrap.appendChild(again);

    var links = el("div", "small");
    var credits = el("a", "", "PHOTO CREDITS");
    credits.href = "#";
    credits.onclick = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      showCredits();
      return false;
    };
    links.appendChild(credits);
    wrap.appendChild(links);

    app.appendChild(wrap);

    st.advanceBtn = again;
    focusNode(again);
  }

  function showCredits() {
    var i, colA, colB, half;

    st.screen = "credits";
    clear();

    var wrap = el("div", "credits-screen");
    wrap.appendChild(el("h1", "", "Photo credits"));

    var back = el("button", "back");
    back.type = "button";
    back.appendChild(document.createTextNode("\u2190 Back"));
    back.onclick = showTitle;
    wrap.appendChild(back);

    var cols = el("div", "credit-cols");
    colA = el("ul");
    colB = el("ul");
    half = Math.ceil(QUIZ.length / 2);

    for (i = 0; i < QUIZ.length; i++) {
      var q = QUIZ[i];
      var li = el("li");
      li.appendChild(el("b", "", q.city));
      li.appendChild(document.createTextNode(" \u2014 " + q.credit.author +
        " (" + q.credit.license + "), "));
      var link = el("a", "", "source");
      link.href = q.credit.page;
      link.target = "_blank";
      li.appendChild(link);
      (i < half ? colA : colB).appendChild(li);
    }

    cols.appendChild(colA);
    cols.appendChild(colB);
    wrap.appendChild(cols);

    app.appendChild(wrap);

    st.advanceBtn = back;
    focusNode(back);
  }

  function advance() {
    if (st.screen === "v") {
      if (st.pos + 1 >= st.order.length) showFinal();
      else {
        st.pos++;
        showQuestion();
      }
    } else if (st.screen === "final") {
      start();
    }
  }

  function rating(score, total) {
    var p = total ? score / total : 0;
    if (score === total) return ["Honorary local", "Every one of them. You could give the walking tour."];
    if (p >= 0.8) return ["Seasoned traveller", "Close to perfect \u2014 you read buildings, not guidebooks."];
    if (p >= 0.6) return ["Weekend explorer", "Solid. A few of these were genuinely obscure."];
    if (p >= 0.4) return ["Tourist with a map", "Half the world is still foreign to you. Press on."];
    if (p >= 0.15) return ["Armchair tourist", "The architecture was talking. Try listening next time."];
    return ["Lost in transit", "At least the photographs were nice."];
  }

  /* --------------------------------------------------------------- keyboard */

  function stop(e) {
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }

  function move(delta) {
    var all = buttons();
    var current = focusedIndex();
    if (current < 0) current = st.focus || 0;
    var target = current + delta;
    if (target < 0 || target >= all.length) return;
    setFocus(target);
  }

  function pickByNumber(n) {
    if (n >= 1 && n <= st.options.length) choose(n - 1);
  }

  function onKey(e) {
    e = e || window.event;
    var key = e.keyCode || e.which;
    var delta;
    if (!st) return;

    if (st.screen === "q") {
      if (key >= 48 && key <= 57) { stop(e); pickByNumber(key - 48); return; }       // 1–9
      if (key >= 96 && key <= 105) { stop(e); pickByNumber(key - 96); return; }      // numpad
    }

    // Arrows work on every screen: in the answer grid up/down jump a whole row,
    // elsewhere they simply step to the next button (Start / Forget history).
    delta = 0;
    if (key === 37) delta = -1;
    else if (key === 39) delta = 1;
    else if (key === 38) delta = st.screen === "q" ? -PER_ROW : -1;
    else if (key === 40) delta = st.screen === "q" ? PER_ROW : 1;
    if (delta) { stop(e); move(delta); return; }

    // On the verdict / final / credits screens there is exactly one thing to
    // press, so Enter or Space anywhere should do it — even if focus was lost.
    if (key === 13 || key === 32) {
      if (focusedIndex() < 0 && st.advanceBtn) {
        stop(e);
        st.advanceBtn.click();
      }
    }
  }

  /* ------------------------------------------------------------------- init */

  if (document.addEventListener) {
    document.addEventListener("keydown", onKey, false);
  } else if (document.attachEvent) {
    document.attachEvent("onkeydown", onKey);
  }

  if (QUIZ.length) {
    showTitle();
  } else {
    app.appendChild(el("p", "sub", "No quiz data loaded."));
  }
})();
