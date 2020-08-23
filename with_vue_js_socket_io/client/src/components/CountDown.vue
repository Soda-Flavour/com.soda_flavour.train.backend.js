<template>
  <div>
    <p class="yes-no">No</p>
    <p class="time-left">{{currentTime}}</p>
  </div>
</template>

<script>
// import { formatDistance } from "date-fns";

export default {
  data: () => ({
    currentTime: new Date().toLocaleTimeString(),
  }),
  created() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 500);
  },
};
</script>

<style>
.yes-no {
  margin: 2rem;
  text-align: center;
  font-size: calc(2rem + 8vmin);
}

.question .time-left {
  font-size: calc(1rem + 4vmin);
}
</style>
