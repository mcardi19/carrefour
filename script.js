// Navigation for Carrefour Services & Resources prototype

document.addEventListener('DOMContentLoaded', function () {
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
    // Update nav links
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === '#' + sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update content sections
    sections.forEach(function (section) {
      if (section.id === sectionId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Update breadcrumb
    if (breadcrumbCurrent && sectionTitles[sectionId]) {
      breadcrumbCurrent.textContent = sectionTitles[sectionId];
    }
  }

  // Handle nav link clicks
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const sectionId = href.replace('#', '');
      setActiveSection(sectionId);
      history.pushState({ section: sectionId }, '', '#' + sectionId);
    });
  });

  // Handle hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash && sectionTitles[hash]) {
    setActiveSection(hash);
  }

  // Handle back/forward
  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.section) {
      setActiveSection(e.state.section);
    }
  });
});
