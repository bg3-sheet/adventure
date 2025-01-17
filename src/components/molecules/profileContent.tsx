import {IInspirationList} from '@/models/profile.model';
import {ScrollArea} from '@/components/ui/scroll-area';

function ProfileContent({list}: IInspirationList) {
  return (
    <div className="pt-6 text-left text-[#7a7669]">
      <p
        className={`${list.length === 0 ? 'mt-[6px]' : 'hidden'} text-center text-sm text-muted-foreground`}
      >
        아직 영감을 얻기 전입니다.
      </p>

      <ScrollArea className="profile-list h-[11.2rem] pr-2">
        <ul className="list-none text-gold [&>*:not(:first-child)]:text-[#7a7669] [&>li]:mt-1">
          {list.map(l => (
            <li key={l.id}>
              {l.background}: {l.event}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}

export default ProfileContent;
