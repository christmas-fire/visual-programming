import React, { useState, useRef } from "react";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null); 
  const intervalRef = useRef(null);

  const fetchData = () => {
    setLoading(true);

    // ms
    const totalTime = 5000;
    const intervalTime = 100;
    const steps = totalTime / intervalTime;

    let currentStep = progress * steps / 100;

    intervalRef.current = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(intervalRef.current);
        setLoading(false);
        fetch("https://fakeapi.extendsclass.com/countries")
          .then((response) => response.json())
          .then((result) => setData(result))
          .catch((error) => console.error("Ошибка загрузки данных:", error));
        return;
      }

      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);
    }, intervalTime);
  };

  const handleCancel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>ProgressBar App</h1>
      {!loading && !data && (
        <button className="start-button" onClick={fetchData}>
          Начать
        </button>
      )}
      {(loading || progress > 0) && (
        <ProgressBar
          title="Загрузка данных"
          progress={progress}
          onCancel={handleCancel}
        />
      )}
      {data && (
        <div className="data-container">
          <h2>Данные успешно загружены:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
