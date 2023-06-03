<template>
    <Section id="hero" :fullHeight="true">
        <div class="flex flex-col justify-center h-full text-center relative">
            <h1 class="home-title text-typography_primary_light">
                Hi! Welcome to <span class="impact text-brand_primary_light">Gonzalo's Recipes!</span>
            </h1>
            <h2 class="text-h3_sm leading-h3_sm md:text-h3 md:leading-h3 md:w-9/12 mx-auto mt-2 md:mt-8 text-typography_primary_light">
                <span class="impact text-brand_primary_light">No BS, just quick, simple, and delicious dishes handpicked by me</span>,
                <a href="https://gonzalohirsch.com/" target="_blank" rel="noopener" class="impact underline text-brand_primary_light hover:text-brand_secondary_light transition duration-200">Gonzalo Hirsch</a>. Get straight to the flavor
                <span class="impact text-brand_primary_light">without any distractions</span>. Join me on a no-nonsense culinary journey!
            </h2>
            <div class="mt-8 mx-auto flex flex-col md:flex-row">
                <ButtonsButton
                    text="View the latest recipes"
                    format="primary"
                    href="#latest-recipes"
                    aria="Scroll to the latest recipes."
                    extraClass="mr-0 mb-4 md:mb-0 md:mr-4 mx-auto"
                />
                <ButtonsButton
                    text="Read all the recipes"
                    format="primary"
                    href="/recipes/"
                    target="_self"
                    aria="Check out all the recipes."
                    extraClass="mb-4 md:mb-0 mx-auto"
                />
                <ButtonsButton
                    text="Search all the recipes"
                    format="primary"
                    href="/search/"
                    target="_self"
                    aria="Search among all recipes"
                    extraClass="md:ml-4 mx-auto"
                />
            </div>
        </div>
    </Section>
</template>

<style scoped>
.home-title::before {
    @apply bg-typography_primary_light block mx-auto absolute left-0 right-0;
    content: '';
    width: 15%;
    height: 2px;
    top: -25px;
}
@screen md {
    .home-title::before {
        top: -50px;
    }
}
.home-title {
    @apply text-h3_sm leading-h3_sm relative;
}
.home-title .impact {
    @apply text-h1_sm leading-h1_sm block mt-3;
}

@screen md {
    .home-title {
        @apply text-h3 leading-h3;
    }
    .home-title .impact {
        @apply text-h1 leading-h1 block;
    }
}

.impact {
    @apply font-bold;
}
</style>
