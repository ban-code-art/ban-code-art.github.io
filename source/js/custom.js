// Welcome console message
console.log('%c Rhine\'s Blog %c https://ban-code-art.github.io',
  'color: #fff; background: #4c9bff; padding: 5px 10px; border-radius: 4px 0 0 4px;',
  'color: #4c9bff; background: #f0f4ff; padding: 5px 10px; border-radius: 0 4px 4px 0;'
);

// Click firework effect
(function() {
  function createFirework(x, y) {
    var colors = ['#4c9bff', '#6366f1', '#f472b6', '#a78bfa', '#34d399', '#fbbf24'];
    var particleCount = 12;
    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:6px;height:6px;border-radius:50%;pointer-events:none;z-index:99999;opacity:1;background:' + colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(particle);

      var angle = (Math.PI * 2 / particleCount) * i;
      var distance = 30 + Math.random() * 40;
      var tx = Math.cos(angle) * distance;
      var ty = Math.sin(angle) * distance;

      (function(p, tx, ty) {
        p.offsetWidth;
        p.style.transition = 'all 0.6s ease-out';
        p.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(0)';
        p.style.opacity = '0';
        setTimeout(function() {
          if (p.parentNode) p.parentNode.removeChild(p);
        }, 700);
      })(particle, tx, ty);
    }
  }

  document.addEventListener('click', function(e) {
    createFirework(e.clientX, e.clientY);
  });
})();

// Scroll-triggered entrance animation
(function() {
  function initScrollReveal() {
    var items = document.querySelectorAll('.recent-post-item, #aside-content .card-widget');
    if (!items.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.classList.add('scroll-visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(function(item) {
      observer.observe(item);
    });
  }

  document.addEventListener('DOMContentLoaded', initScrollReveal);
  document.addEventListener('pjax:complete', initScrollReveal);
})();

// Pjax compatibility: re-execute bangumi scripts after page switch
document.addEventListener('pjax:complete', function() {
  var scripts = document.querySelectorAll('#article-container script');
  scripts.forEach(function(script) {
    var newScript = document.createElement('script');
    if (script.src) {
      newScript.src = script.src;
    } else {
      newScript.textContent = script.textContent;
    }
    script.parentNode.replaceChild(newScript, script);
  });
});

// Mouse trail shadow effect
(function() {
  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) return;

  var trail = [];
  var trailLength = 8;
  var colors = ['rgba(76,155,255,0.6)', 'rgba(99,102,241,0.5)', 'rgba(167,139,250,0.4)', 'rgba(244,114,182,0.3)', 'rgba(52,211,153,0.25)', 'rgba(76,155,255,0.2)', 'rgba(99,102,241,0.15)', 'rgba(167,139,250,0.1)'];

  for (var i = 0; i < trailLength; i++) {
    var dot = document.createElement('div');
    dot.style.cssText = 'position:fixed;pointer-events:none;z-index:99998;border-radius:50%;top:0;left:0;opacity:0;transition:opacity 0.3s;';
    var size = 12 - i;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.background = colors[i];
    dot.style.boxShadow = '0 0 ' + (6 - Math.floor(i / 2)) + 'px ' + colors[i];
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  var mouseX = 0, mouseY = 0;
  var isMoving = false;
  var hideTimer = null;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    for (var i = 0; i < trailLength; i++) {
      trail[i].el.style.opacity = '1';
    }
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function() {
      isMoving = false;
      for (var i = 0; i < trailLength; i++) {
        trail[i].el.style.opacity = '0';
      }
    }, 300);
  });

  function animate() {
    trail[0].x = mouseX;
    trail[0].y = mouseY;
    for (var i = 1; i < trailLength; i++) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35;
    }
    for (var i = 0; i < trailLength; i++) {
      var size = 12 - i;
      trail[i].el.style.left = (trail[i].x - size / 2) + 'px';
      trail[i].el.style.top = (trail[i].y - size / 2) + 'px';
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
