import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BenefitIcons } from "../icons";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import styles from "./styles.module.css";

export const SectionBullets = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);

    const { lg } = useTWBreakpoints();

    const { scrollYProgress: scrollYProgressInnerIncoming } = useScroll({
        target: innerRef,
        offset: ["start end", "end end"],
    });

    const whyNotY = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.25, 1],
        [100, -50, 24],
    );

    const whyNotRotate = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.75, 1],
        [0, -3, -1.5],
    );

    const whyNotOpacity = useTransform(
        scrollYProgressInnerIncoming,
        [0, 0.25, 1],
        [0, 1, 1],
    );

    const bulletsOpacity = useTransform(
        scrollYProgressInnerIncoming,
        [0.75, 1],
        [0, 1],
    );

    const bulletsY = useTransform(
        scrollYProgressInnerIncoming,
        [0.75, 1],
        [180, 0],
    );

    return (
        // Scroll animated container
        <motion.div ref={ref} className="h-auto bg-white lg:h-screen">
            {/* Scroll animated section */}
            <motion.div
                ref={innerRef}
                className="relative top-0 left-0 flex flex-col w-screen h-auto pt-0 -mt-px overflow-x-hidden overflow-y-hidden lg:pt-8 max-w-ful lg:h-screen lg:snap-start"
            >
                <motion.div
                    className="flex items-center justify-center px-2 mt-8 opacity-100 lg:pt-8 short:pt-14 lg:pb-4 lg:px-0"
                    // animate={
                    //     !lg
                    //         ? {
                    //               opacity: 1,
                    //               rotate: -2,
                    //               translateY: 0,
                    //           }
                    //         : {}
                    // }
                    style={
                        lg
                            ? {
                                  rotate: whyNotRotate,
                                  translateY: whyNotY,
                                  opacity: whyNotOpacity,
                              }
                            : undefined
                    }
                    whileInView={
                        lg
                            ? undefined
                            : {
                                  opacity: [0, 1],
                                  translateY: [100, 0],
                                  rotate: [0, -3],
                              }
                    }
                    transition={
                        lg
                            ? undefined
                            : {
                                  repeat: 0,
                                  duration: 0.3,
                                  ease: "easeInOut",
                                  delay: 0.3,
                              }
                    }
                >
                    <motion.div className="h-fit z-[1] px-1 lg:px-5 -mx-16 bg-[#1784EB] font-extrabold font-misans text-white uppercase text-[36px] leading-[36px] lg:text-[52px] lg:leading-[63px]  lg:-rotate-3 shadow-startTiles flex rounded-lg">
                        ????????????????
                    </motion.div>
                </motion.div>
                <motion.div
                    animate={!lg ? { opacity: 1, translateY: 0 } : {}}
                    style={
                        lg
                            ? {
                                  opacity: bulletsOpacity,
                                  translateY: bulletsY,
                              }
                            : { opacity: 1, translateY: 0 }
                    }
                    className={styles.container}
                >
                    <div className={styles.gridWrapper}>
                        <div className={styles.gridContainer}>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 0,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.ChronoIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        <strong className="font-extrabold">
                                            ??????
                                        </strong>{" "}
                                        Anycast{" "}
                                        <strong className="font-extrabold">
                                            ???????????????
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 0.5,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.SsrIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        <div>
                                            <strong className="font-extrabold">
                                                ????????????
                                            </strong>{" "}
                                            ?????????{" "}
                                            <strong className="font-extrabold">
                                                ????????????0
                                            </strong>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 1,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.ReactIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        ??????{" "}
                                        <strong className="font-extrabold">
                                            GeoDNS
                                        </strong>{" "}
                                        &{" "}
                                        <strong className="font-extrabold">
                                            ?????????????????????
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 1.5,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.RouteIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        ??????{" "}
                                        <strong className="font-extrabold">
                                            TB ???
                                        </strong>{" "}
                                        DDoS ??????
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 2,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.AuthIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        TTL ????????????{" "}
                                        <strong className="font-extrabold">
                                            1s
                                        </strong>{" "}
                                        ??????????????????
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 2.5,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.RealtimeIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        SLA ??????
                                        <strong className="font-extrabold">
                                            99%
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 3,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [-100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardIconWrapper}>
                                        <BenefitIcons.AuditIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        ????????????{" "}
                                        <strong className="font-extrabold">
                                            ????????? API
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                            <div className={styles.gridItem}>
                                <motion.div
                                    animate={
                                        lg ? { scale: [1, 1.02] } : { scale: 1 }
                                    }
                                    transition={
                                        lg
                                            ? {
                                                  repeat: Infinity,
                                                  repeatType: "reverse",
                                                  duration: 2,
                                                  delay: 3.5,
                                              }
                                            : {
                                                  duration: 0.3,
                                                  ease: "easeInOut",
                                                  delay: 0.1,
                                              }
                                    }
                                    whileInView={
                                        lg
                                            ? undefined
                                            : {
                                                  opacity: [0, 1],
                                                  translateY: [100, 0],
                                                  translateX: [100, 0],
                                                  rotate: ["0deg", "0deg"],
                                              }
                                    }
                                    viewport={{
                                        margin: "20px",
                                    }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardText}>
                                        <BenefitIcons.GlobalIcon
                                            className={styles.cardIcon}
                                        />
                                    </div>
                                    <div className={styles.cardText}>
                                        ???????????????:{" "}
                                        <strong className="font-extrabold">
                                            ????????????!
                                        </strong>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center font-misans font-medium text-base xl:text-xl text-[#2A2A42] tracking-wide">
                        <p className="mb-0">
                            ?????? <strong className="font-bold">TomsProject ??????DNS</strong>{" "}
                            ???????????????????????????
                        </p>
                        <p className="mb-0">
                            ???????????????????????????
                        </p>
                    </div>
                </motion.div>
            </motion.div>
            {/* Scroll snap alignment */}
            {/* <div className="hidden h-screen lg:block snap-start" /> */}
        </motion.div>
    );
};
