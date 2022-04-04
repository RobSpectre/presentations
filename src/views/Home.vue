<template lang="pug">
Reveal
  .slides
    Title
    VideoSlide(
      background='/video/price_is_right.mp4'
      )
        h1 We know how to value things
    Slide
      iframe.mx-auto(
        src='https://tradingeconomics.com/embed/?s=cpi+yoy&v=202203101422v20220312&h=1080&w=1800&ref=/united-states/inflation-cpi'
        height='1080'
        width='1800'
        frameborder='0'
        scrolling='no'
      )
      h1 tradingeconomics.com
    Title(
      background='/video/snowpiercer_cut.mp4'
      heading='/images/inflation_station.png'
    )
    Slide(heading='Rules')
      h2.fragment Solo
      h2.fragment Series of Things You Can Buy
      h2.fragment Which is most $$$?
      h2.fragment Points 2x Each Round
      h2.fragment Contrarians Win Big
    PlayerBoard
    Slide(class='darkgray')
      h2.text-white Let's Go!
    WhichIsWhichRound(
      :items='berries'
      :winnerIndex=0
      :prize=1
      question='Which berry is the most expensive?'
    )
    WhichIsWhichRound(
      :items='protein'
      :winnerIndex=1
      :prize=1
      question='Which protein is pricier?'
    )
    WhichIsWhichRound(
      :items='cars'
      :winnerIndex=1
      :prize=1
      question='Which car sold for more at auction?'
    )
    WhichIsWhichRound(
      :items='nyc'
      :winnerIndex=0
      :prize=1
      question='Which New York staple is more expensive?'
    )
    WhichIsWhichRound(
      :items='gallons'
      :winnerIndex=2
      :prize=1
      question='Which is most expensive?'
    )
    WhichIsWhichRound(
      :items='fines'
      :winnerIndex=1
      :prize=1
      question='Which ticket is most expensive?'
    )
    PlayerBoard
    VideoSlide(
      background='/video/wordle.mp4'
      :muted='false')
    PlayerBoard
    Slide(class='darkgray')
      h2.text-white Each round is 2x!
    WhichIsWhichRound(
      :items='vip'
      :winnerIndex=1
      :prize=2
      question='Which VIP packages costs the most?'
    )
    WhichIsWhichRound(
      :items='haunted'
      :winnerIndex=2
      :prize=2
      question='Which paranomal thing costs more on eBay?'
    )
    WhichIsWhichRound(
      :items='goldsmith'
      :winnerIndex=0
      :prize=2
      question='Which Lynn Goldsmith print is most expensive?'
    )
    WhichIsWhichRound(
      :items='podcasts'
      :winnerIndex=0
      :prize=2
      question='Which podcast fetches the highest advertising rate per spot?'
    )
    WhichIsWhichRound(
      :items='scotch'
      :winnerIndex=1
      :prize=2
      question='Which entry level scotch is most expensive?'
    )
    WhichIsWhichRound(
      :items='marvelvsdc'
      :winnerIndex=0
      :prize=2
      question='Which comic fetched more at auction?'
    )
    PlayerBoard
    VideoSlide(
      background='/video/snl_fox_and_friends.mp4'
      :muted='false')
    PlayerBoard
    Slide(class='darkgray')
      h2.text-white Each round is 3x!
    WhichIsWhichRound(
      :items='videocards'
      :winnerIndex=0
      :prize=3
      question='Which video card is the most expensive?'
    )
    WhichIsWhichRound(
      :items='songcatalogs'
      :winnerIndex=1
      :prize=3
      question='Which song catalog sold for the most?'
    )
    WhichIsWhichRound(
      :items='movies'
      :winnerIndex=1
      :prize=3
      question='Which film had the biggest production budget?'
    )
    WhichIsWhichRound(
      :items='guitars'
      :winnerIndex=0
      :prize=3
      question='Which guitar fetched the most at auction?'
    )
    WhichIsWhichRound(
      :items='sports'
      :winnerIndex=0
      :prize=3
      question='Which sport fetches the highest broadcast price per season?'
    )
    WhichIsWhichRound(
      :items='boredapes'
      :winnerIndex=1
      :prize=3
      question='Which NFT sold for more?'
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

import WhichIsWhichRound from '@/components/WhichIsWhich/WhichIsWhichRound.vue'

export default {
  name: 'Home',
  components: {
    PlayerBoard,
    Title,
    Slide,
    Reveal,
    BackgroundImageSlide,
    VideoSlide,
    WhichIsWhichRound
  },
  data () {
    return {
      berries: [
        {
          name: 'Blueberries',
          hints: ['Natural Antioxidant', 'Great for skin', 'Ada hates them'],
          image: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/585ab11eb7e693dce7d92d5d_produce-blueberries-1._TTD_._SR1200,1200_._QL100_.jpg',
          value: 7.49,
          emoji: '🔵️'
        },
        {
          name: 'Cranberries',
          hints: ['Natural diuretic', 'Better for you', 'Made famous by The Departed'],
          image: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5fcae2d8cbc20b532172d1b5_00859810002502-c1c1._TTD_._SR1200,1200_._QL100_.jpg',
          value: 4.39,
          emoji: '🔴️'
        }
      ],
      protein: [
        {
          name: 'Beef',
          hints: ['Most popular protein in US', 'Average American consumes 58.4 pounds', 'Traffas knows all about it'],
          image: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/619d54dcab412b4824155c36_00295195000007-2020-cen-ecommerce-meat-beefground-85._TTD_._SR1200,1200_._QL100_.jpg',
          value: 6.99,
          emoji: '🐮️'
        },
        {
          name: 'Chicken',
          hints: ['Distant second', 'Subject of many not-fun documentaries', 'Total dicks'],
          image: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5be8c4fbeabd2b8c04e5954f_upc-0738985220709-done-0-glamor-0c9bce33-ea39-4dc8-9b5c-469e19901bbd-b2nfi8._TTD_._SR1200,1200_._QL100_.jpg',
          value: 7.99,
          emoji: '🐔️'
        },
        {
          name: 'Impossible Beef',
          hints: ['Not from an animal', 'Whole Foods does not carry it', 'Lillie not a fan'],
          image: 'https://target.scene7.com/is/image/Target/GUEST_ae5a8b7c-d80c-4dd9-9994-a5ee140aa5ff?qlt=85&fmt=webp&hei=700&fit=constrain',
          value: 6.29,
          emoji: '🎋️'
        }
      ],
      cars: [
        {
          name: '2022 Tesla Model Y',
          hints: ['Hottest car company in the world', 'Literally, their fires are amazing', 'CEO is a rocketman', '100 total miles'],
          image: 'https://media.carsandbids.com/cdn-cgi/image/width=1800,quality=70/c51905b0000b639a185eeb080dd879bf007f5604/photos/9AEYkBav-YL4UrrcEKG-(edit).jpg?t=164784692206',
          value: 65432,
          emoji: '🔌️'
        },
        {
          name: '2012 Porche 911 Turbo S',
          hints: ['Lean turbocharged V6', 'Epitome of German engineering', '11 years old', '23,300 miles'],
          image: 'https://media.carsandbids.com/cdn-cgi/image/width=1800,quality=70/171ab1e538119e13fa98382f268326fc825fdc20/photos/KYpypaVM-GdnZXzVwXo-(edit).jpg?t=164788844209',
          value: 98000,
          emoji: '⛽️'
        }
      ],
      nyc: [
        {
          name: 'NYC Slice of Pizza',
          hints: [
            '3 billion of these are made per year',
            'As iconic as the Statue of Liberty',
            'Local custom is to fold before the first bite',
            '75 cents per slice when Rob first moved here'
          ],
          image: 'https://i.ytimg.com/vi/gNgOs2lf7i0/maxresdefault.jpg',
          value: 3.14,
          emoji: '🍕️'
        },
        {
          name: 'NYC Subway Fare',
          hints: [
            'This service was purchased 1.7 billion times in 2016',
            'Famous for running under and over ground and sea alike',
            'NYC mayors traditionally take this to/from work',
            '24/7 (unless it is the F train)'
          ],
          image: 'https://www.nycinsiderguide.com/wp-content/uploads/2020/01/nyc-subway-map.jpg',
          value: 2.75,
          emoji: '🚆️'
        }
      ],
      gallons: [
        {
          name: 'Organic Milk',
          hints: [
            'First form of sustenance provided to any mammal',
            'Shelf life benefits from a preservation technique for wine',
            'It ages like Tucker Carlson monologues'
          ],
          image: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5f70d3c5d55b99b174a3c65b_099482415525-front._TTD_._SR1200,1200_._QL100_.jpg',
          value: 6.39,
          emoji: '🥛️'
        },
        {
          name: 'Gasoline',
          hints: [
            'Commodity driving most of the geopolitics',
            'Just two years ago had negative futures',
            'Exploded in recent months',
            'All time favorite question for Joe Biden'
          ],
          image: 'https://d32r1sh890xpii.cloudfront.net/news/1200x675/2021-11-04_kxoigrstyd.jpg',
          value: 5.69,
          emoji: '⛽️'
        },
        {
          name: 'Fertilizer',
          hints: [
            'We have heard a lot about this commodity',
            'Going to hear a lot more as the year goes on',
            'It is what makes the grass (and wheat!) grow',
            'This is made out of earthworms and bat guano'
          ],
          image: 'https://hydrobuilder.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/x/fx14517_1.jpg',
          value: 19.15,
          emoji: '💩️'
        }
      ],
      fines: [
        {
          name: 'Speeding +16 mph',
          hints: [
            'Most common traffic infraction in Barber County',
            'Deepest amount of case law in US code',
            'This is difficult to achieve in NYC',
            'Most likely cause of Rob incarceration'
          ],
          image: 'https://www.concordmonitor.com/getattachment/cba950a3-bfd5-4261-a9e0-b92c40c3028b/speedingsigns-cm-070819-ph1',
          value: 100,
          emoji: '🚨️'
        },
        {
          name: 'Illegal Exhaust',
          hints: [
            'This sound is a staple of Long Island motorways',
            'Point of pride for the 21st century car enthusiast',
            'This fine was $150 two days ago',
            'Recently raised by the SLEEP Act'
          ],
          image: 'https://www.thedrive.com/content/2020/12/Tailpipes-Exhaust-Leak.jpg?quality=85',
          value: 1000,
          emoji: '🚭️'
        },
        {
          name: 'Parking',
          hints: [
            'A full time staff of 4,000 agents manage these crimes',
            'More than human trafficking by 3,960 people',
            'First automated mass surveillance in the US',
            'Rob has never gotten one personally'
          ],
          image: 'https://s3-prod.crainsnewyork.com/AP20073574761510.jpg',
          value: 125,
          emoji: '🚓️'
        }
      ],
      vip: [
        {
          name: 'Trump Rally',
          hints: [
            'GOP Event in Alabama',
            'Primary is not until May',
            'Only ten available',
            'Roundtable and photo with former POTUS'
          ],
          image: 'https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/RLIV5DPQPNA6VPGHPN76BTJHTQ.jpg',
          value: 50000,
          emoji: '🎺️'
        },
        {
          name: 'Super Bowl',
          hints: [
            'Most expensive television advertising of the year',
            'Seats at fifty yard line and on-field access post game',
            'Trip to Tiffany & Co with Joe Montana and Jerry Rice',
            'Does not include hotel or airfare'
          ],
          image: 'https://cdn.vox-cdn.com/thumbor/kTsLKe83XIFKYvOppfrsQpYurgQ=/0x0:5406x3604/1200x800/filters:focal(2271x1370:3135x2234)/cdn.vox-cdn.com/uploads/chorus_image/image/70492365/GettyImages_1238305994.0.jpg',
          value: 100000,
          emoji: '🏈️'
        }
      ],
      haunted: [
        {
          name: 'Demon Doll',
          hints: [
            '16 inch porcelain doll in Victorian wear',
            'Possessed by the demon warrior Uzaren',
            'Liege of Ahriman, the Demon King',
            'Peep this description'
          ],
          image: 'https://i.ebayimg.com/images/g/es8AAOSwF-JiSaXv/s-l1600.jpg',
          value: 149,
          emoji: '🎎️'
        },
        {
          name: 'Voodoo Doll',
          hints: [
            '3 inches tall and handmade',
            'Blessed and ready for your energy',
            'Versatile - can grant wishes and lay curses!',
            'Looks like a rejected KoRn album cover'
          ],
          image: 'https://i.ebayimg.com/images/g/j4MAAOSwhPdhiLsq/s-l1600.jpg',
          value: 11,
          emoji: '🌚️'
        },
        {
          name: 'Portal Spirit Vox',
          hints: [
            'Gear tested by professional ghost hunters',
            'Custom wiring for the P-SB7 Spirit Box',
            'Features 100 year old Barn Wood',
            'As seen on Ghost Adventures'
          ],
          image: 'https://i.ebayimg.com/images/g/k7YAAOSwd~RiRL3m/s-l1600.jpg',
          value: 208.99,
          emoji: '🔊️'
        }
      ],
      goldsmith: [
        {
          name: 'Gene Simmons',
          hints: [
            'Claims to deliver the most bang for the buck in rock and roll',
            'Famously eliminated in 1st round of Celebrity Apprentice',
            'Also famously appeared in a Kansas hell house',
            'Bass player for Kiss'
          ],
          image: '/images/content/gene_simmons_blowing_fire.png',
          value: 5225,
          emoji: '🤡️'
        },
        {
          name: 'Elvis Presley',
          hints: [
            'Kid from Tupelo Mississippi',
            'Breakout star from Sam Phillips and Sun Records',
            'Television debut was cut from waist down',
            'Received Presidential Medal of Freedom in 2018?',
            'The King'
          ],
          image: '/images/content/elvis_presley_profile.png',
          value: 600,
          emoji: '🕺️'
        },
        {
          name: 'Bob Dylan',
          hints: [
            'Covered many, many times by Traffas and Rob (and everyone else)',
            'Originally from Minnesota, but career started mere blocks from Rob',
            'Subject of the Scorcese Documentary No Direction Home',
            'Was branded the first real sellout in popular music'
          ],
          image: '/images/content/bob_dylan.png',
          value: 2500,
          emoji: '🎸️'
        }
      ],
      podcasts: [
        {
          name: 'Pod Save America',
          hints: [
            'Founded Four Ex-White House staffers',
            'Rebirth of Air America for digital age',
            '',
            'Briefly had an HBO show. It wasn\'t great'
          ],
          image: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/b0/29/58/b029584a-0e2e-aa5c-25e3-753ec36462f7/mza_12562394560593193138.jpg/600x600bb.jpg',
          value: 300000,
          emoji: '🐎️'
        },
        {
          name: 'Steve Bannon\'s War Room',
          hints: [
            'Also ex-White House staffers',
            'Only 2 years old - already #2 with 1,958 episodes',
            'It is broadcast on Dish TV, Apple TV, Roku and America\'s Voice News',
            'Says Year of our Lord an awful lot'
          ],
          image: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/03/6c/d5/036cd51e-a25e-1e0b-30b0-7b4efa23e9f5/mza_663457704927232818.png/600x600bb.jpg',
          value: 65000,
          emoji: '🐘️'
        }
      ],
      scotch: [
        {
          name: 'Johnnie Walker Black',
          hints: [
            'Aged 12 years',
            'Blend of whiskies from the four corners of Scotland',
            'Of the distillery\'s labels, this is the most affordable'
          ],
          image: 'https://products2.imgix.drizly.com/ci-johnnie-walker-black-label-5daa91764fd72be6.jpeg?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20',
          value: 39.99,
          emoji: '🍼️'
        },
        {
          name: 'Laphroaig',
          hints: [
            'Single malt - aged 10 years',
            'Comes from the iodine-rich peat of Islay',
            'Also entry level with a renown smoky flavor',
            'Site says it has peanut butter fudge notes?'
          ],
          image: 'https://products2.imgix.drizly.com/ci-laphroaig-scotch-whiskey-10-year-562417958d635017.png?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20',
          value: 62.99,
          emoji: '🚱️'
        },
        {
          name: 'Glenfiddich',
          hints: [
            'Single malt aged 12 years',
            'Family owned distillery in operation for over 130 years',
            'Sherry oak casks',
            'Named for "Valley of the Deer" in Gaelic'
          ],
          image: 'https://products3.imgix.drizly.com/ci-glenfiddich-12-year-c21857cb3e5dc1ac.jpeg?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20',
          value: 50.59,
          emoji: '🦌️'
        }
      ],
      marvelvsdc: [
        {
          name: 'Spider-Man Symbiote',
          hints: [
            'Single page, not even a whole book',
            'Secret Wars kicking off the most famous villains in this title\'s history',
            'Hero first appeared in Amazing Fantasy #15 in 1962',
            'Rob\'s all time fave'
          ],
          image: 'https://storage.googleapis.com/afs-prod/media/231bd7267eef405997b9783c5ae635b5/1000.jpeg',
          value: 3360000,
          emoji: '🕸️'
        },
        {
          name: 'Batman No. 1',
          hints: [
            'Outsold first appearance of Spidey, Thor and Hulk last year',
            'Complete issue signed by author',
            'Dominant movie franchise in the 90\'s',
            'Not so much today'
          ],
          image: 'https://www.finebooksmagazine.com/sites/default/files/styles/gallery_item/public/media-images/2021-09/bat-gld.jpeg?itok=kC9X71ms',
          value: 1470000,
          emoji: '🦇️'
        }
      ],
      videocards: [
        {
          name: 'GeForce RTX 3090',
          hints: [
            'Flagship of its product line',
            'One of the most sought after electronic components in the world',
            'Known for a robust secondary market, price trackers are common',
            'The video card that costs more than a used Camry'
          ],
          image: 'https://images.stockx.com/images/NVIDIA-GeForce-RTX-3090-Graphics-Card-Founders-Edition-Black-5.jpg?fit=fill&bg=FFFFFF&w=1000&fm=avif&auto=compress&q=90&dpr=1&trim=color&updated_at=1640285070',
          value: 2341,
          emoji: '👶️'
        },
        {
          name: 'GeForce RTX 3090 - March 2021',
          hints: [
            'Same thing',
            'One year earlier'
          ],
          image: 'https://images.stockx.com/images/NVIDIA-GeForce-RTX-3090-Graphics-Card-Founders-Edition-Black-5.jpg?fit=fill&bg=FFFFFF&w=1000&fm=avif&auto=compress&q=90&dpr=1&trim=color&updated_at=1640285070',
          value: 3016,
          emoji: '👴️'
        }
      ],
      songcatalogs: [
        {
          name: 'Neil Diamond',
          hints: [
            'Retired in 2018 due to Parkinson\'s - big in the seventies',
            'Complete publishing and master recordings to Universal',
            'Covered by UB40 and Urge Overkill',
            'Every 8th inning at Fenway Park'
          ],
          image: 'https://static01.nyt.com/images/2022/02/28/multimedia/28diamond-item/28diamond-item-jumbo.jpg',
          value: 300000000,
          emoji: '🔷️'
        },
        {
          name: 'Bob Dylan',
          hints: [
            'This 80 year old artist released a full length in 2020',
            'One of the first artists that sparked these catalog sales',
            'Sold 100% of publishing to Universal',
            'Sold all his masters to Sony in January'
          ],
          image: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/A7B8/production/_115863924_dlyanpa.jpg',
          value: 500000000,
          emoji: '🎸️'
        },
        {
          name: 'Sun Records',
          hints: [
            'Not just one artist, but a whole label',
            'Legendary rock pioneer Sam Phillips in Memphis',
            'Includes Johnny Cash, Carl Perkins, Jerry Lee Lewis',
            'Does not include Elvis which were sold to Sony'
          ],
          image: 'https://sunrecords.com/wp-content/themes/sunrecords-theme/dist/images/sun-records-logo-full-no-dots_9a71981e316b6ae5c0ee.png',
          value: 30000000,
          emoji: '☀️'
        }
      ],
      movies: [
        {
          name: 'The Power of the Dog',
          hints: [
            'Directed by the only woman to be nominated twice for Best Director',
            'She also won for screenplay',
            'Features Benedict Cumberbatch, Kirsten Dunst and Jesse Plemons'
          ],
          image: 'https://m.media-amazon.com/images/M/MV5BZGRhYjE2NWUtN2FkNy00NGI3LTkxYWMtMDk4Yjg5ZjI3MWI2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg',
          value: 39000000,
          emoji: '🐶️'
        },
        {
          name: 'Nightmare Alley',
          hints: [
            'Directed by long time Hollywood critical darling',
            'He was supposed to direct The Hobbit trilogy but bailed',
            'Double Oscar winner already',
            '1946 novel released by Searchlight Pictures'
          ],
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQrRpJTA45KKAKNozSe4QmgBURMOROx-gsbbUxFcRm8OHlSCpb',
          value: 6000000,
          emoji: '🌃️'
        },
        {
          name: 'Dune',
          hints: [
            'First blockbuster from a book in a long while',
            'Grossed $400 million in a pandemic',
            'First film adaptation was by David Lynch',
            'Sequel was not locked in before release'
          ],
          image: 'https://dunenewsnet.com/wp-content/uploads/2021/08/Dune-Movie-Official-Poster-banner-feature.jpg',
          value: 165000000,
          emoji: '🏜️'
        },
        {
          name: 'West Side Story',
          hints: [
            'Fourth revival in some form in ten years',
            'The film started development in 2014',
            'Signed legendary director Steven Spielberg in 2018',
            'Only box office bomb nominated for Best Picture'
          ],
          image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ71ivNXCFjoEaRYqmGhT8fCBhXhIl_6EGQ1bmcveu7udg_VGmx',
          value: 100000000,
          emoji: '🦈️'
        }
      ],
      guitars: [
        {
          name: 'Kurt Cobain\'s Martin D-18E',
          hints: [
            'One of our favorite acoustic brands - Martin Guitar',
            'Right handed guitar with strings flipped',
            'Appeared in the most famous MTV Unplugged of all time',
            'Belonged to Nirvana lead singer'
          ],
          image: 'https://www.rollingstone.com/wp-content/uploads/2018/06/kurt-cobain-nirvana-mtv-unplugged-e3627468-cb34-46be-a8ce-39d305a356d7.jpg',
          value: 6010000,
          emoji: '🤘️'
        },
        {
          name: 'John Lennon\'s Gibson J160E',
          hints: [
            'Daily driver between 1962 and 1963',
            'The artist\'s first copy was ganked at a Christmas concert',
            'One of the first production acoustic guitars with a pickup',
            'Was used to write "I Wanna Hold Your Hand"'
          ],
          image: 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-198674-GettyImages-86203094.jpg',
          value: 2410000,
          emoji: '✌️'
        }
      ],
      sports: [
        {
          name: 'NHL',
          hints: [
            'Distant fourth in popularity in the US',
            'Suffered a period of four 1 year deals in the States',
            'Rob made their Boxee app - it was trash',
            '12 year deal with Canadian broadcaster Rogers'
          ],
          image: 'https://nhl.nbcsports.com/wp-content/uploads/sites/13/2019/05/gettyimages-1152115105-1-e1559018149200.jpg',
          value: 450000000,
          emoji: '🏒️'
        },
        {
          name: 'Indian Premier League',
          hints: [
            'Global audience of 2.5 billion fans',
            'Of the sport\'s many leagues, this has the biggest TV deal',
            'Like hockey goalies, long term deal - 10 years',
            'Youngest league of the round being founded in 2008'
          ],
          image: 'https://d1e00ek4ebabms.cloudfront.net/production/d70adea5-a906-4e43-a5d9-e7269533a375.jpg',
          value: 160000000,
          emoji: '🏏️'
        },
        {
          name: 'Formula 1',
          hints: [
            'One of the first formalized motorsports in the world',
            'Exploding in popularity due to Netflix',
            'Purchased by an American media group in 2018',
            'Legendary for speedy racecars in a dangerous places'
          ],
          image: 'https://cdn.motorsportmagazine.com/wp-content/uploads/2021/09/12150736/HAM-VER.jpg',
          value: 167000000,
          emoji: '🏎️'
        }
      ],
      boredapes: [
        {
          name: 'Jimmy Fallon\'s Bored Ape',
          hints: [
            'As seen previously on Sunday Service',
            'Procedurally generated illustrations',
            'Monetized through cryptocurrency',
            'Pushed (maybe shoved?) into the mainstream by Jimmy Fallon'
          ],
          image: 'https://lh3.googleusercontent.com/fZaOvAc52qiu4AN-oIFspJWdQpkCEBfT6oQJfVNSRj5XfAjgumPGemaNMBqagy4BhJfqUB5jwKwvodJF77Bvxzu-ynG4QsQ_LdLwKQ=w600',
          value: 317794.18,
          emoji: '🙊️'
        },
        {
          name: 'Paris Hilton\'s Bored Ape',
          hints: [
            'Jimmy was not alone in this cringe pump-and-dump',
            'Claimed to be early to the party, this NFT is later in the series',
            'Actually lost 14% of value since purchase'
          ],
          image: 'https://lh3.googleusercontent.com/GFfKZR2pZg-6_wRpUx5UZqd6LTV9oqLGZbsgGgdcE96MbbDydX3pA_xjXTJDWXiD_8dKfHCQtfel2nKIUvngO10UJ0-hTszLdj9SQg=w600',
          value: 356169.72,
          emoji: '🙈️'
        }
      ]
    }
  }
}
</script>

<style lang='scss'>
html {
  font-size: 36px;
}
</style>
