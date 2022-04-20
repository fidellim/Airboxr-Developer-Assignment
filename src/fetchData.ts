import Company from "./company";

const getToken = async (): Promise<string | undefined> => {
	const authHeaders = new Headers();
	authHeaders.append(
		"Cookie",
		"orionRefreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImludGVybkBhaXJib3hyLmNvbSIsImlhdCI6MTY1MDM1NDY4NywiZXhwIjoxNjUwOTU5NDg3fQ.xtgE7geVb2i42FXz2RAI6oMd9HH5Z5JrnBUh4fLSnq0"
	);

	const authFormdata = new FormData();

	const authRequestOptions: RequestInit = {
		method: "POST",
		headers: authHeaders,
		body: authFormdata,
		redirect: "follow",
	};

	const EMAIL: string = process.env.REACT_APP_EMAIL as string;
	const PASSWORD: string = process.env.REACT_APP_PASSWORD as string;

	try {
		const response = await fetch(
			`https://api.airboxr.com/auth/loginWithEmail?email=${EMAIL}&password=${PASSWORD}`,
			authRequestOptions
		);
		const result = await response.text();
		const { accessToken } = JSON.parse(result);
		return accessToken;
	} catch (err) {
		console.log("error", err);
		return undefined;
	}
};

const fetchData = async (): Promise<Company[] | undefined> => {
	const accessToken = await getToken();
	const dataHeaders = new Headers();

	dataHeaders.append("Authorization", `Bearer ${accessToken}`);
	dataHeaders.append(
		"Cookie",
		"orionRefreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImludGVybkBhaXJib3hyLmNvbSIsImlhdCI6MTY1MDM1NDY4NywiZXhwIjoxNjUwOTU5NDg3fQ.xtgE7geVb2i42FXz2RAI6oMd9HH5Z5JrnBUh4fLSnq0"
	);

	const dataRequestOptions: RequestInit = {
		method: "GET",
		headers: dataHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			"https://api.airboxr.com/data/dataSources",
			dataRequestOptions
		);
		const result = await response.text();
		const parseResult = JSON.parse(result);
		let companies = parseResult.map((company: Company) => {
			const { getId, getName } = company;
			return new Company(getId, getName);
		});
		companies.push(new Company(22, "Google Sheets"));
		return companies;
	} catch (err) {
		console.log("error", err);
		return undefined;
	}
};

export default fetchData;
