// Mobile menu
  const siteHeader = document.getElementById('site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  function setMenu(open) {
    mobileMenu.classList.toggle('open', open);
    mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileMenuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  }
  mobileMenuBtn.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
  document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width:1024px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  // Header shadow on scroll
  function onScroll() { siteHeader.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight the nav link of the section in view
  const spyLinks = document.querySelectorAll('[data-spy]');
  const spyTargets = ['purpose','why-us','courses','apply','faq','location']
    .map(id => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          spyLinks.forEach(a => a.classList.toggle('active', a.dataset.spy === en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyTargets.forEach(t => spy.observe(t));
  }

  // Pre-select dropdowns from CTAs
  function preselectCourse(courseName) {
    const el = document.getElementById('courseInterest');
    if (el) el.value = courseName;
  }
  function preselectHelp(helpOption) {
    const el = document.getElementById('helpType');
    if (el) el.value = helpOption;
  }

  // Form + WhatsApp message builder
  const supportForm = document.getElementById('support-form');
  const formError = document.getElementById('form-error');
  const formErrorText = document.getElementById('form-error-text');
  const formSuccess = document.getElementById('form-success');
  const confirmedName = document.getElementById('confirmed-name');
  const whatsappDirectLink = document.getElementById('whatsapp-direct-link');

  supportForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formError.classList.remove('show');

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('mobileNumber').value.trim();
    const course = document.getElementById('courseInterest').value;
    const help = document.getElementById('helpType').value;

    const digitsOnly = phone.replace(/\D/g, '');
    if (name.length < 2) {
      formErrorText.textContent = 'Please enter your full name.';
      formError.classList.add('show');
      return;
    }
    if (digitsOnly.length < 10) {
      formErrorText.textContent = 'Please enter a valid 10-digit mobile number.';
      formError.classList.add('show');
      return;
    }

    const message = `Hello Wings Tech Skills Pune,%0A%0A*New Inquiry / Fee Assistance Request*%0A• *Name:* ${encodeURIComponent(name)}%0A• *Mobile:* ${encodeURIComponent(phone)}%0A• *Interested Track:* ${encodeURIComponent(course)}%0A• *Request Type:* ${encodeURIComponent(help)}%0A%0APlease guide me with the next steps.`;

    whatsappDirectLink.href = `https://wa.me/919922453398?text=${message}`;
    confirmedName.textContent = name.split(' ')[0];

    supportForm.style.display = 'none';
    formSuccess.classList.add('show');
  });

  function resetApplicationForm() {
    supportForm.reset();
    formSuccess.classList.remove('show');
    supportForm.style.display = '';
  }
