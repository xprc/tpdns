import React from "react";
import { useReward } from "react-rewards";

import Heart from "/icons/heart.svg";
import styles from "./styles.module.css";

type ContributerTagProps = {
    name: string;
    url: string;
};

const ContributerTag: React.FC<ContributerTagProps> = ({ name, url }) => {
    const { reward: leftReward, isAnimating: leftIsAnimating } = useReward(
        "leftReward",
        "emoji",
        {
            emoji: ["๐ฅ", "โญ", "โค๏ธ"],
            // emoji: ["โค๏ธ", "๐", "๐", "๐งก", "๐"],
            angle: 45,
            elementCount: 80,
            startVelocity: 45,
            decay: 0.95,
            lifetime: 150,
        },
    );
    const { reward: rightReward, isAnimating: rightIsAnimating } = useReward(
        "rightReward",
        "emoji",
        {
            emoji: ["๐", "๐", "๐งก", "๐"],
            angle: 135,
            elementCount: 80,
            startVelocity: 45,
            decay: 0.95,
            lifetime: 150,
        },
    );

    return (
        <button
            disabled={leftIsAnimating || rightIsAnimating}
            onClick={(e) => {
                e.preventDefault();
                leftReward();
                rightReward();
            }}
            className={styles.container}
        >
            <Heart />
            <div className={styles.text}>
                <span className={styles.bold}>by</span>
                <a target="_blank" href={url} rel="noreferrer">
                    {name}
                </a>
            </div>
        </button>
    );
};

export default ContributerTag;
