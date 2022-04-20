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

const SelectSourcePage = () => {
	const [companies, setCompanies] = useState<Company[]>();
	const [processing, setProcessing] = useState<boolean>(false);
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
	const [queryData, setQueryData] = useState<Company[]>();
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		setQueryData(companies);
	}, [isDataLoaded]);

	useEffect(() => {
		if (searchValue !== "") {
			const newCompanies = companies?.filter((company) => {
				return company.getName
					.toLowerCase()
					.includes(searchValue.toLowerCase());
			});
			setQueryData(newCompanies);
		} else {
			setQueryData(companies);
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
			setCompanies(
				fetchedData?.sort((a, b) => {
					if (a.getName > b.getName) return 1;
					else if (a.getName < b.getName) return -1;
					else return 0;
				})
			);
		} catch (err) {
			console.log("error", err);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleHeartButton = (id: number) => {
		let newCompanies: Company[] | undefined = companies?.map((company) => {
			if (company.getId === id) {
				company.setIsFavorite = !company.getIsFavorite;
				return company;
			}
			return company;
		});

		setCompanies(
			newCompanies?.sort((a, b) => {
				if (a.getName > b.getName) return 1;
				else if (a.getName < b.getName) return -1;
				else return 0;
			})
		);

		if (searchValue !== "") {
			const newCompanies = companies?.filter((company) => {
				return company.getName
					.toLowerCase()
					.includes(searchValue.toLowerCase());
			});
			setQueryData(newCompanies);
		} else {
			setQueryData(companies);
		}
	};

	return (
		<PageContainer>
			<FixedTopBar title="Select source." leftButton={topbarLeftButton} />
			<FixedMiddleBodyWithVerticalScroll>
				{queryData && (
					<>
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
					</>
				)}
			</FixedMiddleBodyWithVerticalScroll>
			{!isDataLoaded && (
				<FixedBottomPominentButton
					processing={processing}
					title="Test / Debug"
					onClick={handleTestDebug}
				/>
			)}
		</PageContainer>
	);
};

export default SelectSourcePage;
