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
