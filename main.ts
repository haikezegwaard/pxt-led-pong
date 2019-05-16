/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum MyDirection {
    //% block="omhoog"
    Up = 0,
    //% block="omlaag"
    Down = 1
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace LedWallPong {

    // ============================ Constants
    let EVENT_UPDATE_SCORE: number = 667
    let EVENT_WIN: number = 668
    let EVENT_LOOSE: number = 669

    // ============================ Blocks


    /**
     * Initialize the LedWall tool
     */
    //% block="setup Led Wall"
    //% group=LedWallPong
    export function startLedWall(): void {
        radio.setGroup(0);
        radio.onReceivedString(function (receivedString: string) {
            if (receivedString.includes("" + control.deviceSerialNumber())) { // this is me
                let idx = receivedString.indexOf(":")
                let myscore: string = receivedString.substr(idx + 1, receivedString.length - idx)
                if(myscore.includes("win")){
                    control.raiseEvent(EVENT_WIN, 777)
                }else{
                    control.raiseEvent(EVENT_UPDATE_SCORE, parseInt(myscore))
                }
            }
        })
    }

    /**
     * On score update block.
     */
    //% block="wanneer score $score wordt geupdate"
    //% draggableParameters
    //% group=LedWallPong
    export function onScoreUpdate(cb: (score: string) => void) {
        control.onEvent(EVENT_UPDATE_SCORE, 0, function () {
            cb("" + control.eventValue())
        })
    }

    /**
     * On win game block.
     */
    //% block="wanneer spel gewonnen"    
    //% group=LedWallPong
    export function onGameWin(cb: () => void) {
        control.onEvent(EVENT_UPDATE_SCORE, 0, function () {
            cb()
        })
    }



    // ======================== The rest

    /**
     * Steers your pong bat
     * @param: direction: direction of control
     */
    //% block="stuur de Pong Bat naar $direction"
    //% group=LedWallPong
    export function controlBat(direction: MyDirection): void {
        let dirstr = 'A';
        if (direction == MyDirection.Down) {
            dirstr = 'B';
        }
        radio.sendString(control.deviceSerialNumber() + ":" + dirstr);
    }

    /**
     * Start the game
     */
    //% block="start/reset pong spel"
    //% group=LedWallPong
    export function startGame(): void {
        radio.sendString(control.deviceSerialNumber() + ":reset");
        basic.showString("Starting game")
    }

}

