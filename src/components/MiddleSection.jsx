import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MiddleSection = () => {
    const [hoveredBox, setHoveredBox] = useState(null)

    const handleMouseEnter = (boxId) => {
        setHoveredBox(boxId)
    }

    const handleMouseLeave = () => {
        setHoveredBox(null)
    }

    // Animation variants for each box
    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    }

    const circleVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { delay: 0.5, duration: 0.3, ease: "backOut" }
        }
    }

    const textVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.8 + (i * 0.1),
                duration: 0.5,
                ease: "easeOut"
            }
        })
    }

    // Box animation variants with movement only (no scaling)
    const getBoxVariants = (boxId) => ({
        initial: {
            y: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        hover: {
            y: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        moveUp: {
            y: -60,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        moveDown: {
            y: 60,
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    })

    // Function to determine animation state for each box
    const getBoxAnimationState = (boxId, hoveredBox) => {
        if (hoveredBox === boxId) return "hover"
        if (!hoveredBox) return "initial"

        switch (hoveredBox) {
            case 'box1': // top-box hovered - others move down
                return boxId !== 'box1' ? "moveDown" : "hover"

            case 'box2': // second-box hovered - top moves up, others move down
                if (boxId === 'box1') return "moveUp"
                return boxId !== 'box2' ? "moveDown" : "hover"

            case 'box3': // third-box hovered - top two move up, fourth moves down
                if (boxId === 'box1' || boxId === 'box2') return "moveUp"
                if (boxId === 'box4') return "moveDown"
                return "hover"

            case 'box4': // fourth-box hovered - others move up
                return boxId !== 'box4' ? "moveUp" : "hover"

            default:
                return "initial"
        }
    }

    // Z-index management - keep constant, no changes on hover
    const getZIndex = (boxId, hoveredBox) => {
        const baseZIndex = {
            'box1': 10,
            'box2': 9,
            'box3': 8,
            'box4': 7
        }

        // Return base z-index without changes on hover
        return baseZIndex[boxId]
    }

    return (
        <div className='middle-section' style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '20px',
            marginTop: '165px',
        }}>
            {/* Box 1 - INGEST */}
            <motion.div
                className="top-box"
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: getZIndex('box1', hoveredBox),
                    position: 'relative',
                    opacity: hoveredBox && hoveredBox !== 'box1' ? 0.4 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                }}
                variants={getBoxVariants('box1')}
                initial="initial"
                animate={getBoxAnimationState('box1', hoveredBox)}
                onMouseEnter={() => handleMouseEnter('box1')}
                onMouseLeave={handleMouseLeave}
            >
                {/* Animation for Box 1 */}
                <AnimatePresence>
                    {hoveredBox === 'box1' && (
                  <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{
                      position: 'absolute',
                      top: '-583px', // Changed from '-575px' (moved up by 15px)
                      left: '134.5%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: '-12',
                      pointerEvents: 'none',
                  }}
                  width="500"
                  height="200"
                  viewBox="0 0 500 200"
              >
                  <defs>
                      <linearGradient
                          id="lineGradient"
                          x1="500"
                          y1="0"
                          x2="0"
                          y2="200"
                          gradientUnits="userSpaceOnUse"
                      >
                          <stop stopColor="#000000" />
                          <stop offset="1" stopColor="#666666" stopOpacity="0" />
                      </linearGradient>
                  </defs>
              
                  <g style={{ transform: 'rotate(-30deg)', transformOrigin: '150px 75px' }}>
                      <motion.path
                          d="M30 75 H110 L141 15"
                          fill="none"
                          stroke="url(#lineGradient)"
                          strokeWidth="1.5"
                          strokeOpacity="0.5"
                          variants={lineVariants}
                      />
                  </g>

                            <motion.circle
                                cx="112"
                                cy="23"
                                r="5"
                                fill="#000000"
                                variants={circleVariants}
                            />

                            <motion.circle
                                cx="112"
                                cy="23"
                                r="20"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="1"
                                strokeDasharray="2 3"
                                variants={{
                                    hidden: { scale: 0, opacity: 0 },
                                    visible: {
                                        scale: 1,
                                        opacity: 0.6,
                                        transition: { delay: 0.8, duration: 0.3, ease: "backOut" }
                                    }
                                }}
                            />

                            <motion.g>
                                <motion.text x="140" y="25" fill="#000000" fontSize="10" fontWeight="400" fontFamily="Source Code Pro" custom={0} variants={textVariants}>
                                    01 - A_ocr
                                </motion.text>
                                <motion.text x="140" y="45" fill="#000000" fontSize="12" opacity="0.7" custom={1} variants={textVariants}>
                                    Upload files or data from
                                </motion.text>
                                <motion.text x="140" y="60" fill="#000000" fontSize="12" opacity="0.7" custom={2} variants={textVariants}>
                                    emails, cloud storage
                                </motion.text>
                                <motion.text x="140" y="75" fill="#000000" fontSize="12" opacity="0.7" custom={3} variants={textVariants}>
                                    services, support tickets,
                                </motion.text>
                                <motion.text x="140" y="90" fill="#000000" fontSize="12" opacity="0.7" custom={4} variants={textVariants}>
                                    and just about any data
                                </motion.text>
                                <motion.text x="140" y="105" fill="#000000" fontSize="12" opacity="0.7" custom={5} variants={textVariants}>
                                    source.
                                </motion.text>
                            </motion.g>
                        </motion.svg>
                    )}
                </AnimatePresence>

                {/* Existing SVG elements */}
                <svg style={{
                    position: 'absolute',
                    top: '-555px', // Changed from '-540px' (moved up by 15px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    zIndex: '10',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="605" height="350" viewBox="0 0 605 350" fill="none">
                    <foreignObject x="-37.3095" y="-37.0394" width="679.778" height="424.298">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3407_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M302.251 349.28L604.372 174.919L302.908 0.9375L0.787109 175.298L302.251 349.28Z" fill="#141414" fillOpacity="0.2" stroke="#FBFEFC" strokeWidth="0.283597" />
                    <defs>
                        <clipPath id="bgblur_0_571_3407_clip_path" transform="translate(37.3095 37.0394)">
                            <path d="M302.251 349.28L604.372 174.919L302.908 0.9375L0.787109 175.298L302.251 349.28Z" />
                        </clipPath>
                    </defs>
                </svg>
                <svg style={{
                    position: 'absolute',
                    top: '-474px', // Changed from '-459px' (moved up by 15px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    zIndex: '10',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="605" height="203" viewBox="0 0 605 203" fill="none">
                    <foreignObject x="-37.1674" y="-37.473" width="679.494" height="277.927">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3406_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <g data-figma-bg-blur-radius="37.8129">
                        <path d="M604.372 27.0855L302.251 202.478L0.787109 27.4668V27.0855V0.967226L302.251 175.979L604.372 0.585938V27.0855Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M302.251 175.788V175.979M302.251 202.478L604.372 27.0855V0.585938L302.251 175.979M302.251 202.478V175.979M302.251 202.478L0.787109 27.4668V27.0855V0.967226L302.251 175.979" stroke="#FBFEFC" strokeWidth="0.283597" />
                    </g>
                    <defs>
                        <clipPath id="bgblur_0_571_3406_clip_path" transform="translate(37.1674 37.473)">
                            <path d="M604.372 27.0855L302.251 202.478L0.787109 27.4668V27.0855V0.967226L302.251 175.979L604.372 0.585938V27.0855Z" />
                        </clipPath>
                    </defs>
                </svg>

                {/* Small boxes */}
                <svg style={{
                    position: 'absolute',
                    top: '-561px', // Changed from '-546px' (moved up by 15px)
                    left: '33%',
                    transform: 'translate(-50%, -50%) scale(0.77)',
                    zIndex: "11",
                    opacity: 1,
                    transition: 'all 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="172" height="128" viewBox="0 0 172 128" fill="none">
                    <foreignObject x="-37.0023" y="12.0504" width="245.613" height="153.692">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3411_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <g data-figma-bg-blur-radius="37.8129">
                        <path d="M170.536 78.6394L85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305L170.536 50.3164V78.6394Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M85.7121 120.173V99.305M85.7121 127.628L170.536 78.6394V50.3164L85.7121 99.305M85.7121 127.628V99.305M85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    </g>
                    <foreignObject x="-37.2626" y="-36.848" width="246.134" height="174.325">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_1_571_3411_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M85.7121 99.3609L170.536 50.2599L85.8965 1.26562L1.07227 50.3666L85.7121 99.3609Z" fill="#141414" fillOpacity="0.2" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    <defs>
                        <clipPath id="bgblur_0_571_3411_clip_path" transform="translate(37.0023 -12.0504)">
                            <path d="M170.536 78.6394L85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305L170.536 50.3164V78.6394Z" />
                        </clipPath>
                        <clipPath id="bgblur_1_571_3411_clip_path" transform="translate(37.2626 36.848)">
                            <path d="M85.7121 99.3609L170.536 50.2599L85.8965 1.26562L1.07227 50.3666L85.7121 99.3609Z" />
                        </clipPath>
                    </defs>
                </svg>
                <svg style={{
                    position: 'absolute',
                    top: '-625px', // Changed from '-610px' (moved up by 15px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.77)',
                    zIndex: "11",
                    opacity: 1,
                    transition: 'all 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="172" height="128" viewBox="0 0 172 128" fill="none">
                    <foreignObject x="-37.0023" y="12.0504" width="245.613" height="153.692">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3411_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <g data-figma-bg-blur-radius="37.8129">
                        <path d="M170.536 78.6394L85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305L170.536 50.3164V78.6394Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M85.7121 120.173V99.305M85.7121 127.628L170.536 78.6394V50.3164L85.7121 99.305M85.7121 127.628V99.305M85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    </g>
                    <foreignObject x="-37.2626" y="-36.848" width="246.134" height="174.325">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_1_571_3411_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M85.7121 99.3609L170.536 50.2599L85.8965 1.26562L1.07227 50.3666L85.7121 99.3609Z" fill="#141414" fillOpacity="0.2" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    <defs>
                        <clipPath id="bgblur_0_571_3411_clip_path" transform="translate(37.0023 -12.0504)">
                            <path d="M170.536 78.6394L85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305L170.536 50.3164V78.6394Z" />
                        </clipPath>
                        <clipPath id="bgblur_1_571_3411_clip_path" transform="translate(37.2626 36.848)">
                            <path d="M85.7121 99.3609L170.536 50.2599L85.8965 1.26562L1.07227 50.3666L85.7121 99.3609Z" />
                        </clipPath>
                    </defs>
                </svg>
                <svg style={{
                    position: 'absolute',
                    top: '-565px', // Changed from '-550px' (moved up by 15px)
                    left: '67%',
                    transform: 'translate(-50%, -50%) scale(0.77)',
                    zIndex: "11",
                    opacity: 1,
                    transition: 'all 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="172" height="128" viewBox="0 0 172 128" fill="none">
                    <foreignObject x="-37.0023" y="12.0504" width="245.613" height="153.692">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3411_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <g data-figma-bg-blur-radius="37.8129">
                        <path d="M170.536 78.6394L85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305L170.536 50.3164V78.6394Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M85.7121 120.173V99.305M85.7121 127.628L170.536 78.6394V50.3164L85.7121 99.305M85.7121 127.628V99.305M85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    </g>
                    <foreignObject x="-37.2626" y="-36.848" width="246.134" height="174.325">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_1_571_3411_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M85.7121 99.3609L170.536 50.2599L85.8965 1.26562L1.07227 50.3666L85.7121 99.3609Z" fill="#141414" fillOpacity="0.2" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    <defs>
                        <clipPath id="bgblur_0_571_3411_clip_path" transform="translate(37.0023 -12.0504)">
                            <path d="M170.536 78.6394L85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305L170.536 50.3164V78.6394Z" />
                        </clipPath>
                        <clipPath id="bgblur_1_571_3411_clip_path" transform="translate(37.2626 36.848)">
                            <path d="M85.7121 99.3609L170.536 50.2599L85.8965 1.26562L1.07227 50.3666L85.7121 99.3609Z" />
                        </clipPath>
                    </defs>
                </svg>
                <svg style={{
                    position: 'absolute',
                    top: '-505px', // Changed from '-490px' (moved up by 15px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.77)',
                    zIndex: "11",
                    opacity: 1,
                    transition: 'all 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="172" height="128" viewBox="0 0 172 128" fill="none">
                    <foreignObject x="-37.0023" y="12.0504" width="245.613" height="153.692">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3411_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <g data-figma-bg-blur-radius="37.8129">
                        <path d="M170.536 78.6394L85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305L170.536 50.3164V78.6394Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M85.7121 120.173V99.305M85.7121 127.628L170.536 78.6394V50.3164L85.7121 99.305M85.7121 127.628V99.305M85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    </g>
                    <foreignObject x="-37.2626" y="-36.848" width="246.134" height="174.325">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_1_571_3411_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M85.7121 99.3609L170.536 50.2599L85.8965 1.26562L1.07227 50.3666L85.7121 99.3609Z" fill="#141414" fillOpacity="0.2" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    <defs>
                        <clipPath id="bgblur_0_571_3411_clip_path" transform="translate(37.0023 -12.0504)">
                            <path d="M170.536 78.6394L85.7121 127.628L1.07227 78.7459V78.6394V50.4229L85.7121 99.305L170.536 50.3164V78.6394Z" />
                        </clipPath>
                        <clipPath id="bgblur_1_571_3411_clip_path" transform="translate(37.2626 36.848)">
                            <path d="M85.7121 99.3609L170.536 50.2599L85.8965 1.26562L1.07227 50.3666L85.7121 99.3609Z" />
                        </clipPath>
                    </defs>
                </svg>
                {/* lines */}
                <svg style={{
                    position: 'absolute',
                    top: '-585px', // Changed from '-570px' (moved up by 15px)
                    left: '43%',
                    transform: 'translate(-50%, -50%) scale(0.77)',
                    zIndex: "10",
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="715" height="310" viewBox="0 0 715 310" fill="none">
                    <path d="M588.981 155.084L678.667 103.303L608.005 62.5061M608.005 62.5061L714.51 1.01562M608.005 62.5061L547.314 27.4662L463.975 75.5821M241.684 153.515L132.892 90.7038L89.3691 115.832M359.89 296.304L337.4 309.289L45.8459 140.96L89.3691 115.832M89.3691 115.832L1.0874 64.8624" stroke="url(#paint0_linear_525_1670)" strokeWidth="1.04607" />
                    <defs>
                        <linearGradient id="paint0_linear_525_1670" x1="714.51" y1="0.787927" x2="-0.347521" y2="38.2981" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FBFEFC" stopOpacity="0" />
                            <stop offset="0.475962" />
                            <stop offset="1" stopColor="#969897" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
                <img style={{ position: 'absolute', top: '-555px', right: '-22px', transform: 'translate(-50%, -50%) scale(1)' }} src="./[ 01 ].svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-534px', left: "37%", transform: 'translate(-50%, -50%) scale(0.9)' }} src="./GMAIL.svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-599px', left: "54%", transform: 'translate(-50%, -50%) scale(0.9)' }} src="./PAPER.svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-536px', left: "70%", transform: 'translate(-50%, -50%) scale(0.9)' }} src="./DRIVE.svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-485px', left: "56%", transform: 'translate(-50%, -50%) scale(0.9)' }} src="./sharepoint.svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-418px', left: "55%", transform: 'translate(-50%, -50%) scale(1.1)' }} src="./INGEST.svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-662px', left: "86%", transform: 'translate(-50%, -50%) scale(0.99)' }} src="./INGEST.svg" alt="" />
            </motion.div>

            {/* Box 2 - PROCESS */}
            <motion.div
                className="second-box"
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: getZIndex('box2', hoveredBox),
                    position: 'relative',
                    opacity: hoveredBox && hoveredBox !== 'box2' ? 0.4 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                }}
                variants={getBoxVariants('box2')}
                initial="initial"
                animate={getBoxAnimationState('box2', hoveredBox)}
                onMouseEnter={() => handleMouseEnter('box2')}
                onMouseLeave={handleMouseLeave}
            >
                {/* Animation for Box 2 */}
                <AnimatePresence>
                    {hoveredBox === 'box2' && (
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            style={{
                                position: 'absolute',
                                top: '-490px',
                                left: '134.5%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: '-12',
                                pointerEvents: 'none',
                            }}
                            width="500"
                            height="200"
                            viewBox="0 0 500 200"
                        >
                            <defs>
                                <linearGradient
                                    id="lineGradient2"
                                    x1="500"
                                    y1="0"
                                    x2="0"
                                    y2="200"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#000000" />
                                    <stop offset="1" stopColor="#666666" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        
                            <g style={{ transform: 'rotate(-30deg)', transformOrigin: '150px 75px' }}>
                                <motion.path
                                    d="M30 75 H110 L141 15"
                                    fill="none"
                                    stroke="url(#lineGradient2)"
                                    strokeWidth="1.5"
                                    strokeOpacity="0.5"
                                    variants={lineVariants}
                                />
                            </g>

                            <motion.circle
                                cx="112"
                                cy="23"
                                r="5"
                                fill="#000000"
                                variants={circleVariants}
                            />

                            <motion.circle
                                cx="112"
                                cy="23"
                                r="20"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="1"
                                strokeDasharray="2 3"
                                variants={{
                                    hidden: { scale: 0, opacity: 0 },
                                    visible: {
                                        scale: 1,
                                        opacity: 0.6,
                                        transition: { delay: 0.8, duration: 0.3, ease: "backOut" }
                                    }
                                }}
                            />

                            <motion.g>
                                <motion.text x="140" y="25" fill="#000000" fontSize="10" fontWeight="400" fontFamily="Source Code Pro" custom={0} variants={textVariants}>
                                    02 - PROCESS
                                </motion.text>
                                <motion.text x="140" y="45" fill="#000000" fontSize="12" opacity="0.7" custom={1} variants={textVariants}>
                                    Analyze and transform
                                </motion.text>
                                <motion.text x="140" y="60" fill="#000000" fontSize="12" opacity="0.7" custom={2} variants={textVariants}>
                                    your data with AI-powered
                                </motion.text>
                                <motion.text x="140" y="75" fill="#000000" fontSize="12" opacity="0.7" custom={3} variants={textVariants}>
                                    intelligence and automation
                                </motion.text>
                                <motion.text x="140" y="90" fill="#000000" fontSize="12" opacity="0.7" custom={4} variants={textVariants}>
                                    for optimal results.
                                </motion.text>
                            </motion.g>
                        </motion.svg>
                    )}
                </AnimatePresence>

                <svg style={{
                    position: 'absolute',
                    top: '-460px',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out',

                }} xmlns="http://www.w3.org/2000/svg" width="605" height="350" viewBox="0 0 605 350" fill="none">
                    <foreignObject x="-20.1344" y="-20.0387" width="645.428" height="390.187">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(10.46px)',
                            clipPath: 'url(#bgblur_0_571_3398_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="20.9215" d="M302.251 349.226L604.372 174.865L302.908 0.882812L0.787109 175.244L302.251 349.226Z" fill="black" fillOpacity="0.1" />
                    <defs>
                        <clipPath id="bgblur_0_571_3398_clip_path" transform="translate(20.1344 20.0387)">
                            <path d="M302.251 349.226L604.372 174.865L302.908 0.882812L0.787109 175.244L302.251 349.226Z" />
                        </clipPath>
                    </defs>
                </svg>

                <svg style={{ position: 'absolute', top: '-450px', left: '58%', transform: 'translate(-50%, -50%) scale(0.81)' }} xmlns="http://www.w3.org/2000/svg" width="327" height="189" viewBox="0 0 327 189" fill="none">
                    <path d="M17.0178 136.859L106.457 188.497L217.079 124.629M17.0178 136.859L0.80365 127.498L2.37276 126.592L111.426 63.6301M17.0178 136.859L236.694 10.0292M236.694 10.0292L220.479 0.667969L165.953 32.149M236.694 10.0292L326.133 61.6671L271.606 93.1481M111.426 63.6301L217.079 124.629M111.426 63.6301L165.953 32.149M217.079 124.629L271.606 93.1481M165.953 32.149L271.606 93.1481" stroke="#FBFEFC" strokeWidth="0.567193" />
                </svg>

                <svg style={{ position: 'absolute', top: '-465px', left: '33%', transform: 'translate(-50%, -50%) scale(0.81)' }} xmlns="http://www.w3.org/2000/svg" width="161" height="83" viewBox="0 0 161 83" fill="none">
                    <path d="M73.668 1.29297L1.48889 42.9653L20.3185 53.8366L92.4974 12.1641L73.668 1.29297Z" stroke="#FBFEFC" strokeWidth="0.567193" />
                    <path d="M159.969 29.9196L68.9607 82.4634L48.5622 70.6863L139.571 18.1426L159.969 29.9196Z" stroke="#FBFEFC" strokeWidth="0.567193" />
                </svg>

                <img style={{ position: 'absolute', top: '-460px', right: '-25px', transform: 'translate(-50%, -50%) scale(1)' }} src="./[ 02 ].svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-351px', left: "56.3%", transform: 'translate(-50%, -50%) scale(0.98)' }} src="./UNDERSTAND.svg" alt="" />

            </motion.div>

            {/* Box 3 - TRANSFORM */}
            <motion.div
                className="third-box"
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: getZIndex('box3', hoveredBox),
                    position: 'relative',
                    opacity: hoveredBox && hoveredBox !== 'box3' ? 0.4 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                }}
                variants={getBoxVariants('box3')}
                initial="initial"
                animate={getBoxAnimationState('box3', hoveredBox)}
                onMouseEnter={() => handleMouseEnter('box3')}
                onMouseLeave={handleMouseLeave}
            >
                {/* Animation for Box 3 */}
                <AnimatePresence>   
                    {hoveredBox === 'box3' && (
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            style={{
                                position: 'absolute',
                                top: '-418px',
                                left: '134.5%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: '-12',
                                pointerEvents: 'none',
                            }}
                            width="500"
                            height="200"
                            viewBox="0 0 500 200"
                        >
                            <defs>
                                <linearGradient
                                    id="lineGradient3"
                                    x1="500"
                                    y1="0"
                                    x2="0"
                                    y2="200"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#000000" />
                                    <stop offset="1" stopColor="#666666" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        
                            <g style={{ transform: 'rotate(-30deg)', transformOrigin: '150px 75px' }}>
                                <motion.path
                                    d="M30 75 H110 L141 15"
                                    fill="none"
                                    stroke="url(#lineGradient3)"
                                    strokeWidth="1.5"
                                    strokeOpacity="0.5"
                                    variants={lineVariants}
                                />
                            </g>

                            <motion.circle
                                cx="112"
                                cy="23"
                                r="5"
                                fill="#000000"
                                variants={circleVariants}
                            />

                            <motion.circle
                                cx="112"
                                cy="23"
                                r="20"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="1"
                                strokeDasharray="2 3"
                                variants={{
                                    hidden: { scale: 0, opacity: 0 },
                                    visible: {
                                        scale: 1,
                                        opacity: 0.6,
                                        transition: { delay: 0.8, duration: 0.3, ease: "backOut" }
                                    }
                                }}
                            />

                            <motion.g>
                                <motion.text x="140" y="25" fill="#000000" fontSize="10" fontWeight="400" fontFamily="Source Code Pro" custom={0} variants={textVariants}>
                                    03 - TRANSFORM
                                </motion.text>
                                <motion.text x="140" y="45" fill="#000000" fontSize="12" opacity="0.7" custom={1} variants={textVariants}>
                                    Convert data into
                                </motion.text>
                                <motion.text x="140" y="60" fill="#000000" fontSize="12" opacity="0.7" custom={2} variants={textVariants}>
                                    actionable insights and
                                </motion.text>
                                <motion.text x="140" y="75" fill="#000000" fontSize="12" opacity="0.7" custom={3} variants={textVariants}>
                                    visualizations for better
                                </motion.text>
                                <motion.text x="140" y="90" fill="#000000" fontSize="12" opacity="0.7" custom={4} variants={textVariants}>
                                    decision making.
                                </motion.text>
                            </motion.g>
                        </motion.svg>
                    )}
                </AnimatePresence>

                <svg style={{
                    position: 'absolute',
                    top: '-390px',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="605" height="350" viewBox="0 0 605 350" fill="none">
                    <foreignObject x="-20.1344" y="-20.0387" width="645.428" height="390.187">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(10.46px)',
                            clipPath: 'url(#bgblur_0_571_3398_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="20.9215" d="M302.251 349.226L604.372 174.865L302.908 0.882812L0.787109 175.244L302.251 349.226Z" fill="black" fillOpacity="0.1" />
                    <defs>
                        <clipPath id="bgblur_0_571_3398_clip_path" transform="translate(20.1344 20.0387)">
                            <path d="M302.251 349.226L604.372 174.865L302.908 0.882812L0.787109 175.244L302.251 349.226Z" />
                        </clipPath>
                    </defs>
                </svg>

                <svg style={{ position: 'absolute', top: '-308px', left: '50%', transform: 'translate(-50%, -50%) scale(0.81)' }} xmlns="http://www.w3.org/2000/svg" width="668" height="266" viewBox="0 0 668 266" fill="none">
                    <g filter="url(#filter0_d_571_3391)">
                        <path d="M636.089 58.792L333.969 233.276L32.5044 59.1713V58.792V32.809L333.969 206.914L636.089 32.4297V58.792Z" fill="black" />
                        <path d="M333.969 206.724V206.914M333.969 233.276L636.089 58.7919V32.4297L333.969 206.914M333.969 233.276V206.914M333.969 233.276L32.5044 59.1713V58.7919V32.809L333.969 206.914" stroke="#202020" strokeWidth="1.04607" />
                    </g>
                    <defs>
                        <filter id="filter0_d_571_3391" x="0.599209" y="0.141201" width="667.395" height="265.12" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="15.6911" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_571_3391" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_571_3391" result="shape" />
                        </filter>
                    </defs>
                </svg>

                <img style={{ zIndex: '120', position: 'absolute', top: '-388px', right: '-25px', transform: 'translate(-50%, -50%) scale(1)' }} src="./[ 03 ].svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-256px', left: "56.3%", transform: 'translate(-50%, -50%) scale(0.9)' }} src="./TAKE ACTION.svg" alt="" />
                <img style={{ width: 'auto', zIndex: '120', position: 'absolute', top: '-360px', left: "90.3%", transform: 'translate(-50%, -50%) scale(0.9)' }} src="./a_OCR.svg" alt="A_paratus" />

            </motion.div>

            {/* Box 4 - DELIVER */}
            <motion.div
                className="fourth-box"
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: getZIndex('box4', hoveredBox),
                    position: 'relative',
                    opacity: hoveredBox && hoveredBox !== 'box4' ? 0.4 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                }}
                variants={getBoxVariants('box4')}
                initial="initial"
                animate={getBoxAnimationState('box4', hoveredBox)}
                onMouseEnter={() => handleMouseEnter('box4')}
                onMouseLeave={handleMouseLeave}
            >
                {/* Animation for Box 4 */}
                <AnimatePresence>
                    {hoveredBox === 'box4' && (
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            style={{
                                position: 'absolute',
                                top: '-360px',
                                left: '134.5%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: '-12',
                                pointerEvents: 'none',
                            }}
                            width="500"
                            height="200"
                            viewBox="0 0 500 200"
                        >
                            <defs>
                                <linearGradient
                                    id="lineGradient4"
                                    x1="500"
                                    y1="0"
                                    x2="0"
                                    y2="200"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#000000" />
                                    <stop offset="1" stopColor="#666666" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        
                            <g style={{ transform: 'rotate(-30deg)', transformOrigin: '150px 75px' }}>
                                <motion.path
                                    d="M30 75 H110 L141 15"
                                    fill="none"
                                    stroke="url(#lineGradient4)"
                                    strokeWidth="1.5"
                                    strokeOpacity="0.5"
                                    variants={lineVariants}
                                />
                            </g>

                            <motion.circle
                                cx="112"
                                cy="23"
                                r="5"
                                fill="#000000"
                                variants={circleVariants}
                            />

                            <motion.circle
                                cx="112"
                                cy="23"
                                r="20"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="1"
                                strokeDasharray="2 3"
                                variants={{
                                    hidden: { scale: 0, opacity: 0 },
                                    visible: {
                                        scale: 1,
                                        opacity: 0.6,
                                        transition: { delay: 0.8, duration: 0.3, ease: "backOut" }
                                    }
                                }}
                            />

                            <motion.g>
                                <motion.text x="140" y="25" fill="#000000" fontSize="10" fontWeight="400" fontFamily="Source Code Pro" custom={0} variants={textVariants}>
                                    04 - DELIVER
                                </motion.text>
                                <motion.text x="140" y="45" fill="#000000" fontSize="12" opacity="0.7" custom={1} variants={textVariants}>
                                    Export and share results
                                </motion.text>
                                <motion.text x="140" y="60" fill="#000000" fontSize="12" opacity="0.7" custom={2} variants={textVariants}>
                                    across your organization
                                </motion.text>
                                <motion.text x="140" y="75" fill="#000000" fontSize="12" opacity="0.7" custom={3} variants={textVariants}>
                                    with seamless integration
                                </motion.text>
                                <motion.text x="140" y="90" fill="#000000" fontSize="12" opacity="0.7" custom={4} variants={textVariants}>
                                    and deployment.
                                </motion.text>
                            </motion.g>
                        </motion.svg>
                    )}
                </AnimatePresence>

                <svg style={{
                    position: 'absolute',
                    top: '-253px', // Changed from '-228px' (moved up by 25px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="270" height="156" viewBox="0 0 270 156" fill="none"> <foreignObject x="-37.3964" y="-37.5512" width="344.465" height="231.243"><div xmlns="http://www.w3.org/1999/xhtml" style={{ backdropFilter: 'blur(18.91px)', clipPath: 'url(#bgblur_0_571_3378_clip_path)', height: '100%', width: '100%' }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M134.69 155.577L268.734 77.9856L134.982 0.5625L0.938477 78.1543L134.69 155.577Z" fill="#141414" fillOpacity="0.2" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    <defs>
                        <clipPath id="bgblur_0_571_3378_clip_path" transform="translate(37.3964 37.5512)">
                            <path d="M134.69 155.577L268.734 77.9856L134.982 0.5625L0.938477 78.1543L134.69 155.577Z" />
                        </clipPath>
                    </defs>
                </svg>
                <svg style={{
                    position: 'absolute',
                    top: '-328px', // Changed from '-303px' (moved up by 25px)
                    left: '25%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="270" height="156" viewBox="0 0 270 156" fill="none">
                    <foreignObject x="-37.3964" y="-37.5512" width="344.465" height="231.243">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3378_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M134.69 155.577L268.734 77.9856L134.982 0.5625L0.938477 78.1543L134.69 155.577Z" fill="#141414" fillOpacity="0.2" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    <defs>
                        <clipPath id="bgblur_0_571_3378_clip_path" transform="translate(37.3964 37.5512)">
                            <path d="M134.69 155.577L268.734 77.9856L134.982 0.5625L0.938477 78.1543L134.69 155.577Z" />
                        </clipPath>
                    </defs>
                </svg>
                <svg style={{
                    position: 'absolute',
                    top: '-328px', // Changed from '-303px' (moved up by 25px)
                    left: '75%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="270" height="156" viewBox="0 0 270 156" fill="none">
                    <foreignObject x="-37.3964" y="-37.5512" width="344.465" height="231.243">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3378_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M134.69 155.577L268.734 77.9856L134.982 0.5625L0.938477 78.1543L134.69 155.577Z" fill="#141414" fillOpacity="0.2" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    <defs>
                        <clipPath id="bgblur_0_571_3378_clip_path" transform="translate(37.3964 37.5512)">
                            <path d="M134.69 155.577L268.734 77.9856L134.982 0.5625L0.938477 78.1543L134.69 155.577Z" />
                        </clipPath>
                    </defs>
                </svg>
                <svg style={{
                    position: 'absolute',
                    top: '-408px', // Changed from '-303px' (moved up by 25px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="270" height="156" viewBox="0 0 270 156" fill="none">
                    <foreignObject x="-37.3964" y="-37.5512" width="344.465" height="231.243">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3378_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="37.8129" d="M134.69 155.577L268.734 77.9856L134.982 0.5625L0.938477 78.1543L134.69 155.577Z" fill="#141414" fillOpacity="0.2" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    <defs>
                        <clipPath id="bgblur_0_571_3378_clip_path" transform="translate(37.3964 37.5512)">
                            <path d="M134.69 155.577L268.734 77.9856L134.982 0.5625L0.938477 78.1543L134.69 155.577Z" />
                        </clipPath>
                    </defs>
                </svg>

                <svg style={{
                    position: 'absolute',
                    top: '-213px', // Changed from '-188px' (moved up by 25px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="269" height="101" viewBox="0 0 269 101" fill="none">
                    <foreignObject x="-37.1361" y="-37.1957" width="343.944" height="175.954">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3377_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject><g data-figma-bg-blur-radius="37.8129">
                        <path d="M268.734 23.2273L134.69 100.641L0.938477 23.3956V12.7666V1.2386L134.69 78.4844L268.734 1.07031V23.2273Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M134.69 78.4002V78.4844M134.69 100.641L268.734 23.2273V1.07031L134.69 78.4844M134.69 100.641V78.4844M134.69 100.641L0.938477 23.3956V12.7666V1.2386L134.69 78.4844" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    </g>
                    <defs>
                        <clipPath id="bgblur_0_571_3377_clip_path" transform="translate(37.1361 37.1957)"><path d="M268.734 23.2273L134.69 100.641L0.938477 23.3956V12.7666V1.2386L134.69 78.4844L268.734 1.07031V23.2273Z" />
                        </clipPath></defs>
                </svg>
                <svg style={{
                    position: 'absolute',
                    top: '-368px', // Changed from '-188px' (moved up by 25px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="269" height="101" viewBox="0 0 269 101" fill="none">
                    <foreignObject x="-37.1361" y="-37.1957" width="343.944" height="175.954">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3377_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject><g data-figma-bg-blur-radius="37.8129">
                        <path d="M268.734 23.2273L134.69 100.641L0.938477 23.3956V12.7666V1.2386L134.69 78.4844L268.734 1.07031V23.2273Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M134.69 78.4002V78.4844M134.69 100.641L268.734 23.2273V1.07031L134.69 78.4844M134.69 100.641V78.4844M134.69 100.641L0.938477 23.3956V12.7666V1.2386L134.69 78.4844" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    </g>
                    <defs>
                        <clipPath id="bgblur_0_571_3377_clip_path" transform="translate(37.1361 37.1957)"><path d="M268.734 23.2273L134.69 100.641L0.938477 23.3956V12.7666V1.2386L134.69 78.4844L268.734 1.07031V23.2273Z" />
                        </clipPath></defs>
                </svg>

                <svg style={{
                    position: 'absolute',
                    top: '-288px', // Changed from '-263px' (moved up by 25px)
                    left: '75%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="270" height="101" viewBox="0 0 270 101" fill="none">
                    <foreignObject x="-36.869" y="-37.7191" width="343.944" height="175.954">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3380_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <g data-figma-bg-blur-radius="37.8129">
                        <path d="M269.001 22.7039L134.957 100.118L1.20557 22.8722V12.2431V0.715166L134.957 77.9609L269.001 0.546875V22.7039Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M134.957 77.8768V77.9609M134.957 100.118L269.001 22.7039V0.546875L134.957 77.9609M134.957 100.118V77.9609M134.957 100.118L1.20557 22.8722V12.2431V0.715166L134.957 77.9609" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    </g>
                    <defs>
                        <clipPath id="bgblur_0_571_3380_clip_path" transform="translate(36.869 37.7191)">
                            <path d="M269.001 22.7039L134.957 100.118L1.20557 22.8722V12.2431V0.715166L134.957 77.9609L269.001 0.546875V22.7039Z" />
                        </clipPath>
                    </defs>
                </svg>

                <svg style={{
                    position: 'absolute',
                    top: '-288px', // Changed from '-263px' (moved up by 25px)
                    left: '25%',
                    transform: 'translate(-50%, -50%) scale(0.81)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="269" height="101" viewBox="0 0 269 101" fill="none">
                    <foreignObject x="-37.5468" y="-37.1957" width="343.944" height="175.954">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{
                            backdropFilter: 'blur(18.91px)',
                            clipPath: 'url(#bgblur_0_571_3374_clip_path)',
                            height: '100%',
                            width: '100%'
                        }}></div>
                    </foreignObject>
                    <g data-figma-bg-blur-radius="37.8129">
                        <path d="M268.323 23.2273L134.28 100.641L0.527832 23.3956V12.7666V1.2386L134.28 78.4844L268.323 1.07031V23.2273Z" fill="#141414" fillOpacity="0.2" />
                        <path d="M134.28 78.4002V78.4844M134.28 100.641L268.323 23.2273V1.07031L134.28 78.4844M134.28 100.641V78.4844M134.28 100.641L0.527832 23.3956V12.7666V1.2386L134.28 78.4844" stroke="black" strokeOpacity="0.5" strokeWidth="0.523037" />
                    </g>
                    <defs>
                        <clipPath id="bgblur_0_571_3374_clip_path" transform="translate(37.5468 37.1957)">
                            <path d="M268.323 23.2273L134.28 100.641L0.527832 23.3956V12.7666V1.2386L134.28 78.4844L268.323 1.07031V23.2273Z" />
                        </clipPath>
                    </defs>
                </svg>

                {/* lines */}
                <svg style={{
                    position: 'absolute',
                    top: '-292px', // Changed from '-267px' (moved up by 25px)
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.77)',
                    zIndex: "-2",
                    opacity: 1,
                    transition: 'opacity 0.3s ease-in-out'
                }} xmlns="http://www.w3.org/2000/svg" width="858" height="308" viewBox="0 0 858 308" fill="none">
                    <path d="M339.354 259.076L257.237 306.487L100.849 216.196L0.948975 273.873M652.13 163.361L774.521 234.023L857.051 186.375M186.104 63.4609L78.3585 1.25391L0.948975 45.9463" stroke="url(#paint0_linear_525_1630)" strokeWidth="1.04607" />
                    <defs>
                        <linearGradient id="paint0_linear_525_1630" x1="865.007" y1="170.683" x2="0.948946" y2="256.984" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FBFEFC" stopOpacity="0" />
                            <stop offset="0.475962" />
                            <stop offset="1" stopColor="#969897" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                <img style={{ position: 'absolute', top: '-328px', right: '-20px', transform: 'translate(-50%, -50%) scale(1)' }} src="./[ 04 ].svg" alt="" />
                <img style={{ zIndex: '120', position: 'absolute', top: '-190px', left: '53%', transform: 'translate(-50%, -50%) scale(1)' }} src="./XML.svg" alt="" />
                <img style={{ zIndex: '120', position: 'absolute', top: '-266px', left: '78%', transform: 'translate(-50%, -50%) scale(1)' }} src="./XLS.svg" alt="" />
                <img style={{ zIndex: '120', position: 'absolute', top: '-265px', left: '28%', transform: 'translate(-50%, -50%) scale(1)' }} src="./CSV.svg" alt="" />
                <img style={{ zIndex: '120', position: 'absolute', top: '-180px', left: '31%', transform: 'translate(-50%, -50%) scale(1)' }} src="./EXPORT.svg" alt="" />
            </motion.div>
        </div>
    )
}

export default MiddleSection;   