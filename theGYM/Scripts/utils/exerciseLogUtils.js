// filepath: g:\My Drive\obsidian\Rares brain\theGYM\Scripts\exerciseLogUtils.js
// Contains utility functions for ExerciseLogTable

// --- String Matching ---

/**
 * Calculates a simple match score between two strings (case-insensitive).
 * Higher score means better match.
 * @param {string} name - The string to check (e.g., filename, exercise name).
 * @param {string} searchTerm - The string to search for.
 * @returns {number} Match score (0-100).
 */
function getMatchScore(name, searchTerm) {
  if (!name || !searchTerm) return 0;
  name = name.toLowerCase();
  searchTerm = searchTerm.toLowerCase();
  if (name === searchTerm) return 100; // Exact match
  if (name.startsWith(searchTerm + " ")) return 90; // Starts with term + space
  if (name.endsWith(" " + searchTerm)) return 80; // Ends with space + term
  if (name.includes(" " + searchTerm + " ")) return 70; // Contains space + term + space
  if (name.includes(searchTerm)) return 60; // Contains term
  return 0; // No match
}

// --- Template Generation ---

/**
 * Generates the content for a new log note template.
 * @param {string} exercise - The name of the exercise.
 * @param {string} currentPageLink - Markdown link to the current page (workout).
 * @param {object} config - The configuration object.
 * @returns {string} The template content.
 */
function generateTemplate(exercise, currentPageLink, config) {
  // Ensure currentPageLink is a valid link, otherwise use a placeholder
  const originLink = currentPageLink ? currentPageLink : "[[Link Mancante]]";
  const fields = config.template.fields.map((field) => `${field}:`);
  // Add DataOra field with current ISO timestamp for better Dataview parsing
  const nowISO = moment().format(); // ISO 8601 format
  const additionalFields = config.template.additionalFields(
    exercise, // Exercise name for the Esercizio:: field
    originLink, // Formatted link for the Origine:: field
    nowISO // Add current timestamp for DataOra:: field
  );
  return ["---", ...fields, "---", ...additionalFields].join("\n");
}

// --- UI Elements ---

/**
 * Creates and configures the "Add Log" button.
 * @param {HTMLElement} container - The parent element for the button.
 * @param {object} config - The configuration object.
 * @param {string} exerciseName - The specific exercise name (or placeholder).
 * @param {string} currentPageLink - Markdown link to the current page (workout).
 * @param {object} dependencies - Object containing { moment, app, Notice, NO_EXERCISE_SPECIFIED }
 */
function createAddButton(
  container,
  config,
  exerciseName,
  currentPageLink,
  dependencies
) {
  const { moment, app, Notice, NO_EXERCISE_SPECIFIED } = dependencies;

  if (!config.showAddButton || !currentPageLink) {
    if (config.debug && !currentPageLink) {
      console.warn(
        "'Add Log' button not created: currentPageLink is missing (needed for Origine:: field)."
      );
    }
    return; // Don't create button if disabled or if current page link is missing
  }

  // Use the specific exercise name if available, otherwise a generic placeholder
  const buttonExerciseName =
    exerciseName !== NO_EXERCISE_SPECIFIED ? exerciseName : "Log Allenamento";

  const buttonMaker = container.createEl("button", {
    text: `${config.buttonText} per ${buttonExerciseName}`, // More specific button text
    cls: "add-log-button",
  });

  // --- Button Styling ---
  buttonMaker.style.cssText = `
        background-color: var(--interactive-accent);
        color: var(--text-on-accent);
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        margin-bottom: 16px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: background-color 0.2s ease;
    `;
  buttonMaker.addEventListener("mouseover", () => {
    buttonMaker.style.backgroundColor = "var(--interactive-accent-hover)";
  });
  buttonMaker.addEventListener("mouseout", () => {
    buttonMaker.style.backgroundColor = "var(--interactive-accent)";
  });
  // --- End Button Styling ---

  // --- Button Action ---
  buttonMaker.addEventListener("click", async () => {
    try {
      const timestamp = moment().format(config.timestampFormat);
      const safeExerciseName = buttonExerciseName.replace(/[\\/:"*?<>|]/g, "_");
      const newFileName = `${config.templatePath}/${safeExerciseName}-${timestamp}.md`;

      const templateContent = generateTemplate(
        buttonExerciseName,
        currentPageLink,
        config
      );

      const createdFile = await app.vault.create(newFileName, templateContent);
      if (createdFile) {
        app.workspace.openLinkText(newFileName, "", true);
      } else {
        console.error("Error: Could not create file:", newFileName);
        new Notice(`Error creating file: ${newFileName}`);
      }
    } catch (error) {
      console.error("Error creating log:", error);
      new Notice(`Error creating log: ${error.message}`);
    }
  });
  // --- End Button Action ---
}

// --- Data Fetching and Filtering ---

/**
 * Normalizes a workout path string (removes [[ ]], |display).
 * @param {string} workoutPath - The raw workout path string.
 * @returns {string|null} The normalized path or null if invalid.
 */
function normalizeWorkoutPath(workoutPath) {
  if (!workoutPath) return null;
  return workoutPath
    .replace(/\|.*$/, "") // Remove display text after |
    .replace(/^\[\[|\]\]$/g, "") // Remove [[ and ]]
    .trim();
}

/**
 * Filters pages based on the optional workout path.
 * @param {Array} allPages - Array of Dataview pages.
 * @param {string|null} workoutPath - The raw workout path to filter by.
 * @param {boolean} debug - Debug flag.
 * @returns {{filteredPages: Array, targetWorkoutPath: string|null}} Filtered pages and the normalized path used.
 */
function filterPagesByWorkout(allPages, workoutPath, debug) {
  const targetWorkoutPath = normalizeWorkoutPath(workoutPath);

  if (debug) {
    console.log(`Requested Workout Filter: ${workoutPath}`);
    console.log(`Normalized Workout Path for filtering: ${targetWorkoutPath}`);
  }

  if (!targetWorkoutPath) {
    if (debug && workoutPath) {
      console.warn(
        `Provided workout path ("${workoutPath}") is invalid or empty after normalization.`
      );
    }
    return { filteredPages: allPages, targetWorkoutPath: null }; // No valid path, return all pages
  }

  const filteredPages = allPages.filter((p) => {
    if (!p.Origine) return false; // Skip if Origine field is missing

    if (p.Origine.path) {
      return p.Origine.path === targetWorkoutPath;
    } else if (typeof p.Origine === "string") {
      const originPath = normalizeWorkoutPath(p.Origine); // Normalize the string link
      return originPath === targetWorkoutPath;
    }
    return false;
  });

  if (debug) {
    console.log(
      `After workout filter ("${targetWorkoutPath}"), ${filteredPages.length} pages remain.`
    );
  }

  return { filteredPages, targetWorkoutPath };
}

/**
 * Analyzes pages to find matches for a specific exercise name.
 * @param {Array} pagesToSearch - Pages (potentially pre-filtered by workout).
 * @param {string} exerciseName - The exercise name to search for.
 * @param {object} dv - Dataview API object.
 * @param {boolean} debug - Debug flag.
 * @returns {{fileNameMatches: Array, allExercisePaths: object}} Matches found in filenames and Esercizio:: fields.
 */
function findExerciseMatches(pagesToSearch, exerciseName, dv, debug) {
  const fileNameMatches = [];
  const allExercisePaths = {};

  pagesToSearch.forEach((p) => {
    if (!p || !p.file) return;

    const fileName = p.file.name;
    const fileMatchScore = getMatchScore(fileName, exerciseName);
    if (fileMatchScore > 0) {
      fileNameMatches.push({ page: p, score: fileMatchScore, name: fileName });
    }

    let exerciseFieldPath = null;
    let exerciseFieldName = null;
    let exerciseFieldScore = 0;

    if (p.Esercizio) {
      if (p.Esercizio.path) {
        exerciseFieldPath = p.Esercizio.path;
        const exercisePage = dv.page(exerciseFieldPath);
        exerciseFieldName =
          p.Esercizio.display ||
          (exercisePage ? exercisePage.file.name : exerciseFieldPath);

        if (exercisePage && exercisePage.file) {
          exerciseFieldScore = getMatchScore(
            exercisePage.file.name,
            exerciseName
          );
        } else {
          exerciseFieldScore = getMatchScore(
            exerciseFieldPath.split("/").pop(),
            exerciseName
          );
        }
      } else if (typeof p.Esercizio === "string") {
        exerciseFieldName = p.Esercizio;
        exerciseFieldScore = getMatchScore(exerciseFieldName, exerciseName);
        exerciseFieldPath = `string:${exerciseFieldName}`;
      }
    }

    if (exerciseFieldPath && exerciseFieldName) {
      if (!allExercisePaths[exerciseFieldPath]) {
        allExercisePaths[exerciseFieldPath] = {
          count: 0,
          name: exerciseFieldName,
          score: exerciseFieldScore,
        };
      }
      allExercisePaths[exerciseFieldPath].count++;
    }
  });

  if (debug) {
    console.log("Filename Matches:", fileNameMatches);
    console.log("Found Esercizio:: Paths/Strings & Scores:", allExercisePaths);
  }

  return { fileNameMatches, allExercisePaths };
}

/**
 * Determines the best filtering strategy based on exercise matches.
 * @param {Array} fileNameMatches - Matches found in filenames.
 * @param {object} allExercisePaths - Matches found in Esercizio:: fields.
 * @param {boolean} exactMatch - Whether to require a high score for filename matches.
 * @param {boolean} debug - Debug flag.
 * @param {number} PATH_MATCH_THRESHOLD - Score threshold constant.
 * @returns {{bestStrategy: string, bestPath: string|null, bestFileMatches: Array}} The chosen strategy and relevant data.
 */
function determineExerciseFilterStrategy(
  fileNameMatches,
  allExercisePaths,
  exactMatch,
  debug,
  PATH_MATCH_THRESHOLD
) {
  let bestPath = null;
  let bestPathScore = -1;

  Object.entries(allExercisePaths).forEach(([path, info]) => {
    if (info.score > 0 && info.score > bestPathScore) {
      bestPathScore = info.score;
      bestPath = path;
    }
  });

  if (bestPath && bestPathScore >= PATH_MATCH_THRESHOLD) {
    if (debug)
      console.log(
        `Strategy: Use Esercizio:: field "${allExercisePaths[bestPath]?.name}" (Score: ${bestPathScore})`
      );
    return { bestStrategy: "field", bestPath: bestPath, bestFileMatches: [] };
  }

  if (fileNameMatches.length > 0) {
    fileNameMatches.sort((a, b) => b.score - a.score);

    let targetMatches = fileNameMatches;
    if (exactMatch) {
      const exactFileMatches = fileNameMatches.filter((m) => m.score >= 90);
      if (exactFileMatches.length > 0) {
        targetMatches = exactFileMatches;
        if (debug)
          console.log("Applied exactMatch filter to filename matches.");
      } else if (debug) {
        console.log(
          "exactMatch requested for filename, but no matches >= 90 found."
        );
      }
    }

    const bestFileScore = targetMatches[0].score;
    const bestFileMatches = targetMatches.filter(
      (m) => m.score === bestFileScore
    );
    if (debug)
      console.log(
        `Strategy: Use Filename matching (Best Score: ${bestFileScore})`
      );
    return {
      bestStrategy: "filename",
      bestPath: null,
      bestFileMatches: bestFileMatches,
    };
  }

  if (debug) console.log("Strategy: No suitable exercise matches found.");
  return { bestStrategy: "none", bestPath: null, bestFileMatches: [] };
}

/**
 * Filters pages based on the chosen exercise filtering strategy.
 * @param {Array} pagesToSearch - Pages (potentially pre-filtered by workout).
 * @param {string} strategy - The chosen strategy ('field', 'filename', 'none').
 * @param {string|null} bestPath - The best matching Esercizio:: path/identifier (if strategy is 'field').
 * @param {Array} bestFileMatches - The best filename matches (if strategy is 'filename').
 * @returns {Array} The final filtered list of pages based on exercise.
 */
function filterPagesByExercise(
  pagesToSearch,
  strategy,
  bestPath,
  bestFileMatches
) {
  if (strategy === "field" && bestPath) {
    return pagesToSearch.filter((p) => {
      if (!p.Esercizio) return false;
      if (p.Esercizio.path) {
        return p.Esercizio.path === bestPath;
      } else if (typeof p.Esercizio === "string") {
        return `string:${p.Esercizio}` === bestPath;
      }
      return false;
    });
  } else if (strategy === "filename" && bestFileMatches.length > 0) {
    return bestFileMatches.map((m) => m.page);
  } else {
    return [];
  }
}

/**
 * Fetches and filters log pages based on configuration, exercise, and workout path.
 * @param {object} dv - Dataview API object.
 * @param {object} config - Configuration object.
 * @param {string} exerciseName - Exercise name to filter by.
 * @param {string|null} workoutPath - Workout path to filter by (or null).
 * @param {object} dependencies - Object containing { NO_EXERCISE_SPECIFIED, PATH_MATCH_THRESHOLD }
 * @returns {{ pages: Array, method: string, allExercisePaths: object }} Filtered pages, description of method, and found exercise paths.
 */
function fetchAndFilterLogPages(
  dv,
  config,
  exerciseName,
  workoutPath,
  dependencies
) {
  const { NO_EXERCISE_SPECIFIED, PATH_MATCH_THRESHOLD } = dependencies;
  let allPages = dv.pages(`"${config.templatePath}"`);
  let initialPageCount = allPages.length;
  if (config.debug) {
    console.log(
      `Found ${initialPageCount} total pages in ${config.templatePath}`
    );
  }

  const { filteredPages: pagesFilteredByWorkout, targetWorkoutPath } =
    filterPagesByWorkout(allPages, workoutPath, config.debug);
  const filteredByWorkout =
    !!targetWorkoutPath && pagesFilteredByWorkout.length < initialPageCount;

  let pagesToSearch = pagesFilteredByWorkout;
  let filteredPages = [];
  let usedMethod = "N/A";
  let allExercisePaths = {};

  const isExerciseSpecified =
    exerciseName && exerciseName !== NO_EXERCISE_SPECIFIED;

  if (!isExerciseSpecified) {
    filteredPages = pagesToSearch;
    usedMethod = filteredByWorkout
      ? "solo per workout"
      : `nessun filtro specifico (tutti i log in ${config.templatePath})`;
    if (config.debug) {
      console.log(
        `No specific exercise. Method: ${usedMethod}. Returning ${filteredPages.length} pages.`
      );
    }
  } else {
    if (config.debug) {
      console.log(
        `Applying exercise filter "${exerciseName}" to ${pagesToSearch.length} pages.`
      );
      if (pagesToSearch.length === 0 && filteredByWorkout) {
        console.log(
          "No pages remained after workout filter, exercise search will yield no results."
        );
      }
    }

    const matches = findExerciseMatches(
      pagesToSearch,
      exerciseName,
      dv,
      config.debug
    );
    let fileNameMatches = matches.fileNameMatches; // Corrected: declare fileNameMatches here
    allExercisePaths = matches.allExercisePaths;

    const { bestStrategy, bestPath, bestFileMatches } =
      determineExerciseFilterStrategy(
        fileNameMatches,
        allExercisePaths,
        config.exactMatch,
        config.debug,
        PATH_MATCH_THRESHOLD // Pass constant
      );

    filteredPages = filterPagesByExercise(
      pagesToSearch,
      bestStrategy,
      bestPath,
      bestFileMatches
    );

    if (bestStrategy === "field") {
      const bestPathName = allExercisePaths[bestPath]?.name || bestPath;
      usedMethod = `campo Esercizio:: "${bestPathName}" (score: ${allExercisePaths[bestPath]?.score})`;
    } else if (bestStrategy === "filename") {
      usedMethod = `nome file (miglior score: ${bestFileMatches[0]?.score})`;
    } else {
      usedMethod = "Nessuna corrispondenza trovata per l'esercizio";
    }

    if (config.debug) {
      console.log(
        `Final exercise filter applied. Method: ${usedMethod}. Found ${filteredPages.length} pages.`
      );
    }
  }

  let finalMethodDescription = usedMethod;
  if (filteredByWorkout && targetWorkoutPath) {
    const workoutFilename = targetWorkoutPath.split("/").pop();
    finalMethodDescription += ` (filtrato per workout: ${workoutFilename})`;
  }

  return {
    pages: filteredPages,
    method: finalMethodDescription,
    allExercisePaths: allExercisePaths,
  };
}

// --- Rendering ---

/**
 * Applies CSS classes for visual grouping of rows by date.
 * @param {HTMLElement} tableContainer - The container holding the table.
 * @param {Array} sortedPages - The sorted array of pages being displayed.
 * @param {object} config - Configuration object.
 * @param {boolean} useCtimeForPrimarySort - Indicates if file.ctime was used for the primary sorting/grouping.
 */
function applyRowStyling(
  tableContainer,
  sortedPages,
  config,
  useCtimeForPrimarySort // This flag indicates the primary date used for grouping
) {
  // ... existing style setup ...

  setTimeout(() => {
    // ... existing tableBody check ...

    const rows = tableBody.querySelectorAll("tr");
    let previousDateString = null;

    rows.forEach((row, index) => {
      if (index >= sortedPages.length) return;

      const page = sortedPages[index];
      let primaryDateField;

      // Determine the primary date field used for grouping (same as sorting)
      if (!useCtimeForPrimarySort && page?.DataOra?.isLuxonDateTime) {
        primaryDateField = page.DataOra;
      } else if (page?.file?.ctime?.isLuxonDateTime) {
        primaryDateField = page.file.ctime;
      } else {
        // If neither is valid, cannot style based on date
        if (config.debug)
          console.warn(
            "Skipping row styling: No valid primary date (DataOra or ctime) found.",
            index,
            page
          );
        return;
      }

      // Use toISODate() for consistent date comparison based on the primary date
      const currentDateString = primaryDateField.toISODate();

      row.classList.remove("same-day-log", "new-day-log");
      if (previousDateString && currentDateString === previousDateString) {
        row.classList.add("same-day-log");
      } else {
        row.classList.add("new-day-log");
      }
      previousDateString = currentDateString;
    });
  }, 150);
}

/**
 * Renders the Dataview table with the filtered and sorted log pages.
 * @param {object} dv - Dataview API object.
 * @param {HTMLElement} container - The container element for the table.
 * @param {Array} pages - The array of filtered log pages.
 * @param {object} config - The configuration object.
 * @param {object} dependencies - Object containing { DEFAULT_COLUMNS }
 */
function renderLogTable(dv, container, pages, config, dependencies) {
  const { DEFAULT_COLUMNS } = dependencies;

  // Determine sorting key: Prioritize DataOra, fallback to file.ctime
  // Also track which key was primarily used for sorting/grouping
  let useCtimeForPrimarySort = false;
  const pagesWithSortKey = pages.map((p) => {
    if (p?.DataOra?.isLuxonDateTime) {
      return { page: p, sortKey: p.DataOra, usedCtime: false };
    } else if (p?.file?.ctime?.isLuxonDateTime) {
      return { page: p, sortKey: p.file.ctime, usedCtime: true };
    } else {
      // Assign a very old date if neither is valid, so they sort last
      return {
        page: p,
        sortKey: dv.luxon.DateTime.fromMillis(0),
        usedCtime: true,
      };
    }
  });

  // Sort based on the determined sortKey (descending - newest first)
  const sortedPageInfos = pagesWithSortKey.sort((a, b) => {
    // Ensure valid Luxon DateTime objects before comparing, get timestamp value
    const timeA = a.sortKey?.valueOf() ?? 0;
    const timeB = b.sortKey?.valueOf() ?? 0;
    return timeB - timeA; // Descending sort (newest timestamp first)
  });

  // Check if the *first* sorted item used ctime as the primary key
  // This is a simpler heuristic to pass to applyRowStyling
  useCtimeForPrimarySort =
    sortedPageInfos.length > 0 ? sortedPageInfos[0].usedCtime : false;

  // Extract the sorted pages
  let sortedPages = sortedPageInfos.map((info) => info.page);

  if (sortedPages.length === 0) {
    if (config.debug)
      console.log(
        "renderLogTable called with 0 pages after preparing sort keys."
      );
    container.setText("Nessun log valido da visualizzare.");
    return;
  }

  const limitedSortedPages = sortedPages.limit(config.limit);

  // --- Map data for the table, using ONE date column (prioritize DataOra) ---
  const tableData = limitedSortedPages.map((p) => {
    let formattedDate = "Data non valida";
    let dateSourceField = null;
    let sourceUsed = "none"; // Track which source was used

    // Prioritize DataOra
    if (p?.DataOra?.isLuxonDateTime) {
      dateSourceField = p.DataOra;
      sourceUsed = "DataOra";
    }
    // Fallback to file.ctime
    else if (p?.file?.ctime?.isLuxonDateTime) {
      dateSourceField = p.file.ctime;
      sourceUsed = "ctime";
    }

    // Format the chosen date field
    try {
      if (dateSourceField) {
        formattedDate = dateSourceField.toFormat("HH:mm - MM/dd");
      } else if (config.debug) {
        // Log if neither was valid
        console.warn(
          "No valid date (DataOra or ctime) found for formatting:",
          p?.file?.path
        );
      }
    } catch (e) {
      console.error(
        `Error formatting Luxon date from ${sourceUsed}:`,
        e,
        dateSourceField,
        p?.file?.path
      );
      formattedDate = `Errore ${sourceUsed}`;
    }

    // --- Exercise Name Extraction (remains the same) ---
    let exerciseDisplay = "N/D";
    if (p.Esercizio) {
      if (p.Esercizio.display) {
        exerciseDisplay = p.Esercizio.display;
      } else if (p.Esercizio.path) {
        exerciseDisplay = p.Esercizio.path
          .split("/")
          .pop()
          .replace(/\.md$/i, "");
      } else if (typeof p.Esercizio === "string") {
        exerciseDisplay = p.Esercizio;
      }
    }
    // --- End Exercise Name Extraction ---

    return [
      formattedDate, // Single date column
      exerciseDisplay,
      p.Rep,
      p.Weight,
      p.Volume,
      p?.file?.link ?? "Link non disponibile",
    ];
  });

  // --- Column Handling ---
  // Ensure config.columns is valid (now expecting only one date column header)
  let tableColumns = config.columns;
  if (
    !Array.isArray(tableColumns) ||
    // tableColumns.length < 2 || // Removed this check
    tableColumns.some((col) => typeof col !== "string")
  ) {
    console.error(
      "Invalid config.columns (must be array of strings):",
      tableColumns,
      "Falling back to DEFAULT_COLUMNS (ensure it has one date column!)."
    );
    // We rely on DEFAULT_COLUMNS being correctly updated in the calling script
    tableColumns = [...DEFAULT_COLUMNS];
  }

  // --- Render Table ---
  dv.table(tableColumns, tableData, container);

  // Pass the primary sort key indicator to applyRowStyling
  applyRowStyling(
    container,
    limitedSortedPages,
    config,
    useCtimeForPrimarySort
  );
}

/**
 * Renders a message indicating that no logs were found, optionally showing similar exercises.
 * @param {HTMLElement} container - The container element for the message.
 * @param {string} message - The main message to display.
 * @param {object} allExercisePaths - Object containing info about exercises found during the search.
 * @param {string} exerciseName - The specific exercise that was searched for.
 * @param {object} dependencies - Object containing { NO_EXERCISE_SPECIFIED }
 */
function renderEmptyState(
  container,
  message,
  allExercisePaths,
  exerciseName,
  dependencies
) {
  const { NO_EXERCISE_SPECIFIED } = dependencies;
  const errorMsg = container.createEl("div", { text: message });
  errorMsg.style.cssText = `
        color: var(--text-error);
        padding: 15px;
        text-align: center;
        font-weight: bold;
    `;

  const wasExerciseSearched = exerciseName !== NO_EXERCISE_SPECIFIED;
  const hasSimilarExercises = Object.keys(allExercisePaths).length > 0;

  if (wasExerciseSearched && hasSimilarExercises) {
    const details = container.createEl("details");
    details.createEl("summary", {
      text: "Mostra esercizi simili trovati nei log",
    });
    const content = details.createEl("div");
    content.style.cssText = `
            padding: 10px; margin-top: 5px;
            background-color: var(--background-secondary);
            border-radius: 5px; text-align: left; font-size: 0.9em;
        `;
    content.createEl("strong", {
      text: "Esercizi trovati nei log filtrati (ordinati per numero di log):",
    });
    const list = content.createEl("ul");

    Object.entries(allExercisePaths)
      .sort(([, infoA], [, infoB]) => infoB.count - infoA.count)
      .forEach(([path, info]) => {
        const displayName = path.startsWith("string:")
          ? path.substring(7)
          : info.name;
        list.createEl("li", { text: `${displayName} (${info.count} log)` });
      });
  } else if (wasExerciseSearched && !hasSimilarExercises) {
    container.createEl("p", {
      text: "Non sono stati trovati riferimenti ad esercizi simili nei log analizzati.",
      attr: { style: "text-align: center; font-size: 0.9em; margin-top: 5px;" },
    });
  } else {
    container.createEl("p", {
      text: "Nessun log trovato per i criteri specificati o nessun log presente nella cartella.",
      attr: { style: "text-align: center; font-size: 0.9em; margin-top: 5px;" },
    });
  }
}

// Return the utility functions for use in the main script
return {
  getMatchScore,
  generateTemplate,
  createAddButton,
  normalizeWorkoutPath,
  filterPagesByWorkout,
  findExerciseMatches,
  determineExerciseFilterStrategy,
  filterPagesByExercise,
  fetchAndFilterLogPages,
  applyRowStyling,
  renderLogTable,
  renderEmptyState,
};
