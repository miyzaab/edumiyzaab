document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el, index) => {
        // Add staggered delay for grid items automatically
        if (el.parentElement.classList.contains('features') || el.parentElement.classList.contains('articles-grid')) {
            const delay = (index % 3) * 100; // 0ms, 100ms, 200ms
            el.style.transitionDelay = `${delay}ms`;
        }
        observer.observe(el);
    });
});
