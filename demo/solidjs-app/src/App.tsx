import type { Component } from "solid-js";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <radio-group></radio-group>
    </div>
  );
};

export default App;
