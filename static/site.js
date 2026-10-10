// Shared header, Google Analytics, and last-updated footer for every main page.
(() => {
  const analyticsId = 'G-8H4LB2MJLK';

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', analyticsId);

  const analytics = document.createElement('script');
  analytics.async = true;
  analytics.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.appendChild(analytics);

  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
  document.head.appendChild(fontAwesome);

  document.getElementById('nav-placeholder').innerHTML = `
    <div class="site-header">
      <div class="profile-card">
        <div class="profile-photo">
          <a href="static/hertz.jpg" target="_blank">
            <img src="static/hertz.jpg" alt="Zachary S. Siegel">
          </a>
        </div>
        <div>
          <h2 class="profile-name">Zachary S. Siegel</h2>
          <p class="profile-details">
            <i>Ph.D. Student</i><br>
            <i>EECS, CSAIL</i><br>
            <i>Massachusetts Institute of Technology</i><br>
            <span class="profile-links">
              <a href="mailto:zss@mit.edu"><i class="fas fa-envelope"></i> Email</a>&nbsp;&nbsp;&nbsp;
              <a href="https://github.com/siegelz"><i class="fab fa-github"></i> GitHub</a>&nbsp;&nbsp;&nbsp;
              <a href="https://scholar.google.com/citations?user=EOPTuH0AAAAJ&hl=en"><i class="fas fa-graduation-cap"></i> Google Scholar</a>
            </span>
          </p>
        </div>
      </div>

      <table class="site-nav">
        <tr>
          <th><a href="index.html">Home</a></th>
          <th><a href="cv.html">CV</a></th>
          <th><a href="research.html">Research Statement</a></th>
          <th><a href="projects.html">Personal Projects</a></th>
        </tr>
      </table>
    </div>
  `;

  const lastUpdated = document.body.dataset.lastUpdated;
  if (lastUpdated) {
    const footer = document.createElement('p');
    footer.className = 'last-updated';
    footer.append('Last Updated: ');

    const time = document.createElement('time');
    time.dateTime = lastUpdated;
    time.textContent = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${lastUpdated}T00:00:00Z`));

    footer.appendChild(time);
    document.body.appendChild(footer);
  }
})();
