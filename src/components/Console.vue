<template>
 <div class="console">
   <div class="loader" id="loader"></div>
   {{ consoleText }}
  </div>
</template>

<script>
export default {
  name: "console",
  props: {},
  data: function() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    consoleText() {
      return this.$store.getters.consoleText;
    },
  },
  watch: {
    '$store.state.isWaiting': function() {
      console.log(this.$store.state.isWaiting);
      if (this.$store.state.isWaiting) {
        document.getElementById('loader').style.display = 'block';
      }
      else {
        document.getElementById('loader').style.display = 'none';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.console {
  padding: 16px;
  font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace;
  height: 100%;
  background: #f0f0f5;
  white-space: pre;

  /* (see https://www.w3schools.com/howto/howto_css_loader.asp) */
  .loader {
    display: none;
    border: 4px solid #bbb;
    border-top: 4px solid black;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
</style>