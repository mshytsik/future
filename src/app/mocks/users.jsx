import shytsik from '../assets/img/images/shytsik.jpg';
import skiff from '../assets/img/images/avatar.jpg';
import cover from '../assets/img/images/profile-cover.jpg';

const users = [
  {
    id: 1,
    type: 'person',
    nickname: 'shytsik',
    username: 'Maksim Shytsik',
    photo: shytsik,
    email: 'max.shitik@gmail.com',
    password: '1234567890',
    details: {
      area: 'Software Developer',
      location: 'Lithuania, Vilnius',
      description: {
        short: 'Product Designer in Lithuania, Vilnius, He/Him',
        full: 'Huge fan of React and JavaScript. Help companies translate business objectives into solutions building beautiful, complex and highly optimized products. I thrive in highly collaborative environments. Always eager to learn something new and to expand my knowledge and practical experience. Collaborated with project managers and customers to select ambitious but realistic ways to solve the tasks.',
      },
    },
    contacts: {
      email: 'admin@future.com',
      website: 'https://future.com',
      phone: '+370 (649) 88 888',
      socials: {
        telegram: 'https://social.com',
        facebook: 'https://social.com',
        twitter: 'https://social.com',
        linkedin: 'https://social.com',
      },
    },
    registerDate: '2023-11-09',
    profileCover: cover,
    isVerified: true,
    isModerator: true,
    medalsIcons: ['🥷', '👻', '🏌️‍♂️', '🥇', '⛳'],
    favorite: [1, 2, 3, 4, 5, 6, 7],
    subscriptions: [
      {
        userId: 2,
        actionDate: '2023-11-09',
      },
    ],
    bookmarks: [],
  },
  {
    id: 2,
    type: 'company',
    nickname: 'skiff',
    username: 'Skiff',
    photo: skiff,
    email: 'skiff@gmail.com',
    password: '1234567890',
    details: {
      area: 'Product Company',
      location: 'Lithuania, Vilnius',
      employees: 'more than 100',
      birthday: '2005-10-10',
      description: {
        short: 'Product Company in Lithuania, Vilnius, He/Him',
        full: 'Huge fan of UX/UI and graphic design,\nvisual data structuring. Help\ncompanies translate business objectives into solutions building beautiful, complex and highly optimized interface with Figma, Photoshop, and Adobe After Effects. I thrive in highly collaborative environments. Experienced in design production in FinTech, Crypto, Startups, E-commerce.',
      },
    },
    contacts: {
      email: 'admin@skiff.com',
      website: 'https://skiff.com',
      phone: '+370 (649) 00 000',
      socials: {
        telegram: 'https://social.com',
        facebook: 'https://social.com',
        twitter: 'https://social.com',
        linkedin: 'https://social.com',
      },
    },
    registeredEmployees: [1, 2],
    registerDate: '2023-11-09',
    profileCover: cover,
    isVerified: true,
    isModerator: false,
    medalsIcons: ['🥷', '👻', '🏌️‍♂️', '🥇', '⛳'],
    favorite: [],
    subscriptions: [
      {
        userId: 1,
        actionDate: '2023-11-09',
      },
    ],
    bookmarks: [],
  },
];

export default users;
