export const watchChangeTitle = (
  handler: (mutation: MutationRecord) => void
): MutationObserver => {
  const target = document.querySelector('title');
  const observer = new MutationObserver((mutations) =>
    mutations.forEach(handler)
  );

  if (target) {
    observer.observe(target, {
      childList: true,
    });
  }

  return observer;
};
