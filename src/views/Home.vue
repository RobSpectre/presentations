<template lang="pug">
Reveal
  .slides
    Title
    Title(
      background='/video/price_is_right.mp4'
      heading='/images/cameo_price_is_right.png'
    )
    VideoSlide(
      background='/video/get_what_you_give.mp4'
      :muted='false')
    BackgroundImageSlide(background='https://www.howtogeek.com/wp-content/uploads/2020/06/cameo-grid.jpg?height=200p&trim=2,2,2,2')
      h1 Cameo
    Slide(heading='Rules')
      h2.fragment Solo
      h2.fragment Celebrity on Cameo
      h2.fragment Closest &lt; Price
      h2.fragment Points 2x Each Round
      h2.fragment 2x Bonus For Correct
      h2.fragment.pb-10 Oneder Challenge
    PlayerBoard
    Slide(class='darkgray')
      h2 Let's Go!
    VideoSlide(
      background='/video/vanilla_ice.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Vanilla Ice'
      hint1='#1 for 16 Weeks in 1990'
      hint2='Kinda Reality TV Guy?'
      hint3='Played Hastings'
      video='https://d3el26csp1xekx.cloudfront.net/video/f88a23f2-79c0-4037-b5fd-3bfca4878a65-no-wm.mp4'
      :price=399
      :prize=1
      image='https://www.queenforever.com.au/wp-content/uploads/2017/09/vanilla-ice-e1479823884816.jpg'
      )
    VideoSlide(
      background='/video/toto.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Leland Sklar'
      hint1='Touring member of Toto'
      hint2='Africa never hit #1'
      hint3='I Won\'t Hold You Back'
      video='https://starboard-media.s3.amazonaws.com/video/622c196202607e0c5980589b-processed.mp4'
      :price=75
      :prize=1
      image='https://www.musicinstrumentnews.co.uk/wp-content/uploads/2019/12/IMG_2925.jpeg'
      )
    VideoSlide(
      background='/video/wheatus.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Brendan Brown'
      hint1='Peak was #76 in 2001'
      hint2='From New York!'
      hint3='Might Work At Columbia'
      video='https://starboard-media.s3.amazonaws.com/video/video-61ffa86a7f3c9b3946db1f60-77i2Lgiuu-yYAvf_sgR-processed.mp4'
      :price=50
      :prize=1
      image='https://www.cambridgeindependent.co.uk/_media/img/4MO65P1X9QX3JE6T0M5E.jpg'
    )
    VideoSlide(
      background='/video/everclear.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Art Alexakis'
      hint1='E2E Was 8 in 1997'
      hint2='Honeymooned as a MTV VJ'
      hint3='On Tour This Year'
      video='https://starboard-media.s3.amazonaws.com/video/621c321945b2332d8574a5cc-processed.mp4'
      :price=60
      :prize=1
      image='https://static.spin.com/files/2020/05/Art56159_v1-2-1588613278-1588792137.jpg'
    )
    VideoSlide(
      background='/video/crucialtaunt.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Tia Carrere'
      hint1='Wayne\'s World frontwoman'
      hint2='2x Grammy Winner'
      hint3='Hawaiian Music - shreds ukelele'
      video='https://starboard-media.s3.amazonaws.com/video/6206ddff2496045933fba886-processed.mp4'
      :price=300
      :prize=1
      image='https://video-images.vice.com/test-uploads/articles/5e5fc40e7a7c2c0098f93d08/lede/1583337059242-tia-carrere.jpeg?crop=1xw:0.7582xh;0xw,0xh'
    )
    VideoSlide(
      background='/video/lisaloeb.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Lisa Loeb'
      hint1='#2 in 1997'
      hint2='Sunday Morning News'
      hint3='Whole Foods Always'
      video='https://starboard-media.s3.amazonaws.com/video/621998d741f8ff925cae0a90-processed.mp4'
      :price=129
      :prize=1
      image='https://images.squarespace-cdn.com/content/v1/58eac4d88419c2d993e74f57/1575318496292-IYLPAVB78LBFITGTP7GM/A+Simple+Trick+to+Happiness+Photo+Credit+Juan+Patino+HI+REZ.jpg'
    )
    PlayerBoard
    VideoSlide(
      background='/video/musicvideos.mp4'
      :muted='false'
    )
    PlayerBoard
    VideoSlide(
      background='/video/bonethugs_cut.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Krazie Bone'
      hint1='E.1999 Eternal #1 in 95'
      hint2='Jehovah\'s Witness'
      hint3='Signed to Ruthless'
      video='https://starboard-media.s3.amazonaws.com/video/video-60c2943d591826001d47fa4b-xQEk-z3v0-h~233B6JJ-no-wm.mp4'
      :price=125
      :prize=2
      image='https://m.media-amazon.com/images/M/MV5BNTVhMGRlMTEtZjFjYS00Y2IwLWIyOTMtZDY3MTJlNmZmNmU0XkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg'
    )
    VideoSlide(
      background='/video/onyx.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Sticky Fingaz'
      hint1='#4 US in 1993'
      hint2='Jamaica Queens'
      hint3='Self-release Movie'
      video='https://starboard-media.s3.amazonaws.com/video/618a8eaa59713dfd9615774b-processed.mp4'
      :price=100
      :prize=2
      image='https://i.ytimg.com/vi/YOq3S0VhHRQ/maxresdefault.jpg'
    )
    VideoSlide(
      background='/video/montelljordan.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Montell Jordan'
      hint1='Born 1968'
      hint2='#1 on Soul 1995'
      hint3='Different occupation'
      video='https://starboard-media.s3.amazonaws.com/video/62267fc45fc8b02aa5e8b791-processed.mp4'
      :price=100
      :prize=2
      image='https://upload.wikimedia.org/wikipedia/commons/5/5a/Montell_Jordan_1995.jpg'
    )
    VideoSlide(
      background='/video/cypresshill.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Sen Dog'
      hint1='2 weeks at #1 in 93'
      hint2='2nd MC'
      hint3='Did not have a career'
      video='https://starboard-media.s3.amazonaws.com/video/61fef4f78c2dabcda01eb51d-processed.mp4'
      :price=75
      :prize=2
      image='https://www.latinousa.org/wp-content/uploads/2019/07/sencypress.png'
    )
    VideoSlide(
      background='/video/sugarhill.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Master Gee'
      hint1='Original in OG'
      hint2='Top 40 in *1979'
      hint3='Birthed a genre'
      video='https://starboard-media.s3.amazonaws.com/video/620996aa2550f1b27a07ab31-processed.mp4'
      :price=200
      :prize=2
      image='https://richmondmagazine.com/downloads/26582/download/MasterGee7.JPG?cb=037d8a706f783989f26855a57e4e9967'
    )
    VideoSlide(
      background='/video/kidnplay.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Kid'
      hint1=''
      hint2=''
      hint3='Best Hair in Hip Hop'
      video='https://d3el26csp1xekx.cloudfront.net/video/62020c96febd92f3dfdb47bd-processed.mp4'
      :price=99
      :prize=2
      image='http://media.zenfs.com/en-US/blogs/music-news/5f0bd31e-9004-40e9-8e2b-1986323d4d28_kid-n-play-Michael-Ochs-Archives.jpg'
    )
    PlayerBoard
    VideoSlide(
      background='/video/oneders.mp4'
      :muted='false'
    )
    PlayerBoard
    VideoSlide(
      background='/video/googoodolls.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Robby Takac'
      hint1='12 Months in 1998'
      hint2='15 Million Records'
      hint3='Metal Blade'
      video='https://starboard-media.s3.amazonaws.com/video/62222842d821abad25692f61-processed.mp4'
      :price=100
      :prize=3
      image='https://www.gannett-cdn.com/presto/2019/07/25/PCIN/55e7403e-d9f9-4072-81af-ba4158630ea1-072419TrainGooGooDollsAllenStone11.JPG'
    )
    VideoSlide(
      background='/video/sugarray.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Mark McGrath'
      hint1='Peaked at 20 in 97'
      hint2='Appeared here before'
      hint3='unable to age'
      video='https://starboard-media.s3.amazonaws.com/video/video-622ad9665796c11afbbed7c0-s1g_6GnsO-4HtjZ0Dbi-processed.mp4'
      :price=90
      :prize=3
      image='https://media.vanityfair.com/photos/61113bbe1a2290bc63fd98bd/master/w_2560%2Cc_limit/1163244470'
    )
    VideoSlide(
      background='/video/blackdahlia.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Black Dahlia Murder'
      hint1='Formed 2001'
      hint2='#4 in 2020'
      hint3='Founder and singer'
      video='https://d3el26csp1xekx.cloudfront.net/v/no-wm-IasMkYWAD5.mp4'
      :price=40
      :prize=3
      image='https://www.metalblade.com/us/mainpics/the-black-dahlia-murder.jpg'
    )
    VideoSlide(
      background='/video/deesnider_cut.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Dee Snider'
      hint1='Peak was only 58'
      hint2='Radio personality'
      hint3='Celine Dione Xmas'
      video='https://starboard-media.s3.amazonaws.com/video/6227e1a5354846083cc78b67-processed.mp4'
      :price=250
      :prize=3
      image='https://www.weareclassicrockers.com/sites/classicrockers.rock.tools/files/2020-09/Dee%20Snider%20is%20MAD%20GettyImages-1220011041.jpg'
    )
    VideoSlide(
      background='/video/devo.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Gerald Casale'
      hint1='#51 in 1980'
      hint2='Critically Acclaimed'
      hint3='Josh Freese'
      video='https://starboard-media.s3.amazonaws.com/video/622382f566af8b61471c661e-processed.mp4'
      :price=60
      :prize=3
      image='https://www.rollingstone.com/wp-content/uploads/2021/03/devo-day-akron.jpg'
    )
    VideoSlide(
      background='/video/lessthanjake.mp4'
      :muted='false'
    )
    CameoPriceIsRightRound(
      celebrity='Chris DeMakes'
      hint1='Legendary'
      hint2='for a Ska Band'
      hint3='New Podcast'
      video='https://starboard-media.s3.amazonaws.com/video/6206709bb4caa29259e98af2-processed.mp4'
      :price=50
      :prize=3
      image='https://imageland.indivision.ca/3958126.jpg'
    )
    PlayerBoard

</template>

<script>
import BackgroundImageSlide from '@/components/base/BackgroundImageSlide.vue'
import Reveal from '@/components/base/Reveal.vue'
import Title from '@/components/base/Title.vue'
import Slide from '@/components/base/Slide.vue'
import VideoSlide from '@/components/base/VideoSlide.vue'

import PlayerBoard from '@/components/Players/PlayerBoard.vue'

import CameoPriceIsRightRound from '@/components/CameoPriceIsRight/CameoPriceIsRightRound.vue'

export default {
  name: 'Home',
  components: {
    PlayerBoard,
    Title,
    Slide,
    Reveal,
    BackgroundImageSlide,
    VideoSlide,
    CameoPriceIsRightRound
  }
}
</script>
