import {cn} from '@/lib/utils';
import {IMenu} from '@/models/profile.model';

export function Menu({text, onClick, name}: IMenu) {
  return (
    <p
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none hover:bg-gold hover:text-primary focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        text ? '' : 'hidden',
      )}
      onClick={() => name && onClick && onClick(name)}
    >
      {text}
    </p>
  );
}
