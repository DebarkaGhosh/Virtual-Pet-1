var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var lastFed
function preload(){
   dogImg=loadImage("dog.png");
   dogImg1=loadImage("dog2.png");
  }

function setup() {
  database=firebase.database();

  createCanvas(600,500);

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

 addFood =  createButton("ADD FOOD");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);

 foodObj = new Food()



  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  var  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

function draw() {
  background("yellow");

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill("black");
  textSize(15);
  if(lastFed>=12){
    text("Last feed: " + lastFed%12 + "PM",350,30);

  }else if(lastFed==0){
    text("Last feed: 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed+"AM", 350,30);
  }
console.log("lastFed");


  drawSprites();
 }

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  
    })
  }

  function feedDog(){
    dog.addImage(dogImg1);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()

    })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

