<template>
    <main id="main">
        <SectionsHero />
        <SectionsLatestRecipes />
    </main>
</template>

<script setup>
const title = "Gonzalo's Recipes";
const description =
    "Explore Gonzalo's Recipes, a delightful collection of simple and quick dishes that focus on high-quality ingredients and easy-to-follow instructions. Discover mouthwatering recipes that will impress your family and friends with their delicious flavors.";
const image = '/meta-img.webp';
const url = 'https://recipes.gonzalohirsch.com';

// Get the authors
const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne());
const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: url,
    description: description,
    publisher: authorData.value['Gonzalo Hirsch'],
    license: 'http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US'
};
useHead({
    title: title,
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
            hid: 'description',
            name: 'description',
            content: description
        },
        {
            hid: 'keywords',
            name: 'keywords',
            content:
                'Development, Developer, Software, Engineer, Software Engineer, Engineering, Full-Stack, Freelancer, Experiences, AWS, Solutions Architect Associate, SAA-C03'
        },
        {
            hid: 'author',
            name: 'author',
            content: 'Gonzalo Hirsch'
        },
        // OG Card
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:image', property: 'og:image', content: url + image },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
        { hid: 'og:image:width', property: 'og:image:width', content: '800' },
        { hid: 'og:image:height', property: 'og:image:height', content: '418' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: "Gonzalo's Recipes" },

        // Twitter card
        { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:url', name: 'twitter:url', content: url },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: url + image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: "Gonzalo's Recipes" }
    ],
    link: [
        {
            hid: 'canonical',
            rel: 'canonical',
            href: url
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
