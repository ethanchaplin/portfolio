<script lang="ts" setup></script>

<template>
  <div class="pt-28 pb-24 px-8 max-w-3xl mx-auto text-left">

    <router-link :to="{ name: 'honors-projects' }"
      class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
      ← Back to Projects
    </router-link>

    <div class="mb-12 text-center">
      <p class="text-xs text-rose-400 uppercase tracking-widest mb-2 font-semibold">Pre-Approved Honors Project</p>
      <h1 class="text-4xl font-bold">ENED 1100 Teaching Assistant</h1>
    </div>

    <!-- About -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-rose-400 uppercase tracking-widest whitespace-nowrap">About</h2>
      <div class="flex-1 h-px bg-rose-400/20"></div>
    </div>
    <div class="flex flex-col gap-4 mb-12">
      <p class="text-base text-neutral-200 leading-relaxed">
        Returning to ENED 1100 as a Teaching Assistant in Fall 2025 was a full-circle moment for me.
        Inspired by the TAs who guided me during my freshman year, I wanted to be that same source of
        clarity and support for the next cohort of future engineers during my last year of college.
        Balancing grading, demos, and tutoring with my own coursework was a demanding challenge, but it was
        ultimately one of my most rewarding experiences. This role allowed me to sharpen my ability to teach
        others — specifically in programming, logical thinking, and data visualizing — while making a
        tangible impact on the students' learning journeys.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        It was definitely a struggle at times trying to help students who would rather look to AI first,
        rather than trying to work through problems on their own. Our TA team would reiterate that there
        would be no computers allowed during exams, so it was crucial that students understood the underlying
        concepts rather than just relying on AI to spit out code for them. I found that students who engaged
        with the material and sought to understand the logic behind programming were much more successful in
        the course. Even still, there were opportunities to teach through AI — I would often guide students
        to reason through why certain AI-generated code worked, and how they could modify it to fit their needs.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        Overall, being a TA for ENED 1100 allowed me to give back to the engineering community that had
        supported me throughout my college journey. It reinforced my own understanding of foundational
        engineering concepts, while also honing my communication and leadership skills.
      </p>
    </div>

    <!-- Who Benefits -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-rose-400 uppercase tracking-widest whitespace-nowrap">Who Benefits?</h2>
      <div class="flex-1 h-px bg-rose-400/20"></div>
    </div>
    <div class="flex flex-col gap-4 mb-12">
      <p class="text-base text-neutral-200 leading-relaxed">
        The main recipients of this experience were the engineering students enrolled in ENED. As freshmen,
        they were navigating the vast world of engineering for the first time, and my role as a TA was to
        provide them with the support and guidance they needed to succeed. Whether it was clarifying difficult
        concepts, assisting with programming assignments, or offering study strategies, I aimed to enhance
        their understanding and confidence in the subject matter.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        The other beneficiaries were the professors I worked with, whether it was my section professor, Dr.
        Han, or one of the lead professors, such as Jeremy Hill.
      </p>
    </div>

    <!-- Take Aways -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-rose-400 uppercase tracking-widest whitespace-nowrap">Take Aways</h2>
      <div class="flex-1 h-px bg-rose-400/20"></div>
    </div>
    <div class="flex flex-col gap-4 mb-12">
      <p class="text-base text-neutral-200 leading-relaxed">
        One of the biggest take-aways from this experience was tackling the now widespread use of AI in
        educational contexts, which is much more commonplace than when I was a TA previously. I learned a
        lot about how to guide students in using AI as a tool to enhance their learning, rather than a crutch
        to avoid engaging with the material. This involved encouraging critical thinking and problem-solving
        skills, as well as helping students understand the ethical implications of AI use in academia.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I also further developed my communication and interpersonal skills, as I had to adapt my teaching
        style to accommodate a diverse range of learning styles and backgrounds. This experience reinforced
        the importance of patience, empathy, and active listening in effective teaching.
      </p>
    </div>

    <!-- Visual Demonstration -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-rose-400 uppercase tracking-widest whitespace-nowrap">Visual Demonstration</h2>
      <div class="flex-1 h-px bg-rose-400/20"></div>
    </div>
    <div class="flex gap-8 items-start">
      <img src="/src/assets/ai_flowchart.png" class="rounded-xl w-1/2 shrink-0" />
      <p class="text-base text-neutral-200 leading-relaxed text-right">
        For a visual demonstration I kept with the theme of flowcharts, and made a (somewhat tongue-in-cheek)
        flowchart that demonstrates how students are affected by AI when completing assignments. The chart
        outlines the various paths a student might take when approaching an assignment, highlighting the
        potential pitfalls of over-reliance on AI-generated content versus engaging with the people who are
        there to help them learn.
      </p>
    </div>

  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
</style>
