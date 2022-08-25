import React, { FC, useState } from "react";
import "../css/App.css";
import { Apps } from "./types";
import GuideMap from "./components/GuideMap";
import Poc from "./components/poc/Poc";
import MultiPolygon from "./components/multi-polygon/MultiPolygon";
import { POC_EXAMPLE_PROPS } from "./resources/constants";

const App: FC = () => {
    const [app, setApp] = useState<Apps | null>(null);

    return (
        <div className="root-container">
            <div className="App">
                {app ? (
                    <>
                        {app === Apps.Guide && <GuideMap />}
                        {app === Apps.PoC && <Poc {...POC_EXAMPLE_PROPS} />}
                        {app === Apps.MultiPolygonTest && <MultiPolygon />}
                        <button type="button" onClick={() => setApp(null)}>
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
                            <button type="button" onClick={() => setApp(Apps.MultiPolygonTest)}>
                                MultiPolygon test
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <footer style={{ textAlign: "center", fontSize: 12, padding: 5 }}>
                <a href="https://www.flaticon.com/free-icons/screenshot" title="screenshot icons">
                    Screenshot icons created by Uniconlabs - Flaticon
                </a>
            </footer>
        </div>
    );
};

export default App;
