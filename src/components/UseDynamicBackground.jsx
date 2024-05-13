import { useEffect, useState } from "react"


const UseDynamicBackground = () => {
  const [backgroundClass, setBackgroundClass] = useState("");

  useEffect(() => {
    const intervalID = setInterval(() => {
      const time = new Date();
      const hours = time.getHours();
      const currentHour = hours % 24;
      const imageIndex = Math.floor(currentHour / 6);

      switch (imageIndex) {
        case 0:
          setBackgroundClass("background-image-1");
          break;
        case 1:
          setBackgroundClass("background-image-2");
          break;
        case 2:
          setBackgroundClass("background-image-3");
          break;
        case 3:
          setBackgroundClass("background-image-4");
          break;
      
      }
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return () => backgroundClass; 
};

export default UseDynamicBackground;