import image1 from '../assets/img/images/article-1.jpg';
import image2 from '../assets/img/images/article-2.jpg';
import image3 from '../assets/img/images/article-3.jpg';
import image4 from '../assets/img/images/article-4.jpg';
import image5 from '../assets/img/images/article-5.jpg';
import image6 from '../assets/img/images/article-6.jpg';
import image7 from '../assets/img/images/article-7.jpg';
import image8 from '../assets/img/images/article-8.jpg';
import image9 from '../assets/img/images/article-9.jpg';
import image10 from '../assets/img/images/article-10.jpg';
import image11 from '../assets/img/images/article-11.jpg';
import image12 from '../assets/img/images/article-12.jpg';
import image13 from '../assets/img/images/article-13.jpg';
import image14 from '../assets/img/images/article-14.jpg';
import image15 from '../assets/img/images/article-15.jpg';
import image16 from '../assets/img/images/article-16.jpg';
import image17 from '../assets/img/images/article-17.jpg';
import image18 from '../assets/img/images/article-18.jpg';
import image19 from '../assets/img/images/article-19.jpg';
import image20 from '../assets/img/images/article-20.jpg';
import image21 from '../assets/img/images/article-21.jpg';
import image22 from '../assets/img/images/article-22.jpg';
import image23 from '../assets/img/images/article-23.jpg';
import image24 from '../assets/img/images/article-24.jpg';
import image25 from '../assets/img/images/article-25.jpg';
import image26 from '../assets/img/images/article-26.jpg';
import image27 from '../assets/img/images/article-27.jpg';
import image28 from '../assets/img/images/article-28.jpg';
import image29 from '../assets/img/images/article-29.jpg';
import image30 from '../assets/img/images/article-30.jpg';
import image31 from '../assets/img/images/article-31.jpg';
import image32 from '../assets/img/images/article-32.jpg';
import image33 from '../assets/img/images/article-33.jpg';
import image34 from '../assets/img/images/article-34.jpg';
import image35 from '../assets/img/images/article-35.jpg';
import image36 from '../assets/img/images/article-36.jpg';
import image37 from '../assets/img/images/article-37.jpg';
import image38 from '../assets/img/images/article-38.jpg';

const articles = [
  {
    id: 1,
    type: 'post',
    status: 'publish',
    dateTime: '2024-01-09T15:05:00+00:00',
    author: 1,
    category: 2,
    tags: [1, 3],
    minutesToRead: 5,
    image: image1,
    title: 'Whales are swimming into altcoins заплывают в альткоины',
    description:
      "Bitcoin's bullish rally has not fooled the “whales,” investors who own large amounts of the cryptocurrency. At the first significant correction, they began to be transferred to altcoins. But not on the Ether.",
    stats: {
      liked: [
        { userId: 1, actionDate: '2024-01-12' },
        { userId: 2, actionDate: '2024-01-13' },
      ],
    },
  },
  {
    id: 2,
    type: 'post',
    status: 'publish',
    dateTime: '2023-12-25T12:00:00+00:00',
    author: 2,
    category: 1,
    tags: [1, 3],
    minutesToRead: 5,
    image: image2,
    title: 'Bad management or the threat of AI?',
    description:
      'Gaming companies will carry out another wave of layoffs. What is the reason: wrong management decisions or the threat from artificial intelligence?',
    stats: { liked: [{ userId: 1, actionDate: '2023-11-09' }] },
  },
  {
    id: 3,
    type: 'post',
    status: 'pending',
    dateTime: '2023-10-25T12:00:00+00:00',
    author: 2,
    category: 1,
    tags: [1, 3],
    minutesToRead: 10,
    image: image3,
    title: 'The Walking Dead goes to the blockchain',
    description:
      'RPG-стратегии «The Walking Dead: All-Stars» и «Summoners War: Chronicles» от Com2uS будут переведены на блокчейн-платформу Oasys.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 4,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-26T12:00:00+00:00',
    author: 2,
    category: 5,
    tags: [1, 3],
    minutesToRead: 3,
    image: image4,
    title: 'Technical analysis from AI 26/10/2023',
    description:
      'Bitcoin broke its uptrend in the short term, indicating even stronger gains.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 5,
    type: 'post',
    status: 'publish',
    dateTime: '2023-12-10T15:05:00+00:00',
    author: 1,
    category: 2,
    tags: [1, 3],
    minutesToRead: 4,
    image: image5,
    title: 'Bitcoin: There is a record! And not the only one!',
    description:
      'Despite the fact that Bitcoin has not yet reached its all-time high of $69,000, it has already broken value records in many world currencies.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 6,
    type: 'conference',
    status: 'publish',
    dateTime: {
      start: '2023-10-05T15:05:00+00:00',
      end: '2023-10-06T18:00:00+00:00',
    },
    author: 1,
    category: 2,
    tags: [1, 3],
    minutesToRead: 4,
    image: image20,
    title: 'Synopsis Summit',
    description:
      'Synopsis is a large-scale international summit and gathering of the crypto industry, discussing a wide range of blockchain, web3, metaverse, GameFi, NFT and other crypto-related topics. This is suitable for both industry professionals and those simply familiar with cryptography and blockchain technology.',
    details: {
      format: 'offline',
      address: 'Istanbul, Turkey',
      conferenceLink: '#',
      broadcastLink: '#',
      listeners: 1000,
    },
    speakers: [
      { id: 1, status: 'speaker', topics: ['Topic #1', 'Topic #2'] },
      { id: 2, status: 'speaker', topics: ['Topic #3', 'Topic #4'] },
    ],
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 7,
    type: 'conference',
    status: 'publish',
    dateTime: {
      start: '2023-11-12T15:05:00+00:00',
      end: '2023-12-21T18:00:00+00:00',
    },
    author: 1,
    category: 2,
    tags: [1, 3],
    minutesToRead: 4,
    image: image21,
    title: 'Web3 Galaxy Conference',
    description:
      'Web3 Galaxy is a series of events around the world where members of the Web3 industry gather for collaboration and networking. This time the event will take place in Dubai.',
    details: {
      format: 'online',
      address: 'Dubai, UAE',
      conferenceLink: 'https://future.com',
      broadcastLink: '#',
      listeners: 1000,
    },
    speakers: [],
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 8,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 7,
    tags: [1, 3],
    minutesToRead: 5,
    image: image6,
    title: 'AI also wants to eat!',
    description:
      'An unexpected aspect of the development of AI was presented by authoritative expert Sam Altman, CEO of OpenAI: there will be no progress in AI until we learn to generate electricity from thermonuclear fusion.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 9,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-14T12:00:00+00:00',
    author: 1,
    category: 7,
    tags: [1, 3],
    minutesToRead: 5,
    image: image7,
    title: 'Deepfakes are becoming more realistic and dangerous',
    description:
      'The head of the SEC closely monitors not only the crypto industry, but also AI. On the one hand, Gensler approves of the use of AI, on the other hand, he warns about the dangers of neural networks, in particular deepfakes.',
    stats: { liked: [{ userId: 2, actionDate: '2023-11-09' }] },
  },
  {
    id: 10,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-15T12:00:00+00:00',
    author: 1,
    category: 1,
    tags: [1, 3],
    minutesToRead: 10,
    image: image8,
    title: 'Artificial intelligence is an assistant, not an autopilot',
    description:
      'Activision Blizzard is exploring image-generating artificial intelligence to help develop games.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 11,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-16T15:05:00+00:00',
    author: 1,
    category: 7,
    tags: [1, 3],
    minutesToRead: 5,
    image: image9,
    title: 'ChatGPT Almighty: is it true?',
    description:
      'Despite the rave reviews from many users about the ChatGPT chatbot, there are things that artificial intelligence cannot do. Real-time information is one of the problems of a neural network.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 12,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-17T12:00:00+00:00',
    author: 2,
    category: 3,
    tags: [1, 3],
    minutesToRead: 5,
    image: image10,
    title: 'Football with AI and NFT',
    description:
      'The International Football Federation, known to everyone as FIFA, has been experimenting with metaverses, blockchain and NFTs for a long time. Now FIFA has decided to test its strength in Web3 gaming.',
    stats: { liked: [{ userId: 1, actionDate: '2023-11-09' }] },
  },
  {
    id: 13,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-18T12:00:00+00:00',
    author: 2,
    category: 2,
    tags: [1, 3],
    minutesToRead: 10,
    image: image11,
    title: 'Crypto market: China versus the Fed',
    description:
      "The Fed's preservation of interest rates caused the cryptocurrency market to collapse less than expected. The reason is the fall of Chinese indices.",
    stats: {
      liked: [{ userId: 2, actionDate: '2023-11-09' }],
    },
  },
  {
    id: 14,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-19T12:00:00+00:00',
    author: 2,
    category: 7,
    tags: [1, 3],
    minutesToRead: 3,
    image: image12,
    title: 'Belarus Fin&Tech Hub held a meetup on asset tokenization',
    description:
      'What the speakers discussed and the video from the meetup in this material',
    stats: {
      liked: [{ userId: 1, actionDate: '2023-11-09' }],
    },
  },
  {
    id: 15,
    type: 'post',
    status: 'publish',
    dateTime: '2023-12-20T15:05:00+00:00',
    author: 1,
    category: 2,
    tags: [1, 3],
    minutesToRead: 4,
    image: image13,
    title: 'ETFs have been launched, but Bitcoin is falling. Why?',
    description:
      'The BTC rate on the day the spot ETF shares appeared in the US reached $49,000, after which it began to decline, and today is trading around $42,000. Experts suggest that price consolidation is taking place.',
    stats: {
      liked: [{ userId: 1, actionDate: '2023-11-09' }],
    },
  },
  {
    id: 16,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-21T12:00:00+00:00',
    author: 2,
    category: 2,
    tags: [1, 3],
    minutesToRead: 3,
    image: image14,
    title: 'What will happen to altcoins “after” the Bitcoin ETF?',
    description:
      'In the first week of the year, only Bitcoin rose among the major crypto coins, continuing the period of growth. What will happen to altcoin rates if Bitcoin exchange-traded funds are approved?',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 17,
    type: 'post',
    status: 'publish',
    dateTime: '2023-12-22T15:05:00+00:00',
    author: 1,
    category: 4,
    tags: [1, 3],
    minutesToRead: 4,
    image: image15,
    title: 'Mining in Uzbekistan. How to get a license?',
    description:
      'To form a unified position on the part of miners, a number of companies, including BitRiver, Intelion Mine, Promminer, Stella and Sibstroykapital, announced the creation of the Industrial Mining Association.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 18,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-23T15:05:00+00:00',
    author: 1,
    category: 0,
    tags: [1, 3],
    minutesToRead: 5,
    image: image16,
    title: 'What is TradingView?',
    description:
      'TradingView.com is a reliable graphical analytical tool for financial markets.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 19,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-24T12:00:00+00:00',
    author: 2,
    category: 0,
    tags: [1, 3],
    minutesToRead: 5,
    image: image17,
    title: 'What are token standards? Types of cryptocurrency standards',
    description:
      "Let's talk about what a token standard is. We will write about the reasons for using and the need for technology. Let's take a closer look at the most popular token rules in the community.",
    stats: { liked: [{ userId: 2, actionDate: '2023-11-09' }] },
  },
  {
    id: 20,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-27T12:00:00+00:00',
    author: 2,
    category: 0,
    tags: [1, 3],
    minutesToRead: 10,
    image: image18,
    title: 'Unifi Protocol DAO Review',
    description:
      'Unifi Protocol DAO is a decentralized autonomous organization protocol that creates a bridge between blockchains, allowing users to exchange digital assets without intermediaries.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 21,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-28T12:00:00+00:00',
    author: 2,
    category: 0,
    tags: [1, 3],
    minutesToRead: 3,
    image: image19,
    title: 'What is Tor Browser?',
    description:
      'Tor Browser is a specialized web browser that provides users with anonymity and security when browsing websites.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 22,
    type: 'post',
    status: 'publish',
    dateTime: '2023-12-29T15:05:00+00:00',
    author: 2,
    category: 3,
    tags: [1, 4],
    minutesToRead: 4,
    image: image22,
    title: 'NFT thief met with retribution',
    description:
      'In September 2021, a Moroccan citizen stole about half a million dollars worth of NFTs from the OpenSea marketplace.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 23,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-27T12:00:00+00:00',
    author: 2,
    category: 5,
    tags: [1, 3],
    minutesToRead: 3,
    image: image23,
    title: 'Technical analysis from AI 27/10/2023',
    description:
      'Bitcoin (BTC) price fell 7.74% early in the Asian session, briefly falling to $40,400. The move resulted in the liquidation of nearly $200 million in positions, according to CoinGlass data.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 24,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-28T12:00:00+00:00',
    author: 2,
    category: 5,
    tags: [1, 3],
    minutesToRead: 3,
    image: image24,
    title: 'Technical analysis from AI 28/10/2023',
    description:
      'Cryptocurrencies continue the “bullish race”: this week BTC broke the $44,000 level, but was unable to gain a foothold and rolled back to the $43,100-43,700 range.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 25,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-29T12:00:00+00:00',
    author: 2,
    category: 5,
    tags: [1, 3],
    minutesToRead: 3,
    image: image25,
    title: 'Technical analysis from AI 29/10/2023',
    description:
      'Following news that Binance CEO Changpeng Zhao pleaded guilty to criminal charges and resigned, the price of Bitcoin briefly fell below $36,000 and tested the MA21 moving average on the 1 day time frame.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 26,
    type: 'post',
    status: 'publish',
    dateTime: '2023-10-30T12:00:00+00:00',
    author: 2,
    category: 5,
    tags: [1, 3],
    minutesToRead: 3,
    image: image26,
    title: 'Technical analysis from AI 30/10/2023',
    description:
      'The release of economic news last week led to increased volatility, according to the previous forecast. The price of Bitcoin could not stay within the accumulation of $38,380-$37,735, therefore, as planned, Bitcoin showed a strong decline to the level of $35,165, and tested the previous accumulation zone, from where Bitcoin made an impulse towards $38,000.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 27,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 7,
    tags: [1, 3],
    minutesToRead: 5,
    image: image27,
    title: 'Solana releases a new crypto smartphone. What do you think?',
    description:
      'Solana Mobile launched sales of its first crypto smartphone, Saga, in May 2023. The other day the company announced the opening of pre-orders for the second version of the Web3 phone. What is known about it?',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 28,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 1,
    tags: [1, 3],
    minutesToRead: 5,
    image: image28,
    title: 'Web3 gaming: no need to rush?',
    description:
      'Developers are hesitant to launch games with in-game currencies and other monetization methods that Web3 offers for good and justifiable reasons.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 29,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 1,
    tags: [1, 3],
    minutesToRead: 5,
    image: image29,
    title: 'Pokemons with guns are rushing to the TOP',
    description:
      'Unexpectedly for everyone, the indie project Palworld became the most popular game in January. Why did it manage to win the hearts of the players?',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 30,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 1,
    tags: [1, 3],
    minutesToRead: 5,
    image: image30,
    title: 'The Best Blockchain Games of 2024',
    description:
      'This year should be decisive for Web3 gaming. Typically, the development cycle of a video game takes several years, so the most technically complex and large-scale AAA projects are only now approaching release.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 31,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 3,
    tags: [1, 3],
    minutesToRead: 5,
    image: image31,
    title: 'The NFT market is changing, but not dying',
    description:
      'NFT prices fell in 2023, causing trading volume to drop to $12.6 billion. However, the number of NFTs and new wallets sold increased by 445% and 166%, respectively.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 32,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 3,
    tags: [1, 3],
    minutesToRead: 5,
    image: image32,
    title: 'Mickey Mouse Leads the NFT Market',
    description:
      "The new leaders of the NFT market are several NFT collections related to the animation legend Mickey Mouse. Disney's exclusive copyright for this character expired on January 1st.",
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 33,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 3,
    tags: [1, 3],
    minutesToRead: 5,
    image: image33,
    title: 'NFT: what was, what will be',
    description:
      'The past year will go down in the history of NFTs with the launch of Bitcoin Ordinals, an attempt by the American regulator SEC to recognize them as securities, and confusion with royalties for creators.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 34,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 4,
    tags: [1, 3],
    minutesToRead: 5,
    image: image34,
    title: 'Coinbase continues to demand clarity from the SEC',
    description:
      'Coinbase is not bowing to pressure from the SEC, but continues to demand clarity in the rules for handling cryptocurrency.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 35,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 4,
    tags: [1, 3],
    minutesToRead: 5,
    image: image35,
    title: 'Could MiCA become a standard for crypto regulation?',
    description:
      'Last week, the European Parliament approved the MiCA (Markets in crypto-assets) law on regulating the crypto industry. The EU has been working towards this for a long time, and finally the decision has been made.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 36,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 4,
    tags: [1, 3],
    minutesToRead: 5,
    image: image36,
    title:
      'The European Union will adopt a law on cryptocurrencies. So what is next?',
    description:
      'Amendments to European crypto legislation may become necessary even before the law comes into force.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 37,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 4,
    tags: [1, 3],
    minutesToRead: 5,
    image: image37,
    title: 'Canadians reach an agreement with the regulator',
    description:
      'Around the world, relations between regulators and cryptocurrency companies are becoming increasingly tense. But in Canada, things seem to be moving toward consensus.',
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
  {
    id: 38,
    type: 'post',
    status: 'publish',
    dateTime: '2023-11-13T15:05:00+00:00',
    author: 1,
    category: 0,
    tags: [1, 3],
    minutesToRead: 5,
    image: image38,
    title:
      'What is a fork in the blockchain (cryptocurrency)? Is it possible to make money on it?',
    description:
      "Let's look at how changes occur in the blockchain and add examples of soft and hard forks. Let's add information about ways to earn money and the problem of reliability of forks.",
    stats: {
      liked: [
        { userId: 1, actionDate: '2023-11-09' },
        { userId: 2, actionDate: '2023-11-09' },
      ],
    },
  },
];

export default articles;
