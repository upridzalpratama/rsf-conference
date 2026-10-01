/* Scholarvein bilingual toggle (EN default <-> ID)
   Base HTML text = English. Elements carry data-id="Indonesian".
   Optional attribute translations: data-id-placeholder, data-id-alt, data-id-aria-label. */
(function () {
  var KEY = 'sv-lang';
  var ATTRS = ['placeholder', 'alt', 'aria-label'];

  function capture(el) {
    if (el.dataset.enbase === undefined) el.dataset.enbase = el.innerHTML;
    ATTRS.forEach(function (a) {
      if (el.hasAttribute('data-id-' + a) && el.dataset['en_' + a] === undefined) {
        el.dataset['en_' + a] = el.getAttribute(a) || '';
      }
    });
  }

  function apply(lang) {
    document.querySelectorAll('[data-id]').forEach(function (el) {
      capture(el);
      el.innerHTML = lang === 'id' ? el.dataset.id : el.dataset.enbase;
    });
    ATTRS.forEach(function (a) {
      document.querySelectorAll('[data-id-' + a + ']').forEach(function (el) {
        capture(el);
        el.setAttribute(a, lang === 'id' ? el.getAttribute('data-id-' + a) : el.dataset['en_' + a]);
      });
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.textContent = lang === 'id' ? 'EN' : 'ID';
      b.setAttribute('aria-label', lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia');
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function current() {
    try { return localStorage.getItem(KEY) === 'id' ? 'id' : 'en'; } catch (e) { return 'en'; }
  }

  function toggle() { apply(current() === 'id' ? 'en' : 'id'); }

  window.SVLang = { apply: apply, toggle: toggle, current: current };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.addEventListener('click', toggle);
    });
    apply(current());
  });
})();
