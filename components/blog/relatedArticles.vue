<template>
    <div>
        <span class="blog-aside-title mb-2 block">Continue Reading</span>
        <ul class="list-none">
            <template v-for="(other, index) in surround" :key="index">
                <li v-if="other" class="first:mt-0 mt-4 md:mt-1">
                    <NuxtLink
                        :to="other._path + '/'"
                        class="hover:underline hover:text-brand_primary_light dark:hover:text-brand_primary_dark"
                        :aria-label="other.headline"
                    >
                        {{ other.headline }}
                    </NuxtLink>
                    <p class="!no-underline md:hidden text-sm leading-sm md:text-xs md:leading-xs mt-1">{{ other.excerpt }}</p>
                    <p class="!no-underline md:hidden text-sm leading-sm md:text-xs md:leading-xs mt-1 text-typography_primary_light/60">
                        <template v-for="(tag, index) in other.tags" :key="`tag-${index}`">
                            <em>{{ tag }}</em>
                            <span v-if="index < other.tags.length - 1" class="mx-2">/</span>
                        </template>
                    </p>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    surround: {
        type: Array,
        required: true
    }
});
</script>
