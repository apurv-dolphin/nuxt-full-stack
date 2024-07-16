<template>
  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
    <div class="text-center pb-12">
      <h2 class="text-base font-bold text-[#00da9f]">
        We have the best equipment in the market
      </h2>
      <h1
        class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900"
      >
        Check our awesome team members
      </h1>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center"
        v-for="member in teamMemberData"
        :key="member"
      >
        <div class="aspect-w-1 aspect-h-1 w-full">
          <img
            class="object-center object-contain h-full w-full"
            :src="member.image"
            alt="photo"
          />
        </div>
        <div class="text-center py-8 sm:py-6">
          <p class="text-xl text-gray-700 font-bold mb-2">{{ member.name }}</p>
          <p class="text-base text-gray-400 font-normal">
            {{ member.role }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import teamMemberData from "~/utils/meetTeamMember.ts";
export default {
  name: "MeetTheTeam",
  setup() {
    return {
      teamMemberData,
    };
  },
};
</script>
