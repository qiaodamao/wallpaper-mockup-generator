<script lang="ts" setup>
definePageMeta({ layout: 'page' })
const localePath = useLocalePath()
const config = useRuntimeConfig()
console.log("configs:", config.public.region)

const { awesome } = useAppConfig()
const { parseMenuRoute, parseMenuTitle } = useNavbarParser()

const props = defineProps({
  withAlert: {
    type: Boolean,
    default: true,
  },
})
const showAlert = ref(
  awesome?.layout?.welcome?.disableInfoReplaceIndexInWelcomePage
    ? !awesome?.layout?.welcome?.disableInfoReplaceIndexInWelcomePage
    : props.withAlert,
)


const leadingsText = computed(() => [
  {
    text: 'Helps wallpaper creators',
    startColor: '#007CF0',
    endColor: '#00DFD8',
    delay: 0,
  },
  {
    text: 'Quickly generate realistic device mockups',
    startColor: '#7928CA',
    endColor: '#FF0080',
    delay: 2,
  }
])

onMounted(() => {
  try {
    console.log('aweawe', parseMenuTitle('aweawe'), this)
  } catch (error) {
    console.log('aweawe error', error)
  }
})
</script>

<template>
  <div class="flex flex-1 py-4 max-w-screen-2xl w-full px-4 mx-auto">
    <div class="flex-1 flex flex-col items-center">
      <h1 class="text-center mt-4">
        <span v-for="(item, i) in leadingsText" :key="i" :style="`--content: '${item.text}'; --start-color: ${item.startColor
          }; --end-color: ${item.endColor}; --animation-name: anim-fg-${i + 1
          }`" class="animated-text-bg drop-shadow-xl block font-black text-[40px]">
          <span class="animated-text-fg">{{ item.text }}</span>
        </span>
      </h1>
      <div class="flex space-x-4 ml-2 mt-8 justify-center md:justify-start">
        <Button size="lg" text="Get started" :to="localePath('/mockup')" class="font-extrabold" />
      </div>

      <section class="py-10 text-card-foreground">
        <div class="container">
          <div class="mt-12 grid grid-cols-1 gap-8">
            <div class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:p-12 lg:grid-cols-2 lg:gap-16">
              <div class="overflow-hidden rounded-xl bg-primary/10">
                <img src="/images/introduce-1.png" alt="Feature 1" class="block object-cover" />
              </div>

              <div>
                <h3 class="font-bold text-4xl">Multi-device mockup support</h3>
                <p class="mt-5 text-foreground/60 leading-normal">
                  Covers iPhone, iPad, Mac, and more to meet diverse display needs
                </p>
              </div>
            </div>
          </div>
        </div>
<!-- 
        <div class="container">
          <div class="mt-12 grid grid-cols-1 gap-8">
            <div class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:p-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 class="font-bold text-3xl">Rich template selection</h3>
                <p class="mt-2 text-foreground/60 leading-normal">
                  Offers hundreds of templates suitable for various styles and scenes
                </p>
              </div>
              <div class="overflow-hidden rounded-xl bg-primary/10 pt-6 px-8 md:px-48 md:pt-8 lg:px-24 lg:pt-12">
                <img src="" alt="Feature 1" class="block" />
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="mt-12 grid grid-cols-1 gap-8">
            <div class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:p-12 lg:grid-cols-2 lg:gap-16">
              <div class="overflow-hidden rounded-xl bg-primary/10 pt-6 px-8 md:px-48 md:pt-8 lg:px-24 lg:pt-12">
                <img src="" alt="Feature 1" class="block" />
              </div>

              <div>
                <h3 class="font-bold text-3xl">Highly customizable settings</h3>
                <p class="mt-2 text-foreground/60 leading-normal">
                  Users can adjust background, blur level, font color, and more to ensure the best visual effect
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="mt-12 grid grid-cols-1 gap-8">
            <div class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:p-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 class="font-bold text-3xl">Batch export function</h3>
                <p class="mt-2 text-foreground/60 leading-normal">
                  Supports batch processing to save time
                </p>
              </div>
              <div class="overflow-hidden rounded-xl bg-primary/10 pt-6 px-8 md:px-48 md:pt-8 lg:px-24 lg:pt-12">
                <img src="" alt="Feature 1" class="block" />
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="mt-12 grid grid-cols-1 gap-8">
            <div class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:p-12 lg:grid-cols-2 lg:gap-16">
              <div class="overflow-hidden rounded-xl bg-primary/10 pt-6 px-8 md:px-48 md:pt-8 lg:px-24 lg:pt-12">
                <img src="" alt="Feature 1" class="block" />
              </div>

              <div>
                <h3 class="font-bold text-3xl">Cross-platform compatibility</h3>
                <p class="mt-2 text-foreground/60 leading-normal">
                  Create anytime, anywhere, on any device
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="mt-12 grid grid-cols-1 gap-8">
            <div class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:p-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 class="font-bold text-3xl">Intelligent color matching</h3>
                <p class="mt-2 text-foreground/60 leading-normal">
                  Automatically matches the wallpaper’s main color tone to enhance overall aesthetics
                </p>
              </div>
              <div class="overflow-hidden rounded-xl bg-primary/10 pt-6 px-8 md:px-48 md:pt-8 lg:px-24 lg:pt-12">
                <img src="" alt="Feature 1" class="block" />
              </div>
            </div>
          </div>
        </div> -->

      </section>

    </div>
  </div>
</template>

<style lang="scss">
:root {
  --padding: 0.05em;
}

@keyframes anim-fg-1 {

  0%,
  16.667%,
  100% {
    opacity: 1;
  }

  33.333%,
  83.333% {
    opacity: 0;
  }
}

@keyframes anim-fg-2 {

  0%,
  16.667%,
  66.667%,
  100% {
    opacity: 0;
  }

  33.333%,
  50% {
    opacity: 1;
  }
}

@keyframes anim-fg-3 {

  0%,
  50%,
  100% {
    opacity: 0;
  }

  66.667%,
  83.333% {
    opacity: 1;
  }
}

.animated-text-bg {
  position: relative;
  display: block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  content: var(--content);
  display: block;
  width: 100%;
  color: theme('colors.slate.800');
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-left: var(--padding);
  padding-right: var(--padding);

  &:before {
    content: var(--content);
    position: absolute;
    display: block;
    width: 100%;
    color: theme('colors.slate.800');
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    padding-left: var(--padding);
    padding-right: var(--padding);
  }
}

.animated-text-fg {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: var(--padding);
  padding-right: var(--padding);
  background-image: linear-gradient(90deg,
      var(--start-color),
      var(--end-color));
  position: relative;
  opacity: 0;
  z-index: 1;
  animation: var(--animation-name) 8s infinite;
}

html.dark {
  .animated-text-bg {
    color: theme('colors.gray.100');

    &:before {
      color: theme('colors.gray.100');
    }
  }
}
</style>
