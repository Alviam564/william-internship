import { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
    const [now, setNow] = useState(Date.now())
    
    useEffect(() => {
      const interval = setInterval(() => {
        setNow(Date.now());
      }, 1000)

      return () => clearInterval(interval)
    }, []);

    const timeLeft = expiryDate - now;

    if (timeLeft <= 0) return null
      
    const pad = (n) => n.toString().padStart(2)
    let hours = Math.floor(timeLeft / (1000 * 60 * 60))
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    return(
      <div className="de_countdown">
        <span>{`${pad(hours)}h ${pad(minutes)}m ${(seconds)}s`}</span>
      </div>
    )
}
export default Countdown