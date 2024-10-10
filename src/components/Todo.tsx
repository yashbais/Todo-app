import React,{useState} from "react";
import TodoContent from './TodoContent'
import { QueryClient, QueryClientProvider  } from '@tanstack/react-query';

const Todo: React.FC = () => {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TodoContent/>
    </QueryClientProvider>

  );
};

export default Todo;
