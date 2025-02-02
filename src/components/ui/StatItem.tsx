type StatItemProps = {
    number: string;
    text: string;
  };
  

function StatItem ({ number, text }: StatItemProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-bold text-green-600">{number}</span>
      <p className="text-gray-600">{text}</p>
    </div>
  );
  };

  export default StatItem;