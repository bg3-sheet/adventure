import {ITitle} from '@/models/title.modal';
import PageTitle from '@/components/atoms/pageTitle';
import Subtitle from '@/components/atoms/subtitle';

function TitleBox({title, subtitle}: ITitle) {
  const ACT = import.meta.env.VITE_APP_ACT;
  const DATE = import.meta.env.VITE_APP_DATE;

  const calculateDaysPassed = () => {
    const [y, m, d] = DATE.split('-');
    const start = new Date(new Date(y, m - 1, d).toLocaleDateString('ko-KR'));
    const today = new Date(new Date().toLocaleDateString('ko-KR'));

    return Math.round(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl uppercase leading-none tracking-tight text-gold md:text-4xl">
        ACT {ACT}, D+{calculateDaysPassed()}
      </h3>
      <PageTitle text={title} />
      <Subtitle text={subtitle} />
    </div>
  );
}

export default TitleBox;
