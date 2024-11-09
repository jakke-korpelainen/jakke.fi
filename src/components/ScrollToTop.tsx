"use client";

function scrollToTop(e: React.MouseEvent) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export const ScrollToTop = () => {
  return (
    <li>
      <a className="no-underline" href="#" onClick={scrollToTop}>
        ⬆️
      </a>
    </li>
  );
};
