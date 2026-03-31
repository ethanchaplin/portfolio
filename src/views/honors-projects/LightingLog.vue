<script lang="ts" setup>
import { computed } from 'vue';

const LOG_ENTRIES = [
  {
    date: "March 13, 2022",
    month: "March 2022",
    hours: 1.5,
    text: "Today is the first day of the project, and I spent about an hour and a half researching other lighting programs, generating a list of things I liked about each and the things I disliked about each. This helped generate ideas to implement within my program, whilst simultaneously improving upon the aspects which I did not like.",
  },
  {
    date: "March 14, 2022",
    month: "March 2022",
    hours: 2,
    text: "Spent two hours researching the QT framework for implementation within C++. I am also using this framework for my Chess AI which I am building for my CS final, so this should assist nicely.",
  },
  {
    date: "March 16, 2022",
    month: "March 2022",
    hours: 1,
    text: "Spent an hour online looking for Raspberry Pi's, the preferred computer to interface between my laptop and the lights. However, there are none in stock ANYWHERE, and it might be like this for a while. The supply chain issues are bonkers right now. Might consider using a Teensy, if they're still in stock.",
  },
  {
    date: "March 17, 2022",
    month: "March 2022",
    hours: 1.5,
    text: "Looks like a Teensy is the way to go. I found some open-source libraries that can output up to 4 universes simultaneously. For anyone reading this with little to no lighting knowledge, a universe is a string of lights connected to each other. Each universe can support 512 \"channels\", and specific lights can have anywhere from 3 to 100 channels, so the more channels supported, the more lights can be run. 4 universes supports 2048 channels, so that's a lot of lights!",
  },
  {
    date: "March 21, 2022",
    month: "March 2022",
    hours: 2,
    text: "Didn't touch the program for a bit, was on Spring Break in Florida. Continuing to work on framework for the program. Will probably use some form of XML for show and fixture files, as XML is commonly used in this context. Might also use GDTF format, which stands for \"General Device Type Format\", which is a relatively new and open-source file format for light fixtures. It is also XML-based, so it might integrate well within the program.",
  },
  {
    date: "March 22, 2022",
    month: "March 2022",
    hours: 2,
    text: "Finals season is around the corner, and I'm becoming increasingly busy as the end of April approaches, so I hope to have some time to work on this. The more I work on actual programming, the more I realize how many conditions I'm going to have to account for when making the macOS and Linux version of this program. Plus, I don't even have a Mac, so creating a Mac version might be difficult. Such is the life of a broke college student, I definitely don't have the budget for a $600 computer. Plus, any GUI created in C++ so far looks like it came from the 1990's. This is mainly because I am not an accomplished UI designer, so I might switch to C#, because I know it has dedicated graphics libraries that are more beginner friendly. Plus, .NET core is cross-platform.",
  },
  {
    date: "March 24, 2022",
    month: "March 2022",
    hours: 1,
    text: "Definitely going to switch to C#. .NET seems more appealing now. Also, ordered Teensy for $20, so I'm waiting for that to arrive in the mail.",
  },
  {
    date: "March 29, 2022",
    month: "March 2022",
    hours: 3,
    text: "Teensy came! Still have the test light I ordered a while ago, so I'm going to use that to test output. The rudimentary library seems to be working decently with the in-board LEDs on the Teensy, so it should translate well. Stayed up late debugging a lot of it though, I'm treading on new ground with this stuff.",
  },
  {
    date: "March 30, 2022",
    month: "March 2022",
    hours: 4,
    text: "I can't believe it's working this quickly, but I think I'm actually getting output from the Teensy to the lights! It's a super simple setup, and can easily be duplicated to implement three more universes. However, I can only seem to turn one on at a time, as it seems to freeze whenever I initialize more universes. I'm too tired to figure this right now, it's 2AM and I've stayed up way too late.",
  },
  {
    date: "April 4, 2022",
    month: "April 2022",
    hours: 2,
    text: "Still can't figure out the multiple output problem. After a lot of scouring the internet, I've decided to ask the PJRC (makers of Teensy) forum for help.",
  },
  {
    date: "April 5, 2022",
    month: "April 2022",
    hours: 2,
    text: "Got an answer back, apparently I have to buy more stuff! Hooray! Luckily the parts I have to buy aren't terribly expensive, but price adds up quick. Worked on more serial communication between the Teensy and my laptop in the meantime. C# has some nice Serial Communication libraries.",
  },
  {
    date: "April 6, 2022",
    month: "April 2022",
    hours: 2,
    text: "Still waiting on the transceiver I ordered, starting to design schematics for the final interface. I plan for it to be a compact rectangular box with a metal frame, with 4 XLR outputs, a MIDI input, an Ethernet output, amongst other things.",
  },
  {
    date: "April 8, 2022",
    month: "April 2022",
    hours: 4,
    text: "Transceiver arrived! Worked all night with communication between the Teensy and the computer and it works great! Now that a basic protocol is finished, I'm gonna work on a more efficient way to transfer data.",
  },
  {
    date: "April 9, 2022",
    month: "April 2022",
    hours: 6,
    text: "Spent all afternoon working on the program. Keep running into issues with the bandwidth that I'm trying to send. The protocol I'm using has barely enough speed to transmit one universe at the speed I need, so some further research might be necessary.",
  },
  {
    date: "April 11, 2022",
    month: "April 2022",
    hours: 3,
    text: "Discovered a new protocol based off of the open-source DMXKing USB protocol, which means that the interface I'm building could also be used by other programs as well! I love modularity, so a design like this would be nice. Spent a lot of time working out bugs and getting it working.",
  },
  {
    date: "April 12, 2022",
    month: "April 2022",
    hours: 2,
    text: "Turns out the protocol can support up to 47 universes (hypothetically)! This is great, and with a finished C# implementation of the protocol, I can start focusing on building a GUI for the application.",
  },
  {
    date: "April 13, 2022",
    month: "April 2022",
    hours: 2,
    text: "Still doing research on different types of GUI libraries for C#. Trying a couple out, but most of them don't seem to be what I'm looking for. There's one called Avalonia that caught my eye, though. Will do further research.",
  },
  {
    date: "April 14, 2022",
    month: "April 2022",
    hours: 2,
    text: "Watched some videos on Avalonia, looks like what I need. Began testing out some sandbox programs, working decently well.",
  },
  {
    date: "April 16, 2022",
    month: "April 2022",
    hours: 2,
    text: "Finals season is almost in full swing, so I will have to put this project on temporary hiatus until school is out so I can focus on it full time. However, before that happens I did spend some more time getting accustomed to Avalonia.",
  },
  {
    date: "April 30, 2022",
    month: "April 2022",
    hours: 6,
    text: "School is out, which means that I am home for the summer! More time to focus on the project, so I spent the whole afternoon researching more for a final build of the interface, as well as more GUI implementation.",
  },
  {
    date: "May 2, 2022",
    month: "May 2022",
    hours: 3,
    text: "Began implementing a color picker to control the color of selected lights. Found an open-source easy to use version on GitHub, so I will be using it with proper licensure.",
  },
  {
    date: "May 3, 2022",
    month: "May 2022",
    hours: 4,
    text: "Trying to implement XML show-files, but the way C# processes XML is kind of annoying and clunky. This may be due to my inexperience, and I will be researching more efficient ways to handle data in the future. In the meantime, I'm gonna start working on how the program stores light information in cues.",
  },
  {
    date: "May 5, 2022",
    month: "May 2022",
    hours: 3,
    text: "Finished cues today. However, there is no transition time between cues, and it is a hard cut, meaning that colors don't fade into each other when I tell them to. Will be a bit of a tough fix.",
  },
  {
    date: "May 7, 2022",
    month: "May 2022",
    hours: 5,
    text: "Dedicated today to transitions and cue storage. I'm running into a lot of issues, as some cues run one-way, meaning they transition correctly going from Cue A to Cue B, however they have no transition from Cue B to Cue A. Weird.",
  },
  {
    date: "May 8, 2022",
    month: "May 2022",
    hours: 4,
    text: "Managed to get two-way cue transitions working, however, I realize the way I'm having the program store cues is kinda bad and will lead to problems in the future. I know what I should do, but it's going to be a lot of work to implement it. Basically, I am currently storing the physical data (bytes of information regarding the lights) of each cue in an array, whereas I should be storing the abstract information (such as \"color\" and \"intensity\"), that way the design is more modular. Will take some time to implement it.",
  },
  {
    date: "May 11, 2022",
    month: "May 2022",
    hours: 3,
    text: "Going to put the abstract implementation on hold for a bit, as I need to focus on more important things. For the initial build, I am also trying to add MIDI compatibility, so that someone could hypothetically run a light show automatically through a DAW, such as Ableton or Logic Pro. This is one of the hardest things to do cross platform wise, as different operating systems have different MIDI implementations. I'm gonna get a very rudimentary version working first, and then add it to my bigger TODO list for later.",
  },
  {
    date: "May 31, 2022",
    month: "May 2022",
    hours: 3,
    text: "Haven't touched the program for a while, life got a little busy as I'm trying to find a summer job and other things that dominate my summer. Got more time to work on a specific version of the program for a show I'm doing lights for in Columbus. With show files pretty much finished and a basic MIDI implementation and cue system working, I have a very basic, albeit working, demo to use at the show. Thus, the software for the sake of this project, is complete.",
  },
];

const totalHours = computed(() =>
  LOG_ENTRIES.reduce((sum, e) => sum + e.hours, 0)
);

const groupedLog = computed(() => {
  const groups = new Map<string, typeof LOG_ENTRIES>();
  for (const entry of LOG_ENTRIES) {
    if (!groups.has(entry.month)) groups.set(entry.month, []);
    groups.get(entry.month)!.push(entry);
  }
  return [...groups.entries()];
});

const formatHours = (h: number) => (h % 1 === 0 ? `${h}h` : `${h}h`);
</script>

<template>
  <div class="pt-28 pb-24 px-6 max-w-2xl mx-auto text-left">

    <router-link :to="{ name: 'lighting-project' }" class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
      ← Back to Lighting
    </router-link>

    <!-- Header -->
    <div class="mb-14 text-center">
      <p class="text-xs text-cyan-400 uppercase tracking-widest mb-2 font-semibold">Honors Project</p>
      <h1 class="text-4xl font-bold mb-1">Lighting Software Log</h1>
      <p class="text-neutral-400 text-sm">March 2022 &mdash; May 2022</p>

      <div class="flex justify-center gap-12 mt-8">
        <div class="text-center">
          <p class="text-3xl font-bold text-cyan-400">{{ LOG_ENTRIES.length }}</p>
          <p class="text-xs text-neutral-400 uppercase tracking-wider mt-1">Entries</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-cyan-400">
            {{ totalHours }}<span class="text-lg font-normal">h</span>
          </p>
          <p class="text-xs text-neutral-400 uppercase tracking-wider mt-1">Total Logged</p>
        </div>
      </div>
    </div>

    <!-- Monthly groups -->
    <div v-for="([month, entries]) in groupedLog" :key="month" class="mb-12">
      <div class="flex items-center gap-3 mb-5">
        <h2 class="text-sm font-bold text-cyan-400 uppercase tracking-widest whitespace-nowrap">{{ month }}</h2>
        <div class="flex-1 h-px bg-cyan-400/20"></div>
        <span class="text-xs text-neutral-500 whitespace-nowrap">
          {{ entries.reduce((s, e) => s + e.hours, 0) }}h
        </span>
      </div>

      <div class="flex flex-col gap-3">
        <div
          v-for="entry in entries"
          :key="entry.date"
          class="entry-card bg-neutral-900/60 border-l-2 border-cyan-500 rounded-r-xl px-5 py-4"
        >
          <div class="flex items-center justify-between gap-4 mb-2.5">
            <h3 class="font-semibold text-white text-sm leading-tight">{{ entry.date }}</h3>
            <span class="shrink-0 text-xs bg-cyan-400/10 text-cyan-300 border border-cyan-400/25 rounded-full px-2.5 py-0.5 font-mono">
              {{ formatHours(entry.hours) }}
            </span>
          </div>
          <p class="text-sm text-neutral-300 leading-relaxed">{{ entry.text }}</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center mt-4 text-neutral-500 text-xs">
      {{ totalHours }} hours logged across {{ LOG_ENTRIES.length }} entries
    </div>

  </div>
</template>

<style scoped>
.entry-card {
  transition: border-color 0.2s, background 0.2s;
}

.entry-card:hover {
  border-color: rgb(34 211 238);
  background: rgba(34, 211, 238, 0.05);
}
</style>
