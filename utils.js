/* Shared helper functions for the task tracker. */

window.taskTrackerUtils = Object.freeze({
  formatCurrency(value) {
    return `₹${Number(value || 0).toLocaleString()}`;
  },

  isImageFile(file) {
    return Boolean(file && file.type && file.type.startsWith('image/'));
  }
});
