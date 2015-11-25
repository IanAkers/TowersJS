(function (){
  var Hanoi = window.Hanoi = (window.Hanoi || {});

  var View = Hanoi.View = function View (game, $el){
  this.game = game;
  this.$board = $el;
};

View.prototype.setupTowers = function(){
  var $board = this.$board;

  for (var i = 0; i < 3; i++){
    var $tower = $("<ul class=tower></ul>");

    for (var j = 0; j < 3; j++){
      $tower.append($("<li></li>"));
    }
    $board.append($tower);
  }

};

View.prototype.render = function(message){
  var towers = this.game.towers;
  var $board = this.$board;
  $(".message").remove();
  $board.find("li").removeClass();
  towers.forEach(function(tower, towerIndex){
    tower.forEach(function (disk, diskIndex){

      var $currentTower = $board.find(".tower").eq(towerIndex);
      $currentTower.find("li").eq((diskIndex * -1) - 1).addClass("disk-" + disk + " selectable");
    });
  }); if (message){
    $("body").append($("<p class=message>" + message + "</p>"));
  }
}

View.prototype.clickTower = function() {
  var view = this;
  var game = this.game;
  $(".tower").on("click", function (){

    var $selectedDisk =   $(this).find(".selectable").first();
    $selectedDisk.toggleClass("selected");
    var towerNum = $(this).index();
      var message;
    if(view.startTower == null && game.towers[towerNum].length == 0){
      return;
    }
    else if(view.startTower == null){
      view.startTower = towerNum;
    }else{

      if (view.startTower == towerNum){
        $selectedDisk.removeClass("selected");
        view.startTower = null;
        return;
      }
      if (!game.move(view.startTower, towerNum)){
        message = "Invalid Move!";
      };
      if (game.isWon()){
        message = "You Won!"
      }
      view.startTower = null;
      view.render(message);
    }

  })
}

})();
