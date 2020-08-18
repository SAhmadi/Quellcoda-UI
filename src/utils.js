// Use stack-based method to run through file tree,
// instead of recursive method because Vuejs mounted-hook has issues with it
export let createModels = function(files, store) {
  let fileIndexStack = [];
  let currFiles = files;
  let currIndex = 0;

  fileIndexStack.unshift({
    files: currFiles,
    index: currIndex,
  });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Get top of stack
    let topStack = fileIndexStack.shift();
    let currFiles = topStack.files;
    let currIndex = topStack.index;

    // Get file
    let file = currFiles[currIndex];

    // Check if directory
    if (file && file.children) {
      // Add the directory on stack,
      // to use after iterating over every file in folder
      fileIndexStack.unshift({
        files: currFiles,
        index: currIndex,
      });

      // Add its first children on to the stack
      currFiles = file.children;
      currIndex = 0;
      fileIndexStack.unshift({
        files: currFiles,
        index: currIndex,
      });

      // Start next iteration, because this one is a directory
      continue;
    }

    // Create Model
    if (file) {
      let model = {
        id: file.id,
        path: file.path,
        name: file.name,
        value: file.model.value,
        language: file.model.language,
      };
      //this.models.push(model);
      store.dispatch('updateModels', model);
    }

    // Check if next file exists
    currIndex++;

    if (currIndex < currFiles.length) {
      fileIndexStack.unshift({
        files: currFiles,
        index: currIndex,
      });
    }
    else {
      // If no more files on stack, finished
      if (fileIndexStack.length <= 0) {
        break;
      }

      // We created models for all files in directory
      // Remove directory from top of the stack
      topStack = fileIndexStack.shift();
      currFiles = topStack.files;
      currIndex = topStack.index;

      // Add next file on top of the stack
      currIndex++;
      fileIndexStack.unshift({
        files: currFiles,
        index: currIndex,
      });
    }
  }
};

export let updateModels = function(addModel, models, store) {
  // Find current model in models array and update it
  let _models = models;
  for (let i = 0; i < _models.length; i++) {
    if (_models[i].id === addModel.id) {
      _models[i] = addModel;
      break;
    }
  }
  // Save updated models array in Store
  store.dispatch('updateAllModels', _models);
}