import { useEffect } from "react";

const ScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    // Observe all elements with card-hover class for staggered animation
    const cardElements = document.querySelectorAll('.card-hover');
    cardElements.forEach((el, index) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      setTimeout(() => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('animate-fade-in');
          el.classList.remove('opacity-0', 'translate-y-8');
        }
      }, index * 100);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default ScrollAnimations;