

$(document).ready(initializeApp);
var game = null;

function initializeApp(){
	game = new MoonLanderGame();
	game.init();
}


function MoonLanderGame(){
	this.ship = new Lander(this);
	this.heartbeatTimer = null;
	this.heartBeatInterval = 10;
	this.gravity = 2; //10 pixels per second
	this.numberOfIntervals = 1000 / this.heartBeatInterval;
	this.gravityPerInterval = this.gravity / this.numberOfIntervals;
	this.init = function(){
		var shipElement = this.ship.create();
		$("body").append(shipElement);
		this.ship.init(this.gravityPerInterval);
		this.applyHandlers();
		this.startHeartbeat();
	}
	this.applyHandlers = function(){
		$('body').on('keydown',this.handleKeydown.bind(this));
		$('body').on('keyup',this.handleKeyup.bind(this));
	}
	this.handleKeydown = function(e){
		if(e.which === 32){
			this.ship.activateThrust();
			console.log('thrusting!');
		}
	}
	this.handleKeyup = function(e){
		if(e.which === 32){
			this.ship.deactivateThrust();
			console.log('stop thrusting!');
		}
	}
	this.startHeartbeat = function(){
		if(this.heartbeatTimer!==null){
			this.stopHeartbeat();
		}
		this.heartbeatTimer = setInterval(this.handleHeartbeat.bind(this), this.heartBeatInterval);
	}
	this.stopHeartbeat = function(){
		clearInterval(this.heartbeatTimer);
		this.heartbeatTimer = null;
	}
	this.handleHeartbeat = function(){
		this.ship.move();
	}
	function Lander(parent){
		this.parent = parent;
		this.gravityPerInterval=null;
		this.domElement = null;
		this.thrustForcePerInterval = 0;
		this.defaultThrustForce = 2.3;
		this.defaultThrustForcePerInterval = null;
		this.position = {
			left: null,
			top: null
		}
		this.momentum = {
			x: 0,
			y: 0
		}
		this.init = function(gravity){
			this.gravityPerInterval = gravity;
			this.position = this.domElement.position();
			this.defaultThrustForcePerInterval = this.defaultThrustForce / this.parent.numberOfIntervals;
		}
		this.activateThrust = function(){
			this.thrustForcePerInterval = this.defaultThrustForcePerInterval;
			this.domElement.addClass('primaryThrust');
		}
		this.deactivateThrust = function(){
			this.thrustForcePerInterval = 0;
			this.domElement.removeClass('primaryThrust');
		}
		this.create = function(){
			this.domElement = $("<div>",{
				id: 'lander',
			});
			return this.domElement;
		}
		this.applyGravity = function(){
			this.momentum.y += this.gravityPerInterval - this.thrustForcePerInterval;
		}
		this.move = function(){
			this.applyGravity();
			var top = this.position.top += this.momentum.y ;
			var left = this.position.left += this.momentum.x;
			this.domElement.css({
				left: left + 'px',
				top: top + 'px'
			});
			this.position = {
				top: top,
				left: left
			}
		}
	}
}






















