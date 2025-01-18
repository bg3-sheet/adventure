import Profile from '@/components/organisms/profile';
import {fetchApprovals, fetchInspirations} from '@/firebase';
import {useEffect, useState} from 'react';
import {IInspiration} from '@/models/profile.model';
import TitleBox from '@/components/molecules/titleBox';

// 가이드: 'p1.jpg'를 P1 프로필 이미지명(대소문자 무관, 한 단어)과 확장자(소문자)로 변경 (예: astarionProfile.jpg, AktmxkflDhs123.png)
import p1 from '@/assets/images/p1.jpg';

// 가이드: 'p2.png'를 P2 프로필 이미지명(대소문자 무관, 한 단어)과 확장자(소문자)로 변경 (예: astarionProfile.jpg, AktmxkflDhs123.png)
import p2 from '@/assets/images/p2.png';

function Home() {
  const TITLE = import.meta.env.VITE_APP_TITLE;
  const SUBTITLE = import.meta.env.VITE_APP_SUBTITLE;

  const P1 = import.meta.env.VITE_APP_P1;
  const P2 = import.meta.env.VITE_APP_P2;

  const P1_NAME = import.meta.env.VITE_APP_P1_NAME;
  const P2_NAME = import.meta.env.VITE_APP_P2_NAME;

  const P1_ALIAS = import.meta.env.VITE_APP_P1_ALIAS;
  const P2_ALIAS = import.meta.env.VITE_APP_P2_ALIAS;

  const [p1Approval, setP1Approval] = useState(0);
  const [p2Approval, setP2Approval] = useState(0);
  const [p1List, setP1List] = useState<IInspiration[]>([]);
  const [p2List, setP2List] = useState<IInspiration[]>([]);

  useEffect(() => {
    fetchApprovals(setP1Approval, setP2Approval);
    fetchInspirations(`${P1}Inspirations`, setP1List);
    fetchInspirations(`${P2}Inspirations`, setP2List);
  }, [P1, P2]);

  return (
    <main className="flex flex-row flex-wrap items-center justify-center gap-x-32 gap-y-6">
      <TitleBox title={TITLE} subtitle={SUBTITLE} />

      <div className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-4">
        <Profile
          image={p1}
          alt={`${P1_NAME} 프로필 사진`}
          alias={P1_ALIAS}
          name={P1_NAME}
          value={p1Approval}
          setValue={setP1Approval}
          list={p1List}
          setList={setP1List}
        />
        <Profile
          image={p2}
          alt={`${P2_NAME} 프로필 사진`}
          alias={P2_ALIAS}
          name={P2_NAME}
          value={p2Approval}
          setValue={setP2Approval}
          list={p2List}
          setList={setP2List}
        />
      </div>
    </main>
  );
}

export default Home;
