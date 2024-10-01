import { useCsrfToken } from "@/packages/shared/src/hooks";
import { useChat as useAiChat } from "ai/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const useChat = () => {
  const csrfToken = useCsrfToken();
  const accountId = "3664dcb4-164f-4566-8e7c-20b2c93f9951";
  const queryClient = useQueryClient();
  const { address } = useAccount();
  console.log(address);
  const { messages, input, handleInputChange, handleSubmit } = useAiChat({
    api: `/api/chat`,
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body: {
      accountId,
      address,
    },
    onError: console.error,
    onFinish: () => {
      void queryClient.invalidateQueries({
        queryKey: ["credits", accountId],
      });
    },
  });

  return { messages, input, handleInputChange, handleSubmit };
};

export default useChat;
