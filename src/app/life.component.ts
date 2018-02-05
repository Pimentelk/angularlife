import { Component } from '@angular/core';

@Component({
	selector: 'grid-component',
	templateUrl: '../assets/partials/grid.html',
	styleUrls: ['../assets/css/grid.css']
})

export class Life {
	
	public grid:any[];
	
	private hedge:number = 2;
	private maxrow:number = 10;
	private maxcol:number = 20;	
	private simulationInterval:any;
	private isSimulating:boolean = false;

	constructor() {
		this.grid = this.reset();
		this.grid = this.init();
	}

	public print(grid,message) {
		console.log(grid,message);
	}

	public update() {
		
		let new_grid:any[] = this.reset();

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

		if (this.arraysEqual(this.grid,new_grid) && this.isSimulating) {
			this.endSimulation();
		}

		this.grid = new_grid;
	}

	public startSimulation() {	

		if (this.endSimulation) {
			clearInterval(this.simulationInterval);
		}

		this.simulationInterval = setInterval( x => { 
			this.isSimulating = true;
			this.update();
		}, 1000);
	}

	public endSimulation() {
		clearInterval(this.simulationInterval);
		this.isSimulating = false;
	}

	public tumbler() {

		this.grid = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];

		this.startSimulation();
	}

	public cheshireCat() {

		this.grid = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];

		this.startSimulation();
	}

	public refresh() {
		this.grid = this.reset();
		this.grid = this.init();
	}

	private init() {
		let grid:any = this.grid;

		for (let row = 1; row <= this.maxrow; row++) {
			for (let col = 1; col <= this.maxcol; col++) {
				if (this.getRandom()) {
					grid[row][col] = 1;
				} 
			}
		}		
		// this.print(grid,"Life::init()");
		return grid;
	}

	private getRandom():boolean {
		if (Math.floor((Math.random() * 10) +1) % 3 === 0) {			
			return true;
		}
		return false;
	}

	private reset():any[] {
		let grid:any[] = this.getGrid();
		for (let row = 0; row < grid.length; row++) {
			for (let col = 0; col < grid[row].length; col++) {
				grid[row][col] = 0;
		 	}
		}
		// this.print(grid,"Life::reset()");
		return grid;
	}

	private neighborCount(row,col):number {
		let count:number = 0;
		for (let i = row - 1; i <= row + 1; i++) {
			for (let j = col - 1; j <= col + 1; j++) {			
				count += this.grid[i][j];				
			}
		}

		count -= this.grid[row][col];

		return count;
	}

	private getGrid():any[] {
		let grid:any[] = new Array(this.maxrow + this.hedge);
		for (let row = 0; row <= grid.length - 1; row++) { 
			grid[row] = new Array(this.maxcol + this.hedge);
		}
		return grid;
	}

	private arraysEqual(array1,array2) {
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
}
