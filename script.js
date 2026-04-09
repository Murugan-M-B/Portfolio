/* ══════════════════════════════════════════════════
   MURUGAN M B — Script.js (Brick Red Portfolio)
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  var html = document.documentElement;
  var body = document.body;




  /* ══ SCROLL PROGRESS ══ */
  var pbar = document.getElementById('pbar');
  window.addEventListener('scroll', function () {
    if (!pbar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    pbar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });

  /* ══ NAV STUCK ══ */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('stuck', window.scrollY > 50);
  }, { passive: true });

  /* ══ MOBILE MENU ══ */
  var menuBtn = document.getElementById('menuBtn');
  var mobNav = document.getElementById('mobileNav');
  if (menuBtn && mobNav) {
    menuBtn.addEventListener('click', function () {
      mobNav.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });
    mobNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobNav.classList.remove('open');
        menuBtn.classList.remove('open');
      });
    });
  }

  /* ══ SMOOTH SCROLL ══ */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

  /* ══ ACTIVE NAV ══ */
  var nls = document.querySelectorAll('.nl');
  if ('IntersectionObserver' in window && nls.length) {
    var nObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        nls.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('section[id]').forEach(function (s) { nObs.observe(s); });
  }

  /* ══ HERO REVEAL ══ */
  var heroEls = document.querySelectorAll('.reveal-hero');
  heroEls.forEach(function (el) {
    var d = parseInt(el.getAttribute('data-delay') || '0', 10);
    setTimeout(function () { el.classList.add('shown'); }, 400 + d * 150);
  });

  /* ══ TYPING ANIMATION ══ */
  var typeTarget = document.getElementById('typeTarget');
  if (typeTarget) {
    var phrases = ['Java Developer', 'Spring Boot Expert', 'Graphic Designer', 'Problem Solver', 'UI Crafter'];
    var pi = 0, ci = 0, deleting = false;
    function typeLoop() {
      var phrase = phrases[pi];
      if (!deleting) {
        typeTarget.textContent = phrase.slice(0, ci + 1);
        ci++;
        if (ci >= phrase.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
        setTimeout(typeLoop, 80);
      } else {
        typeTarget.textContent = phrase.slice(0, ci - 1);
        ci--;
        if (ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
        setTimeout(typeLoop, 40);
      }
    }
    setTimeout(typeLoop, 1200);
  }

  /* ══ SCROLL REVEAL ══ */
  setTimeout(function () {
    if (!('IntersectionObserver' in window)) return;
    var revs = document.querySelectorAll('.reveal');
    revs.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 40 && r.bottom > 0) el.classList.add('shown');
    });
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.target.classList.contains('shown')) return;
        var el = entry.target;
        var sibs = Array.from(el.parentElement.querySelectorAll(':scope > .reveal'));
        var idx = sibs.indexOf(el);
        var delayAttr = parseInt(el.getAttribute('data-delay-reveal') || '0', 10);
        setTimeout(function () { el.classList.add('shown'); }, Math.min(idx * 100 + delayAttr * 120, 500));
        rObs.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    revs.forEach(function (el) { if (!el.classList.contains('shown')) rObs.observe(el); });
  }, 200);

  /* ══ STAT COUNTERS ══ */
  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, end = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(end)) return;
        var cur = 0, step = end / 40;
        (function tick() {
          cur = Math.min(cur + step, end);
          el.textContent = Math.floor(cur);
          if (cur < end) requestAnimationFrame(tick); else el.textContent = end;
        })();
        cObs.unobserve(el);
      });
    }, { threshold: 0.7 });
    document.querySelectorAll('[data-count]').forEach(function (el) { cObs.observe(el); });
  }

  /* ══ MAGNETIC BUTTONS ══ */
  document.querySelectorAll('.mag').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      btn.style.transform = 'translate(' +
        (e.clientX - r.left - r.width / 2) * 0.08 + 'px,' +
        (e.clientY - r.top - r.height / 2) * 0.08 + 'px)';
    });
    btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
  });


  /* ══ 3D TILT CARDS ══ */
  document.querySelectorAll('.tilt-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg) translateZ(10px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(function () { card.style.transition = ''; }, 500);
    });
  });

  /* ══ PARALLAX BLOBS ══ */
  var blobs = document.querySelectorAll('[data-parallax]');
  if (blobs.length) {
    window.addEventListener('mousemove', function (e) {
      var cx = (e.clientX / window.innerWidth - 0.5) * 2;
      var cy = (e.clientY / window.innerHeight - 0.5) * 2;
      blobs.forEach(function (b) {
        var s = parseFloat(b.getAttribute('data-parallax')) || 0.03;
        b.style.transform = 'translate(' + (cx * s * 100) + 'px,' + (cy * s * 100) + 'px)';
      });
    }, { passive: true });
  }

  /* ══ HERO PARTICLE CANVAS ══ */
  var hCanvas = document.getElementById('heroCanvas');
  if (hCanvas && hCanvas.getContext) {
    var hCtx = hCanvas.getContext('2d');
    var hPts = [], hMx = window.innerWidth / 2, hMy = window.innerHeight / 2;
    function hResize() { hCanvas.width = window.innerWidth; hCanvas.height = window.innerHeight; }
    hResize();
    window.addEventListener('resize', hResize, { passive: true });
    for (var pi = 0; pi < 30; pi++) {
      hPts.push({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: Math.random() * 1.4 + 0.4
      });
    }
    document.addEventListener('mousemove', function (e) { hMx = e.clientX; hMy = e.clientY; }, { passive: true });
    function hDraw() {
      hCtx.clearRect(0, 0, hCanvas.width, hCanvas.height);
      var col = '180,40,30';
      hPts.forEach(function (p) {
        p.x += p.vx + (hMx - hCanvas.width / 2) * 0.001;
        p.y += p.vy + (hMy - hCanvas.height / 2) * 0.001;
        if (p.x < 0) p.x = hCanvas.width; if (p.x > hCanvas.width) p.x = 0;
        if (p.y < 0) p.y = hCanvas.height; if (p.y > hCanvas.height) p.y = 0;
        hCtx.beginPath(); hCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        hCtx.fillStyle = 'rgba(' + col + ',' + (0.12 + p.r * 0.04) + ')'; hCtx.fill();
      });
      for (var i = 0; i < hPts.length; i++) {
        for (var j = i + 1; j < hPts.length; j++) {
          var dx = hPts[i].x - hPts[j].x, dy = hPts[i].y - hPts[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            hCtx.beginPath(); hCtx.moveTo(hPts[i].x, hPts[i].y); hCtx.lineTo(hPts[j].x, hPts[j].y);
            hCtx.strokeStyle = 'rgba(' + col + ',' + (0.05 * (1 - d / 110)) + ')'; hCtx.lineWidth = 0.5; hCtx.stroke();
          }
        }
      }
      requestAnimationFrame(hDraw);
    }
    hDraw();
  }

  /* ══ ORBIT ROTATION ══ */
  var arena = document.getElementById('orbitArena');

  if (arena) {
    var items = arena.querySelectorAll('.orbit-item');
    var count = items.length;
    var angle = 0;
    var speed = 0.05;
    var paused = false;

    // 👇 Responsive ellipse radius calculation
    var getRadii = function () {
      var w = window.innerWidth;
      if (w < 400) {
        arena.classList.add('linear-mode');
        return { x: 0, y: 0 };
      }
      arena.classList.remove('linear-mode');
      if (w < 480) return { x: 140, y: 140 };
      if (w < 768) return { x: 220, y: 200 };
      return { x: 380, y: 300 };
    };

    var radii = getRadii();
    window.addEventListener('resize', function () { radii = getRadii(); }, { passive: true });

    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        paused = true;
        arena.classList.add('has-hover');
        item.classList.add('is-hovered');
      });
      item.addEventListener('mouseleave', function () {
        paused = false;
        arena.classList.remove('has-hover');
        item.classList.remove('is-hovered');
      });
    });

    // store sizes once
    var itemSizes = [];
    items.forEach(function (item) {
      itemSizes.push({
        halfW: item.offsetWidth / 2 || 55,
        halfH: item.offsetHeight / 2 || 45
      });
    });

    function orbitTick() {
      if (!paused) angle += speed;

      var centerX = arena.offsetWidth / 2;
      var centerY = arena.offsetHeight / 2;

      items.forEach(function (item, i) {
        var a = (angle + (i * 360 / count)) * (Math.PI / 180);

        var x = Math.cos(a) * radii.x;
        var y = Math.sin(a) * radii.y;

        var halfW = itemSizes[i].halfW;
        var halfH = itemSizes[i].halfH;

        item.style.left = '0px';
        item.style.top = '0px';
        item.style.transform = 'translate3d(' + (centerX + x - halfW) + 'px, ' + (centerY + y - halfH) + 'px, 0)';
      });

      requestAnimationFrame(orbitTick);
    }

    orbitTick();
  }

  /* ══ VIDEO INTERACTION ══ */
  function setupVideo(vidId, ovId, btnId) {
    var vid = document.getElementById(vidId);
    var ov = document.getElementById(ovId);
    var btn = document.getElementById(btnId);
    if (!vid || !ov) return;

    vid.addEventListener('error', function () {
      ov.innerHTML = '<span style="color:var(--txt3);font-size:.85rem">Video unavailable</span>';
    });

    function togglePlay() {
      if (vid.paused) {
        vid.play().catch(function () { });
        ov.classList.add('playing');
      } else {
        vid.pause();
        ov.classList.remove('playing');
      }
    }

    ov.addEventListener('click', togglePlay);

    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        togglePlay();
      });
    }

    // Hover play for wrapper
    var wrapper = vid.closest('.vid-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', function () {
        vid.play().catch(function () { });
        ov.classList.add('playing');
      });
      wrapper.addEventListener('mouseleave', function () {
        vid.pause();
        ov.classList.remove('playing');
      });
    }
  }
  setupVideo('vid1', 'vov1', 'sc-demo-btn');
  setupVideo('vid2', 'vov2', 'gg-demo-btn');


  /* ══ LIGHTBOX ══ */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  var lbBackdrop = document.getElementById('lbBackdrop');

  document.querySelectorAll('.slider-slide').forEach(function (item) {
    item.addEventListener('click', function () {
      var src = item.getAttribute('data-src');
      if (!src || !lb || !lbImg) return;
      lbImg.src = src;
      lb.hidden = false;
      setTimeout(function () { lb.classList.add('active'); }, 10);
      body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('active');
    setTimeout(function () { lb.hidden = true; lbImg.src = ''; }, 350);
    body.style.overflow = '';
  }
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

  /* ══ CONTACT FORM ══ */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Stop conventional form submission

      var btn = document.getElementById('fBtn');
      var txt = document.getElementById('fTxt');
      var ico = document.getElementById('fIco');
      var ok = document.getElementById('cfOk');
      var err = document.getElementById('cfErr');
      var name = (document.getElementById('fn').value || '').trim();
      var mail = (document.getElementById('fe').value || '').trim();
      var subj = (document.getElementById('fs').value || '').trim();
      var msg = (document.getElementById('fm').value || '').trim();

      ok.classList.add('hidden'); err.classList.add('hidden');

      if (!name || !mail || !msg) {
        err.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please fill name, email &amp; message.';
        err.classList.remove('hidden'); shake(form); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        err.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter a valid email.';
        err.classList.remove('hidden'); shake(form); return;
      }

      btn.disabled = true;
      txt.textContent = 'Sending...';
      ico.className = 'fa-solid fa-circle-notch fa-spin';

      // Submit via EmailJS
      // NOTE: You must replace 'YOUR_SERVICE_ID' with your actual EmailJS Service ID (e.g. service_xxxx)
      emailjs.sendForm('service_iojs1eh', 'template_9wdg5ah', form)
        .then(function () {
          btn.disabled = false;
          txt.textContent = 'Send Message';
          ico.className = 'fa-solid fa-arrow-right';
          ok.classList.remove('hidden');
          form.reset();
          setTimeout(function () { ok.classList.add('hidden'); }, 5000);
        }, function (error) {
          btn.disabled = false;
          txt.textContent = 'Send Message';
          ico.className = 'fa-solid fa-arrow-right';
          console.error('EmailJS Error:', error);
          err.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Something went wrong. Please try again.';
          err.classList.remove('hidden'); shake(form);
        });
    });
  }

  function shake(el) {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'frmShake .38s ease';
  }

  /* ══ PREMIUM CURSOR + SPOTLIGHT ══ */
  if (window.matchMedia('(hover:hover)').matches) {
    var dot = document.getElementById('cur-dot');
    var ring = document.getElementById('cur-ring');
    var spotlight = document.getElementById('cur-spotlight');
    if (dot && ring) {
      var mx = -500, my = -500, rx = -500, ry = -500, sx = -500, sy = -500;
      body.classList.add('cur-ready');

      document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
      }, { passive: true });

      (function raf() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        if (spotlight) {
          sx += (mx - sx) * 0.06;
          sy += (my - sy) * 0.06;
          spotlight.style.left = sx + 'px';
          spotlight.style.top = sy + 'px';
        }
        requestAnimationFrame(raf);
      })();

      document.querySelectorAll('a,button,.tilt-card,.vid-wrapper,.slider-slide,.ach-card,.orbit-item').forEach(function (el) {
        el.addEventListener('mouseenter', function () { ring.classList.add('hov'); });
        el.addEventListener('mouseleave', function () { ring.classList.remove('hov'); });
      });

      document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; ring.style.opacity = '0'; if (spotlight) spotlight.style.opacity = '0'; });
      document.addEventListener('mouseenter', function () { dot.style.opacity = ''; ring.style.opacity = ''; if (spotlight) spotlight.style.opacity = ''; });
    }
  }

}); /* end DOMContentLoaded */

/* Inject shake keyframes */
var _k = document.createElement('style');
_k.textContent = '@keyframes frmShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}';
document.head.appendChild(_k);