

import { atom} from 'recoil';


export const contentState = atom({
  key: 'contentState',
  default: [],
});

// atoms/ContentTriggerAtom.ts

export const TriggerState = atom<number>({
  key: 'contentTriggerState',
  default: 0,
});

export const shareContent =atom({
  key : "shareContent",
  default : []
}) 
