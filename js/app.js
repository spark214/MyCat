var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);//帧
createjs.Ticker.addEventListener("tick",stage);

var gameView = new createjs.Container();
gameView.x=30;
gameView.y=30;
stage.addChild(gameView);

var circleArr=[[],[],[],[],[],[],[],[],[]];
var currentCat;
var MOVE_NONE=-1,MOVE_LEFT=0,MOVE_UP_LEFT=1,MOVE_UP_RIGHT=2,MOVE_RIGHT=3,MOVE_DOWN_RIGHT=4,MOVE_DOWN_LEFT=5;
var countStep=0;
var failBox=document.getElementById("FailBox");
var successBox=document.getElementById("SuccessBox");
var stepScore=document.getElementById("step");
var score=document.getElementById("score");
var nowStep=document.getElementById("nowStep");
var heightSocreTip=document.getElementById("heightestScore");
var SuccessBox_h4=document.getElementById("SuccessBox-h4");
var heightestScore=100;
var clickable=true;

function getMoveDir(cat) {
    var distanceMap=[];
    var can=true;
    for(var x=cat.indexX;x>=0;x--){
        if(circleArr[x][cat.indexY].getCircleType()==circle.TYPE_SELECTED){
            can=false;
            distanceMap[MOVE_LEFT]=cat.indexX-x;
            break;
        }
    }
    if(can){
        return MOVE_LEFT;
    }
    can=true;
    var x=cat.indexX,y=cat.indexY;
    while(true) {
        if (circleArr[x][y].getCircleType() == circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_UP_LEFT] = cat.indexY - y;
            break;
        }
        if (y % 2 == 0) {
            x--;
        }
        y--;
        if (y < 0 || x < 0) {
            break;
        }
    }
        if(can){
            return MOVE_UP_LEFT;
        }
        can=true;
        x=cat.indexX,y=cat.indexY;
        while(true) {
            if (circleArr[x][y].getCircleType() == circle.TYPE_SELECTED) {
                can = false;
                distanceMap[MOVE_UP_RIGHT] = cat.indexY - y;
                break;
            }
            if (y % 2 == 1) {
                x++;
            }
            y--;
            if (y < 0 || x > 8) {
                break;
            }
        }
            if(can){
                return MOVE_UP_RIGHT;
            }
            can=true;
            for(var x=cat.indexX;x<9;x++){
                if(circleArr[x][cat.indexY].getCircleType()==circle.TYPE_SELECTED){
                    can=false;
                    distanceMap[MOVE_RIGHT]=x-cat.indexX;
                    break;
                }
            }
            if(can){
                return MOVE_RIGHT;
            }
            can=true;
            x=cat.indexX,y=cat.indexY;
            while(true){
                if(circleArr[x][y].getCircleType()==circle.TYPE_SELECTED){
                    can=false;
                    distanceMap[MOVE_DOWN_RIGHT]=y-cat.indexY;
                    break;
                }
                if(y%2==1){
                    x++;
                }
                y++;
                if(y>8||x>8){
                    break;
                }
            }
            if(can){
                return MOVE_DOWN_RIGHT;
            }
            can=true;
            x=cat.indexX,y=cat.indexY;
            while(true){
                if(circleArr[x][y].getCircleType()==circle.TYPE_SELECTED){
                    can=false;
                    distanceMap[MOVE_DOWN_LEFT]=y-cat.indexY;
                    break;
                }
                if(y%2==0){
                    x--;
                }
                y++;
                if(y>8||x<0){
                    break;
                }
            }
            if(can){
                return MOVE_DOWN_LEFT;
            }
            var maxDir=-1,maxVaule=-1;
            for(var dir=0;dir<distanceMap.length;dir++){
                if(distanceMap[dir]>maxVaule){
                    maxVaule=distanceMap[dir];
                    maxDir=dir;
                }

            }
            if(maxVaule>1){
                 return maxDir;
            }
             else{
                 return MOVE_NONE;
             }

}
function circleClick(e) {
    if (e.target.getCircleType() != circle.TYPE_CAT&&e.target.getCircleType() != circle.TYPE_SELECTED&&clickable) {
        e.target.setCircleType(circle.TYPE_SELECTED);
            countStep++;
            nowStep.innerHTML=countStep;


    }else{
        return;
    }
    if(currentCat.indexX==0||currentCat.indexX==8||currentCat.indexY==0||currentCat.indexY==8){
        clickable=false;
        failBox.style.display="block";
       // alert("游戏结束");
        return;
    }
    // var leftCircle=circleArr[currentCat.indexX-1][currentCat.indexY];
    // var rightCircle=circleArr[currentCat.indexX+1][currentCat.indexY];
    // var lefttopCircle=circleArr[currentCat.indexX-1][currentCat.indexY-1];
    // var righttopCircle=circleArr[currentCat.indexX][currentCat.indexY-1];
    // var leftbottomCircle=circleArr[currentCat.indexX-1][currentCat.indexY+1];
    // var rightbottomCircle=circleArr[currentCat.indexX][currentCat.indexY+1];
    // if(leftCircle.getCircleType()==1){
    //     leftCircle.setCircleType(3);
    //     currentCat.setCircleType(1);
    //     currentCat=leftCircle;
    // }else if(rightCircle.getCircleType()==1){
    //     rightCircle.setCircleType(3);
    //     currentCat.setCircleType(1);
    //     currentCat=rightCircle;
    // }else if(lefttopCircle.getCircleType()==1){
    //     lefttopCircle.setCircleType(3);
    //     currentCat.setCircleType(1);
    //     currentCat=lefttopCircle;
    // }else if(righttopCircle.getCircleType()==1){
    //     righttopCircle.setCircleType(3);
    //     currentCat.setCircleType(1);
    //     currentCat=righttopCircle;
    // }else if(leftbottomCircle.getCircleType()==1){
    //    leftbottomCircle.setCircleType(3);
    //     currentCat.setCircleType(1);
    //     currentCat=leftbottomCircle;
    // }else if(rightbottomCircle.getCircleType()==1){
    //     rightbottomCircle.setCircleType(3);
    //     currentCat.setCircleType(1);
    //     currentCat=rightbottomCircle;
    // }else{
    //     alert("游戏结束");
    // }
    var dir=getMoveDir(currentCat);

    switch (dir){
        case MOVE_LEFT:
            currentCat.setCircleType(circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexX-1][currentCat.indexY];
            currentCat.setCircleType(circle.TYPE_CAT);
            break;
        case MOVE_UP_LEFT:
            currentCat.setCircleType(circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY-1];
            currentCat.setCircleType(circle.TYPE_CAT);
            break;
        case MOVE_UP_RIGHT:
            currentCat.setCircleType(circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY-1];
            currentCat.setCircleType(circle.TYPE_CAT);
            break;
        case MOVE_RIGHT:
            currentCat.setCircleType(circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexX+1][currentCat.indexY];
            currentCat.setCircleType(circle.TYPE_CAT);
            break;
        case MOVE_DOWN_RIGHT:
            currentCat.setCircleType(circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY+1];
            currentCat.setCircleType(circle.TYPE_CAT);
            break;
        case MOVE_DOWN_LEFT:
            currentCat.setCircleType(circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY+1];
            currentCat.setCircleType(circle.TYPE_CAT);
            break;
        default:
            // alert("游戏结束,一共走了"+countStep+"步");
            clickable=false;
            if(heightestScore>countStep){
               SuccessBox_h4.innerHTML="新纪录！";
               SuccessBox_h4.style.color="gold";
               setCookie(countStep);
            }
            stepScore.innerHTML=countStep+"";
            score.innerHTML=""+100-countStep;
            successBox.style.display="block";
            break;
    }
}

function addCircles() {

    for(var indexY=0;indexY<9;indexY++){
        for(var indexX=0;indexX<9;indexX++){
            var c=new circle();
            gameView.addChild(c);
            circleArr[indexX][indexY]=c;
            c.indexX=indexX;
            c.indexY=indexY;
            c.x=indexY%2?indexX*55+25:indexX*55;
            c.y=indexY*55;

            if(indexX==4&&indexY==4){
                c.setCircleType(3);
                currentCat=c;
            }
            else if(Math.random()<0.1){
                c.setCircleType(circle.TYPE_SELECTED);
            }
            c.addEventListener("click",circleClick);
        }
    }
}
function setCookie(score) {
    document.cookie="score="+score;
}
function getCookie() {
    if(document.cookie.length>0){
        var hs_start=document.cookie.indexOf("score=");
        if(hs_start==-1){
            return;
        }
        var hs_end=document.cookie.indexOf(";",hs_start);
        if(hs_end!=-1){
            heightestScore=document.cookie.substring(hs_start+6,hs_end);
        }
        else{
            heightestScore=document.cookie.substring(hs_start+6);
        }
        heightSocreTip.innerHTML=""+100-heightestScore;
    }
}

addCircles();
getCookie();

