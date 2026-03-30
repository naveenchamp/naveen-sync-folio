import { useEffect } from "react";

const ScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0", "translate-y-8");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".fade-in, .card-hover");

    animatedElements.forEach((element) => {
      element.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");

      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.classList.add("animate-fade-in");
        element.classList.remove("opacity-0", "translate-y-8");
        return;
      }

      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default ScrollAnimations;
