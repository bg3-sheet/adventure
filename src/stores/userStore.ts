import {IUser} from '@/models/user.model';
import {create} from 'zustand';

export const useUserStore = create<IUser>(set => ({
  uid: '',
  setUid: newUid => set(() => ({uid: newUid})),
}));
