import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import {Menu} from '@/components/atoms/contextMenu';
import {Button} from '@/components/ui/button';
import {IDialog} from '@/models/profile.model';

function PoDialog({
  open,
  onOpenChange,
  menuText,
  name,
  title,
  children,
  buttonText,
  buttonOnClick,
}: IDialog) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="w-full">
        <Menu text={menuText} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-gold">{title}</DialogTitle>

          <DialogDescription className="flex flex-col gap-2">
            {children}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-1">
          <Button
            className="border-primary bg-[#7a7669] font-semibold text-foreground hover:bg-gold"
            onClick={() => buttonOnClick(name)}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PoDialog;
