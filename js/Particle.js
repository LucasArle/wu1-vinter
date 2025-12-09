class Particle {
  constructor(x, y, color) {
    this.x = 400;
    this.y = 0;
    this.dy = (1 + Math.random() * 3) * speed / 1;
    this.dx = (-1 + Math.random() * 2) * speed / 15;
    this.color = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.2})`;
    this.size = 2 + Math.floor(Math.random() * 8);
    this.toDelete = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, pi2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(mouseX,mouseY,changedColor,deltaTime,mouseSX,mouseSY) {
    
    
    if((this.y > mouseY -15)&&(this.y < mouseY +15)&&(this.x > mouseX -30)&&(this.x < mouseX +30)){
      this.color = `rgba(${changedColor[0]}, ${changedColor[1]}, ${changedColor[2]}, ${0.2})`;;

      // console.log(this.polarity(this.x-mouseX))
      // debugger


      // this.dx = this.polarity(this.x-mouseX) * ((100) - 100*(((this.x-mouseX)*this.polarity(this.x-mouseX))/50)) * deltaTime * 1000;
      // this.y += this.dy * deltaTime;
      // this.x += this.dx * deltaTime;
      if ((this.x > mouseX -5)&&(this.x < mouseX +5)){
        this.dx = (-1 + Math.random() * 2) * speed *1
        this.dy = (1 + Math.random() * 3) * speed / 2;
        this.y += this.dy * deltaTime;
        this.x += this.dx * deltaTime;
      }
      else{
        this.dx = (this.polarity(this.x-mouseX) * ((10) - 10*(((this.x-mouseX)*this.polarity(this.x-mouseX))/30)) * deltaTime * 1000) + ((-1 + Math.random() * 2) * speed / 1 * deltaTime) ;
        this.dy = (1 + Math.random() * 3) * speed / 0.7;
        this.y += this.dy * deltaTime;
        this.x += this.dx * deltaTime;
      }
    
      this.y += mouseSY * deltaTime * 30
      this.x += (mouseSX*0.2) +( 1.3*mouseSX * Math.random()) * deltaTime * 30
    }
    else{
      // this.dx =  (-1 + Math.random() * 2) * speed / 15 * deltaTime;
      this.dx += (-this.dx / 50)
      this.y += this.dy * deltaTime;
      this.x += this.dx * deltaTime;
    }

    if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
      this.toDelete = true;
    }
  }

  polarity(num){
    if (num > 0){
      return 1
    }
    else if(num<0){
      return -1
    }
    else{
      return 0
    }
      
  }
  
}