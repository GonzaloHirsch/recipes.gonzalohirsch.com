const keywords = 'Simple recipes, Flavorful dishes, Easy cooking, Delicious meals, Quick and easy recipes, Healthy cooking, Fresh ingredients, Tasty recipes, Nutritious meals, Easy-to-follow instructions, Mouthwatering flavors, Time-saving recipes, Cooking tips, Recipe ideas, Kitchen inspiration';
const description =
    "Explore Gonzalo's Recipes, a delightful collection of simple and quick dishes that focus on high-quality ingredients and easy-to-follow instructions. Discover mouthwatering recipes that will impress your family and friends with their delicious flavors.";
const website = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: "Gonzalo's Recipes",
    url: 'https://recipes.gonzalohirsch.com/'
};
const person = {
    '@context': 'http://www.schema.org',
    '@type': 'Person',
    '@id': 'https://gonzalohirsch.com/#about',
    name: 'Gonzalo Hirsch',
    alternateName: 'Gonzalo Hirsch',
    nationality: 'Argentinian',
    alumniOf: [
        {
            '@type': 'CollegeOrUniversity',
            name: 'Instituto Tecnológico de Buenos Aires',
            sameAs: 'http://itba.edu.ar/'
        }
    ],
    gender: 'Male',
    jobTitle: 'Software Engineer',
    worksFor: [
        {
            '@type': 'Organization',
            name: 'Toptal',
            sameAs: [
                'https://www.toptal.com/',
                'https://www.linkedin.com/company/toptal',
                'https://twitter.com/toptal',
                'https://www.facebook.com/toptal',
                'https://www.instagram.com/toptal/'
            ]
        }
    ],
    url: 'https://recipes.gonzalohirsch.com/',
    image: 'https://recipes.gonzalohirsch.com/meta-img.webp',
    sameAs: [
        'https://gonzalohirsch.com/',
        'https://github.com/GonzaloHirsch',
        'https://www.linkedin.com/in/gonzalo-hirsch/',
        'https://www.instagram.com/gonzalohirsch/?hl=en',
        'https://www.toptal.com/resume/gonzalo-hirsch'
    ]
};
const logos = {
    '@context': 'http://www.schema.org',
    '@type': 'Organization',
    url: 'https://recipes.gonzalohirsch.com/',
    logo: 'https://recipes.gonzalohirsch.com/logo.webp',
    email: 'hirschgonzalo@gmail.com',
    name: "Gonzalo's Recipes",
    description: description,
    founder: person,
    keywords: keywords
};
const jsonLds = [website, person, logos];

// Sitemap
const blogPageCount = 2;
const routes: String[] = ['/'];
for (let i = 1; i <= blogPageCount; i++) {
    routes.push(`/recipes/page/${i}/` as string);
}

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
    css: ['/assets/css/main.css'],
    ssr: true,
    generate: {
        routes: routes
    },
    // Sitemap
    // https://content.nuxtjs.org/guide/recipes/sitemap/
    nitro: {
        prerender: {
            routes: ['/sitemap.xml', '/rss.xml']
        }
    },
    experimental: {
        payloadExtraction: false
    },
    router: {
        options: {
            strict: false
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            title: "Gonzalo's Recipes",
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: keywords
                },
                {
                    hid: 'author',
                    name: 'author',
                    content: 'Gonzalo Hirsch'
                }
            ],
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
            script: [
                ...jsonLds.map((elem) => {
                    return {
                        type: 'application/ld+json',
                        children: JSON.stringify(elem)
                    };
                })
            ]
        }
    },
    // tailwindcss: {
    //     // This is the option that works
    //     darkMode: 'class'
    // },
    sourcemap: false,
    // Inspired on https://blog.openreplay.com/power-your-blog-with-nuxt-content
    content: {
        markdown: {
            // https://github.com/rehypejs/rehype-external-links
            rehypePlugins: [
                [
                    'rehype-external-links',
                    {
                        target: '_blank',
                        rel: 'noopener noreferer'
                    }
                ]
            ]
        }
    }
});
