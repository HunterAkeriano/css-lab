<template>
  <div class="news-scroll">
    <span class="news-scroll__label">BREAKING</span>
    <div class="news-scroll__content">
      <span>Latest updates from the world of web development</span>
      <span>Latest updates from the world of web development</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-scroll {
  display: inline-flex;
  align-items: center;
  gap: $space-md;
  padding: $space-md $space-lg;
  border-radius: $border-radius-xl;
  background: color-var-alpha('color-bg-primary', 0.96);
  border: 1px solid color-var-alpha('panel-border', 0.24);
  overflow: hidden;
  max-width: 350px;
}

.news-scroll__label {
  flex-shrink: 0;
  padding: $space-xs $space-md;
  border-radius: $border-radius-md;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-size: $font-size-xs;
  font-weight: $font-weight-bold;
  letter-spacing: 0.1em;
}

.news-scroll__content {
  display: flex;
  gap: $space-3xl;
  animation: newsSlide 12s linear infinite;
}

.news-scroll__content span {
  white-space: nowrap;
  font-size: $font-size-sm;
  color: color-var-alpha('color-text-secondary', 0.9);
}

@keyframes newsSlide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
