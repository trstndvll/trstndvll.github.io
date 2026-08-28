const ResumeShared = {
  CONTACT_ICONS: {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>',
    website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
  },

  renderHeader: function () {
    document.getElementById('header-name').textContent = resumeData.header.name;
    document.getElementById('header-title-badge').textContent = resumeData.header.title;
    document.getElementById('header-bio').textContent = resumeData.header.bio;
  },

  renderContact: function () {
    var container = document.getElementById('contact-list');
    resumeData.contact.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'contact-item';
      a.href = item.href;
      if (item.type === 'linkedin' || item.type === 'github') {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = ResumeShared.CONTACT_ICONS[item.type] + item.label;
      container.appendChild(a);
    });
  },

  renderFooter: function () {
    var website = document.getElementById('footer-website');
    website.href = resumeData.footer.website.href;
    document.getElementById('footer-website-label').textContent = resumeData.footer.website.label;
    document.getElementById('footer-location-text').textContent = resumeData.footer.location;
  },

  createStrongTitle: function (text) {
    var title = document.createElement('p');
    title.className = 'exp-title';
    var strong = document.createElement('strong');
    strong.textContent = text;
    title.appendChild(strong);
    return title;
  },

  createTitleWithDetail: function (primary, detail) {
    var title = document.createElement('p');
    title.className = 'exp-title';
    var strong = document.createElement('strong');
    strong.textContent = primary;
    title.appendChild(strong);
    title.appendChild(document.createTextNode(' · ' + detail));
    return title;
  },

  createRoleTitle: function (role, company, location) {
    return ResumeShared.createTitleWithDetail(role + ' — ' + company, location);
  },

  createDateLine: function (dates) {
    var date = document.createElement('p');
    date.className = 'exp-date';
    date.textContent = dates;
    return date;
  },

  appendBulletsAsList: function (parent, bullets) {
    var ul = document.createElement('ul');
    ul.className = 'exp-bullets';
    bullets.forEach(function (text) {
      var li = document.createElement('li');
      li.innerHTML = text;
      ul.appendChild(li);
    });
    parent.appendChild(ul);
  },

  appendBulletsAsParagraphs: function (parent, bullets) {
    bullets.forEach(function (text) {
      var p = document.createElement('p');
      p.className = 'exp-bullet';
      p.innerHTML = text;
      parent.appendChild(p);
    });
  },

  onReady: function (render) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', render);
    } else {
      render();
    }
  }
};
