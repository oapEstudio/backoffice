class ScrollService {
  scrollToTop = (behavior: ScrollBehavior = "smooth") => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior });
    }
  };
}

export const scrollService = new ScrollService();
