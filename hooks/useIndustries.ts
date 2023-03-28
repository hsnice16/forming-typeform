import { useEffect, useState } from "react";

export function useIndustries() {
  const [industries, setIndustries] = useState<string[]>([]);
  const industryResourceURL =
    "https://gist.githubusercontent.com/gxt-admin/758c1973293f54322c054bbd8119e80c/raw/7e819e47a60217130347743fd43ae91c3e3e1ede/industries.txt";

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(industryResourceURL);
        const data = await response.text();
        setIndustries(data.split("\n"));
      } catch (e) {
        //
      }
    })();
  }, []);

  return { industries };
}
