<template>
  <div id="app">
    <icon-bar class="icon-bar" />
    <file-tree :tree-data="fileTree" :models="models" class="file-tree" />
    <div ref="editor" class="editor" id="container"></div>
    <console />
  </div>
</template>

<script>
import IconBar from './components/IconBar.vue';
import FileTree from './components/FileTree.vue';
import Console from './components/Console';
import * as monaco from 'monaco-editor';
import _ from 'lodash';
import { defaultGradleProject } from './defaultGradleProject.js';
import { createModels, updateModels } from './utils.js';

export default {
  name: 'App',
  components: {
    Console,
    IconBar,
    FileTree,
  },
  data: () => ({
    // tree: {
    //   children: [
    //     {
    //       id: 1,
    //       path: '',
    //       name: 'Main.java',
    //       model: {
    //         value: '// This is your main file...',
    //         language: 'java',
    //       },
    //     },
    //   ],
    // },
    tree: defaultGradleProject,
    editor: null,
    activeNode: null,
    // fileIndexStack: [],
  }),
  methods: {
    // Updates content of current file model and saves models in Store
    storeModelUpdate: _.debounce(function() {
      // Get current model values
      let newModel = {
        id: this.$store.getters.activeNode.id,
        path: this.$store.getters.activeNode.path,
        name: this.$store.getters.activeNode.name,
        language: this.$store.getters.activeNode.model.language,
        value: this.editor.getValue(),
      };

      // Find current model in models array and update it
      let _models = this.models;
      // for (let i = 0; i < _models.length; i++) {
      //   if (_models[i].id === newModel.id) {
      //     _models[i] = newModel;
      //     break;
      //   }
      // }
      // // Save updated models array in Store
      // this.$store.dispatch('updateAllModels', _models);
      updateModels(newModel, _models, this.$store);
    }, 500),
  },
  computed: {
    fileTree() {
      return {
        children: this.$store.getters.fileTreeChildren,
      };
    },
    models() {
      return this.$store.getters.models;
    },
  },
  watch: {
    // Set new active model on new active node
    '$store.state.activeNodeId': function() {
      // If new active node is directory, no work needed
      if (this.$store.getters.activeNode.children) return;

      // Find model that belongs to current active node
      let activeModel;
      for (let i = 0; i < this.models.length; i++) {
        if (this.models[i].id === this.$store.getters.activeNodeId) {
          activeModel = this.models[i];
          break;
        }
      }

      this.editor.setModel(
        monaco.editor.createModel(
          activeModel.value,
          activeModel.language,
        )
      );
    },
  },
  mounted() {
    // Save default gradle project in Store
    this.$store.dispatch('updateFileTree', this.tree.children);
    this.$store.dispatch('updateNewFileCounter', 20);

    //this.createModels(this.fileTree.children);
    createModels(this.fileTree.children, this.$store);

    // Create Monaco-Editor and set active model
    this.editor = monaco.editor.create(document.getElementById('container'), {
      language: 'java'
    });
    this.editor.setModel(monaco.editor.createModel(
      this.models[0].value,
      this.models[0].language,
    ));

    this.$store.dispatch('updateActiveNode', this.fileTree.children[0]);
    this.activeNode = this.$store.getters.activeNode;

    // Set editor notifiers
    this.editor.onDidChangeModelContent(() => {
      this.storeModelUpdate();
    });
  },
}
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";

body {
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-bar {
  min-width: 70px;
  max-width: 70px;
}

.file-tree {
  width: 14%;
  margin-left: 70px;
}

.editor {
  height: 100%;
  /*margin-left: 370px;*/
  margin-left: 17%;
  width: 60%;
  position: absolute;
}

.monaco-editor {
  margin-top: 20px;
}

.console {
  height: 100%;
  background: #f0f0f5;

  right: 0;
  width: 23.5%;
  position: absolute;
}
</style>
