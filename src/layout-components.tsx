import {
	Box,
	IconButton,
	Typography,
	Button,
	Card,
	CardMedia,
	Grid,
	CircularProgress,
	TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import Company from "./company";

export interface TopbarBackButton {
	type: "back";
	onClick: () => void | Promise<void>;
}

interface TopBarProps {
	leftButton?: TopbarBackButton;
	title: string;
}

export const FixedTopBar: React.FunctionComponent<TopBarProps> = (props) => {
	return (
		<Box
			sx={{
				px: 3,
				top: 0,
				right: 0,
				bottom: "auto",
				left: 0,
				position: "fixed",
				height: 60,
				backgroundColor: "#fff",
				zIndex: 999,
			}}
			pt={1}
			display="flex"
			flexDirection="row"
			alignItems="center"
		>
			{props.leftButton ? (
				<IconButton
					edge="start"
					color="secondary"
					aria-label="menu"
					onClick={props.leftButton.onClick}
				>
					<ArrowBackIcon />
				</IconButton>
			) : undefined}
			<Typography variant="h1">{props.title}</Typography>
		</Box>
	);
};

interface BottomButtonProps {
	processing?: boolean;
	onClick: () => void | Promise<void>;
	title: string;
}

export const FixedBottomPominentButton: React.FunctionComponent<
	BottomButtonProps
> = (props) => {
	return (
		<Box
			sx={{
				px: 3,
				pb: 2,
				height: 50,
				top: "auto",
				right: 0,
				bottom: 0,
				left: 0,
				position: "fixed",
			}}
			display="flex"
			flexDirection="column"
			alignItems="center"
		>
			{props.processing || false ? (
				<CircularProgress />
			) : (
				<Button sx={{ height: 50, width: "100%" }} onClick={props.onClick}>
					{props.title}
				</Button>
			)}
		</Box>
	);
};

interface FixedMiddleBodyWithVerticalScrollProps {
	children?: React.ReactNode;
}

export const FixedMiddleBodyWithVerticalScroll: React.FunctionComponent<
	FixedMiddleBodyWithVerticalScrollProps
> = (props) => {
	return (
		<Box
			sx={{
				px: 0,
				pt: 10,
			}}
			display="flex"
			flexWrap="wrap"
			flexDirection="column"
		>
			{props.children}
		</Box>
	);
};

interface PageContainerProps {
	children?: React.ReactNode;
}

export const PageContainer: React.FunctionComponent<PageContainerProps> = (
	props
) => {
	return (
		<Box display="flex" flexDirection="column">
			{props.children}
		</Box>
	);
};

interface SearchBarWithHeaderProps {
	headingTitle: string;
	placeholder: string;
	searchValue: string;
	handleSearch(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const SearchBarWithHeader: React.FunctionComponent<
	SearchBarWithHeaderProps
> = (props) => {
	return (
		<>
			<Typography variant="h3" sx={{ px: 2.5 }}>
				{props.headingTitle}
			</Typography>
			<Box
				sx={{
					width: 500,
					maxWidth: "100%",
					pt: 9,
					pb: 3,
					"& fieldset": {
						borderRadius: 1.5,
					},
				}}
				display="flex"
				alignSelf="center"
			>
				<TextField
					fullWidth
					id="outlined-basic"
					label={props.placeholder}
					variant="outlined"
					color="success"
					value={props.searchValue}
					onChange={props.handleSearch}
				/>
			</Box>
		</>
	);
};

interface CardCompanyProps {
	title: string;
	imageLink: string;
	key: number;
	isFavorite: boolean;
	id: number;
	handleHeartButton(id: number): void;
}

export const CardCompany: React.FunctionComponent<CardCompanyProps> = (
	props
) => {
	return (
		<Card
			sx={{
				width: 275,
				maxWidth: 275,
				p: 1,
				backgroundColor: "#f9f9f9",
				boxShadow: "0px 0px 0px transparent",
			}}
		>
			<Typography variant="h3" component="div">
				{props.title.toUpperCase()}
			</Typography>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				sx={{ height: 65 }}
			>
				<Box
					sx={{
						height: "auto",
						width: 65,
						py: 1,
						borderWidth: "5px",
					}}
				>
					<CardMedia
						component="img"
						image={props.imageLink}
						alt={props.title}
					/>
				</Box>
			</Box>
			<Box display="flex" alignItems="center" justifyContent="end">
				{!props.isFavorite && (
					<FavoriteBorderIcon
						sx={{ cursor: "pointer" }}
						onClick={() => props.handleHeartButton(props.id)}
					/>
				)}
				{props.isFavorite && (
					<FavoriteIcon
						sx={{ cursor: "pointer" }}
						onClick={() => props.handleHeartButton(props.id)}
					/>
				)}
			</Box>
		</Card>
	);
};

interface CardCompanyListProps {
	queryData: Company[];
	handleHeartButton(id: number): void;
}

export const CardCompanyList: React.FunctionComponent<CardCompanyListProps> = (
	props
) => {
	return (
		<Grid
			container
			rowSpacing={2.5}
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{ width: "100%" }}
		>
			{props.queryData
				.sort((a, b) => {
					if (a.getIsFavorite === b.getIsFavorite) return 0;
					if (a.getIsFavorite) return -1;
					return 1;
				})
				.map((company: Company) => {
					return (
						<Grid
							item
							xs={10}
							sm={8}
							md={6}
							lg={4}
							xl={3}
							display="flex"
							justifyContent="center"
							alignItems="center"
							key={company.getId + company.getName}
						>
							<CardCompany
								title={company.getName}
								imageLink={company.getImageLink}
								isFavorite={company.getIsFavorite}
								key={company.getId}
								id={company.getId}
								handleHeartButton={props.handleHeartButton}
							/>
						</Grid>
					);
				})}
		</Grid>
	);
};
