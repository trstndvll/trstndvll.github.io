const ResumeMerge = {
  isPlainObject: function (value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },

  /**
   * Deep-merge a variant onto canonical resume data.
   * Array values on the variant replace the base array wholesale (no concat).
   * Nested plain objects merge key-by-key.
   */
  deepMerge: function (base, overlay) {
    if (!ResumeMerge.isPlainObject(overlay)) {
      return overlay;
    }

    var result = Object.assign({}, base);
    Object.keys(overlay).forEach(function (key) {
      var overlayValue = overlay[key];
      var baseValue = result[key];

      if (Array.isArray(overlayValue)) {
        result[key] = overlayValue.slice();
        return;
      }

      if (ResumeMerge.isPlainObject(overlayValue) && ResumeMerge.isPlainObject(baseValue)) {
        result[key] = ResumeMerge.deepMerge(baseValue, overlayValue);
        return;
      }

      result[key] = overlayValue;
    });

    return result;
  }
};
