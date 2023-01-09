<script setup>
import format from 'date-fns/format';
import { de } from 'date-fns/esm/locale';

const props = defineProps({
  screening: {
    default: undefined,
  },
});

const timeDT = new Date(props.screening.time);
const time = format(timeDT, 'p', { locale: de });
const dateDT = new Date(props.screening.date);
const d = format(dateDT, 'EEEEEE');
const dd = format(dateDT, 'ii');
const mmm = format(dateDT, 'MMM');

</script>

<template>
  <RouterLink
    :to="{ name: 'screening-detail', params: { slug: props.screening.slug } }"
    class="link-theme"
  >
    <div
      class="screening-list-item"
    >
      <div class="screening-date">
        <div class="d">{{ d }}</div>
        <div class="mmm">{{ mmm }}</div>
        <div class="dd">{{ dd }}</div>
      </div>
      <div class="img-wrapper">
        <img
          :src="screening.media.movie.header.url"
          alt="movie header image"
        />
      </div>
      <div class="screening-info">
        <div class="screening-time">
          {{ time }}
        </div>
        <div class="screening-title">
          {{ screening.title }}
        </div>
        <div class="footer">
          <RouterLink
            :to="{ name: 'screening-detail', params: { slug: props.screening.slug } }"
          >
            More Info
          </RouterLink>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style>
.link-theme:hover {
  transition: all .3s ease-in-out;
  transform: translate(0px, -2%);
}
.screening-list-item {
  position: relative;
  width: 100%;
  background-color: var(--color-white);
  color: var(--color-black);
  box-shadow: 1px 1px 10px 0px rgb(0 0 0 / 50%);
  display: flex;
  flex-direction: column;
  grid-column: auto;
}
.screening-list-item .img-wrapper {
  width: 100%;
  height: 17.5rem;
  overflow: hidden;
}
.screening-list-item .img-wrapper img {
  object-fit: cover;
  width: 100%;
  height: 17.5rem;
}
.screening-info {
  height: 15.5rem;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
.screening-time {
  color: var(--color-theme-contrast-dark);
}
.screening-title {
  font-size: var(--font-size-big);
  line-height: var(--line-height-big);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
}
.screening-info .footer {
  color: var(--color-light-grey-readable);
  font-size: var(--font-size-small);
  text-transform: uppercase;
  margin-top: auto;
}
.screening-date {
  position: absolute;
  left: 0.5rem;
  top: -0.6rem;
  font-family: "Tahoma", Sans-serif;
  text-transform: uppercase;
  text-shadow: 0px 0px 10px rgb(0 0 0 / 30%);
  color: #0B0B0B;
  background-color: rgba(255, 255, 255, .8);
  padding: .75rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.screening-date .d,
.screening-date .mm {
  font-size: var(--font-size-normal);
  font-weight: var(--font-weight-light);
  line-height: var(--font-size-normal);
}
.screening-date .dd {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  line-height: 2.5rem;
}
</style>
