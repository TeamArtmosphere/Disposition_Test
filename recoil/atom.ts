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

type userDataType = {
  ageRange: number;
  gender: string;
  address: string;
  eventType: string;
};

export const eventUserType = atom<userDataType>({
  key: 'event_user_type',
  default: {
    ageRange: 0,
    gender: '',
    address: '',
    eventType: 'FESTIVAL',
  },
});

export const eventUserId = atom<number | null>({
  key: 'event_user_id',
  default: null,
});
