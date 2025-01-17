import icon from '@/assets/images/heart.png';
import {INumber} from '@/models/profile.model';

function Heart({value = 0}: INumber) {
  return (
    <div className="my-4 flex flex-col items-center justify-center gap-1">
      <img className="block w-9" src={icon} alt="호감도 아이콘" />
      <p className="text-lg text-gold">{value}</p>
    </div>
  );
}

export default Heart;
