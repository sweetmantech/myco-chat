import Image from "next/image";

const Suggestions = () => {
  return (
    <div className="rounded-full overflow-hidden">
      <Image src="/myco-logo.png" alt="Mushroom logo" width={80} height={80} />
    </div>
  );
};

export default Suggestions;
