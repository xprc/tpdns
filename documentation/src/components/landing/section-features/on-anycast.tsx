import Link from "@docusaurus/Link";
import { motion, MotionValue, useTransform } from "framer-motion";
import React, { FC } from "react";
import { TWBreakpoints } from "../../../hooks/use-tw-breakpoints";
import { ExternalLinkIcon } from "../icons/external-link-icon";
import { HeaderMobile } from "./header";

interface Props {
    scrollYProgress: MotionValue<number>;
    twBreakpoints: TWBreakpoints;
}

const OnAnycast: FC<Props> = ({ scrollYProgress, twBreakpoints }) => {
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);

    const opacityImage1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const translateYImage1 = useTransform(
        scrollYProgress,
        [0, 0.15],
        [0, -1000],
    );

    const opacityImage2 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <motion.div
            className="relative z-[1]"
            style={twBreakpoints.lg ? { opacity } : {}}
            whileInView={
                twBreakpoints.lg
                    ? {}
                    : {
                          opacity: 1,
                      }
            }
        >
            <div className="h-[1px] lg:snap-start bg-transparent" />
            {!twBreakpoints.lg && <HeaderMobile>Anycast</HeaderMobile>}
            <motion.div
                className="relative lg:sticky top-0 flex md:flex-row flex-col-reverse items-center justify-center h-auto lg:h-screen pt-4 lg:pt-[11rem]"
                style={
                    twBreakpoints.lg
                        ? {
                              opacity: opacityImage1,
                              translateY: translateYImage1,
                          }
                        : {}
                }
            >
                <motion.div className="relative flex flex-[1] item-start md:items-center h-full pointer-events-none 2xl:pr-16">
                    <p className="font-misans font-medium text-base 2xl:text-xl tracking-tight leading-[20px] max-w-[280px] 2xl:max-w-none mb-0 text-[#2A2A42] lg:translate-y-[-80%]">
                        <strong className="font-bold">传统 DNS 服务商</strong> 虽然基于{" "}
                        <strong className="font-bold">
                            Anycast DNS
                        </strong>{" "}
                        但由于政策原因,
                        <strong className="font-bold">
                            在中国境内没有服务器
                        </strong>{" "}
                        导致大陆的 DNS 查询常常超时
                        <br />
                        <div>
                            相反, TomsProject 融合DNS 通过 GeoDNS 技术{" "}
                            <strong className="font-bold">向中国大陆用户返回境内 DNS 服务器</strong>{" "}
                            而境外则使用{" "}
                            <strong className="font-bold">全球 Anycast DNS 服务器</strong>{" "}
                            从而绕开{" "}
                            <strong className="font-bold">
                                政策监管问题。
                            </strong>
                        </div>
                    </p>
                </motion.div>

                <motion.div
                    className="relative flex-[1] md:flex-[2]"
                    style={{
                        perspective: "500px",
                        perspectiveOrigin: "center",
                    }}
                    whileInView={
                        twBreakpoints.lg
                            ? {}
                            : {
                                  scale: [0, 1],
                              }
                    }
                >
                    <motion.img
                        className="z-[1]"
                        style={{
                            filter: "drop-shadow(14.4px 7.2px 21.6px rgba(0, 0, 0, 0.25))",
                            width: "100%",
                            maxWidth: "870px",
                            maxHeight: "644px",
                        }}
                        animate={{
                            translateZ: ["-5px", "5px"],
                        }}
                        transition={{
                            ease: "easeInOut",
                            duration: 3,
                            delay: 1,
                        }}
                        src="/landing/no-constraints/custom-ui.png"
                    />
                    <motion.div
                        className="font-misans bg-[#2A2A42] text-white text-xs md:text-2xl font-extrabold px-4 py-2 rounded-md absolute shadow-startTiles left-[10%] bottom-[26%] z-50"
                        initial={{
                            translateZ: "10px",
                        }}
                        transition={{
                            yoyo: Infinity,
                            ease: "easeInOut",
                            duration: 3,
                        }}
                    >
                        境内外都快
                    </motion.div>
                </motion.div>
            </motion.div>
            <motion.div
                className="flex md:flex-row flex-col-reverse items-center justify-center mt-16 lg:mt-0 h-auto lg:h-screen lg:snap-start pt-0 lg:pt-[11rem]"
                style={twBreakpoints.lg ? { opacity: opacityImage2 } : {}}
                whileInView={
                    twBreakpoints.lg
                        ? {}
                        : {
                              opacity: 1,
                          }
                }
            >
                <div className="flex flex-[1] flex-col font-misans font-medium text-base 2xl:text-xl 2xl:pr-16 text-[#2A2A42]">
                    <div className="lg:translate-y-[-80%]">
                        <p>
                            最重要的是<strong className="font-bold">自由</strong>
                            <div>
                                <strong className="font-bold">
                                    您可以自定义 DNS 提供商!
                                </strong>
                            </div>
                        </p>

                        <p>
                            <strong className="font-bold">TPDNS</strong>{" "}
                            支持多种 DNS 提供商组合
                            <div>
                                <strong className="font-bold">
                                    供您选择：
                                </strong>
                            </div>
                        </p>

                        <div className="flex flex-col gap-2">
                            <div className="">
                                <Link
                                    to="/docs"
                                    className="z-[1] border border-[#F0F2F5] bg-[#F6F6F9] border-solid rounded-[20px] h-7 w-[153px] flex items-center justify-between pl-3 py-1 pr-1"
                                >
                                    <div className="uppercase text-[#9696B4] text-[12px] leading-[12px] font-misans font-bold">
                                        更多信息
                                    </div>
                                    <div className="flex items-center justify-center w-5 h-5 pl-px bg-white rounded-full">
                                        <ExternalLinkIcon className="h-2.5 w-2.5 text-[#9696B4]" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="relative flex-[1] md:flex-[2]"
                    style={{
                        perspective: "500px",
                        perspectiveOrigin: "center",
                    }}
                    whileInView={
                        twBreakpoints.lg
                            ? {}
                            : {
                                  scale: [0, 1],
                              }
                    }
                >
                    <motion.img
                        className="z-[1]"
                        style={{
                            filter: "drop-shadow(14.4px 7.2px 21.6px rgba(0, 0, 0, 0.25))",
                            width: "100%",
                            maxWidth: "870px",
                            maxHeight: "644px",
                        }}
                        animate={{
                            translateZ: ["-5px", "5px"],
                        }}
                        transition={{
                            yoyo: Infinity,
                            ease: "easeInOut",
                            duration: 3,
                            delay: 1,
                        }}
                        src="/landing/no-constraints/dashboard-mui.png"
                    />
                    <motion.div
                        className="absolute left-0 md:left-[-40px] flex flex-col gap-1 md:gap-4 bottom-9 z-50"
                        initial={{
                            translateZ: "10px",
                        }}
                    >
                        <div className="font-misans flex justify-center bg-[#3FDCF7] text-white text-xs md:text-2xl font-extrabold px-2 py-1 rounded-md shadow-startTiles flex-shrink-0">
                            DNSPod
                        </div>
                        <div className="translate-x-[50%] md:translate-x-[40%] font-misans flex justify-center bg-[#1890FF] text-white text-xs md:text-2xl font-extrabold px-2 py-1 rounded-md shadow-startTiles flex-shrink-0">
                            阿里云云解析
                        </div>
                        <div className="translate-x-[120%] md:translate-x-[105%] font-misans flex justify-center bg-[#105FA9] text-white text-xs md:text-2xl font-extrabold px-2 py-1 rounded-md shadow-startTiles flex-shrink-0">
                            AWS Route 53
                        </div>
                        <div className="translate-x-[180%] md:translate-x-[150%] font-misans flex justify-center bg-[#450D87] text-white text-xs md:text-2xl font-extrabold px-2 py-1 rounded-md shadow-startTiles flex-shrink-0">
                            Gcore DNS
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default OnAnycast;
