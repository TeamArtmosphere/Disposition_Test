import { atom } from 'recoil';

export const answerData = atom({
  key: 'answer',
  default: {
    gender: 1,
    age: '',
    address: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
  },
});

export const eventUserType = atom({
  key: 'event_user_type',
  default: {
    gender: 1,
    age: 20,
    address: '은평구,',
    eventType: 1,
  },
});
