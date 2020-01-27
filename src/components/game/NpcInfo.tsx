import React from 'react';

interface NpcInfoProps {
    health: number;
    dices: number[];
}

const NpcInfo: React.FC<NpcInfoProps> = props => {
    return (
        <div className="vertical_center">
            <div>
                <div>Health: {props.health}</div>
                <DiceRolls dices={props.dices} />
            </div>
        </div>
    );
};

const DiceRolls: React.FC<{ dices: Number[] }> = props => {
    return (
        <>
            {props.dices.map((roll, index) => {
                return (
                    <div>
                        Dice {index} rolled: {roll}.
                    </div>
                );
            })}
        </>
    );
};

export default NpcInfo;
