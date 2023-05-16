<template lang="pug">
Reveal
  .slides
    Title(
      background='/video/north_side_gal.mp4'
      :muted='false'
    )
      template(v-slot:title)
        .title The Moat That Matters
        .footer
          ul.list-outside(style='list-style-type: none;')
            li
              img(
                src='/images/childsafeai/png/green_and_white/childsafe-logo-gw-slim-h@tight.png'
              )
            li Rob Spectre
            li rob@childsafe.ai
    Title(
      background='/video/zelda_moat.mp4'
      :muted='true'
    )
      template(v-slot:title)
        .title The Moat That Matters
        .footer
          ul.list-outside(style='list-style-type: none;')
            li
              img(
                src='/images/childsafeai/png/green_and_white/childsafe-logo-gw-slim-h@tight.png'
              )
            li Rob Spectre
            li rob@childsafe.ai
    VideoSlide(
      background='/video/almost_the_end_of_the_show.mp4'
      :muted='false'
    )
    Title(
      background='/video/zelda_moat.mp4'
      :muted='true'
    )
      template(v-slot:title)
        .title The Moat That Matters
        .footer
          ul.list-outside(style='list-style-type: none;')
            li
              img(
                src='/images/childsafeai/png/green_and_white/childsafe-logo-gw-slim-h@tight.png'
              )
            li Rob Spectre
            li rob@childsafe.ai
    BackgroundImageSlide(background='/images/moat.gif')
    VideoSlide(background='/video/crossing_the_moat.mp4')
    BackgroundImageSlide(background='/images/moat_memo.png')
      h1 from:sundar@google.com
    BackgroundImageSlide(background='/images/sloth.gif')
    BackgroundImageSlide(background='/images/airline.gif')
    Slide(class='darkgray')
      .slide-headline It is the hardest time
      .slide-headline
        | to build a
        span.text-blue data
        | moat
    Slide(class='darkgray')
      .slide-headline It is the hardest time
      .slide-headline
        | to build a
        span.text-blue tech
        | moat
    Slide(class='darkgray')
      .slide-headline It is the hardest time
      .slide-headline
        | to build an
        span.text-blue IP
        | moat
    Slide(class='darkgray')
      .slide-headline
        | It is the
        span.text-green easiest
        | time
      .slide-headline
        | to build a
        span.text-green customer
        | moat
    BackgroundImageSlide(background='/images/airline.gif')
      h1 Their customers
    BackgroundImageSlide(background='/images/crowd.gif')
      h1 Your customers
    Title(
      background='/video/zelda_moat.mp4'
      :muted='true'
    )
      template(v-slot:title)
        .footer
          ul.list-outside(style='list-style-type: none;')
            li
              img(
                src='/images/childsafeai/png/green_and_white/childsafe-logo-gw-slim-h@tight.png'
              )
            li Rob Spectre
            li rob@childsafe.ai
    VideoSlide(background='/video/twilio.mp4')
    Slide(class='blue')
      .slide-headline
        | Get the
        span.text-black  visibility
      .slide-headline
        | Find your leading
        span.text-black  segment
      .slide-headline
        | Get your
        span.text-black  product
        |  in their
        span.text-black  hands
      h1 Agenda
    Slide(class='darkgray')
      .slide-headline Identify what you know
      .slide-headline
        | about your
        span.text-green  customers
    Slide
      img(src='/images/pyramid.png')
      h1 Rob's Pyramid
    Slide(class='darkgray')
      .w-screen
        .flex.items-center.justify-center
          img(class='w-1/2 h-auto' src='/images/mark-zuckerberg-adjust.gif')
    Slide
      img(src='/images/pyramid.png')
      h1 Rob's Pyramid
    BackgroundImageSlide(background='/images/money.gif')
    BackgroundImageSlide(background='/images/stink.gif')
    Slide(class='blue')
      .slide-headline.fragment
        | They all cost
        span.text-red-800  $$$,$$$
      .slide-headline.fragment
        | UX for all of them are
        span.text-red-800  trash
      .slide-headline.fragment
        | Integration is
        span.text-red-800  error prone
      .slide-headline.fragment
        span.text-red-800 No one
        | in your org
        span.text-red-800  wants to do it
      h1 State of Cross Platform Analytics
    BackgroundImageSlide(background='/images/leaking.gif')
      h1 You're leaking customers
    Slide(class='green')
      .slide-headline
        span.text-black Heap
        |  (Future Proof)
      .slide-headline
        span.text-black Adobe Analytics
        |  (Best Ecosystem)
      .slide-headline
        span.text-black Google Analytics 4 360
        |  (Best Training)
    BackgroundImageSlide(background='/images/build.gif')
    Slide(class='darkgray')
      .slide-headline
        | Find The
        span.text-green  Segment
      .slide-headline
        | Leads To Your
        span.text-green  customer
    BackgroundImageSlide(background='/images/inspect.gif')
    Slide(class='darkgray')
      .w-screen
        .flex.items-center.justify-center
          img(class='w-1/2 h-auto' src='/images/pareto_principle.png')
      h1 The Pareto Principle
    BackgroundImageSlide(background='/images/sorting.gif')
      h1 Sorting by Behaviour
    BackgroundImageSlide(background='/images/twilio_docs.png')
      h1 Example
    BackgroundImageSlide(background='/images/boring.gif')
    Slide(class='darkgray')
      .w-screen
        .flex.items-center.justify-center
          img(class='w-1/2 h-auto' src='/images/money_machine.gif')
    Slide(class='blue')
      .slide-headline.fragment
        | 9x more likely to
        span.text-black  signup
      .slide-headline.fragment
        | 5x more likely to
        span.text-black  swipe credit card
      .slide-headline.fragment
        | 19x more likely to
        span.text-black  add funds
      .slide-headline.fragment
        | 7x more likely to become a
        span.text-black  ongoing customer
      h1 twilio.com/docs
    Slide(class='darkgray')
      .w-screen
        .flex.items-center.justify-center
          img(class='w-1/2 h-auto' src='/images/money_machine.gif')
    BackgroundImageSlide(background='/images/snowflake.gif')
    BackgroundImageSlide(background='/images/putt.gif')
    Slide(class='darkgray')
      .slide-headline
        | Get your
        span.text-green  Product
      .slide-headline
        | In That Segment's
        span.text-green  hands
    Slide(class='green')
      .slide-headline.underline 3 Fs
      .slide-headline.fragment
        span.text-black Free
      .slide-headline.fragment
        span.text-black Frictionless
      .slide-headline.fragment
        span.text-black Five Minute First Time Use
    BackgroundImageSlide(background='/images/delight.gif')
      h1 Surprise and Delight First
    Slide
      .w-screen
        .flex.items-center.justify-center
          img(class='w-1/2 h-auto' src='/images/swipe.gif')
      h1 Subscribe and charge after
    BackgroundImageSlide(background='/images/synthesia_signup.png')
      h1 Free
    VideoSlide(
      background='/video/syn-trial.mp4'
      :muted='false'
    )
    BackgroundImageSlide(background='/images/headroom_email_demo.png')
      h1 Free and Five Minutes
    BackgroundImageSlide(background='/images/headroom_demo_tour.png')
      h1 Free and Five Minutes
    BackgroundImageSlide(background='/images/earkick_test_results.png')
      h1 Free, Frictionless, and Five Minutes
    VideoSlide(background='/video/twilio_ftu.mp4')
      h1 Progressive Delight
    BackgroundImageSlide(background='/images/monkey.jpg')
    VideoSlide(background='/video/ldv_portfolio.mp4')
    Slide(class='green')
      .slide-headline
        | This digs the
        span.text-black moat
    Slide
      img(src='/images/pyramid.png')
      h1 Get The Visibility
    Slide(class='darkgray')
      .w-screen
        .flex.items-center.justify-center
          img(class='w-1/2 h-auto' src='/images/money_machine.gif')
      h1 Find the leading segment
    BackgroundImageSlide(background='/images/delight.gif')
      h1 3 Fs Experience
    Slide(class='green')
      .slide-headline
        | Next up is
        span.text-black filling it
    Title(
      background='/video/zelda_moat.mp4'
      :muted='true'
    )
      template(v-slot:title)
        .title Thanks LDV crew!
        .footer
          ul.list-outside(style='list-style-type: none;')
            li
              img(
                src='/images/childsafeai/png/green_and_white/childsafe-logo-gw-slim-h@tight.png'
              )
            li Rob Spectre
            li rob@childsafe.ai
</template>

<script>
import BackgroundImageSlide from '@/components/base/BackgroundImageSlide.vue'
import Reveal from '@/components/base/Reveal.vue'
import Slide from '@/components/base/Slide.vue'
import VideoSlide from '@/components/base/VideoSlide.vue'
import Title from '@/components/base/Title.vue'

export default {
  name: 'Home',
  components: {
    Title,
    Slide,
    Reveal,
    BackgroundImageSlide,
    VideoSlide
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Titan+One&family=Cutive+Mono&family=Roboto:wght@700&display=swap');

.nintendo {
  font-family: 'Press Start 2P', cursive !important;
  @apply mt-72 text-9xl text-white #{!important};
}

.title {
  font-family: 'Titan One', cursive;
  @apply text-8xl text-white tracking-tight skew-y-12 text-shadow shadow-black #{!important};
}

.footer {
  font-family: 'Cutive Mono', monospace;
  @apply text-4xl text-white tracking-tighter text-shadow-sm shadow-black
  lowercase absolute inset-x-0 bottom-0 mb-4 ml-4 #{!important};
}

.slide-headline {
  font-family: 'Roboto', sans-serif;
  @apply text-6xl text-white tracking-tight uppercase #{!important};
}

.zuck {
  background-image: url('/images/mark-zuckerberg-adjust.gif');
}

html {
  font-size: 36px;
}
</style>
