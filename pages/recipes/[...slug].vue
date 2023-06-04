<template>
    <main class="blog-post-text">
        <ContentDoc>
            <template v-slot="{ doc }">
                <Section id="blog-title" type="header">
                    <div
                        class="border-t-2 pt-8 border-typography_primary_light flex flex-col md:flex-row items-center md:justify-between md:text-right mb-12 md:mb-8"
                    >
                        <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="blog-breadcrumb">
                            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                <a itemprop="item" href="https://recipes.gonzalohirsch.com/"> <span itemprop="name">Home</span></a>
                                <meta itemprop="position" content="1" />
                            </li>
                            <li class="separator">/</li>
                            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                <a
                                    itemscope
                                    itemtype="https://schema.org/WebPage"
                                    itemprop="item"
                                    itemid="https://recipes.gonzalohirsch.com/recipes/"
                                    href="https://recipes.gonzalohirsch.com/recipes/"
                                >
                                    <span itemprop="name">Recipes</span></a
                                >
                                <meta itemprop="position" content="2" />
                            </li>
                            <li class="separator">/</li>
                            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                <span itemprop="name">{{ doc.headline }}</span>
                                <meta itemprop="position" content="3" />
                            </li>
                        </ol>
                        <span class="font-light text-typography_primary_light/7 mt-2 md:mt-0">{{ $formatDate(doc.date) }}</span>
                    </div>
                    <h1 class="blog-post-text font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left">
                        {{ doc.headline }}
                    </h1>
                    <p class="blog-post-text mb-2 md:w-8/12 md:text-lg md:leading-lg text-center md:text-left">{{ doc.excerpt }}</p>
                    <ul class="list-none flex flex-row mb-8">
                        <li v-for="(tag, index) in doc.tags" :key="`tag-hero-${index}`" class="bg-typography_primary_light text-background_light mr-2 px-1 py-0 rounded">{{ tag }}</li>
                    </ul>
                    <div
                        class="border-b-2 pb-8 border-typography_primary_light flex flex-col md:flex-row items-center md:justify-between mt-12 md:mt-4"
                    >
                        <div class="flex flex-row items-center justify-center">
                            <img :src="getImage(doc.author)" :alt="`Image of ${doc.author}`" class="w-8 h-8 object-cover rounded-full mr-2" />
                            <span class="blog-post-text text-lg leading-lg font-light"
                                >By
                                <a class="hover:underline italic" :href="doc.authorUrl" target="_blank" rel="noopener noreferrer">{{
                                    doc.author
                                }}</a></span
                            >
                        </div>
                        <div class="mt-6 md:mt-0">
                            <NavShareIcons :headline="doc.headline" :excerpt="doc.excerpt" :path="doc._path + '/'" />
                        </div>
                    </div>
                </Section>
                <Section id="main" class="!pt-0 relative grid grid-cols-10 gap-8 lg:gap-12">
                    <aside class="col-span-full md:col-span-3 md:hidden">
                        <div class="blog-post-text blog-aside-wrapper mb-2">
                            <BlogTableOfContents :links="getTocLinks(doc.body?.toc?.links)" />
                        </div>
                    </aside>
                    <article class="prose col-span-full md:col-span-7 relative">
                        <span v-show="doc.dateUpdated" class="italic absolute -top-8 text-sm leading-sm font-light text-typography_primary_light/75"
                            >(Updated: {{ $formatDate(doc.dateUpdated) }})</span
                        >
                        <ContentRenderer :value="doc" class="blog-content blog-post-text" />
                        <div class="blog-content second-content blog-post-text mt-4">
                            <div id="duration" class="px-4 py-2 border-2 rounded-md border-typography_primary_light bg-brand_primary_light/5 max-w-xl">
                                <div class="flex flex-col md:flex-row">
                                    <p
                                        v-for="time in [
                                            { title: 'Prep Time', key: 'prep' },
                                            { title: 'Cook Time', key: 'cook' },
                                            { title: 'Additional Time', key: 'add' }
                                        ]"
                                        :key="time.key"
                                        class="w-full mb-2 md:mb-0"
                                    >
                                        <span class="block"><strong>{{ time.title }}</strong></span>
                                        {{ getTime(doc.recipe.time[time.key]) }}
                                    </p>
                                </div>
                                <p class="mt-4">
                                    <span class="block"><strong>Total Time</strong></span>
                                        {{ getTime(doc.recipe.time.total) }}
                                </p>
                            </div>
                            <h2 id="ingredients">
                                <a href="#ingredients">Ingredients</a>
                            </h2>
                            <ul>
                                <li v-for="(ingredient, index) in doc.recipe.ingredients" :key="`ingredient-${index}`">{{ ingredient }}</li>
                            </ul>
                            <h2 id="directions">
                                <a href="#directions">Directions</a>
                            </h2>
                            <ul class="list-none !pl-0">
                                <li v-for="(step, index) in doc.recipe.steps" :key="`step-${index}`" class="list-none pl-0 block mt-4">
                                    <p>
                                        <span class="block font-bold">Step {{ index + 1 }}: {{ step.name }}</span>
                                        {{ step.text }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </article>
                    <aside class="col-span-full md:col-span-3 blog-aside h-fit">
                        <div class="!hidden blog-aside-wrapper md:!flex mb-4">
                            <BlogTableOfContents :links="getTocLinks(doc.body?.toc?.links)" class="blog-post-text" />
                        </div>
                        <div v-if="data?.surround?.filter((elem) => elem !== null)?.length > 0" class="blog-aside-wrapper">
                            <BlogRelatedArticles :surround="data?.surround" class="blog-post-text" />
                        </div>
                    </aside>
                </Section>
                <Section id="comments">
                    <div id="disqus_thread" class="bg-background_light p-8 border-t-2 border-b-2 border-typography_primary_light"></div>
                </Section>
                <NavScrollTopIcon />
            </template>
            <template #not-found>
                <SectionsError />
            </template>
        </ContentDoc>
    </main>
</template>

<script setup>
const { $formatDate } = useNuxtApp();
const { path } = useRoute();
const cleanPath = path.replace(/\/+$/, '');
const { data, _ } = await useAsyncData(`content-${cleanPath}`, async () => {
    // Remove a trailing slash in case the browser adds it, it might break the routing
    // fetch document where the document path matches with the cuurent route
    let article = queryContent('/recipes').where({ _path: cleanPath }).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = queryContent('/recipes')
        .sort({ date: -1 })
        .only(['_path', 'headline', 'excerpt', 'tags'])
        .findSurround(cleanPath, { before: 1, after: 1 });
    return {
        article: await article,
        surround: await surround
    };
});

// Get the authors
const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne());

// Set the meta
const baseUrl = 'https://recipes.gonzalohirsch.com';
const canonicalPath = baseUrl + (path + '/').replace(/\/+$/, '/');
const image = baseUrl + (data.value?.article?.socialImage.src || '/meta-img.webp');

// JSON+LD
const jsonScripts = [
    {
        type: 'application/ld+json',
        children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Recipe', 'NewsArticle'],
            name: data.value?.article?.headline,
            headline: data.value?.article?.headline,
            description: data.value?.article?.excerpt,
            image: data.value?.article?.recipe?.image.map((img) => `${baseUrl}${img}`),
            author: authorData.value[data.value?.article?.author],
            keywords: data.value?.article?.recipe?.keywords,
            cookTime: `PT${data.value?.article?.recipe?.time?.cook}`,
            prepTime: `PT${data.value?.article?.recipe?.time?.prep}`,
            totalTime: `PT${data.value?.article?.recipe?.time?.total}`,
            recipeYield: data.value?.article?.recipe?.yield,
            recipeCategory: data.value?.article?.recipe?.category,
            recipeCuisine: data.value?.article?.recipe?.cuisine,
            recipeIngredient: data.value?.article?.recipe?.ingredients,
            recipeInstructions: data.value?.article?.recipe?.steps.map((instruction, idx) => {
                return {
                    '@type': 'HowToStep',
                    name: instruction.name,
                    text: instruction.text,
                    url: `${canonicalPath}#step${idx + 1}`
                };
            }),
            datePublished: data.value?.article?.date,
            dateModified: data.value?.article?.dateUpdated || data.value?.article?.date,
            publisher: authorData.value['Gonzalo Hirsch']
        })
    }
];
useHead({
    title: data.value?.article?.title,
    meta: [
        { name: 'author', content: data.value?.article?.author },
        { name: 'description', content: data.value?.article?.description },
        { property: 'article:published_time', content: data.value?.article?.date.split('T')[0] },
        // OG
        { hid: 'og:title', property: 'og:title', content: data.value?.article?.headline },
        { hid: 'og:url', property: 'og:url', content: canonicalPath },
        { hid: 'og:description', property: 'og:description', content: data.value?.article?.description },
        { hid: 'og:image', name: 'image', property: 'og:image', content: image },
        { hid: 'og:type', property: 'og:type', content: 'Article' },
        { hid: 'og:image:type', property: 'og:image:type', content: `image/${data.value?.article?.socialImage.mime}` },
        { hid: 'og:image:width', property: 'og:image:width', content: data.value?.article?.socialImage.width || 190 },
        { hid: 'og:image:height', property: 'og:image:height', content: data.value?.article?.socialImage.height || 190 },
        { hid: 'og:image:alt', property: 'og:image:alt', content: data.value?.article?.socialImage.alt },
        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
        { hid: 'twitter:title', name: 'twitter:title', content: data.value?.article?.headline },
        { hid: 'twitter:url', name: 'twitter:url', content: canonicalPath },
        { hid: 'twitter:description', name: 'twitter:description', content: data.value?.article?.description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: data.value?.article?.socialImage.alt }
    ],
    link: [
        {
            hid: 'canonical',
            rel: 'canonical',
            href: canonicalPath
        }
    ],
    script: jsonScripts
});

// Author image
import gh from '../../assets/img/authors/Gonzalo Hirsch.webp';
const authors = {
    'Gonzalo Hirsch': gh
};
const getImage = (name) => {
    return authors[name];
};

// Script loading for comments
import { onMounted } from 'vue';
onMounted(() => {
    const script = document.createElement('script');
    script.innerHTML = `var disqus_config = function () {this.page.url = "${canonicalPath}";this.page.identifier = "${data.value.article.id}";this.page.title = "${data.value.article.headline}"};(function () {var d = document,s = d.createElement('script');s.src = "https://recipes-gonzalohirsch.disqus.com/embed.js";s.setAttribute('data-timestamp', new Date());(d.head || d.body).appendChild(s);})();`;
    document.body.appendChild(script);
});

// Utils
const getTocLinks = (docLinks) => {
    return [
        ...docLinks,
        ...[
            {
                id: 'ingredients',
                depth: 2,
                text: 'Ingredients'
            },
            {
                id: 'directions',
                depth: 2,
                text: 'Directions'
            }
        ]
    ];
};
const getTime = (duration) => duration.replace('H', ' hr ').replace('M', ' min ').replace('S', ' secs');
</script>

<style scoped>
.blog-aside {
    @apply sticky;
    top: calc(theme('spacing.nav') + 0.25rem);
}
.blog-aside-wrapper {
    @apply flex flex-col border-t-2 border-b-2 border-typography_primary_light py-4;
}
.blog-post-text {
    @apply text-typography_primary_light;
}
.separator {
    @apply mx-1;
}
</style>
