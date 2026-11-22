(() => {
  const stage = document.getElementById('stage');
  const baseWidth = 420;
  const baseHeight = 800;
  const margin = 0.85;
  let frame = 0;

  const viewport = () => {
    const vv = window.visualViewport;
    const width = vv ? vv.width * vv.scale : window.innerWidth;
    const height = vv ? vv.height * vv.scale : window.innerHeight;
    return [width || document.documentElement.clientWidth, height || document.documentElement.clientHeight];
  };

  const fit = () => {
    frame = 0;
    const [width, height] = viewport();
    const scale = Math.min(width / baseWidth, height / baseHeight) * margin;
    stage.style.setProperty('--fit', String(Math.round(scale * 10000) / 10000));
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(fit);
  };

  fit();
  new ResizeObserver(schedule).observe(document.documentElement);
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
  window.addEventListener('pageshow', fit);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', schedule, { passive: true });
  if (document.fonts) document.fonts.ready.then(schedule);
})();
