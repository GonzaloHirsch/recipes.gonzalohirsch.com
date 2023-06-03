<template>
    <NavVerticalNav :left="true">
        <template v-for="icon in icons" :key="icon.href">
            <NuxtLink
                :to="icon.href"
                target="_blank"
                :rel="icon.rel"
                class="vertical-content my-2 text-typography_primary_light dark:text-typography_primary_dark hover:text-brand_primary_light dark:hover:text-brand_primary_dark rounded-sm transition-transform duration-100"
            >
                <component :is="icon.icon" :alt="icon.alt" :aria-label="icon.alt" class="w-6 h-6" width="24" height="24" />
            </NuxtLink>
        </template>
    </NavVerticalNav>
</template>

<script setup>
import Github from '../icons/github.vue';
import Instagram from '../icons/instagram.vue';
import Linkedin from '../icons/linkedin.vue';
import Toptal from '../icons/toptal.vue';
import Eth from '../icons/eth.vue';
import Google from '../icons/google.vue';

const icons = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/gonzalo-hirsch/', rel: 'noopener noreferer', alt: 'LinkedIn profile.' },
    { icon: Github, href: 'https://github.com/GonzaloHirsch', rel: 'noopener noreferer', alt: 'Github profile.' },
    { icon: Toptal, href: 'https://www.toptal.com/resume/gonzalo-hirsch', rel: 'noopener noreferer', alt: 'Toptal profile.' },
    { icon: Instagram, href: 'https://www.instagram.com/gonzalohirsch/?hl=en', rel: 'noopener noreferer', alt: 'Instagram profile.' },
    { icon: Eth, href: 'https://app.ens.domains/ghirsch.eth', rel: 'noopener noreferer', alt: 'ENS.' },
    { icon: Google, href: 'https://gonzalohirsch.com', rel: 'noopener', alt: 'Personal website.' }
];
</script>
