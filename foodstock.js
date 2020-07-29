class FoodStock {
    constructor(){
    }
    getStock(){
        foodStock=database.ref("food")
        foodStock.on("value",readStock)
    }
}
