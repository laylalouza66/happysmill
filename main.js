import './style.css'

/* ========================================
   Happy Smile by M&H — Interactive Logic
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll()
  initMobileMenu()
  initSmoothScroll()
  initBookingForm()
  initDemoTriggers()
  initScrollReveal()
})

/* ----- Header shadow on scroll ----- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader')
  if (!header) return

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ----- Mobile menu toggle ----- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle')
  const nav = document.getElementById('mainNav')
  if (!toggle || !nav) return

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open')
    toggle.classList.toggle('open', isOpen)
    toggle.setAttribute('aria-expanded', String(isOpen))
  })

  nav.querySelectorAll('a, .nav-cta').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open')
      toggle.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
    })
  })
}

/* ----- Smooth scroll for anchor links ----- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const target = document.querySelector(href)
      if (!target) return

      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

/* ----- Booking form: validation + demo modal ----- */
function initBookingForm() {
  const form = document.getElementById('bookingForm')
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const fields = {
      name: form.querySelector('#name'),
      phone: form.querySelector('#phone'),
      email: form.querySelector('#email'),
      message: form.querySelector('#message'),
    }

    let isValid = true

    Object.values(fields).forEach((field) => {
      if (!field) return
      field.classList.remove('invalid')

      if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('invalid')
        isValid = false
        return
      }

      if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(field.value.trim())) {
          field.classList.add('invalid')
          isValid = false
        }
      }
    })

    if (isValid) {
      openDemoModal()
      form.reset()
    }
  })

  // Clear invalid state on input
  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('input', () => input.classList.remove('invalid'))
  })
}

/* ----- Demo modal: open / close ----- */
function initDemoTriggers() {
  // All elements with data-demo-trigger open the modal
  document.querySelectorAll('[data-demo-trigger]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      openDemoModal()
    })
  })

  // Close modal handlers
  const overlay = document.getElementById('demoModal')
  const closeBtn = document.getElementById('modalClose')
  const okBtn = document.getElementById('modalOk')

  if (closeBtn) closeBtn.addEventListener('click', closeDemoModal)
  if (okBtn) okBtn.addEventListener('click', closeDemoModal)

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDemoModal()
    })
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDemoModal()
  })
}

function openDemoModal() {
  const overlay = document.getElementById('demoModal')
  if (!overlay) return
  overlay.classList.add('active')
  overlay.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
}

function closeDemoModal() {
  const overlay = document.getElementById('demoModal')
  if (!overlay) return
  overlay.classList.remove('active')
  overlay.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
}

/* ----- Scroll reveal animations ----- */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.service-card, .info-item, .feature-item, .about-text, .about-visual, .section-header, .contact-form'
  )

  elements.forEach((el) => el.classList.add('reveal'))

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  elements.forEach((el) => observer.observe(el))
}
