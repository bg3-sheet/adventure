import {initializeApp} from 'firebase/app';
import {TwitterAuthProvider, getAuth} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import {IInspiration} from '@/models/profile.model';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementid: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const provider = new TwitterAuthProvider();
export const auth = getAuth(app);

export const fetchInspirations = async (
  collectionName: string,
  setList: React.Dispatch<React.SetStateAction<IInspiration[]>>,
) => {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy('createdAt', 'desc'),
    );
    const querySnapshot = await getDocs(q);

    const inspirations: IInspiration[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      background: doc.data().background,
      event: doc.data().event,
    }));

    setList(inspirations);
  } catch (e) {
    console.error(e);
  }
};

export const fetchApprovals = async (
  setP1Approval: React.Dispatch<React.SetStateAction<number>>,
  setP2Approval: React.Dispatch<React.SetStateAction<number>>,
) => {
  try {
    const docRef = doc(db, 'approvals', 'values');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 가이드: astarion을 VITE_APP_P1의 내용으로 변경
      setP1Approval(docSnap.data().astarion);
      // 가이드: tav를 VITE_APP_P2의 내용으로 변경
      setP2Approval(docSnap.data().tav);
    } else {
      setP1Approval(0);
      setP2Approval(0);
    }
  } catch (e) {
    console.error(e);
  }
};
