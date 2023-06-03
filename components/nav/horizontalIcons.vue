<template>
    <div class="flex flex-row">
        <template v-for="icon in icons" :key="icon.href">
            <NuxtLink
                :to="icon.href"
                target="_blank"
                :rel="icon.rel"
                :class="[
                    'hover:scale-125 mx-2 text-typography_primary_light hover:text-brand_primary_light transition-transform duration-100',
                    props.addVerticalMargin ? 'my-2 lg:my-0' : ''
                ]"
            >
                <component :is="icon.icon" :alt="icon.alt" :aria-label="icon.alt" class="w-6 h-6" width="24" height="24" />
            </NuxtLink>
        </template>
    </div>
</template>

<script setup>
import Github from '../icons/github.vue';
import Instagram from '../icons/instagram.vue';
import Linkedin from '../icons/linkedin.vue';
import Toptal from '../icons/toptal.vue';
import Gmail from '../icons/gmail.vue';
import Eth from '../icons/eth.vue';
import Google from '../icons/google.vue';

const icons = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/gonzalo-hirsch/', rel: 'noopener noreferer', alt: 'LinkedIn profile.' },
    { icon: Github, href: 'https://github.com/GonzaloHirsch', rel: 'noopener noreferer', alt: 'Github profile.' },
    { icon: Toptal, href: 'https://www.toptal.com/resume/gonzalo-hirsch', rel: 'noopener noreferer', alt: 'Toptal profile.' },
    { icon: Gmail, href: 'mailto:hirschgonzalo@gmail.com', rel: 'noopener noreferer', alt: 'Email address.' },
    { icon: Instagram, href: 'https://www.instagram.com/gonzalohirsch/?hl=en', rel: 'noopener noreferer', alt: 'Instagram profile.' },
    { icon: Eth, href: 'https://app.ens.domains/ghirsch.eth', rel: 'noopener noreferer', alt: 'ENS.' },
    { icon: Google, href: 'https://gonzalohirsch.com', rel: 'noopener', alt: 'Personal website.' }
];

const props = defineProps({
    addVerticalMargin: {
        type: Boolean,
        default: false
    }
});
</script>
