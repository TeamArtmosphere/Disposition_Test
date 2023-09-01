import { atom } from 'recoil';

export const answerData = atom({
  key: 'answer',
  default: {
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
  },
});
