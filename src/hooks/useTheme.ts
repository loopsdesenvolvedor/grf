import { useThemeStore } from "@/store/themeStore";

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();

  const toogleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };

  const getSaveTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    if (savedTheme) {
      document.body.classList.add(savedTheme);
    } else {
      document.body.classList.add("light");
    }
  };

  return {
    theme,
    toogleTheme,
    getSaveTheme,
  };
};
