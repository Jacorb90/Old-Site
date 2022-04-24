const GAME_DATA = {
	di: {
		id: "di",
		title: "Distance Incremental",
		type: "main",
		url: "https://Jacorb90.github.io/DistInc.github.io/main.html",
		player: localStorage.getItem("dist-inc-saves")?JSON.parse(atob(localStorage.getItem("dist-inc-saves"))):undefined,
		lib: OmegaNum,
		endgame: OmegaNum.pow(10, 1e12),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			let um = [];
			for (let i = 0; i < data.length; i++)
				if (data[i] !== null) {
					let min = 0;
					let lambda = (x => (x[0] && x[0].every(y => data[i].modes.includes(y)) && data[i].modes.every(y => x[0].includes(y))));
					if (um.some(lambda)) {
						let i = um.findIndex(lambda);
						min = um[i][1]
						s -= min;
						um[i] = [undefined, 0];
					}
					let modeAdd = 0;
					modeAdd += (data[i].achievements?data[i].achievements.length:0)/16
					modeAdd += new OmegaNum(data[i].distance||0).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(10).toNumber();
					
					if (data[i].modes.length==0) modeAdd *= 5;
					if (data[i].modes.length==1 && (data[i].modes[0]=="hikers_dream"||data[i].modes[0]=="hard")) modeAdd *= 2;
					if (data[i].modes.length==2 && data[i].modes.every(x => x=="extreme"||x=="hard")) modeAdd *= 2;
					if (data[i].modes.length==3 && data[i].modes.includes("hikers_dream")&&data[i].modes.includes("extreme")&&data[i].modes.includes("hard")) modeAdd *= 2;
					
					if (data[i].modes.includes("easy")) modeAdd /= 2;
					if (data[i].modes.includes("aau")) modeAdd /= 4;
					if (data[i].modes.includes("absurd")) modeAdd /= 5;
					s += Math.max(modeAdd, min);

					um.push([data[i].modes, modeAdd]);
				}
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 713,
	},
	pt: {
		id: "pt",
		title: "The Prestige Tree",
		type: "main",
		url: "https://jacorb90.github.io/Prestige-Tree/",
		player: localStorage.getItem("ptr")?JSON.parse(atob(localStorage.getItem("ptr"))):undefined,
		lib: Decimal,
		endgame: Decimal.pow(10, 3.14e16),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			let keys = Object.keys(this.player||[]).filter(x => x!="set");
			for (let i = 0; i < keys.length; i++) {
				let d = data[keys[i]];
				if (d !== null) {
					let tempS = 0;
					tempS += (d.a?(d.a.achievements.length||0):0)*3
					tempS += new Decimal(d.points).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(111).toNumber();
					s = Math.max(s, tempS);
				}
			}
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 350,
	},
	ngp3c: {
		id: "ngp3c",
		title: "Antimatter Dimensions NG+++ Condensed",
		type: "main",
		url: "https://jacorb90.github.io/NG-plus-3C/",
		player: localStorage.getItem("AD_aarexModifications")?(localStorage.getItem(btoa("dsAM_"+JSON.parse(atob(localStorage.getItem("AD_aarexModifications"))).current))?JSON.parse(atob(localStorage.getItem(btoa("dsAM_"+JSON.parse(atob(localStorage.getItem("AD_aarexModifications"))).current)))):undefined):undefined,
		lib: Decimal,
		endgame: Decimal.pow(10, 202.5e15),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			s += (data.achievements?data.achievements.filter(x => x[0]!="s").length:0)/2
			s += new Decimal(data.money).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(154).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 250,
	},
	en: {
		id: "en",
		title: "Incremenergy",
		type: "side",
		url: "https://jacorb90.github.io/Incremenergy/",
		player: localStorage.getItem("exponentGoUpYay")?JSON.parse(atob(localStorage.getItem("exponentGoUpYay"))):undefined,
		lib: Decimal,
		endgame: Decimal.pow(10, 3e19),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			s += new Decimal(data.energy).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(124).toNumber();
			s += data.goals?data.goals.length:0;
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 180,
	},
	rap: {
		id: "rap",
		title: "Rapture 30",
		type: "side",
		url: "https://jacorb90.github.io/Rapture-30/",
		player: localStorage.getItem("raptureThingy")?JSON.parse(atob(localStorage.getItem("raptureThingy"))):undefined,
		lib: Decimal,
		endgame: new Decimal(30),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			s += new Decimal(data.rapture).div(this.endgame).min(1).times(67).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 67,
	},
	formula: {
		id: "formula",
		title: "The Formula",
		type: "side",
		url: "https://jacorb90.me/The-Formula/",
		player: localStorage.getItem("formula_tree_game")?JSON.parse(atob(localStorage.getItem("formula_tree_game"))):undefined,
		lib: Decimal,
		endgame: new Decimal("1e11500"),
		score() {
			let data = this.player;
			if (!data) return 0;

			let s = 0;
			s += new Decimal(data.value||0).plus(1).log(this.endgame).min(1).times(32.5).toNumber()
			s += data.goals?(data.goals.achievements.length/2):0
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 56,
	},
	uer: {
		id: "uer",
		title: "Universe Expander: Rewritten",
		type: "side",
		url: "https://jacorb90.me/UE-Rewritten/",
		player: localStorage.getItem("UErewritten")?JSON.parse(atob(localStorage.getItem("UErewritten"))):undefined,
		lib: Decimal,
		endgame: new Decimal(817),
		score() {
			let data = this.player;
			if (!data) return 0;

			let s = 0;
			s += new Decimal(data.depth||0).div(this.endgame).cbrt().min(1).times(57).toNumber()
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 57,
	},
	auto: {
		id: "auto",
		title: "The Factory of Automation",
		type: "side",
		url: "https://jacorb90.me/The-Factory-Of-Automation/",
		player: localStorage.getItem("theAutoClickGame")?JSON.parse(atob(localStorage.getItem("theAutoClickGame"))):undefined,
		lib: Decimal,
		endgame: new Decimal("e1.125e11"),
		score() {
			let data = this.player;
			if (!data) return 0;

			let s = 0;
			s += new Decimal((data.materials[0]?data.materials[0].amt:0)||0).max(1).log(this.endgame).sqrt().min(1).times(54).toNumber()
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 54,
	},
	ptc: {
		id: "ptc",
		title: "Prestige Tree: Classic",
		type: "complete",
		url: "https://jacorb90.github.io/Prestige-Tree-Classic/",
		player: localStorage.getItem("prestige-tree")?JSON.parse(atob(localStorage.getItem("prestige-tree"))):undefined,
		lib: Decimal,
		endgame: Decimal.pow(10, 1e11),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			s += new Decimal(data.points).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(80).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 80,
	},
	efv: {
		id: "efv",
		title: "Escape from Vantablack",
		type: "complete",
		url: "https://jacorb90.github.io/Escape-from-Vantablack/",
		player: localStorage.getItem("EfV")?JSON.parse(atob(localStorage.getItem("EfV"))):undefined,
		lib: Decimal,
		endgame: new Decimal(4e84),
		score() {
			let data = this.player;
			if (!data) return 0;
			
			let s = 0;
			if (data.gameOver) s += this.scoreLimit;
			else s += new Decimal(data.totalPhotons).plus(1).log10().plus(1).log(this.endgame.log10()).min(1).times(50).toNumber();
			if (isNaN(s)) s = 0;
			return Math.min(Math.floor(s), this.scoreLimit);
		},
		scoreLimit: 50,
	},
}

const OVERALL_DATA = {
	totalScore: Object.values(GAME_DATA).map(x => x.score()).reduce((a,c) => a+c),
	totalScoreLimit: Object.values(GAME_DATA).map(x => x.scoreLimit).reduce((a,c) => a+c),
}

const MAIN_GAMES = Object.values(GAME_DATA).filter(x => x.type=="main");
const SIDE_PROJECTS = Object.values(GAME_DATA).filter(x => x.type=="side");
const COMPLETED_GAMES = Object.values(GAME_DATA).filter(x => x.type=="complete");

var app;
var tabData = {
	tab: "main", // don't we love vue reactivity making things more complicated than they should be :)
};

function loadVue() {
	app = new Vue({
	    el: "#app",
	    data: {
			GAME_DATA,
			MAIN_GAMES,
			SIDE_PROJECTS,
			COMPLETED_GAMES,
			OVERALL_DATA,
			tabData,
			player,
			getUpgCost,
			getPrestigeUpgCost,
        }
	})
}

function setupEverything() {
	loadMinigameStuff();
	loadVue();
}