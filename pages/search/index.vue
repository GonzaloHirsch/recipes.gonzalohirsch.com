<template>
    <main>
        <BlogHero
            currentPage="Search Recipes"
            title="Search Recipes"
            description="Discover the joy of cooking with Gonzalo's Recipes, a delightful collection of simple, quick, and delicious dishes. Skip the fluff and explore a variety of recipes that feature high-quality ingredients, easy-to-follow instructions, and a passion for creating mouthwatering meals. Search among our diverse selection and impress your family and friends with culinary delights that will leave them wanting more."
            class="pb-5 md:pb-6"
        />
        <Section id="main" class="!pt-0">
            <input
                type="text"
                placeholder="Search for a recipe name or tag..."
                v-model="filter"
                class="w-full border-2 rounded-md my-4 px-4 py-2 border-typography_primary_light active:border-brand_primary_light focus:border-brand_primary_light focus-visible:border-brand_primary_light ring-0 ring-offset-0 outline-none"
            />
            <ContentQuery
                path="/recipes"
                :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
                :sort="{
                    date: -1
                }"
                :where="{ $or: [{ headline: { $regex: `/${filter}/ig` }}, {tags: { $regex: `/${filter}/ig` } }] }"
                v-slot="{ data }"
            >
                <BlogList :data="data" name="All Recipes"/>
            </ContentQuery>
        </Section>
    </main>
</template>

<script setup>
import { ref } from 'vue';
const filter = ref('');

// Set the meta
const title = "Search Recipes | Gonzalo's Recipes";
const description =
    "Discover the joy of cooking with Gonzalo's Recipes, a delightful collection of simple, quick, and delicious dishes. Skip the fluff and explore a variety of recipes that feature high-quality ingredients, easy-to-follow instructions, and a passion for creating mouthwatering meals. Search among our diverse selection and impress your family and friends with culinary delights that will leave them wanting more.";
const baseUrl = 'https://recipes.gonzalohirsch.com/';
const image = 'meta-img.webp';
const canonicalPath = `${baseUrl}search/`;

// Get the authors
const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne());
const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: canonicalPath,
    description: description,
    publisher: authorData.value['Gonzalo Hirsch'],
    license: 'http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US'
};
useHead({
    title: title,
    meta: [
        // OG
        { name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:url', property: 'og:url', content: canonicalPath },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:image', property: 'og:image', content: baseUrl + image },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
        { hid: 'og:image:width', property: 'og:image:width', content: '800' },
        { hid: 'og:image:height', property: 'og:image:height', content: '418' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: 'Gonzalo Hirsch' },
        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:url', name: 'twitter:url', content: canonicalPath },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: baseUrl + image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Gonzalo Hirsch' }
    ],
    link: [
        {
            hid: 'canonical',
            rel: 'canonical',
            href: canonicalPath
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify(webpage)
        }
    ]
});
</script>
