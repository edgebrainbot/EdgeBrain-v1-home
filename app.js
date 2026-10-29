'use strict';
// Replace this with './' after replacing media paths with your local assets.
const MEDIA_BASE = 'https://luckykantnayak.github.io/mimic-agent/';
const media = window.MEDIA;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroVideo = document.querySelector('.hero-background');
heroVideo.addEventListener('loadedmetadata', () => {
  if (heroVideo.videoWidth && heroVideo.videoHeight) {
    heroVideo.parentElement.style.setProperty('--hero-video-ratio', heroVideo.videoWidth / heroVideo.videoHeight);
  }
});
function url(path) { return new URL(path, new URL(MEDIA_BASE, location.href)).href; }
function makeVideo(item) {
  const figure = document.createElement('figure');
  const video = document.createElement('video');
  video.dataset.src = item.local ? new URL(item.src, document.baseURI).href : url(item.src);
  if (item.poster) video.poster = url(item.poster);
  video.muted = true; video.loop = item.loop === true; video.playsInline = true;
  video.controls = true; video.preload = 'none';
  video.setAttribute('aria-label', item.title);
  const caption = document.createElement('figcaption'); caption.textContent = item.title;
  video.addEventListener('error', () => {
    caption.textContent = item.title + '  -  Video unavailable. Check the URL or replace with a local file.';
    caption.classList.add('media-error');
  });
  const videoStats = {
    'Ours': ['0/20', '1/20', '19/20'],
    'Model Predictive Shielding': ['12/20', '5/20', '3/20'],
    'Real-DRL': ['6/20', '2/20', '12/20'],
    'Neural Simplex': ['9/20', '1/20', '10/20'],
    'Dynamic Residual': ['9/20', '0/20', '11/20'],
    'Fixed Residual': ['6/20', '2/20', '12/20']
  };
  if (item.stats) videoStats[item.title] = item.stats;
  if (videoStats[item.title]) {
    const stats = document.createElement('div');
    stats.className = 'video-stats';
    [
      ['marker-safety', '×', videoStats[item.title][0], 'Safety Violation'],
      ['marker-dead-zone', '—', videoStats[item.title][1], 'Dead-Zone Encounter'],
      ['marker-completion', '✓', videoStats[item.title][2], 'Task Completion']
    ].forEach(([className, symbol, count, label]) => {
      const stat = document.createElement('span');
      stat.setAttribute('aria-label', `${label}: ${count}`);
      const marker = document.createElement('span');
      marker.className = className; marker.textContent = symbol;
      marker.setAttribute('aria-hidden', 'true');
      stat.append(marker, `: ${count}`);
      stats.append(stat);
    });
    figure.append(stats);
  }
  figure.append(video);
  if (item.showCaption !== false && !['Ours', 'Model Predictive Shielding', 'Real-DRL', 'Neural Simplex', 'Dynamic Residual', 'Fixed Residual', 'Side view of skating on two legs', 'Back view of skating on two legs'].includes(item.title)) figure.append(caption);
  return figure;
}

const baselines = media.filter(x => x.group === 'comparison' || x.src.startsWith('Survey_videos/'));
const skillNames = ['Ours', 'Model Predictive Shielding', 'Real-DRL', 'Neural Simplex', 'Dynamic Residual', 'Fixed Residual'];
document.querySelectorAll('#comparison, #comparison-repeat').forEach(comparison => {
for (let row = 0; row < skillNames.length; row++) {
  if (comparison.id === 'comparison-repeat' && skillNames[row] === 'Fixed Residual') continue;
  const tr = document.createElement('tr'); const th = document.createElement('th');
  th.scope = 'row';
  const ablationNames = ['Blending+Cognitive+Switching', 'Cognitive+Switching', 'Blending+Switching', 'Blending+Cognitive', 'Blending+Random'];
  th.textContent = comparison.id === 'comparison-repeat'
    ? (ablationNames[row] || skillNames[row]) : skillNames[row];
  tr.append(th);
  baselines.slice(row * 3, row * 3 + 1).forEach(item => {
    const videoItem = comparison.id === 'comparison-repeat' && row === 0
      ? {...item, local: false, src: 'https://www.dropbox.com/scl/fi/cnbnpsnrc01ldti2n4pje/ed_Bledning-cognitive-switching.mp4?rlkey=tfj9j6zaf299zk37rdu0w2p01&raw=1'}
      : comparison.id === 'comparison-repeat' && row === 1
        ? {...item, stats: ['12/20', '0/20', '8/20'], local: false, src: 'https://www.dropbox.com/scl/fi/zoog7pgeblnlbkm7lry87/ed_cognitive-switching.mp4?rlkey=0fn421cjlqsi6bnynhs09cjel&raw=1'}
        : comparison.id === 'comparison-repeat' && row === 2
          ? {...item, stats: ['3/20', '1/20', '16/20'], local: false, src: 'https://www.dropbox.com/scl/fi/04bfnr484rnqsdjbi3mrv/ed_blending-switching.mp4?rlkey=kiwurlnybzjxx3roti6uo014u&raw=1'}
          : comparison.id === 'comparison-repeat' && row === 3
            ? {...item, stats: ['4/20', '2/20', '14/20'], local: false, src: 'https://www.dropbox.com/scl/fi/9mtn03bg5ybrfsbhllain/ed_blending-cognitive.mp4?rlkey=0yvkshy5reljubgjrh670bkkd&raw=1'}
            : comparison.id === 'comparison-repeat' && row === 4
              ? {...item, stats: ['15/20', '2/20', '3/20'], local: false, src: 'https://www.dropbox.com/scl/fi/lg2li48a0del238s18b9i/ed_blending-random.mp4?rlkey=10zmd4g6phi64k9hheomr9i6z&raw=1'}
              : item;
    const td = document.createElement('td'); td.append(makeVideo(videoItem)); tr.append(td);
  });
  comparison.append(tr);
}
});
const groups = {skills:'LLM_Skills/',humanoid:'g1_skills/',hardware:'hw/'};
document.querySelectorAll('.carousel').forEach(container => {
  const track = document.createElement('div'); track.className = 'track';
  track.tabIndex = 0; track.setAttribute('aria-label', container.dataset.group + ' video gallery');
  media.filter(x => x.group === container.dataset.group || x.src.startsWith(groups[container.dataset.group])).forEach(item => track.append(makeVideo({...item, loop: container.dataset.group === 'skills'})));
  const controls = document.createElement('div'); controls.className = 'carousel-controls';
  [-1,1].forEach(direction => {
    const button = document.createElement('button'); button.type = 'button';
    button.textContent = direction < 0 ? '<' : '>'; 
    button.setAttribute('aria-label', direction < 0 ? 'Previous video' : 'Next video');
    button.addEventListener('click', () => track.scrollBy({left:direction * (track.firstElementChild.getBoundingClientRect().width + 20),behavior:reducedMotion?'instant':'smooth'}));
    controls.append(button);
  }); container.append(track,controls);
});
// Loading and playback are separate: load near the viewport, play when visible.
function loadVideo(video) { if (!video.src) { video.src = video.dataset.src; video.load(); } }
const videos = [...document.querySelectorAll('video[data-src]')];
document.querySelectorAll('video').forEach(video => {
  video.setAttribute('controlsList', 'nodownload');
  video.addEventListener('contextmenu', event => event.preventDefault());
});
if ('IntersectionObserver' in window) {
  const loader = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { loadVideo(e.target); loader.unobserve(e.target); }
  }), {rootMargin:'250px'});
  const playback = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting && !reducedMotion && !e.target.ended) { loadVideo(e.target); e.target.play().catch(() => {}); }
    else e.target.pause();
  }), {threshold:.2});
  videos.forEach(v => {loader.observe(v); playback.observe(v);});
} else videos.forEach(loadVideo);
const toc = document.querySelector('.toc');
const sections = [...document.querySelectorAll('main section')];
function updateNavigation() {
  toc.classList.toggle('visible', scrollY > document.querySelector('.hero').offsetHeight - 80);
  const current = sections.filter(s => s.getBoundingClientRect().top < innerHeight * .4).pop() || sections[0];
  toc.querySelectorAll('a').forEach(a => {
    const active = a.hash === '#' + current.id; a.classList.toggle('active',active);
    if(active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
  });
}
addEventListener('scroll',updateNavigation,{passive:true}); addEventListener('resize',updateNavigation);updateNavigation();
