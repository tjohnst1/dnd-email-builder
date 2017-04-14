export const SWITCH_TAB = 'SWITCH_TAB';
export const SWITCH_CATEGORY = 'SWITCH_CATEGORY';

export function switchTab(tab) {
  return {
    type: SWITCH_TAB,
    tab,
  }
}

export function switchCategory(category) {
  return {
    type: SWITCH_CATEGORY,
    category,
  }
}
