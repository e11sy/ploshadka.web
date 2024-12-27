<template>
  <div v-if="$props.name === 'IconFlag' ">
    <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="39.6239" height="38.4199" rx="8" fill="#358C29"/>
      <path d="M12.8072 7.26062V29.8694" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.8072 9.52136H25.4681C28.5203 9.52136 29.1986 11.217 27.0507 13.3649L25.6942 14.7214C24.7898 15.6257 24.7898 17.0953 25.6942 17.8866L27.0507 19.2431C29.1986 21.391 28.4073 23.0866 25.4681 23.0866H12.8072" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div v-else-if="$props.name === 'IconCup' ">
    <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="39.6239" height="38.4199" rx="8" fill="#358C29"/>
      <path d="M20.1755 24.25V26.7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.342 30.667H26.0087V29.5003C26.0087 28.217 24.9587 27.167 23.6754 27.167H16.6754C15.392 27.167 14.342 28.217 14.342 29.5003V30.667V30.667Z" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
      <path d="M13.1755 30.667H27.1755" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.9999 23.6663C15.4849 23.6663 11.8333 20.0147 11.8333 15.4997V11.9997C11.8333 9.42134 13.9216 7.33301 16.4999 7.33301H23.4999C26.0783 7.33301 28.1666 9.42134 28.1666 11.9997V15.4997C28.1666 20.0147 24.5149 23.6663 19.9999 23.6663Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.3806 18.5928C11.5056 18.3128 10.7356 17.7995 10.1289 17.1928C9.07891 16.0262 8.37891 14.6262 8.37891 12.9928C8.37891 11.3595 9.66224 10.0762 11.2956 10.0762H12.0539C11.8206 10.6128 11.7039 11.2078 11.7039 11.8262V15.3262C11.7039 16.4928 11.9489 17.5895 12.3806 18.5928Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M27.6174 18.5928C28.4924 18.3128 29.2624 17.7995 29.8691 17.1928C30.9191 16.0262 31.6191 14.6262 31.6191 12.9928C31.6191 11.3595 30.3358 10.0762 28.7024 10.0762H27.9441C28.1774 10.6128 28.2941 11.2078 28.2941 11.8262V15.3262C28.2941 16.4928 28.0491 17.5895 27.6174 18.5928Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  name: string;
}>();

</script>

<style module lang="postcss"></style>
