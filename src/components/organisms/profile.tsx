import Nametag from '@/components/molecules/nametag';
import ProfileContent from '@/components/molecules/profileContent';
import ProfileImage from '@/components/atoms/profileImage';
import summary from '@/assets/images/summary.png';
import {IProfile} from '@/models/profile.model';

function Profile({
  image,
  alt,
  alias,
  name,
  value = 0,
  setValue,
  list,
  setList,
}: IProfile) {
  return (
    <div
      className="h-[586px] w-[366px] bg-no-repeat px-11"
      style={{
        borderImageSource: `url(${summary})`,
        borderImageSlice: '120 0 fill',
        borderImageRepeat: 'stretch',
        borderWidth: '120px 0',
      }}
    >
      <ProfileImage
        image={image}
        alt={alt}
        name={name}
        value={value}
        setValue={setValue}
        list={list}
        setList={setList}
      />
      <Nametag alias={alias} name={name} value={value} />

      <ProfileContent list={list} />
    </div>
  );
}

export default Profile;
