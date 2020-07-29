//Create variables here

var dog,database,foodS,foodStock,Dog1,Dog2,fedTime,lastFed,foodObj
function preload()
{
  //load images here
   Dog1 = loadImage("images/dogimg.png");
   Dog2 = loadImage("images/dogimg1.png");
}

function setup() {
	createCanvas(1000,500);
  database = firebase.database();
  milk = new Food()
 var foodRef = database.ref("/food")
 foodRef.on("value",function(data){
 foodS = data.val();
 milk.updateFoodStock(foodS);
 })
  dog = createSprite(800,250,10,10);
  dog.addImage(Dog1);
  Dog1.resize(150,150);
  Dog2.resize(150,150);
  feed = createButton(" FEED THE DOG ")
  feed.position(800,50);
  feed.mousePressed(feedDog);


  addFood = createButton(" ADD FOOD ")
  addFood.position(915,50);
  addFood.mousePressed(addFoods)

  



}
function draw() {  
 
background(46,139,87)
var hourref = database.ref("/fedTime")
hourref.on("value",function(data){
  lastFed = data.val()
})
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM",350,30);
}
  drawSprites();
  
  //add styles here
milk.display();
}

function feedDog(){
  console.log("dog")
  dog.addImage(Dog2);

  milk.updateFoodStock(milk.getFoodStock()-1);
  database.ref("/").update({
    food:milk.getFoodStock(),
    fedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref("/").update({
    food:foodS
  })
}