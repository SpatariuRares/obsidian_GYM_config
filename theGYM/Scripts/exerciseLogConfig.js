// filepath: g:\My Drive\obsidian\Rares brain\theGYM\Scripts\exerciseLogConfig.js
// Contains constants and configuration functions for ExerciseLogTable

const DEFAULT_LIMIT = 50;
const DEFAULT_TEMPLATE_PATH = "theGYM/Log/Data";
const DEFAULT_TIMESTAMP_FORMAT = "MMDD-HHmmss";
const DEFAULT_BUTTON_TEXT = "➕ Aggiungi Log";
const DEFAULT_FIELDS = ["Rep", "Weight", "Volume"];
const DEFAULT_COLUMNS = [
  "Data",
  "Esercizio",
  "Ripetizioni",
  "Peso (kg)",
  "Volume",
  "Link",
];
const PATH_MATCH_THRESHOLD = 70; // Score threshold to prefer matching the Esercizio:: field over filename
const NO_EXERCISE_SPECIFIED = "Esercizio Non Specificato"; // Default exercise name placeholder

/**
 * Normalizes input parameters, handling potential nesting.
 * @param {object} input - Raw input parameters.
 * @returns {object} Normalized parameters.
 */
function normalizeInputParams(input) {
  // Handles both direct {exercise: "..."} and nested {input: {exercise: "..."}} structures.
  if (input && Object.prototype.hasOwnProperty.call(input, "input")) {
    return input.input || {};
  }
  return input || {};
}

/**
 * Initializes the configuration object with defaults and user-provided parameters.
 * @param {object} params - Normalized input parameters.
 * @returns {object} The configuration object.
 */
function initializeConfig(params) {
  const debug = params.debug || false;
  if (debug) {
    console.log("Raw parameters received:", params);
  }
  return {
    limit: params.limit || DEFAULT_LIMIT,
    templatePath: params.templatePath || DEFAULT_TEMPLATE_PATH,
    timestampFormat: params.timestampFormat || DEFAULT_TIMESTAMP_FORMAT,
    showAddButton: params.showAddButton !== false, // Default is true
    buttonText: params.buttonText || DEFAULT_BUTTON_TEXT,
    searchByName: params.searchByName || false, // Kept for compatibility, matching logic is more complex now
    exactMatch: params.exactMatch || false, // Used for filename matching
    debug: debug,
    template: {
      fields: params.fields || [...DEFAULT_FIELDS],
      // Generates additional fields for the template (e.g., Esercizio::, Origine::)
      additionalFields:
        params.additionalFields ||
        ((exercise, currentPageLink, dateHour) => [
          `Esercizio::[[${exercise}]]`,
          `Origine:: ${currentPageLink}`, // currentPageLink is the link of the page where dv.view runs
          `DataOra:: ${dateHour}`,
        ]),
    },
    columns: params.columns || [...DEFAULT_COLUMNS], // Columns for the output table
  };
}

// Return the constants and functions for use in the main script
return {
  DEFAULT_LIMIT,
  DEFAULT_TEMPLATE_PATH,
  DEFAULT_TIMESTAMP_FORMAT,
  DEFAULT_BUTTON_TEXT,
  DEFAULT_FIELDS,
  DEFAULT_COLUMNS,
  PATH_MATCH_THRESHOLD,
  NO_EXERCISE_SPECIFIED,
  normalizeInputParams,
  initializeConfig,
};
