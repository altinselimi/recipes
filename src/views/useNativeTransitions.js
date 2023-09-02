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
  /*
  const redoViewTransition = (elementsAndTransitionNames, callback) => {
    return new Promise((resolve, reject) => {
      endViewTransition
      const transition = document.startViewTransition(() => {
        const endViewTransition = runViewTransitionTempEffects(elementsAndTransitionNames);
        runViewTransitionTempEffects(elementsAndTransitionNames);
      });
      transition.finished.finally(() => {
        cleanViewTransitionTempEffects();
        namedViewRefs = null;
        targetEl = null;
      });

      const endViewTransition = runViewTransitionTempEffects(elementsAndTransitionNames);
      document.startViewTransition(() => {
        endViewTransition();
        resolve();
      });
    })
  }*/

  return {
    runViewTransition,
    runViewTransitionWithoutCleanup,
  };
}

/*
  const closeInfoPopup = () => {
    const transition = document.startViewTransition(() => {
      runViewTransitionTempEffects();
      selectedPlayer.value = null;
    });
    transition.finished.finally(() => {
      cleanViewTransitionTempEffects();
      namedViewRefs = null;
      targetEl = null;
    });
  };
}*/
