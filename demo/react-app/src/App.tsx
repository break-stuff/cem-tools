import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RadioButton, RadioGroup } from "lit-app/dist/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <RadioGroup
        className={"test-1 test-2"}
        variants="primary"
        complexUnion={"large"}
        complex={"multi"}
        test-attr={"test"}
        data={{ name: "test" }}
        external2="value5"
        data-test-id={"test"}
        external="value1"
        disabled={false}
        myAttribute="test"
        my-attribute={"zinger"}
      >
        <RadioButton value=""></RadioButton>
        <RadioButton></RadioButton>
        <RadioButton></RadioButton>
      </RadioGroup>
    </>
  );
}

export default App;
