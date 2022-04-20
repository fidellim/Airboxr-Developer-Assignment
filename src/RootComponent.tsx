import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
	palette: {
		primary: {
			main: "#F86164",
		},
		secondary: {
			main: "#2E9B5D",
		},
	},
	typography: {
		fontSize: 14,
		fontFamily: "Barlow",
		h4: {
			fontStyle: "normal",
			fontWeight: "bold",
			fontSize: "14px",
			lineHeight: "17px",
		},
		h3: {
			fontStyle: "normal",
			fontWeight: 300,
			fontSize: "20px",
			lineHeight: "24px",
		},
		h2: {
			fontStyle: "normal",
			fontWeight: 300,
			fontSize: "30px",
			lineHeight: "36px",
		},
		h1: {
			fontStyle: "normal",
			fontWeight: 300,
			fontSize: "40px",
			lineHeight: "48px",
		},
		body1: {
			fontStyle: "normal",
			fontWeight: "normal",
			fontSize: "14px",
			lineHeight: "17px",
			textAlign: "left",
		},
		subtitle1: {
			fontStyle: "medium",
			fontWeight: "bold",
			fontSize: "12px",
			lineHeight: "12px",
			textAlign: "left",
		},
		subtitle2: {
			fontStyle: "normal",
			fontWeight: "normal",
			fontSize: "12px",
			lineHeight: "12px",
			textAlign: "left",
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				variant: "contained",
				color: "primary",
			},
		},
		MuiLinearProgress: {
			defaultProps: {
				color: "secondary",
			},
		},
		MuiTextField: {
			variants: [
				{
					props: { variant: "outlined" },
					style: {
						borderRadius: 5,
					},
				},
			],
		},
	},
	shape: {
		borderRadius: 0,
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});

export default function RootComponent(props: { children?: React.ReactNode }) {
	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
