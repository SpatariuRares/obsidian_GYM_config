// File: "theGYM/Scripts/ExerciseLogTable_Refactored.js"
// Versione Modificata per includere filtro opzionale per Allenamento
// Refactored for improved readability

// --- Load Dependencies ---
// Note: dv.view() is asynchronous, so we use await.
// The entire script needs to be implicitly async for top-level await.
// Dataview handles this automatically for dv.view() scripts.

// Workaround: Manually load and evaluate configModule
let configModule;
try {
  const configCode = await dv.io.load("theGYM/Scripts/exerciseLogConfig.js");
  // Evaluate the code and capture the returned object
  configModule = new Function(
    configCode +
      "; return { DEFAULT_LIMIT, DEFAULT_TEMPLATE_PATH, DEFAULT_TIMESTAMP_FORMAT, DEFAULT_BUTTON_TEXT, DEFAULT_FIELDS, DEFAULT_COLUMNS, PATH_MATCH_THRESHOLD, NO_EXERCISE_SPECIFIED, normalizeInputParams, initializeConfig };"
  )();
} catch (e) {
  dv.paragraph("**Error:** Failed to load or evaluate 'exerciseLogConfig.js'.");
  console.error("Error loading/evaluating config:", e);
  return; // Stop execution
}

// Load utils module using the same workaround
let utilsModule;
try {
  const utilsCode = await dv.io.load(
    "theGYM/Scripts/utils/exerciseLogUtils.js"
  );
  // Evaluate the code and capture the returned object
  utilsModule = new Function(
    utilsCode +
      "; return { getMatchScore, generateTemplate, createAddButton, normalizeWorkoutPath, filterPagesByWorkout, findExerciseMatches, determineExerciseFilterStrategy, filterPagesByExercise, fetchAndFilterLogPages, applyRowStyling, renderLogTable, renderEmptyState };"
  )();
} catch (e) {
  dv.paragraph("**Error:** Failed to load or evaluate 'exerciseLogUtils.js'.");
  console.error("Error loading/evaluating utils:", e);
  return; // Stop execution
}

// --- Main Script Execution ---

// 1. Get Target Container

if (!configModule || typeof configModule.normalizeInputParams !== "function") {
  dv.paragraph("**Error:** Failed to load config module or function missing."); // Use dv.paragraph for errors
  console.error("Loaded configModule:", configModule);
  return; // Stop execution if module didn't load
}
if (!utilsModule || typeof utilsModule.createAddButton !== "function") {
  dv.paragraph("**Error:** Failed to load utils module or function missing."); // Use dv.paragraph for errors
  console.error("Loaded utilsModule:", utilsModule);
  return; // Stop execution if module didn't load
}

// 2. Prepare Dependencies for Utility Functions
//    (Pass global objects and constants from config)
const dependencies = {
  moment: moment, // Assuming moment is globally available in DataviewJS
  app: app, // Assuming app is globally available
  Notice: Notice, // Assuming Notice is globally available
  // Get constants from the loaded config module
  NO_EXERCISE_SPECIFIED: configModule.NO_EXERCISE_SPECIFIED,
  DEFAULT_COLUMNS: configModule.DEFAULT_COLUMNS,
  PATH_MATCH_THRESHOLD: configModule.PATH_MATCH_THRESHOLD,
};

// 3. Get the container (ensure this happens *after* await)
const container = dv.container; // Or your existing logic

// 4. Normalize Input and Initialize Config (Now using the loaded module)
//    This should now work correctly
const params = configModule.normalizeInputParams(input);
const config = configModule.initializeConfig(params);
const exerciseName = params.exercise || dependencies.NO_EXERCISE_SPECIFIED;
const workoutPath = params.workout || null; // Example: Get workout path if provided
const currentPage = dv.current()?.file?.link || ""; // Get current page link

if (config.debug) {
  console.log("--- ExerciseLogTable Start Execution ---");
  console.log("Config:", config);
  console.log("Exercise Filter:", exerciseName);
  console.log("Workout Filter:", workoutPath);
  console.log("Current Page Link (for Origine::):", currentPage?.toString());
}

// 3. Create UI Elements
const mainContainer = container.createEl("div");
mainContainer.style.width = "100%";

// Create the "Add Log" button
utilsModule.createAddButton(
  // Use utilsModule
  mainContainer,
  config,
  exerciseName,
  currentPage, // Pass currentPage instead of currentPageLink
  dependencies // Pass dependencies
);

// 4. Fetch and Filter Log Data
const {
  pages: filteredPages,
  method: usedMethod,
  allExercisePaths,
} = utilsModule.fetchAndFilterLogPages(
  // Use utilsModule
  dv,
  config,
  exerciseName,
  workoutPath,
  dependencies // Pass dependencies
);

// 5. Render Results (Table or Empty State)
const tableContainer = mainContainer.createEl("div");
tableContainer.style.cssText = "width: 100%; overflow-x: auto;";

if (filteredPages.length > 0) {
  // Render the table
  utilsModule.renderLogTable(
    // Use utilsModule
    dv,
    tableContainer,
    filteredPages,
    config,
    dependencies // Pass dependencies
  );

  // Display informational footer
  const infoDiv = mainContainer.createEl("div");
  infoDiv.style.cssText = `font-size: 0.8em; color: var(--text-muted); margin-top: 10px;`;

  let infoText = `Trovati ${filteredPages.length} log`;
  if (exerciseName !== configModule.NO_EXERCISE_SPECIFIED) {
    infoText += ` per "${exerciseName}"`;
  }
  if (workoutPath) {
    const workoutFilename = workoutPath.split("/").pop().replace(/\.md$/i, "");
    infoText += ` nell'allenamento "${workoutFilename}"`;
  }
  // Corrected constant name check
  else if (exerciseName === configModule.NO_EXERCISE_SPECIFIED) {
    infoText += ` in totale`;
  }
  infoText += `. (Metodo: ${usedMethod}). Visualizzati max ${config.limit}.`;
  infoDiv.innerHTML = infoText;
} else {
  // Render the empty state message
  let emptyMessage = `Nessun log trovato`;
  // Corrected constant name check
  if (exerciseName !== configModule.NO_EXERCISE_SPECIFIED) {
    emptyMessage += ` per l'esercizio "${exerciseName}"`;
  }
  if (workoutPath) {
    const workoutFilename = workoutPath.split("/").pop().replace(/\.md$/i, "");
    emptyMessage += ` nell'allenamento "${workoutFilename}"`;
  }
  emptyMessage += ".";
  utilsModule.renderEmptyState(
    // Use utilsModule
    tableContainer,
    emptyMessage,
    allExercisePaths,
    exerciseName,
    dependencies // Pass dependencies
  );
}

if (config.debug) {
  console.log("--- ExerciseLogTable End Execution ---");
}
