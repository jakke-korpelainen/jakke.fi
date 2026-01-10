"use client";

function scrollToTop(e: React.MouseEvent) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export const ScrollToTop = () => {
  return (
    <li>
      <button type="button" className="no-underline" onClick={scrollToTop}>
        ⬆️
      </button>
    </li>
  );
};
