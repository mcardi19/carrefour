document.addEventListener('DOMContentLoaded', function () {
  // =============================================
  // SECTION NAVIGATION
  // =============================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');

  const sectionTitles = {
    'cu-essentials': 'CU Essentials',
    'employee-services': 'Employee Services & Support',
    'teaching-faculty': 'Teaching, Advising & Faculty Support',
    'research': 'Innovation and Research',
    'governance': 'Governance, Equity & Policies',
    'it-services': 'IT, Digital & Communication Services',
    'facilities': 'Facilities, Campus Services & Event Planning',
    'health': 'Health, Wellness & Recreation',
    'community': 'Community & Events',
    'safety': 'Safety & Emergencies'
  };

  function setActiveSection(sectionId) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + sectionId);
    });

    sections.forEach(function (section) {
      section.classList.toggle('active', section.id === sectionId);
    });

    if (breadcrumbCurrent && sectionTitles[sectionId]) {
      breadcrumbCurrent.textContent = sectionTitles[sectionId];
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var sectionId = this.getAttribute('href').replace('#', '');
      setActiveSection(sectionId);
      history.pushState({ section: sectionId }, '', '#' + sectionId);
    });
  });

  var hash = window.location.hash.replace('#', '');
  if (hash && sectionTitles[hash]) {
    setActiveSection(hash);
  }

  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.section) {
      setActiveSection(e.state.section);
    }
  });

  // =============================================
  // TABS
  // =============================================
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = this.getAttribute('data-tab');
      var group = this.closest('.tab-bar').getAttribute('data-tab-group');

      this.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      document.querySelectorAll('.tab-panel[data-tab-group="' + group + '"]').forEach(function (panel) {
        panel.classList.toggle('active', panel.id === targetId);
      });
    });
  });

  // =============================================
  // ACCORDIONS
  // =============================================
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = this.closest('.accordion-item');
      var accordion = this.closest('.accordion');
      var isOpen = item.classList.contains('open');

      accordion.querySelectorAll('.accordion-item').forEach(function (i) {
        i.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
});
