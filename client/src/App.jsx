import { v4 as uuidv4 } from 'uuid';
import "./App.css";

function App() {
  const handleGeneratePdf = () => {
    window.open(`http://localhost:4000/proposal/${uuidv4()}`);
  };

  return (
    <div className="App">
      <button type="button" onClick={handleGeneratePdf}>
        Generate PDF
      </button>
    </div>
  );
}

export default App;
