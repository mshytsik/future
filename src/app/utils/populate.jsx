import { setDate } from './dateTime';

export const populateUser = () => ({
  type: 'person',
  nickname: '',
  username: '',
  email: '',
  password: '',
  photo: null,
  details: {
    area: '',
    location: '',
    employees: '',
    birthday: '',
    description: {
      short: '',
      full: '',
    },
  },
  contacts: {
    email: '',
    website: '',
    phone: '',
    socials: {
      telegram: '',
      facebook: '',
      twitter: '',
      linkedin: '',
    },
  },
  registeredEmployees: [1, 2, 3, 4, 5],
  registerDate: '',
  profileCover: '',
  isVerified: false,
  isModerator: false,
  favorite: [],
  subscriptions: [],
});

export const populatePost = () => ({
  type: 'post',
  dateTime: setDate(Date.now()),
  tags: [],
  minutesToRead: '',
  image: '',
  title: '',
  description: '',
  stats: { liked: [] },
  editorBlocks: [],
});

export const populateConference = () => ({
  type: 'conference',
  dateTime: { start: '', end: '' },
  tags: [],
  minutesToRead: '',
  image: '',
  title: '',
  description: '',
  details: {
    format: 'online',
    address: '',
    conferenceLink: '',
    broadcastLink: '',
    listeners: '',
  },
  stats: { liked: [] },
  editorBlocks: [],
  speakers: [],
});
