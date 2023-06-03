<template>
    <Section id="recipes" class="text-typography_primary_light">
        <div
            class="border-t-2 pt-8 border-typography_primary_light flex flex-col md:flex-row items-center md:justify-between md:text-right mb-6 md:mb-8"
        >
            <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="blog-breadcrumb">
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a itemprop="item" href="https://recipes.gonzalohirsch.com/"> <span itemprop="name">Home</span></a>
                    <meta itemprop="position" content="1" />
                </li>
                <span>/</span>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span itemprop="name">{{ currentPage }}</span>
                    <meta itemprop="position" content="2" />
                </li>
            </ol>
        </div>
        <h1 class="font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left">{{ title }}</h1>
        <p class="mb-3 md:w-8/12 md:text-lg md:leading-lg text-center md:text-left">
            {{ description }}
        </p>
        <p class="mb-8 text-sm leading-sm text-center md:text-left">
            <a href="/rss.xml" target="_blank" class="hover:underline"><em>Get the RSS feed!</em></a>
        </p>
        <div
            class="border-t-2 mt-8 border-typography_primary_light flex flex-col md:flex-row items-center md:justify-between md:text-right"
        ></div>
    </Section>
</template>

<script setup>
const props = defineProps({
    currentPage: {
        type: String,
        required: false,
        default: "Recipes"
    },
    title: {
        type: String,
        required: false,
        default: "Recipes"
    },
    description: {
        type: String,
        required: false,
        default: "Discover the joy of cooking with Gonzalo's Recipes, a delightful collection of simple, quick, and delicious dishes that skip the fluff and focus on high-quality ingredients, easy-to-follow instructions, and a passion for creating mouthwatering meals that will impress your family and friends."
    }
});
</script>
