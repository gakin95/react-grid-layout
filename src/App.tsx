import { useState } from "react";
import Container from "./components/container";
import BackgroundModal from "./components/modal/bg";

const App = () => {
  const [theme, setTheme] = useState({
    backgroundColor: "#fff",
  });
  const [openBg,setOpenBg] = useState(false);
  const closeBgModal = () => {
    setOpenBg(false)
  }
  const handleBackgroundChange = (color:string) => {
    setTheme((prev) => ({ ...prev, backgroundColor: color }));
    setOpenBg(true)
  };
  const handleOpenBackgroundModal = () => {
    setOpenBg(true)
  };
  return (
    <div>
      <BackgroundModal open={openBg} onClose={closeBgModal} backgroundColor={theme.backgroundColor} handleBackgroundChange={handleBackgroundChange}/>
      <Container
        backgroundColor={theme.backgroundColor}
        handleOpenBackgroundModal={handleOpenBackgroundModal}
      />
    </div>
  );
};

export default App;
