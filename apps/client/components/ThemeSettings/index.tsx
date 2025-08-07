import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useUser } from "../../store/session";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { useSidebar } from "@/shadcn/ui/sidebar";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

export default function ThemeSettings() {
  const { user } = useUser();
  const token = getCookie("session");

  const [theme, setTheme] = useState("");

  const { state } = useSidebar();

  useEffect(() => {
    // Retrieve the saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = (selectedTheme) => {
    // Update the class on the root element
    document.documentElement.className = selectedTheme;
    // Update state and save the theme in localStorage
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div>
      <main className="relative">
        <div className="flex justify-center">
          <Select onValueChange={toggleTheme} value={theme}>
            <SelectTrigger className={`${state === "expanded" ? "w-[280px]" : "hidden"}`}>
              {state === "expanded" ? (
                <SelectValue placeholder="Select a theme" />
              ) : (
                <Moon className="size-4" />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Themes</SelectLabel>
                <SelectItem value="light">Peppermint Light</SelectItem>
                <SelectItem value="dark">Peppermint Dark</SelectItem>
                <SelectItem value="solarized-light">Solarized Light</SelectItem>
                {/* <SelectItem value="solarized-dark">Solarized Dark</SelectItem> */}
                <SelectItem value="forest">Forest</SelectItem>
                <SelectItem value="material-light">Material Light</SelectItem>
                {/* <SelectItem value="material-dark">Material Dark</SelectItem> */}
                <SelectItem value="github-light">GitHub Light</SelectItem>
                {/* <SelectItem value="github-dark">GitHub Dark</SelectItem> */}
                {/* <SelectItem value="high-contrast-dark">
                  High Contrast Dark
                </SelectItem> */}
                {/* <SelectItem value="pastel">Pastel</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </main>
    </div>
  );
}
