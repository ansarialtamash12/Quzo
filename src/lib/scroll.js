let lenisInstance = null;

export const setLenis = (l) => {
  lenisInstance = l;
};

export const getLenis = () => lenisInstance;

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = id === "home" ? 0 : -88;
  if (lenisInstance) lenisInstance.scrollTo(el, { offset, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  el.focus({ preventScroll: true });
  window.history.replaceState(null, "", `#${id}`);
};
