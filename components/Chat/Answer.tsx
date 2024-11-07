import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Answer = ({
  content,
  role,
}: {
  content: string | undefined;
  role: string;
}) => {

  return (
    <div
      className={`p-3 rounded-lg ${role === "user"
        ? "bg-black text-white float-right max-w-[85%]"
        : "flex-1 bg-transparent text-black"
        }`}
    >
      <ReactMarkdown className="text-sm" rehypePlugins={[rehypeRaw]}>
        {content || ""}
      </ReactMarkdown>
    </div>
  )
};

export default Answer;
