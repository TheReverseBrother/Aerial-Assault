var aerialAssault = function()
{
    this.canvas = document.getElementById("aerial-canvas"),
    this.ctx = this.canvas.getContext('2d'),
    this.ctx.fillStyle = "#FF0000",
    this.CANVAS_WIDTH = 680,
    this.CANVAS_HEIGHT = 300,
    this.EnemyArray = [];
    this.COUNTER = 0;
    this.ENEMYVALUE = 15;
    this.BulletArray = [];
    this.PositionArray = [700,680,720,690,700];
    // this.PositionArray = [550,550,550,550];
    this.ISpaused = 0;

    this.SpriteImg = new Image();
    this.SpriteImg.src = "./Images/Spitfire_sprites_transparent.png";
    this.BACKGROUND_IMAGE = new Image();
    this.BACKGROUND_IMAGE_OFFSCREEN = new Image();
    this.BACKGROUND_IMAGE.src ="./Images/background.jpg";
    this.BACKGROUND_IMAGE_OFFSCREEN.src ="./Images/background.jpg";

    this.MenuImg = new Image();
    this.MenuImg.src ="./Images/Spitfire.jpg";


    //Background OFFSETS
    this.BACKGROUND_OFFSET_START = 680;
    this.BACKGROUND_IMAGE_OFFSCREEN_OFFSET =680;
    this.BACKGROUND_IMAGE_OFFSET =0;

        ///Arrow Keys
    this.UP_ARROW = 38;
    this.DOWN_ARROW = 40;
    this.PAUSE_KEY = 80;
    this.SPACE_BAR = 32;


    //Character Initial Attributes
    this.CHARACTER_HEIGHT = 30;
    this.CHARACHTER_WIDTH = 80;
    this.CHTR_X_POSITION = 30;
    this.CHTR_Y_POSITION = 60;

    //Enemy Initial x position
    this.INITIAL_ENEMY_X = 700;

    //SpriteSheet

    //Bullet Sprites
    this.BULLET_RENDER_HEIGHT = 20;
    this.BULLET_RENDER_WIDTH = 30;


    this.BULLET_SPRITE_1_X = 116;
    this.BULLET_SPRITE_1_Y = 241;
    this.BULLET_SPRITE_1_WIDTH = 18;
    this.BULLET_SPRITE_1_HEIGHT = 13;

    this.BULLET_SPRITE_2_X = 132;
    this.BULLET_SPRITE_2_Y = 241;
    this.BULLET_SPRITE_2_WIDTH = 18;
    this.BULLET_SPRITE_2_HEIGHT = 13;

    this.BULLET_SPRITE_3_X = 150;
    this.BULLET_SPRITE_3_Y = 241;
    this.BULLET_SPRITE_3_WIDTH = 20;
    this.BULLET_SPRITE_3_HEIGHT = 13;


    //CHTR SPRITE IMAGES
    this.CHTR_SPRITE_X = 46;
    this.CHTR_SPRITE_Y= 236;
    this.CHTR_SPRITE_HEIGHT= 24;
    this.CHTR_SPRITE_WIDTH= 67;

    this.MESSERSCHMITT_X= 270;
    this.MESSERSCHMITT_Y= 244;
    this.MESSERSCHMITT_HEIGHT= 23;
    this.MESSERSCHMITT_WIDTH= 67;
    this.MESSERSCHMITT_CHTR_HEIGHT= 30;
    this.MESSERSCHMITT_CHTR_WIDTH= 80;

    this.MESSERSCHMITT_BF_X= 255;
    this.MESSERSCHMITT_BF_Y= 294;
    this.MESSERSCHMITT_BF_HEIGHT= 29;
    this.MESSERSCHMITT_BF_WIDTH= 95;
    this.MESSERSCHMITT_BF_CHTR_HEIGHT = 40;
    this.MESSERSCHMITT_BF_CHTR_WIDTH = 110;

    this.STUKA_X = 274;
    this.STUKA_Y = 269;
    this.STUKA_HEIGHT = 24;
    this.STUKA_WIDTH = 63;
    this.STUKA_CHTR_HEIGHT = 30;
    this.STUKA_CHTR_WIDTH = 80;

    this.DORNIER_X = 241;
    this.DORNIER_Y = 322;
    this.DORNIER_HEIGHT = 31;
    this.DORNIER_WIDTH = 127;
    this.DORNIER_CHTR_WIDTH = 150;
    this.DORNIER_CHTR_HEIGHT= 40;

    this.myGamePiece = new gdcharacter(this.CHARACHTER_WIDTH,this.CHARACTER_HEIGHT
        ,this.CHTR_X_POSITION,this.CHTR_Y_POSITION,this.SpriteImg,this.CHTR_SPRITE_X,this.CHTR_SPRITE_Y,
        this.CHTR_SPRITE_WIDTH,this.CHTR_SPRITE_HEIGHT);



};

aerialAssault.prototype =
{
    startGame: function()
    {
        // this.ctx.fillRect(30, 10, 30, 120);
        // requestAnimationFrame(this.GameUpdateLoop);
        this.GameUpdateLoop();
        // AerialAssault.startMenu();
    },

    startMenu: function()
    {
        // AerialAssault.ctx.drawImage(AerialAssault.MenuImg,0,0,AerialAssault.CANVAS_WIDTH,AerialAssault.CANVAS_HEIGHT);
    },

    GameUpdateLoop : function(now) {
        if(AerialAssault.ISpaused === 0)
        {
            AerialAssault.clear();
            AerialAssault.backgroundManager();
            AerialAssault.myGamePiece.Draw(AerialAssault.ctx);
            AerialAssault.enemyManager();
            AerialAssault.enemyUpdate();
            AerialAssault.BulletManager();
            AerialAssault.checkCollision();
        }
        requestAnimationFrame(AerialAssault.GameUpdateLoop);
    },

    clear : function(){
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    },

    enemyManager: function()
    {

        var z = Math.floor((Math.random() * 4) + 1);
        var planeID = Math.floor((Math.random() * 4) + 1);
        var y = Math.floor((Math.random() * 270) + 30);
        AerialAssault.COUNTER += 1;
        var i = AerialAssault.COUNTER % 200;

        if( i === 0)
        {
            if(planeID === 1)
            {
                AerialAssault.EnemyArray.push(new gdcharacter(AerialAssault.MESSERSCHMITT_CHTR_WIDTH,AerialAssault.MESSERSCHMITT_CHTR_HEIGHT,AerialAssault.PositionArray[z],y
                    ,AerialAssault.SpriteImg,AerialAssault.MESSERSCHMITT_X,AerialAssault.MESSERSCHMITT_Y,AerialAssault.MESSERSCHMITT_WIDTH,
                    AerialAssault.MESSERSCHMITT_HEIGHT));
            }
            if(planeID === 2)
            {
                AerialAssault.EnemyArray.push(new gdcharacter(AerialAssault.MESSERSCHMITT_BF_CHTR_WIDTH,AerialAssault.MESSERSCHMITT_BF_CHTR_HEIGHT,AerialAssault.PositionArray[z],y
                    ,AerialAssault.SpriteImg,AerialAssault.MESSERSCHMITT_BF_X,AerialAssault.MESSERSCHMITT_BF_Y,AerialAssault.MESSERSCHMITT_BF_WIDTH,
                    AerialAssault.MESSERSCHMITT_BF_HEIGHT));
            }
            if(planeID ===3)
            {
                AerialAssault.EnemyArray.push(new gdcharacter(AerialAssault.DORNIER_CHTR_WIDTH,AerialAssault.DORNIER_CHTR_HEIGHT,AerialAssault.PositionArray[z],y
                    ,AerialAssault.SpriteImg,AerialAssault.DORNIER_X,AerialAssault.DORNIER_Y,AerialAssault.DORNIER_WIDTH,AerialAssault.DORNIER_HEIGHT));
            }
            if(planeID === 4)
            {
                AerialAssault.EnemyArray.push(new gdcharacter(AerialAssault.STUKA_CHTR_WIDTH,AerialAssault.STUKA_CHTR_HEIGHT,AerialAssault.PositionArray[z],y
                    ,AerialAssault.SpriteImg,AerialAssault.STUKA_X,AerialAssault.STUKA_Y,AerialAssault.STUKA_WIDTH,AerialAssault.STUKA_HEIGHT))
            }
        }
    },

    enemyUpdate: function()
    {
        for(var i = 0; i < AerialAssault.EnemyArray.length; i += 1)
        {
            AerialAssault.EnemyArray[i].updatePositionX(-2);
            AerialAssault.EnemyArray[i].Draw(AerialAssault.ctx);
            // if((AerialAssault.EnemyArray[i].returnPositionX() + AerialAssault.EnemyArray[i].returnWidth()) < 0)
            // {
            //     AerialAssault.EnemyArray.splice(0, i);
            // }
        }
    },
    checkCollision: function()
    {
        for(var i = 0; i < AerialAssault.EnemyArray.length; i += 1)
        {
            if (AerialAssault.myGamePiece.checkCrash(AerialAssault.EnemyArray[i])) {
                console.log(AerialAssault.EnemyArray)
                AerialAssault.EnemyArray[i].Draw(AerialAssault.ctx);
                console.log(AerialAssault.EnemyArray[i]);
                console.log(AerialAssault.myGamePiece);
                console.log("Ive Been Called");
                AerialAssault.ISpaused = 1;
            }
            if(AerialAssault.BulletArray.length > 0)
            {
                for(var z = 0; z < AerialAssault.BulletArray.length; z += 1)
                {
                    if(AerialAssault.BulletArray[z].getVisible())
                    {
                        if(AerialAssault.BulletArray[z].checkCrash(AerialAssault.EnemyArray[i]))
                        {
                            AerialAssault.BulletArray[z].setInVisible();
                            AerialAssault.EnemyArray[i].setInVisible();
                        }
                    }

                }
            }

        }

    },
    backgroundManager: function()
    {
        AerialAssault.BACKGROUND_IMAGE_OFFSET +=-1;
        AerialAssault.BACKGROUND_IMAGE_OFFSCREEN_OFFSET += -1;
        AerialAssault.ctx.drawImage(AerialAssault.BACKGROUND_IMAGE,this.BACKGROUND_IMAGE_OFFSET,
            0,AerialAssault.CANVAS_WIDTH,AerialAssault.CANVAS_HEIGHT);
        AerialAssault.ctx.drawImage(AerialAssault.BACKGROUND_IMAGE_OFFSCREEN, this.BACKGROUND_IMAGE_OFFSCREEN_OFFSET,0,AerialAssault.CANVAS_WIDTH,AerialAssault.CANVAS_HEIGHT);

        if(AerialAssault.BACKGROUND_IMAGE_OFFSET <= -680)
        {
            AerialAssault.BACKGROUND_IMAGE_OFFSET = AerialAssault.BACKGROUND_OFFSET_START;
        }
        if(AerialAssault.BACKGROUND_IMAGE_OFFSCREEN_OFFSET <= -680)
        {
            AerialAssault.BACKGROUND_IMAGE_OFFSCREEN_OFFSET = AerialAssault.BACKGROUND_OFFSET_START;
        }
    },


    BulletManager: function()
    {
        for(var i = 0; i < AerialAssault.BulletArray.length; i += 1)
        {
            AerialAssault.BulletArray[i].updatePositionX(2);
            AerialAssault.BulletArray[i].Draw(AerialAssault.ctx);

        }
    },
    MoveUP : function()
    {
        if(AerialAssault.ISpaused === 0) {
            AerialAssault.myGamePiece.updatePositionY(-4);
        }
    },
    MoveDOWN : function()
    {
        if(AerialAssault.ISpaused === 0) {
            AerialAssault.myGamePiece.updatePositionY(4)
        }
    },

    CreateBullet: function()
    {
        AerialAssault.BulletArray.push(new gdcharacter(AerialAssault.BULLET_RENDER_WIDTH,
            AerialAssault.BULLET_RENDER_HEIGHT,((AerialAssault.myGamePiece.returnPositionX() + AerialAssault.myGamePiece.returnWidth()) +1),(AerialAssault.myGamePiece.returnPositionY() +5),
            this.SpriteImg,this.BULLET_SPRITE_3_X,
            this.BULLET_SPRITE_3_Y,this.BULLET_SPRITE_3_WIDTH,this.BULLET_SPRITE_3_HEIGHT));
    },
    pause: function()
    {
        if(AerialAssault.ISpaused === 0)
        {
            AerialAssault.ISpaused = 1;
        }
        else if(AerialAssault.ISpaused === 1)
        {
            AerialAssault.ISpaused = 0;
        }
        console.log(AerialAssault.ISpaused);
    }

};



window.addEventListener('keydown', function(e){
    var key = e.keyCode;

    if(key === AerialAssault.UP_ARROW){
        AerialAssault.MoveUP();
    }
    else if(key === AerialAssault.DOWN_ARROW){
        AerialAssault.MoveDOWN();
    }
    else if(key === AerialAssault.PAUSE_KEY)
    {
        AerialAssault.pause();
    }
    else if(key === AerialAssault.SPACE_BAR)
    {
        AerialAssault.CreateBullet();
    }
});

var AerialAssault = new aerialAssault();
AerialAssault.startGame();
