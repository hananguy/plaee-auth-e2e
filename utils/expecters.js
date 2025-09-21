import { expect } from '@playwright/test';
export const expectErrorText = async (locator, text) =>
  expect(locator).toHaveText(new RegExp(text, 'i'));