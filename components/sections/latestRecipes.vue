<template>
    <Section id="latest-recipes">
        <div class="flex flex-col justify-center h-full">
            <h2 class="section-title title-decor relative mb-6">Latest Recipes</h2>
            <p class="about-text md:w-9/12 mb-6">
                Introducing the <strong>latest mouthwatering creations</strong> from Gonzalo's Recipes! Discover a collection of
                <strong>quick and easy recipes</strong> that pack a punch of flavor. From
                <strong>savory main courses to irresistible desserts</strong>, each recipe is carefully curated to bring simplicity and deliciousness
                to your kitchen. Say goodbye to complicated cooking and hello to <strong>straightforward</strong>, <strong>no-BS recipes</strong> that
                will impress your taste buds. Dive in and start exploring the latest culinary gems!
            </p>
            <ContentQuery
                path="/recipes"
                :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
                :sort="{
                    date: -1
                }"
                :limit="4"
                v-slot="{ data }"
            >
                <BlogList :data="data" name="Latest Recipes"/>
            </ContentQuery>
            <ButtonsButton
                text="See all the recipes"
                format="primary"
                href="/recipes/"
                target="_self"
                aria="check out all the recipes."
                extraClass="mt-6"
            />
        </div>
    </Section>
</template>

<script setup></script>

<style scoped>
.about-text {
    @apply text-lg leading-lg relative text-typography_primary_light;
}
.about-text:not(:last-of-type) {
    @apply mb-6;
}
.dark .about-text {
    @apply text-typography_primary_dark;
}
@screen md {
    .about-text {
        @apply text-h5 leading-h5;
    }
}
</style>
