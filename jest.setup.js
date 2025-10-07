import 'whatwg-fetch';
import { beforeAll, afterAll, vi } from 'vitest';

// Silence jsdom CSS parse noise during tests
const originalConsoleError = console.error;

function isCssParseErrorArg(arg) {
  try {
    if (!arg) return false;
    if (typeof arg === 'string') return arg.includes('Could not parse CSS stylesheet');
    if (arg instanceof Error) return typeof arg.message === 'string' && arg.message.includes('Could not parse CSS stylesheet');
    if (typeof arg === 'object' && typeof arg.message === 'string') return arg.message.includes('Could not parse CSS stylesheet');
  } catch (_) {
    // ignore
  }
  return false;
}

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    if (args.some(isCssParseErrorArg)) {
      return; // swallow jsdom stylesheet parse errors
    }
    originalConsoleError(...args);
  });
});

afterAll(() => {
  if (console.error && typeof console.error.mockRestore === 'function') {
    console.error.mockRestore();
  }
});
