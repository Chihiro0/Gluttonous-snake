(function () {
	//游戏对象属性
	function Game (map) {
		var that
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}
	// 游戏对象方法
	Game.prototype.start = function () {
		// 渲染
		this.food.render(this.map);
		this.snake.render(this.map);

		//开始游戏逻辑
		//让蛇移动
		runSnake(this);
		//遇到边界结束
		//键盘控制移动方向
		bindKey(this);
		//吃掉食物
	}
	//蛇移动函数
	function runSnake(that) {
		var timerId = setInterval (function () {
			//获取蛇属性
			that.snake.move(that.food, that.map);
			that.snake.render(that.map);
			//遇到边界游戏结束
			var maxX = that.map.offsetWidth / that.snake.width ;
			var maxY = that.map.offsetHeight / that.snake.height ;
			var headX = that.snake.body[0].x;
			var headY = that.snake.body[0].y;
			if (headX < 0 || headX >= maxX) {
				clearInterval(timerId);
				alert('Game Over');
			}
			if (headY < 0 || headY >= maxY) {
				clearInterval(timerId);
				alert('Game Over');
			}
		},150)
	}
	//控制移动方向
	function bindKey(that) {
		document.addEventListener('keydown', function(e){
			switch(e.keyCode) {
				case 37:
				that.snake.direction = 'left';
				break;
				case 38:
				that.snake.direction = 'top';
				break;
				case 39:
				that.snake.direction = 'right';
				break;
				case 40:
				that.snake.direction = 'bottom';
				break;
			}
		}, false)
	}
	window.Game = Game;
})()

var map = document.getElementById('map');
var game = new Game(map);
game.start();