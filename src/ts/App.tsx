import React, { FC, useState } from "react";
import "../css/App.css";
import { Apps } from "./types";
import GuideMap from "./components/GuideMap";
import Poc from "./components/poc/Poc";
import { examplePropsPoc } from "./resources/constants";

const App: FC = () => {
    const [app, setApp] = useState<Apps | null>(null);

    return (
        <div className="App">
            {app ? (
                <>
                    {app === Apps.Guide && <GuideMap />}
                    {app === Apps.PoC && <Poc {...examplePropsPoc} />}
                    <button type="button" style={{ marginTop: 50 }} onClick={() => setApp(null)}>
                        Back
                    </button>
                </>
            ) : (
                <div className="App">
                    <h1>Select app</h1>
                    <div>
                        <button type="button" onClick={() => setApp(Apps.Guide)}>
                            Guide
                        </button>
                        <button type="button" onClick={() => setApp(Apps.PoC)}>
                            PoC
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
