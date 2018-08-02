(function () {
	//记录创建的蛇
	var elements = [];
	function Snake(options) {
		//蛇的属性
		options = options || {};
		this.width = options.width || 20;
		this.height = options.height || 20;
		//蛇移动的方向
		this.direction = options.direction || 'right';
		//蛇节的身体
		this.body = [
			{x: 3, y: 2, color: 'red'},
			{x: 2, y: 2, color: 'blue'},
			{x: 1, y: 2, color: 'blue'}
		]
	}
	//蛇的方法，渲染，移动
	Snake.prototype.render = function (map) {
		//删除蛇
		remove();

		//渲染每一个蛇节
		for (var i = 0; i < this.body.length; i++) {
			var obj = this.body[i];
			//创建蛇节
			var div = document.createElement('div');
			map.appendChild(div);
			//记录当前的蛇
			elements.push(div);
			//蛇节样式
			div.style.position = 'absolute';
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.backgroundColor = obj.color;
			div.style.left = obj.x * this.width + 'px';
			div.style.top = obj.y * this.height + 'px';
		}
	}

	//蛇移动的方法
	Snake.prototype.move = function (food,map) {
		//让蛇移动
		//让蛇节等于上一个蛇节的位置
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		
		//蛇头移动方向
		var head = this.body[0];
		switch(this.direction) {
			case 'right':
			head.x += 1;
			break;
			case 'left':
			head.x -= 1;
			break;
			case 'top':
			head.y -= 1;
			break;
			case 'bottom':
			head.y += 1;
			break;
		}


		//判断蛇头是否和食物重合
		var headX = head.x * this.width;
		var headY = head.y * this.height;
		if (headX === food.x && headY === food.y) {
			var last = this.body[this.body.length - 1];
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color
			})
			food.render(map);
		}

	}
	//私有成员,删除蛇的函数
	function remove() {
		for(var i = elements.length - 1; i >= 0; i--) {
			//删除div
			elements[i].parentNode.removeChild(elements[i]);
			//删除数组中的元素
			elements.splice(i, 1);
		}
	}
		
	
	
	window.Snake = Snake;
})()
