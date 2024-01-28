import { makeGrid } from "./lib/minesweeper";

function App() {
  const grid = makeGrid(10, 10, 4);

  return (
    <div className="grid grid-cols-10 grid-rows-10 w-64">
      {grid.map((cell, i) => (
        <div key={i}>{cell === -1 ? "💣" : cell === 0 ? "◽️" : cell}</div>
      ))}
    </div>
  );
}

export default App;
