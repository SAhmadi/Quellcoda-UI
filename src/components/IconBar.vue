<template>
  <div class="icon-bar">
    <div id="runBtn" type="button" class="btn btn-icon" @click="runProgram">
      <svg id="runBtnIcon" class="bi bi-play" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>
      </svg>
    </div>

    <div id="testBtn" type="button" class="btn btn-icon" @click="testProgram">
      <svg id="testBtnIcon" class="bi bi-lightning" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.251.068a.5.5 0 01.227.58L9.677 6.5H13a.5.5 0 01.364.843l-8 8.5a.5.5 0 01-.842-.49L6.323 9.5H3a.5.5 0 01-.364-.843l8-8.5a.5.5 0 01.615-.09zM4.157 8.5H7a.5.5 0 01.478.647L6.11 13.59l5.732-6.09H9a.5.5 0 01-.478-.647L9.89 2.41 4.157 8.5z" clip-rule="evenodd"/>
      </svg>
    </div>
  </div>
</template>

<script>
import JSZip from 'jszip';
import axios from 'axios';
// import { saveAs } from 'file-saver';

export default {
  name: 'icon-bar',
  data: () => ({
    fileIndexStack: [],
    editor: null,
    activeNode: null,
  }),
  methods: {
    disableBtnsAndConsole(isWaiting) {
      document.getElementById('runBtn').style.opacity = isWaiting ? 0.5 : 1.0;
      document.getElementById('runBtn').style.pointerEvents = isWaiting ? 'none' : 'all';

      document.getElementById('testBtn').style.opacity = isWaiting ? 0.5 : 1.0;
      document.getElementById('testBtn').style.pointerEvents = isWaiting ? 'none' : 'all';
    },

    // Run through models and create the file structure inside the zip
    createTreeFromModelsArr() {
      let models = this.$store.getters.models;
      let zip = new JSZip();

      for (let i = 0; i < models.length; i++) {
        zip.file('data/' + models[i].path + models[i].name, models[i].value);
      }

      return zip;
    },

    async callGradle(destUrl) {
      this.disableBtnsAndConsole(true);
      this.$store.dispatch('updateConsoleText', '');
      this.$store.dispatch('updateIsWaiting', true);

      // Create file structure inside zip and send to backend
      let zip = this.createTreeFromModelsArr();

      // Finalize zip
      await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
        .then(blob => {
          //saveAs(blob, 'data.zip');

          // Create Request object and send to backend
          let fileObj = new File([blob], 'data.zip', {type: 'zip'});
          let formData = new FormData();
          formData.append('file', fileObj);

          axios
            .post(
              destUrl,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            )
            .then(response => {
              console.log(response);
              // Display response on console
              let respAsJson = JSON.parse(response.request.response);
              this.$store.dispatch('updateIsWaiting', false);
              
              let respTxt = respAsJson['error'] + '\n' + respAsJson['msg'];
              this.$store.dispatch('updateConsoleText', respTxt);
            })
            .catch(error => {
              console.log(error);
              this.$store.dispatch('updateIsWaiting', false);
              this.$store.dispatch('updateConsoleText', error);
            })
            .finally(() => {
              this.disableBtnsAndConsole(false);
            });
        });
    },

    async runProgram() {
      await this.callGradle('https://ba-serverless-testing-t6e6p4w6oa-ew.a.run.app/run/gradle?return=json');
    },

    async testProgram() {
      await this.callGradle('https://ba-serverless-testing-t6e6p4w6oa-ew.a.run.app/test/gradle?return=json');
    },
  },
}
</script>

<style scoped lang="scss">
.icon-bar {
  width: 70px;
  height: 100%;
  background: #fff;
  position: absolute;
  border-right: solid 1px #ddd;
  border-left: solid 1px #ddd;

  .btn {
    width: 100%;
    height: 70px;
    padding: 0;

    svg {
      width: 2em;
      height: 2em;
      margin-top: 16px;
    }
  }
  .btn:hover {
    svg {
      color: #0C9A9A;
    }
  }
}
</style>
