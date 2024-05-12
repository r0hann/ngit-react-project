import "./App.css";
import Card from "./container/Card";
import SnapScrollContainer from "./public/SnapScrollContainer";

function App() {

  return (
    <div className="app">
      <SnapScrollContainer>
        {[...Array(10)].map((_, index) => (
          <Card key={index} />
        ))}
      </SnapScrollContainer>
    </div>
  );
}

export default App;
