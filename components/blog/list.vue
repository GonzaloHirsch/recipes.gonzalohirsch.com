<template>
    <ul class="grid grid-cols-10 gap-4 text-typography_primary_light dark:text-typography_primary_dark">
        <li
            v-for="article in data"
            :key="article._path"
            class="col-span-full md:col-span-5 relative rounded-md border-2 border-typography_primary_light dark:border-typography_primary_dark hover:border-brand_primary_light hover:dark:border-brand_primary_dark group p-4"
        >
            <NuxtLink :to="article._path + '/'" class="block relative">
                <div class="wrapper">
                    <header>
                        <h2
                            class="text-h3 leading-h3 font-semibold mb-2 group-hover:text-brand_primary_light dark:group-hover:text-brand_primary_dark"
                        >
                            {{ article.headline }}
                        </h2>
                        <p class="text-sm leading-sm mb-4 text-typography_primary_light/75 dark:text-typography_primary_dark/75">
                            {{ $formatDate(article.date) }}
                        </p>
                        <p>{{ article.excerpt }}</p>
                        <ul class="flex flex-row flex-wrap">
                            <li
                                class="mr-2 px-1 py-1 mt-2 rounded-md bg-typography_primary_light text-background_light group-hover:bg-brand_primary_light text-sm leading-sm"
                                v-for="(tag, n) in article.tags"
                                :key="n"
                            >
                                {{ tag }}
                            </li>
                        </ul>
                    </header>
                </div>
            </NuxtLink>
            <!-- <a :href="article._path + '/#disqus_thread'" class="mt-4 block text-sm leading-sm text-typography_primary_light dark:text-typography_primary_dark"/> -->
        </li>
    </ul>
    <p v-if="data.length == 0" class="w-full md:w-7/12 text-h3 leading-h3 font-bold dark:text-white">{{ message }}</p>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    message: {
        type: String,
        default: 'There are no posts right now, but stay tuned for newer releases in the future.'
    },
    name: {
        type: String,
        default: 'Best "Gonzalo\'s Recipes" recipes'
    }
});

const { $formatDate } = useNuxtApp();

if (props.data != null && props.data.length > 0) {
    useHead({
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'ItemList',
                    name: props.name,
                    itemListElement: props.data.map((item, index) => {
                        return {
                            '@type': 'ListItem',
                            position: index + 1,
                            url: `https://recipes.gonzalohirsch.com${item._path}/`
                        };
                    })
                })
            }
        ]
    });
}
</script>
