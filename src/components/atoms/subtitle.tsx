import btn from '@/assets/images/btn.png';

interface ITitle {
  text: string;
}

function Subtitle({text}: ITitle) {
  return (
    <h2
      className="mt-1.5 px-3 py-1.5 text-xs font-bold uppercase leading-none tracking-widest text-[#7a7669] sm:text-sm"
      style={{
        borderImageSource: `url(${btn})`,
        borderImageSlice: '0 30 fill',
        borderImageRepeat: 'stretch',
        borderWidth: '0 30px',
      }}
    >
      {text}
    </h2>
  );
}

export default Subtitle;
