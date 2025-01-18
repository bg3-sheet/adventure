/* eslint-disable @typescript-eslint/no-explicit-any */
import {cn} from '@/lib/utils';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {IImage} from '@/models/profile.model';
import {auth, provider, db} from '@/firebase';
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore';
import {signInWithPopup} from 'firebase/auth';
import {useUserStore} from '@/stores/userStore';
import {Separator} from '@/components/ui/separator';
import {Menu} from '@/components/atoms/contextMenu';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import PoDialog from '@/components/organisms/poDialog';

function ProfileImage({
  image,
  alt,
  name,
  value,
  setValue,
  list,
  setList,
}: IImage) {
  const P1_ID = import.meta.env.VITE_APP_P1_ID;
  const P2_ID = import.meta.env.VITE_APP_P2_ID;

  const P1 = import.meta.env.VITE_APP_P1;
  const P2 = import.meta.env.VITE_APP_P2;

  const P1_NAME = import.meta.env.VITE_APP_P1_NAME;
  const P2_NAME = import.meta.env.VITE_APP_P2_NAME;

  const P1_LOGIN = import.meta.env.VITE_APP_P1_LOGIN;
  const P2_LOGIN = import.meta.env.VITE_APP_P2_LOGIN;
  const P1_APPROVAL = import.meta.env.VITE_APP_P1_APPROVAL;
  const P2_APPROVAL = import.meta.env.VITE_APP_P2_APPROVAL;
  const P1_INSPIRATION = import.meta.env.VITE_APP_P1_INSPIRATION;
  const P2_INSPIRATION = import.meta.env.VITE_APP_P2_INSPIRATION;

  const {uid, setUid} = useUserStore();

  const [v, setV] = useState('');
  const [background, setBackground] = useState('');
  const [event, setEvent] = useState('');

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isApprovalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [isInspirationDialogOpen, setInspirationDialogOpen] = useState(false);

  const handleLogin = async (n: string) => {
    try {
      await signInWithPopup(auth, provider).then(res => {
        const tmp = res.user.providerData[0].uid;

        if (tmp !== P1_ID && tmp !== P2_ID) {
          throw new Error('접근 권한이 없습니다.');
        }

        setUid(tmp);

        if (P1_ID !== P2_ID) {
          console.log(`${P1_ID} ${P2_ID}`);
          const loginCharacter = tmp === P1_ID ? P1_NAME : P2_NAME;

          if (n !== loginCharacter) {
            if (loginCharacter === P2_NAME)
              throw new Error(P1_LOGIN ? P1_LOGIN : '접근 권한이 없습니다.');
            else throw new Error(P2_LOGIN ? P2_LOGIN : '접근 권한이 없습니다.');
          }
        }
      });
    } catch (e: any) {
      if (e.message === '접근 권한이 없습니다.') alert('접근 권한이 없습니다.');
      else if (e.message === P1_LOGIN || e.message == P2_LOGIN)
        alert(e.message);
      else alert('로그인에 실패했습니다.');
    }
  };

  const validateRequest = (n: string, m1: string, m2: string) => {
    if (uid !== P1_ID && uid !== P2_ID)
      throw new Error('접근 권한이 없습니다.');

    if (P1_ID !== P2_ID) {
      const loginCharacter = uid === P1_ID ? P1_NAME : P2_NAME;

      if (n !== loginCharacter) {
        if (loginCharacter === P2_NAME)
          throw new Error(m1 ? m1 : '접근 권한이 없습니다.');
        else throw new Error(m2 ? m2 : '접근 권한이 없습니다.');
      }
    }
  };

  const editApproval = async (n: string) => {
    try {
      validateRequest(n, P1_APPROVAL, P2_APPROVAL);

      const vv = parseInt(v.trim());

      if (!v.trim()) throw new Error('수정된 호감도를 입력해야 합니다.');
      if (isNaN(vv)) throw new Error('숫자만 입력해야 합니다.');

      const approvalRef = doc(db, 'approvals', 'values');

      await updateDoc(approvalRef, {
        [n === P1_NAME ? P1 : P2]: vv,
      });

      setValue(vv);
      setV('');
      setApprovalDialogOpen(false);
      setPopoverOpen(false);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const addInspiration = async (n: string) => {
    try {
      validateRequest(n, P1_INSPIRATION, P2_INSPIRATION);

      if (!background.trim() || !event.trim())
        throw new Error('배경과 사건을 모두 입력해야 합니다.');

      const doc = await addDoc(
        collection(
          db,
          n === P1_NAME ? `${P1}Inspirations` : `${P2}Inspirations`,
        ),
        {background, event, createdAt: new Date()},
      );

      const tmp = {
        id: doc.id,
        background: background,
        event: event,
      };

      setList([tmp, ...list]);
      setBackground('');
      setEvent('');
      setInspirationDialogOpen(false);
      setPopoverOpen(false);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <img
          className="mx-auto block w-1/5 rounded-full border-[1.5px] border-gold"
          src={image}
          alt={alt}
          style={{
            marginTop: '-65px',
          }}
        />
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-lg border-[1.5px] border-[#7a7669] bg-primary p-1 text-gold shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        )}
        align="end"
        sideOffset={-22}
      >
        <PoDialog
          open={isApprovalDialogOpen}
          onOpenChange={setApprovalDialogOpen}
          menuText="호감도 수정"
          name={name}
          title={`♥\u00A0\u00A0\u00A0APPROVAL`}
          buttonText="수정"
          buttonOnClick={editApproval}
        >
          <Input
            type="text"
            value={v}
            onChange={e => setV(e.target.value)}
            placeholder={value.toString()}
          />
        </PoDialog>

        <PoDialog
          open={isInspirationDialogOpen}
          onOpenChange={setInspirationDialogOpen}
          menuText="영감 추가"
          name={name}
          title={`◆\u00A0\u00A0\u00A0INSPIRATION`}
          buttonText="추가"
          buttonOnClick={addInspiration}
        >
          <Input
            type="text"
            value={background}
            onChange={e => setBackground(e.target.value)}
            placeholder="배경(예: 뱀파이어, 학자, ...)"
          />
          <Input
            type="text"
            value={event}
            onChange={e => setEvent(e.target.value)}
            placeholder="사건"
          />
        </PoDialog>

        <Separator
          className={`${uid !== P1_ID && uid !== P2_ID ? '' : 'hidden'} my-1.5`}
        />

        <Menu
          text={`${uid !== P1_ID && uid !== P2_ID ? '로그인' : ''}`}
          onClick={handleLogin}
          name={name}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ProfileImage;
