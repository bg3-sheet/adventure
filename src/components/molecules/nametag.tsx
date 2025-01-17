import Heart from '@/components/atoms/heart';
import line from '@/assets/images/line.png';
import {INametag} from '@/models/profile.model';

function Nametag({alias, name, value = 0}: INametag) {
  return (
    <div>
      <p className="text-sm uppercase leading-7 text-[#7a7669] [&:not(:first-child)]:mt-6">
        {alias}
      </p>
      <h4 className="scroll-m-20 text-2xl font-semibold">{name}</h4>

      <Heart value={value} />

      <img className="mx-auto block" src={line} alt="구분선" />
    </div>
  );
}

export default Nametag;
