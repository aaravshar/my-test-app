function handleToolUse(request) {
    logUse(request); // Logging to ensure toolUse is captured

    const response = performAction(request);

    if (response.success) {
        logResult(response); // Logging the corresponding toolResult
    } else {
        logError("Action failed.");
        handleFailure(response);
    }
}

// Further implementation details...
