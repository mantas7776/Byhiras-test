import React from 'react';
import { Player, Monster } from './Npcs';
import { NpcStatusProps } from './SharedTypes';

interface GameState {
    player: NpcStatusProps;
    monster: NpcStatusProps;
    lastHit: number | null;
}

const DICES = 2;

function getDice(): number {
    return Math.floor(Math.random() * 5) + 1;
}

class GameLogic extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            player: { health: 100, dices: [] },
            monster: { health: 100, dices: [] },
            lastHit: null,
        };
    }

    resetGame = () => {
        this.setState({
            player: { health: 100, dices: [] },
            monster: { health: 100, dices: [] },
            lastHit: null,
        });
    };

    reduceHealth = (lastHit: number) => {
        let who: 'player' | 'monster' = 'player';
        if (lastHit > 0) who = 'monster';
        this.setState(prevState => {
            let newState: GameState = { ...prevState };
            newState[who] = {
                ...prevState[who],
                health: prevState[who].health - Math.abs(lastHit),
            };
            newState.lastHit = lastHit;
            return newState;
        });
    };

    handleAttack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (this.state.player.health <= 0 || this.state.monster.health <= 0)
            return;

        let playerDices: number[] = [];
        let monsterDices: number[] = [];
        let lastHit: number = 0;
        for (let i = 0; i < DICES; i++) {
            let playerRoll = getDice();
            let monsterRoll = getDice();
            playerDices.push(playerRoll);
            monsterDices.push(monsterRoll);
            lastHit += playerRoll - monsterRoll;
        }

        this.reduceHealth(lastHit);

        this.setState(prevState => {
            return {
                player: { ...prevState.player, dices: playerDices },
                monster: { ...prevState.monster, dices: monsterDices },
            };
        });
    };

    render() {
        return (
            <div>
                <div className="game_logic">
                    <Player {...this.state.player} />
                    <AttackFrame
                        lastHit={this.state.lastHit}
                        onAttack={this.handleAttack}
                    />
                    <Monster {...this.state.monster} />
                </div>
                <div className="center_align">
                    <ResetButton
                        playerHealth={this.state.player.health}
                        monsterHealth={this.state.monster.health}
                        onClick={this.resetGame}
                    />
                </div>
            </div>
        );
    }
}

const ResetButton: React.FC<{
    playerHealth: number;
    monsterHealth: number;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = props => {
    if (props.playerHealth <= 0)
        return (
            <button onClick={props.onClick}>You lose! Click to reset</button>
        );

    if (props.monsterHealth <= 0)
        return <button onClick={props.onClick}>You Win! Click to reset</button>;

    return null;
};

const AttackFrame: React.FC<{
    lastHit: number | null;
    onAttack: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = props => {
    let lastHit: string = '-';
    let whoWasHit: string = 'Monster';
    if (props.lastHit !== null) {
        lastHit = Math.abs(props.lastHit).toString();
        if (props.lastHit >= 0) whoWasHit = 'You';
    }

    return (
        <div className="vertical_center">
            <div>
                {whoWasHit} hit for: {lastHit}!
            </div>
            <div>
                <button className="attack_btn" onClick={props.onAttack}>
                    Attack!
                </button>
            </div>
        </div>
    );
};

export default GameLogic;
