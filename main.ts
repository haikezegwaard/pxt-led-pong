/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum Direction {
    //% block="omhoog"
    Up = 0,
    //% block="omlaag"
    Down = 1
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace LedWallCustom {

    // ============================ Constants
    let EVENT_UPDATE_SCORE: number = 667
    let EVENT_WIN: number = 668
    let EVENT_LOOSE: number = 669

    // ============================ Blocks


    /**
     * Initialize the LedWall tool
     */
    //% block
    //% group=LedWall
    export function startLedWall(): void {
        radio.setGroup(0);
        radio.onReceivedString(function (receivedString: string) {
            if (receivedString.includes("" + control.deviceSerialNumber())) { // this is me 
                let idx = receivedString.indexOf(":")
                let myscore: string = receivedString.substr(idx + 1, receivedString.length - idx)
                control.raiseEvent(667, parseInt(myscore))
            }
        })
    }

    /**
     * On score update block.
     */
    //% block="on score $receivedString update event"
    //% draggableParameters
    //% group=LedWall
    export function onScoreUpdate(cb: (receivedString: string) => void) {
        control.onEvent(EVENT_UPDATE_SCORE, 0, function () {
            cb("" + control.eventValue())
        })
    }

    // ======================== The rest

    /**
     * Steers your pong bat
     * @param: direction: direction of control
     */
    //% block
    //% group=LedWall
    export function controlBat(direction: Direction): void {
        let dirstr = 'A';
        if (direction == Direction.Down) {
            dirstr = 'B';
        }
        radio.sendString(control.deviceSerialNumber() + ":" + dirstr);
    }

    /**
     * Start the game
     */
    //% block
    //% group=LedWall
    export function startGame(): void {
        radio.sendString(control.deviceSerialNumber() + ":reset");
        basic.showString("Starting game")
    }

}

