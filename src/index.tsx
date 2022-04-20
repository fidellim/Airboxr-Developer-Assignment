import React from "react";
import { createRoot } from "react-dom/client";
import SelectSourcePage from "./SelectSourcePage";
import RootComponent from "./RootComponent";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
	<RootComponent>
		<SelectSourcePage />
	</RootComponent>
);
