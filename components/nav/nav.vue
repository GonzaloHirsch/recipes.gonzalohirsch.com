<template>
    <nav
        :class="[
            'sticky top-0 px-section_x_sm sm:px-section_x py-4 h-nav flex flex-row items-center justify-between z-50 w-full transition-transform duration-[.4s]',
            isUp ? '' : 'lg:transform lg:-translate-y-full',
            'bg-background_light dark:bg-background_dark bg-opacity-[98%] overflow-x-hidden overflow-y-clip'
        ]"
    >
        <NuxtLink
            class="text-h4 leading-h4 md:text-h3 md:leading-h3 font-semibold text-brand_primary_light dark:text-brand_primary_dark"
            to="/#"
            target="_self"
            >Gonzalo's Recipes</NuxtLink
        >
        <ul class="hidden lg:flex flex-row">
            <template v-for="link in links" :key="link.href">
                <li class="large-nav-item">
                    <NuxtLink :to="link.href" :alt="link.alt" target="_self">
                        {{ link.text }}
                    </NuxtLink>
                </li>
            </template>
        </ul>
        <IconsMenu
            :class="[
                'w-8 h-8 block lg:hidden cursor-pointer text-typography_primary_light dark:text-typography_primary_dark',
                isMenuVisible ? 'hidden' : ''
            ]"
            width="32"
            height="32"
            @click="toggleMenu"
        />
        <IconsClose
            :class="[
                'w-8 h-8 block lg:hidden cursor-pointer text-typography_primary_light dark:text-typography_primary_dark',
                isMenuVisible ? '' : 'hidden'
            ]"
            width="32"
            height="32"
            @click="toggleMenu"
        />
    </nav>
    <nav
        :class="[
            'side-menu h-full fixed bottom-0 right-0 border-l border-typography_primary_light dark:border-typography_primary_dark bg-background_light dark:bg-background_dark bg-opacity-[98%] flex lg:hidden flex-col items-center transition-transform duration-100',
            isMenuVisible ? '' : 'translate-x-full'
        ]"
    >
        <ul class="flex flex-col items-center mt-4">
            <template v-for="link in links" :key="link.href">
                <li class="mobile-nav-item">
                    <NuxtLink :to="link.href" :alt="link.alt" target="_self" @click="handleNavClick">
                        {{ link.text }}
                    </NuxtLink>
                </li>
            </template>
        </ul>
        <NavHorizontalIcons class="mt-auto mb-6 flex flex-wrap items-center justify-center w-8/12" :add-vertical-margin="true"/>
    </nav>
    <div v-if="isMenuVisible" class="z-[5] absolute bottom-0 top-0 right-0 left-0 w-full h-full bg-gray-400 bg-opacity-25" @click="toggleMenu" />
</template>

<script setup>
// Link rendering
const links = [
    {
        href: '/#latest-recipes',
        text: 'Latest Recipes',
        alt: 'Check out the latest recipes.'
    },
    {
        href: '/recipes/',
        text: 'All Recipes',
        alt: 'Check out all the recipes.'
    },
    {
        href: '/search/',
        text: 'Search Recipes',
        alt: 'Search within all the recipes.'
    }
];

// Menu visibility
const isMenuVisible = ref(false);
const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
    if (isMenuVisible.value) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
};
const handleNavClick = () => {
    setTimeout(() => toggleMenu(), 100);
};

// Scroll handling
import { onUnmounted, ref } from 'vue';
const previousScroll = ref(0);
// Start scroll up by default to show the nav
const isUp = ref(true);
const handleScroll = () => {
    // Only run the code if we are on the client
    if (typeof window !== 'undefined') {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        isUp.value = !(st > previousScroll.value);
        previousScroll.value = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }
};
if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
}
onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
    }
});
</script>

<style scoped>
.side-menu {
    @apply z-50;
    height: calc(100% - theme('spacing.nav'));
    width: 250px;
}

.large-nav-item {
    @apply cursor-pointer list-none mx-2 text-h5 rounded-md text-typography_primary_light;
}
.large-nav-item a {
    @apply px-2 py-1;
}
.large-nav-item:hover {
    @apply bg-brand_primary_light text-typography_primary_dark;
}
.mobile-nav-item {
    @apply cursor-pointer list-none my-2 text-h5 rounded-md px-2 py-1 text-typography_primary_light;
}
.mobile-nav-item a {
    @apply px-2 py-1;
}
.mobile-nav-item:hover {
    @apply bg-brand_primary_light text-typography_primary_dark;
}
</style>
