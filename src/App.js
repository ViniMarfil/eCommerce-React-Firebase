import Hero from "./components/Hero";
import Header from "./components/Header";
import useLocalStorage from "use-local-storage";

function App() {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <div className={"min-h-screen w-full bg-gradient-to-b from-cyan-600 to-blue-400 "+ theme}>
      <Header theme={theme} switchTheme={switchTheme}/>
      <Hero />
    </div>
  );
}

export default App;
