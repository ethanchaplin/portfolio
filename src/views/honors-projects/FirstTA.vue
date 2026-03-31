<script lang="ts" setup></script>

<template>
    <div class="pt-28 pb-24 px-8 max-w-3xl mx-auto text-left">

        <router-link :to="{ name: 'honors-projects' }"
            class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
            ← Back to Projects
        </router-link>

        <div class="mb-12 text-center">
            <p class="text-xs text-blue-400 uppercase tracking-widest mb-2 font-semibold">Pre-Approved Honors Project
            </p>
            <h1 class="text-4xl font-bold">ENED 1120 Teaching Assistant</h1>
        </div>

        <!-- About -->
        <div class="section-header mb-5">
            <h2 class="text-sm font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap">About</h2>
            <div class="flex-1 h-px bg-blue-400/20"></div>
        </div>
        <div class="flex flex-col gap-4 mb-12">
            <p class="text-base text-neutral-200 leading-relaxed">
                I had the privilege of being a teaching assistant for the ENED 1120 course in the spring semester of
                2023. I remember what an impact my TAs had been when I took the course my freshman year, and I felt
                called to be that source of information and support to the future engineers who were taking the course.
                It was definitely a challenge at times to maintain the balance of grading, preparing in-class demos,
                and tutoring with the rest of the coursework I was taking, but in the end the experience was nothing
                but rewarding. I was able to connect with and assist students in a wide array of subjects, such as
                programming, statistics, and physics, and I hope that I made a meaningful impact on their learning
                experience.
            </p>
            <p class="text-base text-neutral-200 leading-relaxed">
                As I interacted with the students in my sections, I began to pinpoint specific common stumbling blocks
                that these freshmen were running into throughout their coursework. One of these was the idea of logical
                flow with regards to programming. The course covers the basics of Python, MATLAB, and VBA, and coding
                can come with a bit of a learning curve to someone with no experience. Often times, I would see students
                just copy and paste old code from in-class examples — meaning they knew the block of code was meant to
                do something, but when pressed, they couldn't fully explain what it was doing, or even why they were
                doing it.
            </p>
            <p class="text-base text-neutral-200 leading-relaxed">
                After discussion with some of the professors, we agreed that reinstating the teaching of flowcharts as
                part of the programming curriculum would benefit students with no programming background. Without any
                worry of syntax, students can flesh out the logical flow of their desired programs in an understandable
                manner, and then turn that diagram into working code.
            </p>
        </div>

        <!-- Who Benefits -->
        <div class="section-header mb-5">
            <h2 class="text-sm font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap">Who Benefits?</h2>
            <div class="flex-1 h-px bg-blue-400/20"></div>
        </div>
        <div class="flex flex-col gap-4 mb-12">
            <p class="text-base text-neutral-200 leading-relaxed">
                The main beneficiary of this learning experience were the engineering students enrolled in ENED 1120.
                They were impacted firsthand by my position, as I played a role in teaching and evaluating the concepts
                the course covered.
            </p>
            <p class="text-base text-neutral-200 leading-relaxed">
                The other beneficiaries were the professors I worked with, whether it was my section professor, Dr.
                Yoon, or one of the lead professors, such as Dr. Kastner.
            </p>
        </div>

        <!-- Take Aways -->
        <div class="section-header mb-5">
            <h2 class="text-sm font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap">Take Aways</h2>
            <div class="flex-1 h-px bg-blue-400/20"></div>
        </div>
        <div class="flex flex-col gap-4 mb-12">
            <p class="text-base text-neutral-200 leading-relaxed">
                One of the biggest take-aways from this experience was the experience of being in a true leadership
                position. I have had "leadership" positions in the past, but never one as part of an employment. The
                students' experience as part of this class partially relied on me doing my job properly and efficiently,
                and while I wasn't perfect, I made sure to always put my best effort towards being a reliable worker.
            </p>
            <p class="text-base text-neutral-200 leading-relaxed">
                I also was able to diversify my perspective regarding engineering as a whole, as I met many people from
                different backgrounds, who all had different opinions on subjects, assignments, and projects. I got a
                lot of valuable insight from the students in my section about the way things were taught, amongst other
                things.
            </p>
        </div>

        <!-- Example -->
        <div class="section-header mb-5">
            <h2 class="text-sm font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap">Example</h2>
            <div class="flex-1 h-px bg-blue-400/20"></div>
        </div>
        <img src="/src/assets/example_flowchart.png" class="rounded-xl w-full" />
        <p class="text-xs text-neutral-500 mt-2 text-center">An example flowchart created to help students plan their
            robot projects</p>

    </div>
</template>

<style scoped>
.section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
</style>
