<script setup lang="ts">
import { inject, onMounted } from 'vue'

const prizes = [
  {
    text: '10% Off Sticker Price',
    color: 'hsl(197 30% 43%)',
    reaction: 'dancing'
  },
  {
    text: 'Free Car',
    color: 'hsl(173 58% 39%)',
    reaction: 'shocked'
  },
  {
    text: 'No Money Down',
    color: 'hsl(43 74% 66%)',
    reaction: 'shocked'
  },
  {
    text: 'Half Off Sticker Price',
    color: 'hsl(27 87% 67%)',
    reaction: 'shocked'
  },
  {
    text: 'Free DIY Carwash',
    color: 'hsl(12 76% 61%)',
    reaction: 'dancing'
  },
  {
    text: 'Eternal Damnation',
    color: 'hsl(350 60% 52%)',
    reaction: 'laughing'
  },
  {
    text: 'Used Travel Mug',
    color: 'hsl(91 43% 54%)',
    reaction: 'laughing'
  },
  {
    text: 'One Solid Hug',
    color: 'hsl(140 36% 74%)',
    reaction: 'dancing'
  }
]

const prizeSlice = 360 / prizes.length
const prizeOffset = Math.floor(180 / prizes.length)

function createPrizeNodes() {
  prizes.forEach(({ text, color, reaction }, i) => {
    const rotation = prizeSlice * i * -1 - prizeOffset
    if (document.querySelector('.spinner')) {
      document.querySelector('.spinner')?.insertAdjacentHTML(
        'beforeend',
        `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
      )
    }
  })
}

const createConicGradient = () => {
  if (document.querySelector('.spinner')) {
    document.querySelector('.spinner')?.setAttribute(
      'style',
      `background: conic-gradient(
      from -90deg,
      ${prizes
        .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
        .reverse()}
    );`
    )
  }
}

onMounted(() => {
  createPrizeNodes()
  createConicGradient()
})

const wheelController = inject(PARTS_CONTROLLER_FACTORY)!.build()
</script>

<template>
  <div class="content-wheel">
    <div class="nad-bfw__wheel">
      <ul class="nad-bfw__wheel--spinner spinner"></ul>
    </div>
  </div>
</template>

<style lang="scss">
.content-wheel {
  display: grid;
  place-items: center;
  overflow: hidden;
}

.nad-bfw__wheel {
  --size: clamp(250px, 80vmin, 700px);
  --lg-hs: 0 3%;
  --lg-stop: 50%;
  --lg: linear-gradient(
    hsl(var(--lg-hs) 0%) 0 var(--lg-stop),
    hsl(var(--lg-hs) 20%) var(--lg-stop) 100%
  );

  position: relative;
  display: grid;
  grid-gap: calc(var(--size) / 20);
  align-items: center;
  grid-template-areas:
    'spinner'
    'trigger';
  font-family: 'Girassol', sans-serif;
  font-size: calc(var(--size) / 21);
  line-height: 1;
  text-transform: lowercase;

  &--spinner {
    position: relative;
    display: grid;
    align-items: center;
    grid-template-areas: 'spinner';
    width: var(--size);
    height: var(--size);
    transform: rotate(calc(var(--rotate, 25) * 1deg));
    border-radius: 50%;
    box-shadow: inset 0 0 0 calc(var(--size) / 40) hsl(0deg 0% 0% / 0.06);
  }
}

.nad-bfw__wheel > * {
  grid-area: spinner;
}

.spinner * {
  grid-area: spinner;
}

.prize {
  position: relative;
  display: flex;
  align-items: center;
  width: 50%;
  height: 50%;
  transform-origin: center right;
  transform: rotate(var(--rotate));
  user-select: none;
}
</style>
