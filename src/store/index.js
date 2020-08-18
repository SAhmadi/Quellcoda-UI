import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeNode: {},
    activeNodeId: 1,
    activeModel: {},
    fileTreeChildren: [],
    models: [],
    newFileCounter: 0,
    consoleText: '',
    isWaiting: false,
    isGradleProject: false,
  },
  mutations: {
    mutateActiveNode(state, activeNode) {
      //state.activeNode = { ...state.activeNode, activeNode };
      state.activeNode = activeNode;
    },
    mutateActiveNodeId(state, activeNodeId) {
      state.activeNodeId = activeNodeId;
    },
    mutateActiveModel(state, activeModel) {
      state.activeModel = { ...state.activeModel, activeModel };
    },
    mutateFileTreeChildren(state, fileTreeChildren) {
      //Vue.set(state, 'fileTreeChildren', [...fileTreeChildren]);
      state.fileTreeChildren = [ ...fileTreeChildren ];
    },
    mutateModels(state, newModel) {
      //Vue.set(state, 'models', [...newModels]);
      state.models = [ ...state.models, newModel];
    },
    mutateAllModels(state, newModels) {
      state.models = [ ...newModels ];
    },
    mutateNewFileCounter(state, newCounter) {
      state.newFileCounter = newCounter;
    },
    mutateConsoleText(state, newConsoleText) {
      state.consoleText = newConsoleText;
    },
    mutateIsWaiting(state, isWaiting) {
      state.isWaiting = isWaiting;
    },
    mutateIsGradleProject(state, isGradleProject) {
      state.isGradleProject = isGradleProject;
    }
  },
  actions: {
    updateActiveNode({ commit }, activeNode) {
      commit('mutateActiveNode', activeNode);
      commit('mutateActiveNodeId', activeNode.id);
      commit('mutateActiveModel', activeNode.model);
    },
    updateActiveNodeId({ commit }, activeNodeId) {
      commit('mutateActiveNodeId', activeNodeId);
    },
    updateActiveModel({ commit }, activeModel) {
      commit('mutateActiveModel', activeModel);
    },
    updateFileTree({ commit }, fileTreeChildren) {
      commit('mutateFileTreeChildren', fileTreeChildren);
    },
    updateModels({ commit }, newModel) {
      commit('mutateModels', newModel);
    },
    updateAllModels({ commit }, newModels) {
      commit('mutateAllModels', newModels);
    },
    updateNewFileCounter({ commit }, newCounter) {
      commit('mutateNewFileCounter', newCounter);
    },
    updateConsoleText({ commit }, consoleText) {
      commit('mutateConsoleText', consoleText);
    },
    updateIsWaiting({ commit }, isWaiting) {
      commit('mutateIsWaiting', isWaiting);
    },
    updateIsGradleProject({ commit }, isGradleProject) {
      commit('mutateIsGradleProject', isGradleProject);
    }
  },
  getters: {
    activeNode: state => state.activeNode,
    activeNodeId: state => state.activeNodeId, // state.activeNodeId,
    activeModel: state => state.activeModel, // state.activeModel,
    fileTreeChildren: state => state.fileTreeChildren,
    models: state => state.models,
    newFileCounter: state => state.newFileCounter,
    consoleText: state => state.consoleText,
    isWaiting: state => state.isWaiting,
    isGradleProject: state => state.isGradleProject,
  },
  modules: {},
});
