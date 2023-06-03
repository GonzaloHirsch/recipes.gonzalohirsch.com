<template>
    <main>
        <BlogHero />
        <Section id="main" class="!pt-0">
            <ContentQuery
                path="/recipes"
                :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
                :sort="{
                    date: -1
                }"
                :limit="blogCountLimit"
                v-slot="{ data }"
            >
                <BlogList :data="data" name="All Recipes"/>
            </ContentQuery>
            <BlogPagination
                v-if="data > 1"
                class="mt-8"
                :currentPage="1"
                :totalPages="data"
                :nextPage="data > 1"
                baseUrl="/recipes/"
                pageUrl="/recipes/page/"
            />
        </Section>
    </main>
</template>

<script setup>
// Find the number of blogs present
const blogCountLimit = 6;
const { data } = await useAsyncData(`content-/recipes`, async () => {
    const _posts = await queryContent('/recipes').only('headline').find();
    return Math.ceil(_posts.length / blogCountLimit);
});

// Set the meta
const title = "All Recipes | Gonzalo's Recipes";
const description =
    "Discover the joy of cooking with Gonzalo's Recipes, a delightful collection of simple, quick, and delicious dishes that skip the fluff and focus on high-quality ingredients, easy-to-follow instructions, and a passion for creating mouthwatering meals that will impress your family and friends.";
const baseUrl = 'https://recipes.gonzalohirsch.com/';
const image = 'meta-img.webp';
const canonicalPath = baseUrl + 'recipes/';

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
