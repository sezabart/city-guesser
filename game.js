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

    var go = el("button", "start");
    go.type = "button";
    go.appendChild(document.createTextNode("Start"));
    go.onclick = start;
    wrap.appendChild(go);

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
    var order = [], i;
    for (i = 0; i < QUIZ.length; i++) order.push(i);
    shuffle(order);
    order = order.slice(0, Math.min(ROUND_SIZE, order.length));

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
      delta = 0;
      if (key === 37) delta = -1;
      else if (key === 39) delta = 1;
      else if (key === 38) delta = -PER_ROW;
      else if (key === 40) delta = PER_ROW;
      if (delta) { stop(e); move(delta); return; }
      return;  // Enter/Space: the focused button handles it natively
    }

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
