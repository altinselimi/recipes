export function useNativeTransitions() {
  const runViewTransitionTempEffects = (elementsToBeTransitioned) => {
    elementsToBeTransitioned.forEach((el) => {
      el.domTarget.style.viewTransitionName = el.transitionName;
    });

    return () => {
      elementsToBeTransitioned.forEach(
        (el) => (el.domTarget.style.viewTransitionName = ""),
      );
    };
  };

  const runViewTransition = (elementsAndTransitionNames) => {
    return new Promise((resolve, reject) => {
      const endViewTransition = runViewTransitionTempEffects(
        elementsAndTransitionNames,
      );
      const transition = document.startViewTransition(() => {
        endViewTransition();
        resolve();
      });
    });
  };

  const runViewTransitionWithoutCleanup = (elementsAndTransitionNames) => {
    return new Promise((resolve, reject) => {
      const endViewTransition = runViewTransitionTempEffects(
        elementsAndTransitionNames,
      );
      const transition = document.startViewTransition(() => {
        resolve({
          transition,
          endViewTransition,
        });
      });
    });
  };

  return {
    runViewTransition,
    runViewTransitionWithoutCleanup,
  };
}
