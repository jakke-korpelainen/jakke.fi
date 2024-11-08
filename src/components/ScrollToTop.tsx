"use client";

export const ScrollToTop = () => {
  return (
    <li>
      <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Scroll to top
      </a>
    </li>
  );
};
