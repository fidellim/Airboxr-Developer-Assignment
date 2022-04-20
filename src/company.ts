export default class Company {
	private id: number;
	private name: string;
	private imageLink: string;
	private isFavorite: boolean;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		this.name === "Google Ads"
			? (this.imageLink = `./google-logo.png`)
			: (this.imageLink = `./${name
					.toLowerCase()
					.split(" ")
					.join("-")}-logo.png`);
		this.isFavorite = false;
	}

	public get getId() {
		return this.id;
	}

	public get getName() {
		return this.name;
	}

	public get getImageLink() {
		return this.imageLink;
	}

	public get getIsFavorite() {
		return this.isFavorite;
	}

	public set setIsFavorite(isFavorite: boolean) {
		this.isFavorite = isFavorite;
	}
}
