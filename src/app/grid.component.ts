export class Grid {
	
	public grid:any[];

	private maxrow:number = 10;
	private maxcol:number = 20;		
	private hedge:number = 2;
	private simulationInterval:any;
	private isSimulating:boolean = false;

	constructor() { this.rebuild(); }

	public rebuild() {
		this.grid = this.emptyGrid();
		this.init();
	}

	private emptyGrid():any[] {
		let grid:any[] = this.defineGrid();

		for (let row = 0; row < grid.length; row++) {
			grid[row].fill(0, 0, grid[row].length);
		}		
		return grid;
	}

	private defineGrid():any[] {
		let grid:any[] = new Array(this.maxrow + this.hedge);

		for (let row = 0; row <= grid.length - 1; row++) { 
			grid[row] = new Array(this.maxcol + this.hedge);
		}
		return grid;
	}

	private init():any[] {		
		for (let row = 1; row <= this.maxrow; row++) {
			for (let col = 1; col <= this.maxcol; col++) {
				if (this.getRandom()) {
					this.grid[row][col] = 1;
				} 
			}
		}		
		return this.grid;
	}

	private getRandom():boolean {
		if (Math.floor((Math.random() * 10) +1) % 3 === 0) {			
			return true;
		}
		return false;
	}

	public update() {			
		let new_grid:any[] = this.emptyGrid();

		for (let row = 1; row <= this.maxrow; row++) {
			for (let col = 1; col <= this.maxcol; col++) {
				
				switch (this.neighborCount(row,col)) {
					case 2:
						new_grid[row][col] = this.grid[row][col];
						break;
					case 3:
						new_grid[row][col] = 1;
						break;					
					default:
						new_grid[row][col] = 0;
				}
			}
		}

		if (this.arraysEqual(this.grid,new_grid) && this.isSimulating) { this.endSimulation(); }

		this.grid = new_grid;
	}

	public toggleSimulation() {

		if (this.isSimulating) {
			this.endSimulation();
			return;
		}

		this.simulationInterval = setInterval( x => { 
			this.isSimulating = true;
			this.update();
		}, 1000);
	}

	private endSimulation() {
		clearInterval(this.simulationInterval);
		this.isSimulating = false;
	}

	private neighborCount(row:number,col:number):number {
		let count:number = 0;
		for (let i = row - 1; i <= row + 1; i++) {
			for (let j = col - 1; j <= col + 1; j++) {			
				count += this.grid[i][j];				
			}
		}
		count -= this.grid[row][col];
		return count;
	}

	private arraysEqual(array1:any[],array2:any[]) {
		if (!Array.isArray(array1) && !Array.isArray(array2)) {
	        return array1 === array2;
	    }

	    if (array1.length !== array2.length) {
	        return false;
	    }

	    for (let i = 0, len = array1.length; i < len; i++) {
	        if (!this.arraysEqual(array1[i], array2[i])) {
	            return false;
	        }
	    }
	    return true;
	} 

	public getGrid():any[] {
		return this.grid;
	}

	public setGrid(grid:any[]) {
		this.grid = grid;
	}
}