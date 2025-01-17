import Profile from '@/components/organisms/profile';
import {fetchApprovals, fetchInspirations} from '@/firebase';
import {useEffect, useState} from 'react';
import {IInspiration} from '@/models/profile.model';
import TitleBox from '@/components/molecules/titleBox';

// 가이드: 'p1.jpg'를 P1 프로필 이미지명과 확장자로 변경
import p1 from '@/assets/images/p1.jpg';
// 가이드: 'p2.png'를 P2 프로필 이미지명과 확장자로 변경
import p2 from '@/assets/images/p2.png';

// 가이드: 영문 이름을 쓸 경우, KR을 EN으로 모두 변경 (profileImage.tsx 파일과 동일)

function Home() {
  const TITLE = import.meta.env.VITE_APP_TITLE;
  const SUBTITLE = import.meta.env.VITE_APP_SUBTITLE;

  const P1 = import.meta.env.VITE_APP_P1;
  const P2 = import.meta.env.VITE_APP_P2;

  const P1_NAME_KR = import.meta.env.VITE_APP_P1_KR;
  const P2_NAME_KR = import.meta.env.VITE_APP_P2_KR;

  const P1_NAME_ALIAS = import.meta.env.VITE_APP_P1_ALIAS;
  const P2_NAME_ALIAS = import.meta.env.VITE_APP_P2_ALIAS;

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
          alt={`${P1_NAME_KR} 프로필 사진`}
          alias={P1_NAME_ALIAS}
          name={P1_NAME_KR}
          value={p1Approval}
          setValue={setP1Approval}
          list={p1List}
          setList={setP1List}
        />
        <Profile
          image={p2}
          alt={`${P2_NAME_KR} 프로필 사진`}
          alias={P2_NAME_ALIAS}
          name={P2_NAME_KR}
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
