/* ============================================================
   MERCEDES-BENZ — ENGINEERING CORE FX
   Shared interaction layer: cursor, tilt, reveal, boot, counters
   ============================================================ */
(function(){

  // ---------- BOOT SEQUENCE ----------
  window.addEventListener('load', function(){
    var boot = document.getElementById('boot');
    if(boot){
      setTimeout(function(){ boot.classList.add('hidden'); }, 900);
    }
  });

  // ---------- MOBILE NAV ----------
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.hud-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){ links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }

  // ---------- CUSTOM CURSOR ----------
  if(matchMedia('(hover:hover)').matches){
    var r = document.createElement('div');
    r.className = 'reticle';
    document.body.appendChild(r);
    var rx=0, ry=0, tx=0, ty=0;
    window.addEventListener('mousemove', function(e){ tx=e.clientX; ty=e.clientY; });
    (function loop(){
      rx += (tx-rx)*.25; ry += (ty-ry)*.25;
      r.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .tilt, .btn').forEach(function(el){
      el.addEventListener('mouseenter', function(){ r.classList.add('pointer'); });
      el.addEventListener('mouseleave', function(){ r.classList.remove('pointer'); });
    });
  }

  // ---------- 3D TILT CARDS ----------
  document.querySelectorAll('.tilt').forEach(function(card){
    var rectCache;
    card.addEventListener('mouseenter', function(){ rectCache = card.getBoundingClientRect(); });
    card.addEventListener('mousemove', function(e){
      var rect = rectCache || card.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var ry = (px - .5) * 14;
      var rx = (.5 - py) * 14;
      card.style.setProperty('--rx', rx + 'deg');
      card.style.setProperty('--ry', ry + 'deg');
      card.style.setProperty('--mx', (px*100) + '%');
      card.style.setProperty('--my', (py*100) + '%');
    });
    card.addEventListener('mouseleave', function(){
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });

  // ---------- SCROLL REVEAL ----------
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: .18 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // ---------- ANIMATED COUNTERS ----------
  document.querySelectorAll('.stat .num[data-count]').forEach(function(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var started = false;
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting && !started){
          started = true;
          var t0 = performance.now(), dur=1400;
          function tick(t){
            var p = Math.min(1, (t-t0)/dur);
            var eased = 1 - Math.pow(1-p, 3);
            var val = target * eased;
            el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
            if(p<1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      });
    }, {threshold:.5});
    obs.observe(el);
  });

  // ---------- NAV SCROLL SHADOW ----------
  var nav = document.querySelector('.hud-nav');
  if(nav){
    window.addEventListener('scroll', function(){
      nav.style.boxShadow = window.scrollY > 40 ? '0 10px 30px rgba(0,0,0,.5)' : 'none';
    });
  }

})();
