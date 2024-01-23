import { makeGrid } from "./lib/minesweeper";

function App() {
  const grid = makeGrid(10, 10, 10);

  console.log(grid);

  return (
    <table>
      {grid.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => (
            <td key={j}>{cell === -1 ? "💣" : cell === 0 ? "◽️" : cell}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default App;
