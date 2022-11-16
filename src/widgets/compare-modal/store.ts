import { createEvent, createStore } from "effector";

export const onCloseCompareModal = createEvent();
export const onOpenCompareModal = createEvent();

export const $isCompareModalOpen = createStore(false)
  .on(onCloseCompareModal, () => false)
  .on(onOpenCompareModal, () => true);