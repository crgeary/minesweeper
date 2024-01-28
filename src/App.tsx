import { Game } from "./components/game";

function App() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <Game rows={10} columns={15} bombCount={10} />
    </div>
  );
}

export default App;
