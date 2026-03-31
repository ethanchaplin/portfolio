<script lang="ts" setup></script>

<template>
    <div class="pt-28 pb-24 px-8 max-w-3xl mx-auto text-left">

        <router-link :to="{ name: 'honors-projects' }"
            class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block justify-start">
            ← Back to Projects
        </router-link>

        <div class="mb-12 text-center">
            <p class="text-xs text-amber-400 uppercase tracking-widest mb-2 font-semibold">Self-Designed Honors Project
            </p>
            <h1 class="text-4xl font-bold">Learning the Guitar</h1>
            <p class="text-neutral-400 text-sm mt-2">August 2025 — February 2026</p>
        </div>

        <!-- About -->
        <div class="section-header mb-5">
            <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">About</h2>
            <div class="flex-1 h-px bg-amber-400/20"></div>
        </div>
        <div class="flex flex-col gap-4 mb-12">
            <p class="text-base text-neutral-200 leading-relaxed">
                Music has always been a major part of my life. Whether I was playing the piano for my high school show
                choir, volunteering as
                an audio engineer at my church, or just being a long-time listener, music is part of my DNA.
                I've always wanted to learn the guitar, and it always felt like the natural next step of my musical
                journey.
                Over the course of seven months I went from knowing nothing about how to play the instrument to chord
                progressions,
                scales, finger techniques, and more. I hope this page is a retrospective on that process, what I
                learned, and
                where I want to go from here.
            </p>
            <p class="text-base text-neutral-200 leading-relaxed">
                The project began on acoustic with open chords and Coldplay's "Sparks," then expanded to electric
                guitar, power chords, barre chords, pentatonic scales, fingerpicking, and eventually improvisation
                and original songwriting. By the end I had recorded several multi-track arrangements, explored
                effects (delay, chorus, overdrive, distortion), and built up enough theory to freely jam over
                backing tracks.
            </p>
        </div>

        <!-- Who Benefits -->
        <div class="section-header mb-5">
            <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">Who Benefits?</h2>
            <div class="flex-1 h-px bg-amber-400/20"></div>
        </div>
        <div class="flex flex-col gap-4 mb-12">
            <p class="text-base text-neutral-200 leading-relaxed">
                Me! This project was a purely personal endeavor, and the only person who directly benefited from it was
                myself.
                That being said, I do hope to share the music I created with others, whether it's playing on the worship
                band at church,
                jamming with friends, or seeing what other creative endeavors I can explore in the future.
            </p>
        </div>
        <!-- Take Aways -->
        <div class="section-header mb-5">
            <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">Take Aways</h2>
            <div class="flex-1 h-px bg-amber-400/20"></div>
        </div>
        <div class="flex flex-col gap-4 mb-12">
            <p class="text-base text-neutral-200 leading-relaxed">
                On the technical side, I gained a much deeper appreciation for guitar players as a whole throughout the
                last couple of months.
                Guitar playing is <i>hard</i>! The amount of coordination, muscle memory, and theory that goes into even
                a simple song is kind of annoying to be honest,
                but that's coming from someone who wants to be good at it immediately. It's a completely different way
                of thinking than piano, which is much more linear.
                One key = one note. On the guitar, you can play the same note in multiple places, all with a slightly
                different tambre and feel. It's a lot to wrap your head around.
                Also it hurts. Like a lot. I don't ever remember being sore after playing the piano, but I was left with
                divots in the tips of my fingers many times after practicing.
            </p>
        </div>

        <!-- Practice Log link -->
        <div class="section-header mb-5">
            <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">Practice Log</h2>
            <div class="flex-1 h-px bg-amber-400/20"></div>
        </div>
        <router-link :to="{ name: 'guitar-log' }"
            class="log-link flex items-center justify-between bg-neutral-900/50 border border-amber-400/20 rounded-xl px-6 py-4 group">
            <div>
                <p class="font-semibold text-white text-sm">View Full Practice Log</p>
                <p class="text-xs text-neutral-500 mt-0.5">100+ sessions · Aug 2025 — Feb 2026</p>
            </div>
            <span class="text-amber-400 group-hover:text-white transition-colors text-lg">→</span>
        </router-link>

    </div>
</template>

<style scoped>
.section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.log-link {
    transition: background 0.2s, border-color 0.2s;
    text-decoration: none;
}

.log-link:hover {
    background: rgba(251, 191, 36, 0.05);
    border-color: rgba(251, 191, 36, 0.4);
}
</style>
