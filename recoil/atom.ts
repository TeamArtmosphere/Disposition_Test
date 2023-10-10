import { atom } from 'recoil';

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

export const eventUserUID = atom<string | null>({
  key: 'uid',
  default: null,
});

export type selectionsType = {
  selectionId: number | null;
  value: string | null;
};

export const selectionsAtom = atom<selectionsType[]>({
  key: 'selections_array',
  default: [],
});

export const pablosCodeAtom = atom<string | null>({
  key: 'pablos_code',
  default: null,
});
