(function () {
  var params = new URLSearchParams(window.location.search);
  var modeParam = params.get('mode');
  var mode = modeParam === 'compact' ? 'compact' : 'full';
  var variantName = params.get('variant');

  document.body.classList.add('mode-' + mode);
  document.title = mode === 'compact'
    ? 'Tristan Douville — Resume (Compact)'
    : 'Tristan Douville — Resume';

  /**
   * Safe error banner: segments are plain strings or { code: string }.
   * Never uses innerHTML — variant query values must not execute as markup.
   */
  function showVariantError(segments) {
    var el = document.getElementById('variant-error');
    el.hidden = false;
    el.textContent = '';
    (Array.isArray(segments) ? segments : [segments]).forEach(function (seg) {
      if (seg && typeof seg === 'object' && Object.prototype.hasOwnProperty.call(seg, 'code')) {
        var code = document.createElement('code');
        code.textContent = String(seg.code);
        el.appendChild(code);
        return;
      }
      el.appendChild(document.createTextNode(String(seg)));
    });
  }

  function renderSelectedWork() {
    var container = document.getElementById('selected-work-list');
    var items = resumeData.selectedWork;
    if (mode === 'compact') {
      items = items.filter(function (item) { return item.includeInAts !== false; });
    }

    items.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'work-card';
      article.appendChild(ResumeShared.createStrongTitle(item.title));

      var body = document.createElement('p');
      body.className = 'work-body';
      body.innerHTML = item.body;
      article.appendChild(body);

      container.appendChild(article);
    });
  }

  function renderExperience() {
    var container = document.getElementById('experience-list');
    resumeData.experience.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'work-card exp-entry';
      article.appendChild(ResumeShared.createRoleTitle(item.role, item.company, item.location, item.companyUrl));
      article.appendChild(ResumeShared.createDateLine(item.dates));
      ResumeShared.appendBulletsAsParagraphs(article, item.bullets);
      container.appendChild(article);
    });
  }

  function renderSkills() {
    var container = document.getElementById('skills-groups');
    var article = document.createElement('article');
    article.className = 'work-card skills-block';

    Object.keys(resumeData.skills).forEach(function (category) {
      var line = document.createElement('p');
      line.className = 'skill-line';
      var label = document.createElement('strong');
      label.textContent = category + ':';
      line.appendChild(label);
      line.appendChild(document.createTextNode(' ' + resumeData.skills[category].join(', ')));
      article.appendChild(line);
    });

    container.appendChild(article);
  }

  function renderEducation() {
    var container = document.getElementById('education-list');
    resumeData.educationAndCerts.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'work-card edu-entry';
      article.appendChild(
        ResumeShared.createTitleWithDetail(item.title, item.institution + ' · ' + item.dates)
      );
      container.appendChild(article);
    });
  }

  function renderVolunteering() {
    var container = document.getElementById('volunteering-list');
    resumeData.volunteering.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'work-card volunteer-entry';
      article.appendChild(ResumeShared.createTitleWithDetail(item.title, item.org));
      article.appendChild(ResumeShared.createDateLine(item.dates));
      ResumeShared.appendBulletsAsParagraphs(article, item.bullets);
      container.appendChild(article);
    });
  }

  function render() {
    ResumeShared.renderHeader();
    ResumeShared.renderContact();
    renderSelectedWork();
    renderExperience();
    renderSkills();
    renderEducation();
    renderVolunteering();
    ResumeShared.renderFooter();
  }

  function loadVariantThenRender(name) {
    if (!/^[a-z0-9-]+$/.test(name)) {
      showVariantError([
        'Invalid variant name ',
        { code: name },
        '. Use lowercase letters, numbers, and hyphens only.'
      ]);
      render();
      return;
    }

    var script = document.createElement('script');
    script.src = '../resume-variants/' + name + '.js';
    script.onload = function () {
      if (typeof resumeVariant === 'undefined') {
        showVariantError([
          'Variant ',
          { code: name },
          ' loaded but did not define ',
          { code: 'resumeVariant' },
          '.'
        ]);
        render();
        return;
      }
      resumeData = ResumeMerge.deepMerge(resumeData, resumeVariant);
      document.title = document.title + ' · ' + name;
      render();
    };
    script.onerror = function () {
      showVariantError([
        'Could not load variant ',
        { code: name },
        '. Expected local file ',
        { code: 'resume-variants/' + name + '.js' },
        ' (gitignored — only available when running locally).'
      ]);
      render();
    };
    document.head.appendChild(script);
  }

  function start() {
    if (variantName) {
      loadVariantThenRender(variantName);
    } else {
      render();
    }
  }

  ResumeShared.onReady(start);
})();
