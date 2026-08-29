(function () {
  function renderSelectedWork() {
    var container = document.getElementById('selected-work-list');
    resumeData.selectedWork
      .filter(function (item) { return item.includeInAts !== false; })
      .forEach(function (item) {
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
      article.appendChild(ResumeShared.createTitleWithDetail(item.title, item.institution));
      article.appendChild(ResumeShared.createDateLine(item.dates));
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

  ResumeShared.onReady(render);
})();
