import '@testing-library/jest-dom/vitest';

// jsdom has no scrolling; the guided scenes scroll to the top on each step.
window.scrollTo = () => {};
