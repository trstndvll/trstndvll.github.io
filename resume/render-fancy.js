(function () {
  function renderSelectedWork() {
    var container = document.getElementById('selected-work-list');
    resumeData.selectedWork.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'card work-card';

      var header = document.createElement('div');
      header.className = 'exp-header';
      header.appendChild(ResumeShared.createStrongTitle(item.title));
      article.appendChild(header);

      var ul = document.createElement('ul');
      ul.className = 'exp-bullets';
      var li = document.createElement('li');
      li.innerHTML = item.body;
      ul.appendChild(li);
      article.appendChild(ul);

      container.appendChild(article);
    });
  }

  function renderExperience() {
    var container = document.getElementById('experience-list');
    resumeData.experience.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'card work-card';

      var header = document.createElement('div');
      header.className = 'exp-header';
      header.appendChild(ResumeShared.createRoleTitle(item.role, item.company, item.location));
      var date = document.createElement('span');
      date.className = 'exp-date';
      date.textContent = item.dates;
      header.appendChild(date);
      article.appendChild(header);
      ResumeShared.appendBulletsAsList(article, item.bullets);

      container.appendChild(article);
    });
  }

  function renderSkills() {
    var container = document.getElementById('skills-groups');
    Object.keys(resumeData.skills).forEach(function (label) {
      var group = document.createElement('div');
      group.className = 'skill-group';

      var skillLabel = document.createElement('p');
      skillLabel.className = 'skill-label';
      skillLabel.textContent = label;
      group.appendChild(skillLabel);

      var tags = document.createElement('div');
      tags.className = 'tags';
      resumeData.skills[label].forEach(function (tag) {
        var span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tags.appendChild(span);
      });
      group.appendChild(tags);
      container.appendChild(group);
    });
  }

  function renderEducation() {
    var container = document.getElementById('education-list');
    resumeData.educationAndCerts.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'card';

      var badge = document.createElement('span');
      badge.className = 'edu-badge';
      badge.textContent = item.badge;
      article.appendChild(badge);

      var title = document.createElement('h3');
      title.className = 'edu-title';
      title.textContent = item.title;
      article.appendChild(title);

      var inst = document.createElement('p');
      inst.className = 'edu-inst';
      inst.textContent = item.institution;
      article.appendChild(inst);

      var dates = document.createElement('p');
      dates.className = 'edu-dates';
      dates.textContent = item.dates;
      article.appendChild(dates);

      container.appendChild(article);
    });
  }

  function renderVolunteering() {
    var container = document.getElementById('volunteering-list');
    resumeData.volunteering.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'card';

      var title = document.createElement('h3');
      title.className = 'edu-title';
      title.textContent = item.title;
      article.appendChild(title);

      var org = document.createElement('p');
      org.className = 'edu-inst';
      org.textContent = item.org;
      article.appendChild(org);

      var dates = document.createElement('p');
      dates.className = 'edu-dates';
      dates.textContent = item.dates;
      article.appendChild(dates);

      ResumeShared.appendBulletsAsList(article, item.bullets);
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
