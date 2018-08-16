<template>
  <div>
    <span class="badge badge-pill text-monospace" :class="color">
      <small>
        <slot></slot>
      </small>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'badge-success'
    }
  }
}
</script>

<style scoped>
div {
  display: inline;
}
</style>