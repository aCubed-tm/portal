
<script>  /* eslint-disable */ </script>

<style lang="scss" scoped>
  svg {
    fill: transparent;
  }

  @keyframes wave {
    50% { fill: var(--blue); }
  }

  path {
    animation: wave 1.5s infinite;
  }
  path:nth-child(1) { animation-delay: -0.4s; }
  path:nth-child(2) { animation-delay: -0.3s; }
  path:nth-child(3) { animation-delay: -0.2s; }
  path:nth-child(4) { animation-delay: -0.1s; }
</style>

<template>
  <svg viewBox="0 0 40 32">
    <path d="M17.98 28.12c0-1.1.9-2.02 2.02-2.02s2.02.9 2.02 2.02-.9 2.02-2.02 2.02-2.02-.9-2.02-2.02"/>
    <path d="M20 18.02c3.34 0 6.37 1.36 8.57 3.55l-2.86 2.86c-1.45-1.46-3.47-2.37-5.7-2.37s-4.25.9-5.7 2.37l-2.87-2.86c2.2-2.2 5.23-3.55 8.57-3.55"/>
    <path d="M5.7 15.86c3.83-3.82 8.9-5.92 14.3-5.92s10.47 2.1 14.3 5.92l-2.87 2.85C28.38 15.67 24.33 14 20 14s-8.38 1.68-11.43 4.73L5.7 15.87"/>
    <path d="M31 4.08c3.38 1.43 6.4 3.47 9 6.06L37.14 13C32.56 8.42 26.48 5.9 20 5.9S7.44 8.42 2.86 13L0 10.14c2.6-2.6 5.62-4.63 9-6.06 3.48-1.47 7.18-2.22 11-2.22s7.52.74 11 2.22"/>
  </svg>
</template>

