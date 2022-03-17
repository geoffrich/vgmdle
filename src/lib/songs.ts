interface SongData {
	name: string;
	game: string;
	url: string;
}

interface Song extends SongData {
	fullName: string;
}

const partialSongs: SongData[] = [
	// TODO: this one has silence at the start. Might need to add an offset.
	{
		name: 'Opening ~ Bombing Mission',
		game: 'Final Fantasy VII',
		url: 'https://fi.zophar.net/soundfiles/playstation-psf/final-fantasy-vii/102a%20Opening%20~%20Bombing%20Mission.mp3'
	},
	{
		name: 'Battle 1',
		game: 'Chrono Trigger',
		url: 'https://fi.zophar.net/soundfiles/nintendo-snes-spc/chrono-trigger/112%20Battle%201.mp3'
	},
	{
		name: 'Searching for Friends',
		game: 'Final Fantasy VI',
		url: 'https://fi.zophar.net/soundfiles/nintendo-snes-spc/final-fantasy-vi/307%20Searching%20for%20Friends.mp3'
	},
	{
		name: 'Main Theme',
		game: 'Super Mario 64',
		url: 'https://fi.zophar.net/soundfiles/nintendo-64-usf/super-mario-64/05%20Main%20Theme.mp3'
	},
	{
		name: 'Hydrocity Zone Act 1',
		game: 'Sonic the Hedgehog 3',
		url: 'https://fi.zophar.net/soundfiles/sega-mega-drive-genesis/sonic-the-hedgehog-3/05%20-%20Hydrocity%20Zone%20Act%201.mp3'
	},
	{
		name: 'Green Hill Zone',
		game: 'Sonic the Hedgehog',
		url: 'https://fi.zophar.net/soundfiles/sega-mega-drive-genesis/sonic-the-hedgehog/02%20-%20Green%20Hill%20Zone.mp3'
	},
	{
		name: 'Your Name, Please',
		game: 'EarthBound',
		url: 'https://fi.zophar.net/soundfiles/nintendo-snes-spc/earthbound/005a%20Your%20Name%2C%20Please.mp3'
	},
	{
		name: 'The Man With the Machine Gun',
		game: 'Final Fantasy VIII',
		url: 'https://fi.zophar.net/soundfiles/playstation-psf/final-fantasy-viii/119%20The%20Man%20With%20the%20Machine%20Gun.mp3'
	},
	{
		name: 'To Zanarkand',
		game: 'Final Fantasy X',
		url: 'https://fi.zophar.net/soundfiles/playstation2-psf2/final-fantasy-x/102%20In%20Zanarkand.mp3'
	},
	{
		name: 'Aquatic Ambiance',
		game: 'Donkey Kong Country',
		url: 'https://fi.zophar.net/soundfiles/nintendo-snes-spc/donkey-kong-country/07%20Aquatic%20Ambiance.mp3'
	}
];

const songs: Song[] = partialSongs.map((s) => ({
	...s,
	fullName: `${s.game} - ${s.name}`
}));

export default songs;
