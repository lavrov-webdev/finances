import { Providers } from "./Providers.tsx";
import { RootRouter } from "./components/router";
import { useAuthStore } from "./components/auth";
import { useEffect, useState } from "react";

function App() {
  const authInit = useAuthStore((store) => store.init);
  const [isIniting, setIsIniting] = useState(true);
  useEffect(() => {
    const init = async () => {
      setIsIniting(true);
      await authInit();
      setIsIniting(false);
    };
    init();
  }, [authInit]);
  return isIniting ? (
    //TODO сделать красивый лоудер для приложения
    <div>Loading</div>
  ) : (
    <Providers>
      <RootRouter />
      <div></div>
    </Providers>
  );
}

export default App;
