import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
	PageContainer,
	FixedTopBar,
	FixedMiddleBodyWithVerticalScroll,
	FixedBottomPominentButton,
	TopbarBackButton,
	CardCompanyList,
	SearchBarWithHeader,
} from "./layout-components";
import _ from "lodash";
import fetchData from "./fetchData";
import Company from "./company";

let myCompanies: Company[] = [
	new Company(22, "Google Sheets"),
	new Company(222, "Google Ads"),
	new Company(2222, "Facebook Ads"),
	new Company(21, "Notion"),
	new Company(20, "Mailchimp"),
	new Company(23, "Google Analytics"),
	new Company(19, "Hubspot"),
	new Company(28, "Hubspot Marketing"),
];

myCompanies = myCompanies.sort((a, b) => {
	if (a.getName > b.getName) return 1;
	else if (a.getName < b.getName) return -1;
	else return 0;
});

const SelectSourcePage = () => {
	const [companies, setCompanies] = useState<Company[]>();
	const [processing, setProcessing] = useState<boolean>(false);
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
	const [queryData, setQueryData] = useState<Company[]>();
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		setCompanies(myCompanies);
	}, []);

	useEffect(() => {
		setQueryData(myCompanies);
	}, [companies]);

	useEffect(() => {
		if (searchValue !== "") {
			const newCompanies = myCompanies.filter((company) => {
				return company.getName
					.toLowerCase()
					.includes(searchValue.toLowerCase());
			});
			setQueryData(newCompanies);
		} else {
			setQueryData(myCompanies);
		}
	}, [searchValue]);

	const topbarLeftButton: TopbarBackButton = {
		type: "back",
		onClick: () => console.log("Clicked back"),
	};

	const handleTestDebug = async () => {
		try {
			setProcessing(true);
			const fetchedData = await fetchData();
			setProcessing(false);
			setIsDataLoaded(true);
			setCompanies(fetchedData);
			setQueryData(fetchedData);
		} catch (err) {
			console.log("error", err);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleHeartButton = (id: number) => {
		let ans: Company[] = myCompanies.map((company) => {
			if (company.getId === id) {
				company.setIsFavorite = !company.getIsFavorite;
				return company;
			}
			return company;
		});

		myCompanies = ans;
		console.log(ans?.map((a) => `${a.getIsFavorite}`));
		// setCompanies(ans);
		if (searchValue !== "") {
			console.log(searchValue);
			const newCompanies = myCompanies.filter((company) => {
				return company.getName
					.toLowerCase()
					.includes(searchValue.toLowerCase());
			});
			setQueryData(newCompanies);
		} else {
			setQueryData(myCompanies);
		}
	};

	return (
		<PageContainer>
			<FixedTopBar title="Select source." leftButton={topbarLeftButton} />
			<FixedMiddleBodyWithVerticalScroll>
				{queryData && (
					<Box display="flex" flexWrap="wrap" flexDirection="column">
						<SearchBarWithHeader
							headingTitle="Below is a list of the sources you have connected. Please choose
							the data source you would like to import data from."
							placeholder="Search..."
							searchValue={searchValue}
							handleSearch={handleSearch}
						/>
						<CardCompanyList
							queryData={queryData}
							handleHeartButton={handleHeartButton}
						/>
					</Box>
				)}
			</FixedMiddleBodyWithVerticalScroll>
			{/* {!isDataLoaded && (
				<FixedBottomPominentButton
					processing={processing}
					title="Test / Debug"
					onClick={handleTestDebug}
				/>
			)} */}
		</PageContainer>
	);
};

export default SelectSourcePage;
