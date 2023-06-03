<template>
    <main>
        <ContentQuery
            path="/recipes"
            :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
            :sort="{
                date: -1
            }"
            :skip="blogCountLimit * (getPageNumber() - 1)"
            :limit="blogCountLimit"
        >
            <template v-slot="{ data }">
                <BlogHero />
                <Section id="main" class="!pt-0">
                    <BlogList :data="data" :name="`All Recipes: Page ${getPageNumber()}`"/>
                    <ContentQuery
                        path="/recipes"
                        :only="['headline']"
                    >
                        <template v-slot="{ data }">
                            <BlogPagination
                                v-if="getPageLimit(data.length) > 1"
                                class="mt-8"
                                :currentPage="getPageNumber()"
                                :totalPages="getPageLimit(data.length)"
                                :nextPage="getPageNumber() < getPageLimit(data.length)"
                                baseUrl="/recipes/"
                                pageUrl="/recipes/page/"
                            />
                        </template>
                        <template #not-found>
                            <!-- Nothing -->
                        </template>
                    </ContentQuery>
                </Section>
            </template>
            <template #not-found>
                <BlogHero />
                <Section id="main" class="!pt-0">
                    <BlogList :data="[]" message="There are no recipes in this page, maybe try searching on another one."/>
                </Section>
            </template>
        </ContentQuery>
    </main>
</template>

<script setup>
// Fetching data
const { path, params } = useRoute();
const blogCountLimit = 6;

const getPageLimit = (totalPosts) => {
    return Math.ceil(totalPosts / blogCountLimit);
};

const getPageNumber = () => {
    return Number(params.number);
};

// Attempt to get the number
const router = useRouter();
let pageNo;
try {
    pageNo = getPageNumber();
    if (isNaN(pageNo) || pageNo <= 0) {
        router.replace('/recipes/');
    }
} catch (err) {
    console.error(err);
    router.replace('/recipes/');
}

// Set the meta
const title = `Page ${pageNo} | All Recipes | Gonzalo's Recipes`;
const description =
    "Discover the joy of cooking with Gonzalo's Recipes, a delightful collection of simple, quick, and delicious dishes that skip the fluff and focus on high-quality ingredients, easy-to-follow instructions, and a passion for creating mouthwatering meals that will impress your family and friends.";
const image = 'meta-img.webp';
const baseUrl = 'https://recipes.gonzalohirsch.com/';
const canonicalPath = `${baseUrl}recipes/page/${params.number}/`;
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
