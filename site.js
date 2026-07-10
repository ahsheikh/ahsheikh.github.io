  // Mobile nav toggle
  (function(){
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('navToggle');
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); });
    });
  })();

  // Reveal on scroll — progressive enhancement only.
  // Content is visible by default (see CSS); we only opt into the
  // hide/reveal animation once we know JS + IntersectionObserver work,
  // and respect prefers-reduced-motion.
  (function(){
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!('IntersectionObserver' in window) || reduceMotion) return;
    document.documentElement.classList.add('js-reveal');
    var items = document.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function(el){ io.observe(el); });
  })();

  // Email reveal (kept out of static HTML to deter basic scraping)
  (function(){
    var btn = document.getElementById('emailBtn');
    var label = document.getElementById('emailLabel');
    var user = 'hanangul12', domain = 'yahoo.co.uk';
    btn.addEventListener('click', function(){
      var addr = user + '@' + domain;
      window.location.href = 'mailto:' + addr;
      label.textContent = addr;
    });
  })();

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
