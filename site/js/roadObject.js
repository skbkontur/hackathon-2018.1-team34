class BaseRoadObject {
    constructor(name, standingSpriteName) {
        this.name = name;
        this.standingSpriteName = standingSpriteName;
    }

    init(game){
        this.group = game.add.group();
        this.group.physicsBodyType = Phaser.Physics.ARCADE;
        this.group.enableBody = true;
        this.group.createMultiple(30, this.standingSpriteName);
        this.group.setAll('anchor.x', 0.5);
        this.group.setAll('anchor.y', 1);
        this.group.setAll('outOfBoundsKill', true);
        this.group.setAll('checkWorldBounds', true);
        this.group.forEach(function (x) {
            this.addAnimations(x);
        }, this);
    }

    addAnimations(sprite){    }
    playAnimation(sprite){    }

    turnTo(sprite) {}

    getEffects(name){
        return [];
    }
}


class Cow extends BaseRoadObject {
    constructor(){
        super('cow', 'cowStanding')
    }

    addAnimations(sprite) {
        sprite.animations.add('nod', [0, 1, 2, 3, 2, 1, 0]);
    }

    playAnimation(sprite) {
        sprite.animations.play('nod', 10, true);
    }

    getEffects(){
        return {
            'car': [turnTo(this.name)],
            //'cow': [speedUp()]
        };
    }

    turnTo(sprite) {
        sprite.loadTexture('cow');
        sprite.animations.add('go');
        sprite.animations.play('go', 10, true);
    }
}

class Car extends BaseRoadObject {
    constructor(){
        super('car', 'carStanding')
    }

    addAnimations(sprite) {
        //sprite.animations.add('nod', [0, 1, 2, 3, 2, 1, 0]);
    }


    getEffects() {
        return {
            'car': [speedDown(200, true)],
            'cow': [turnTo(this.name)],
            'camel': [turnTo(this.name)],
            'deer': [turnTo(this.name)]
        };
    }

    turnTo(sprite) {
        sprite.loadTexture('car');
    }
}

class Camel extends BaseRoadObject {
    constructor(){
        super('camel', 'camelStanding')
    }

    getEffects(){
        return {
            'car': [turnTo(this.name)]
        };
    }

    turnTo(sprite) {
        sprite.loadTexture('camel');
        sprite.animations.add('go');
        sprite.animations.play('go', 10, true);
    }
}

class Deer extends BaseRoadObject {
    constructor(){
        super('deer', 'deerStanding')
    }

    addAnimations(sprite) {
        sprite.animations.add('knock', [0, 1, 1, 1, 1]);
    }

    playAnimation(sprite) {
        sprite.animations.play('knock', 10, true);
    }


    getEffects(){
        return {
            'car': [turnTo(this.name)]
        };
    }

    turnTo(sprite) {
        sprite.loadTexture('deer');
        sprite.animations.add('go');
        sprite.animations.play('go', 10, true);
    }
}

class Grass extends BaseRoadObject {
    constructor(){
        super('grass', 'grass')
    }

    getEffects() {
        return {
            'car': [speedDown()],
            'cow': [speedUp()],
            'camel': [speedUp(100)],
            'deer': [speedUp(100)]
        };
    }
}

class RedPill extends BaseRoadObject {
    constructor(){
        super('redPill', 'redPill')
    }

    getEffects() {
        return {
            'car': [enableMatrix()],
            'cow': [enableMatrix()],
            'camel': [enableMatrix()],
            'deer': [enableMatrix()]
        };
    }
}

class Cloud extends BaseRoadObject {
    constructor(){
        super('cloud', 'kontur')
    }

    getEffects() {
        return {
            'car': [speedUp()],
            'cow': [speedUp()],
            'camel': [speedUp()],
            'deer': [speedUp()]
        };
    }
}

class Cactus extends BaseRoadObject {
    constructor(){
        super('cactus', 'cactus')
    }

    getEffects() {
        return {
            'car': [speedDown()],
            'cow': [speedDown()],
            'camel': [speedUp()],
            'deer': [speedDown()]
        };
    }
}

class Bitcoin extends BaseRoadObject {
    constructor(){
        super('bitcoin', 'bitcoin')
    }

    addAnimations(sprite) {
        sprite.animations.add('spin');
    }

    playAnimation(sprite) {
        sprite.animations.play('spin', 10, true);
    }

    getEffects() {
        return {
            'car': [speedUp(), addTime(), addBitcoin()],
            'cow': [addTime(), addBitcoin()],
            'camel': [addTime(), addBitcoin()],
            'deer': [addTime(), addBitcoin()],
        };
    }
}

class Clown extends BaseRoadObject {
    constructor(){
        super('clown', 'clown')
    }

    addAnimations(sprite) {
        sprite.animations.add('knock', [1, 2, 0]);
    }

    playAnimation(sprite) {
        sprite.animations.play('knock', 10, true);
    }

    getEffects(){

        const effect = randomEffect([
            speedDown(),
            speedUp(),
            enableMatrix(),
            turnTo('cow'),
            turnTo('car'),
            turnTo('deer'),
            turnTo('camel'),
        ]);

        return {
            'car': [effect],
            'cow': [effect],
            'camel': [effect],
            'deer': [effect]
        };
    }

    turnTo(sprite) {
        sprite.loadTexture('cow');
        sprite.animations.add('go');
        sprite.animations.play('go', 10, true);
    }
}


function speedUp(value = 200) {
    return {
        id: 'speedChange',
        value: value,
        explode: false
    };
}


function speedDown(value = 200, explode = false) {
    return {
        id: 'speedChange',
        value: -value,
        explode: explode
    };
}

function turnTo(name) {
    return {
        id: 'turnTo',
        name: name
    }
}

function addTime(value = 10) {
    return {
        id: 'changeTime',
        value: value
    }
}

function addBitcoin(value = 1) {
    return {
        id: 'changeBitcoins',
        value: value
    }
}

function enableMatrix() {
    return {
        id: 'setMatrixMode',
        value: true
    }
}

function randomEffect(effects) {
    return {
        id: 'random',
        effects: effects
    }
}