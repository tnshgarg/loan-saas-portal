import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ToastContextProvider } from "./contexts/ToastContext";
import "./index.css";
import { store } from "./store/store";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./contexts/SidebarContext";
import { BrowserRouter } from "react-router-dom";

const customTheme = {
  button: {
    valid: {
      sizes: ["sm", "md", "lg"],
      colors: ["primary", "secondary"],
    },
    styles: {
      variants: {
        filled: {
          primary: {
            background: "bg-primary",
            color: "text-white",
            shadow: "shadow-none",
          },
          secondary: {
            background: "bg-secondary",
            color: "text-white",
            shadow: "shadow-none",
          },
        },

        outlined: {
          primary: {
            background: "bg-white",
            border: "border border-primary",
            color: "text-primary",
          },
          secondary: {
            background: "bg-white",
            border: "border border-secondary",
            color: "text-secondary",
          },
        },
      },
    },
  },
  input: {
    defaultProps: {
      variant: "outlined",
      size: "md",
      color: "blue",
      label: "",
      error: false,
      success: false,
      icon: undefined,
      labelProps: undefined,
      containerProps: undefined,
      shrink: false,
      className: "",
    },
    valid: {
      variants: ["standard", "outlined", "static"],
      sizes: ["md", "lg"],
      colors: [
        "black",
        "white",
        "blue-gray",
        "gray",
        "brown",
        "deep-orange",
        "orange",
        "amber",
        "yellow",
        "lime",
        "light-green",
        "green",
        "teal",
        "cyan",
        "light-blue",
        "blue",
        "indigo",
        "deep-purple",
        "purple",
        "pink",
        "red",
      ],
    },
    styles: {
      base: {
        container: {
          position: "relative",
          width: "w-full",
          minWidth: "min-w-[200px]",
        },
        input: {
          peer: "peer",
          width: "w-full",
          height: "h-full",
          bg: "bg-transparent",
          color: "text-blue-gray-700",
          fontFamily: "font-sans",
          fontWeight: "font-normal",
          outline: "outline outline-0 focus:outline-0",
          disabled: "disabled:bg-blue-gray-50 disabled:border-0",
          transition: "transition-all",
        },
        label: {
          display: "flex",
          width: "w-full",
          height: "h-full",
          userSelect: "select-none",
          pointerEvents: "pointer-events-none",
          position: "absolute",
          left: "left-0",
          fontWeight: "font-normal",
          textOverflow: "truncate",
          color: "peer-placeholder-shown:text-blue-gray-500",
          lineHeight: "leading-tight peer-focus:leading-tight",
          disabled:
            "peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
          transition: "transition-all",
        },
        icon: {
          display: "grid",
          placeItems: "place-items-center",
          position: "absolute",
          color: "text-blue-gray-500",
        },
        asterisk: {
          display: "inline-block",
          color: "text-red-500",
          ml: "ml-0.5",
        },
      },
      variants: {
        outlined: {
          base: {
            input: {
              borderWidth: "placeholder-shown:border",
              borderColor:
                "placeholder-shown:border-[#DDE5E5] placeholder-shown:border-t-[#DDE5E5]",
              floated: {
                borderWidth: "border focus:border-2",
                borderColor: "border-t-transparent focus:border-t-transparent",
              },
            },
            inputWithIcon: {
              pr: "!pr-9",
            },
            icon: {
              top: "top-2/4",
              right: "right-3",
              transform: "-translate-y-2/4",
            },
            label: {
              position: "-top-1.5",
              fontSize: "peer-placeholder-shown:text-sm",
              floated: {
                fontSize: "text-[11px] peer-focus:text-[11px]",
              },
              before: {
                content: "before:content[' ']",
                display: "before:block",
                boxSizing: "before:box-border",
                width: "before:w-2.5",
                height: "before:h-1.5",
                mt: "before:mt-[6.5px]",
                mr: "before:mr-1",
                borderColor: "peer-placeholder-shown:before:border-transparent",
                borderRadius: "before:rounded-tl-md",
                floated: {
                  bt: "before:border-t peer-focus:before:border-t-2",
                  bl: "before:border-l peer-focus:before:border-l-2",
                },
                pointerEvents: "before:pointer-events-none",
                transition: "before:transition-all",
                disabled: "peer-disabled:before:border-transparent",
              },
              after: {
                content: "after:content[' ']",
                display: "after:block",
                flexGrow: "after:flex-grow",
                boxSizing: "after:box-border",
                width: "after:w-2.5",
                height: "after:h-1.5",
                mt: "after:mt-[6.5px]",
                ml: "after:ml-1",
                borderColor: "peer-placeholder-shown:after:border-transparent",
                borderRadius: "after:rounded-tr-md",
                floated: {
                  bt: "after:border-t peer-focus:after:border-t-2",
                  br: "after:border-r peer-focus:after:border-r-2",
                },
                pointerEvents: "after:pointer-events-none",
                transition: "after:transition-all",
                disabled: "peer-disabled:after:border-transparent",
              },
            },
          },
          sizes: {
            md: {
              container: {
                height: "h-10",
              },
              input: {
                fontSize: "text-sm",
                px: "px-3",
                py: "py-2.5",
                borderRadius: "rounded-[7px]",
              },
              label: {
                lineHeight: "peer-placeholder-shown:leading-[3.75]",
              },
              icon: {
                width: "w-5",
                height: "h-5",
              },
            },
            lg: {
              container: {
                height: "h-11",
              },
              input: {
                fontSize: "text-sm",
                px: "px-3",
                py: "py-3",
                borderRadius: "rounded-md",
              },
              label: {
                lineHeight: "peer-placeholder-shown:leading-[4.1]",
              },
              icon: {
                width: "w-6",
                height: "h-6",
              },
            },
          },
          colors: {
            input: {
              black: {
                color: "text-black",
                borderColor: "border-[#5E8290]",
                borderColorFocused: "focus:border-[#5E8290]",
              },
            },
            label: {
              black: {
                color: "!text-[#5E8290] peer-focus:text-[#5E8290]",
                font: "font-sans",
                before:
                  "before:border-[#5E8290] peer-focus:before:border-[#5E8290]",
                after:
                  "after:border-[#5E8290] peer-focus:after:border-[#5E8290]",
                withValue: {
                  color: "text-[#5E8290]",
                  before: "before:border-[#5E8290] ",
                  after: "after:border-[#5E8290] ",
                },
              },
            },
          },
          error: {
            input: {
              borderColor:
                "border-red-500 placeholder-shown:border-t-red-500 placeholder-shown:border-red-500",
              borderColorFocused: "focus:border-red-500",
            },
            label: {
              color:
                "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
              before: "before:border-red-500 peer-focus:before:border-red-500",
              after: "after:border-red-500 peer-focus:after:border-red-500",
            },
          },
          success: {
            input: {
              borderColor:
                "border-green-500 placeholder-shown:border-t-green-500 placeholder-shown:border-green-500",
              borderColorFocused: "focus:border-green-500",
            },
            label: {
              color:
                "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
              before:
                "before:border-green-500 peer-focus:before:border-green-500",
              after: "after:border-green-500 peer-focus:after:border-green-500",
            },
          },
          shrink: {
            input: {
              borderTop: "!border-t-transparent",
            },
            label: {
              fontSize: "!text-[11px]",
              lineHeight: "!leading-tight",
              borderColor:
                "before:!border-blue-gray-200 after:!border-blue-gray-200",
            },
          },
        },
        // standard: {
        //   base: {
        //     input: {
        //       borderWidth: "border-b",
        //       borderColor: "placeholder-shown:border-blue-gray-200",
        //     },
        //     inputWithIcon: {
        //       pr: "!pr-7",
        //     },
        //     icon: {
        //       top: "top-2/4",
        //       right: "right-0",
        //       transform: "-translate-y-1/4",
        //     },
        //     label: {
        //       position: "-top-1.5",
        //       fontSize: "peer-placeholder-shown:text-sm",
        //       floated: {
        //         fontSize: "text-[11px] peer-focus:text-[11px]",
        //       },
        //       after: {
        //         content: "after:content[' ']",
        //         display: "after:block",
        //         width: "after:w-full",
        //         position: "after:absolute",
        //         bottom: "after:-bottom-1.5",
        //         left: "left-0",
        //         borderWidth: "after:border-b-2",
        //         scale: "after:scale-x-0",
        //         floated: {
        //           scale: "peer-focus:after:scale-x-100",
        //         },
        //         transition: "after:transition-transform after:duration-300",
        //       },
        //     },
        //   },
        //   sizes: {
        //     md: {
        //       container: {
        //         height: "h-11",
        //       },
        //       input: {
        //         fontSize: "text-sm",
        //         pt: "pt-4",
        //         pb: "pb-1.5",
        //       },
        //       label: {
        //         lineHeight: "peer-placeholder-shown:leading-[4.25]",
        //       },
        //       icon: {
        //         width: "w-5",
        //         height: "h-5",
        //       },
        //     },
        //     lg: {
        //       container: {
        //         height: "h-12",
        //       },
        //       input: {
        //         fontSize: "text-sm",
        //         px: "px-px",
        //         pt: "pt-5",
        //         pb: "pb-2",
        //       },
        //       label: {
        //         lineHeight: "peer-placeholder-shown:leading-[4.875]",
        //       },
        //       icon: {
        //         width: "w-6",
        //         height: "h-6",
        //       },
        //     },
        //   },
        //   colors: {
        //     input: {
        //       black: {
        //         color: "text-black",
        //         borderColor: "border-black",
        //         borderColorFocused: "focus:border-black",
        //       },
        //       white: {
        //         color: "text-white",
        //         borderColor: "border-white",
        //         borderColorFocused: "focus:border-white",
        //       },
        //       "blue-gray": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-blue-gray-500",
        //       },
        //       gray: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-gray-500",
        //       },
        //       brown: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-brown-500",
        //       },
        //       "deep-orange": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-deep-orange-500",
        //       },
        //       orange: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-orange-500",
        //       },
        //       amber: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-amber-500",
        //       },
        //       yellow: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-yellow-500",
        //       },
        //       lime: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-lime-500",
        //       },
        //       "light-green": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-light-green-500",
        //       },
        //       green: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-green-500",
        //       },
        //       teal: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-teal-500",
        //       },
        //       cyan: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-cyan-500",
        //       },
        //       "light-blue": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-light-blue-500",
        //       },
        //       blue: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-blue-500",
        //       },
        //       indigo: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-indigo-500",
        //       },
        //       "deep-purple": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-deep-purple-500",
        //       },
        //       purple: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-purple-500",
        //       },
        //       pink: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-pink-500",
        //       },
        //       red: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-red-500",
        //       },
        //     },
        //     label: {
        //       black: {
        //         color: "!text-black peer-focus:text-black",
        //         after: "after:border-black peer-focus:after:border-black",
        //       },
        //       white: {
        //         color: "!text-white peer-focus:text-white",
        //         after: "after:border-white peer-focus:after:border-white",
        //       },
        //       "blue-gray": {
        //         color: "text-blue-gray-500 peer-focus:text-blue-gray-500",
        //         after:
        //           "after:border-blue-gray-500 peer-focus:after:border-blue-gray-500",
        //       },
        //       gray: {
        //         color: "text-blue-gray-500 peer-focus:text-gray-500",
        //         after: "after:border-gray-500 peer-focus:after:border-gray-500",
        //       },
        //       brown: {
        //         color: "text-blue-gray-500 peer-focus:text-brown-500",
        //         after:
        //           "after:border-brown-500 peer-focus:after:border-brown-500",
        //       },
        //       "deep-orange": {
        //         color: "text-blue-gray-500 peer-focus:text-deep-orange-500",
        //         after:
        //           "after:border-deep-orange-500 peer-focus:after:border-deep-orange-500",
        //       },
        //       orange: {
        //         color: "text-blue-gray-500 peer-focus:text-orange-500",
        //         after:
        //           "after:border-orange-500 peer-focus:after:border-orange-500",
        //       },
        //       amber: {
        //         color: "text-blue-gray-500 peer-focus:text-amber-500",
        //         after:
        //           "after:border-amber-500 peer-focus:after:border-amber-500",
        //       },
        //       yellow: {
        //         color: "text-blue-gray-500 peer-focus:text-yellow-500",
        //         after:
        //           "after:border-yellow-500 peer-focus:after:border-yellow-500",
        //       },
        //       lime: {
        //         color: "text-blue-gray-500 peer-focus:text-lime-500",
        //         after: "after:border-lime-500 peer-focus:after:border-lime-500",
        //       },
        //       "light-green": {
        //         color: "text-blue-gray-500 peer-focus:text-light-green-500",
        //         after:
        //           "after:border-light-green-500 peer-focus:after:border-light-green-500",
        //       },
        //       green: {
        //         color: "text-blue-gray-500 peer-focus:text-green-500",
        //         after:
        //           "after:border-green-500 peer-focus:after:border-green-500",
        //       },
        //       teal: {
        //         color: "text-blue-gray-500 peer-focus:text-teal-500",
        //         after: "after:border-teal-500 peer-focus:after:border-teal-500",
        //       },
        //       cyan: {
        //         color: "text-blue-gray-500 peer-focus:text-cyan-500",
        //         after: "after:border-cyan-500 peer-focus:after:border-cyan-500",
        //       },
        //       "light-blue": {
        //         color: "text-blue-gray-500 peer-focus:text-light-blue-500",
        //         after:
        //           "after:border-light-blue-500 peer-focus:after:border-light-blue-500",
        //       },
        //       blue: {
        //         color: "text-blue-gray-500 peer-focus:text-blue-500",
        //         after: "after:border-blue-500 peer-focus:after:border-blue-500",
        //       },
        //       indigo: {
        //         color: "text-blue-gray-500 peer-focus:text-indigo-500",
        //         after:
        //           "after:border-indigo-500 peer-focus:after:border-indigo-500",
        //       },
        //       "deep-purple": {
        //         color: "text-blue-gray-500 peer-focus:text-deep-purple-500",
        //         after:
        //           "after:border-deep-purple-500 peer-focus:after:border-deep-purple-500",
        //       },
        //       purple: {
        //         color: "text-blue-gray-500 peer-focus:text-purple-500",
        //         after:
        //           "after:border-purple-500 peer-focus:after:border-purple-500",
        //       },
        //       pink: {
        //         color: "text-blue-gray-500 peer-focus:text-pink-500",
        //         after: "after:border-pink-500 peer-focus:after:border-pink-500",
        //       },
        //       red: {
        //         color: "text-blue-gray-500 peer-focus:text-red-500",
        //         after: "after:border-red-500 peer-focus:after:border-red-500",
        //       },
        //     },
        //   },
        //   error: {
        //     input: {
        //       borderColor: "border-red-500 placeholder-shown:border-red-500",
        //       borderColorFocused: "focus:border-red-500",
        //     },
        //     label: {
        //       color:
        //         "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
        //       after: "after:border-red-500 peer-focus:after:border-red-500",
        //     },
        //   },
        //   success: {
        //     input: {
        //       borderColor:
        //         "border-green-500 placeholder-shown:border-green-500",
        //       borderColorFocused: "focus:border-green-500",
        //     },
        //     label: {
        //       color:
        //         "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
        //       after: "after:border-green-500 peer-focus:after:border-green-500",
        //     },
        //   },
        //   shrink: {
        //     input: {},
        //     label: {
        //       fontSize: "!text-[11px]",
        //       lineHeight: "!leading-tight",
        //     },
        //   },
        // },
        // static: {
        //   base: {
        //     input: {
        //       borderWidth: "border-b",
        //       borderColor: "placeholder-shown:border-blue-gray-200",
        //     },
        //     inputWithIcon: {
        //       pr: "!pr-7",
        //     },
        //     icon: {
        //       top: "top-2/4",
        //       right: "right-0",
        //       transform: "-translate-y-1/4",
        //     },
        //     label: {
        //       position: "-top-2.5",
        //       fontSize: "text-sm peer-focus:text-sm",
        //       after: {
        //         content: "after:content[' ']",
        //         display: "after:block",
        //         width: "after:w-full",
        //         position: "after:absolute",
        //         bottom: "after:-bottom-2.5",
        //         left: "left-0",
        //         borderWidth: "after:border-b-2",
        //         scale: "after:scale-x-0",
        //         floated: {
        //           scale: "peer-focus:after:scale-x-100",
        //         },
        //         transition: "after:transition-transform after:duration-300",
        //       },
        //     },
        //   },
        //   sizes: {
        //     md: {
        //       container: {
        //         height: "h-11",
        //       },
        //       input: {
        //         fontSize: "text-sm",
        //         pt: "pt-4",
        //         pb: "pb-1.5",
        //       },
        //       label: {
        //         lineHeight: "peer-placeholder-shown:leading-tight",
        //       },
        //       icon: {
        //         width: "w-5",
        //         height: "h-5",
        //       },
        //     },
        //     lg: {
        //       container: {
        //         height: "h-12",
        //       },
        //       input: {
        //         fontSize: "text-sm",
        //         px: "px-px",
        //         pt: "pt-5",
        //         pb: "pb-2",
        //       },
        //       label: {
        //         lineHeight: "peer-placeholder-shown:leading-tight",
        //       },
        //       icon: {
        //         width: "w-6",
        //         height: "h-6",
        //       },
        //     },
        //   },
        //   colors: {
        //     input: {
        //       black: {
        //         color: "text-black",
        //         borderColor: "border-black",
        //         borderColorFocused: "focus:border-black",
        //       },
        //       white: {
        //         color: "text-white",
        //         borderColor: "border-white",
        //         borderColorFocused: "focus:border-white",
        //       },
        //       "blue-gray": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-blue-gray-500",
        //       },
        //       gray: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-gray-500",
        //       },
        //       brown: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-brown-500",
        //       },
        //       "deep-orange": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-deep-orange-500",
        //       },
        //       orange: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-orange-500",
        //       },
        //       amber: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-amber-500",
        //       },
        //       yellow: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-yellow-500",
        //       },
        //       lime: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-lime-500",
        //       },
        //       "light-green": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-light-green-500",
        //       },
        //       green: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-green-500",
        //       },
        //       teal: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-teal-500",
        //       },
        //       cyan: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-cyan-500",
        //       },
        //       "light-blue": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-light-blue-500",
        //       },
        //       blue: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-blue-500",
        //       },
        //       indigo: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-indigo-500",
        //       },
        //       "deep-purple": {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-deep-purple-500",
        //       },
        //       purple: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-purple-500",
        //       },
        //       pink: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-pink-500",
        //       },
        //       red: {
        //         borderColor: "border-blue-gray-200",
        //         borderColorFocused: "focus:border-red-500",
        //       },
        //     },
        //     label: {
        //       black: {
        //         color: "!text-black peer-focus:black",
        //         after: "after:border-black peer-focus:after:border-black",
        //       },
        //       white: {
        //         color: "!text-white peer-focus:white",
        //         after: "after:border-white peer-focus:after:border-white",
        //       },
        //       "blue-gray": {
        //         color: "text-blue-gray-500 peer-focus:text-blue-gray-500",
        //         after:
        //           "after:border-blue-gray-500 peer-focus:after:border-blue-gray-500",
        //       },
        //       gray: {
        //         color: "text-blue-gray-500 peer-focus:text-gray-500",
        //         after: "after:border-gray-500 peer-focus:after:border-gray-500",
        //       },
        //       brown: {
        //         color: "text-blue-gray-500 peer-focus:text-brown-500",
        //         after:
        //           "after:border-brown-500 peer-focus:after:border-brown-500",
        //       },
        //       "deep-orange": {
        //         color: "text-blue-gray-500 peer-focus:text-deep-orange-500",
        //         after:
        //           "after:border-deep-orange-500 peer-focus:after:border-deep-orange-500",
        //       },
        //       orange: {
        //         color: "text-blue-gray-500 peer-focus:text-orange-500",
        //         after:
        //           "after:border-orange-500 peer-focus:after:border-orange-500",
        //       },
        //       amber: {
        //         color: "text-blue-gray-500 peer-focus:text-amber-500",
        //         after:
        //           "after:border-amber-500 peer-focus:after:border-amber-500",
        //       },
        //       yellow: {
        //         color: "text-blue-gray-500 peer-focus:text-yellow-500",
        //         after:
        //           "after:border-yellow-500 peer-focus:after:border-yellow-500",
        //       },
        //       lime: {
        //         color: "text-blue-gray-500 peer-focus:text-lime-500",
        //         after: "after:border-lime-500 peer-focus:after:border-lime-500",
        //       },
        //       "light-green": {
        //         color: "text-blue-gray-500 peer-focus:text-light-green-500",
        //         after:
        //           "after:border-light-green-500 peer-focus:after:border-light-green-500",
        //       },
        //       green: {
        //         color: "text-blue-gray-500 peer-focus:text-green-500",
        //         after:
        //           "after:border-green-500 peer-focus:after:border-green-500",
        //       },
        //       teal: {
        //         color: "text-blue-gray-500 peer-focus:text-teal-500",
        //         after: "after:border-teal-500 peer-focus:after:border-teal-500",
        //       },
        //       cyan: {
        //         color: "text-blue-gray-500 peer-focus:text-cyan-500",
        //         after: "after:border-cyan-500 peer-focus:after:border-cyan-500",
        //       },
        //       "light-blue": {
        //         color: "text-blue-gray-500 peer-focus:text-light-blue-500",
        //         after:
        //           "after:border-light-blue-500 peer-focus:after:border-light-blue-500",
        //       },
        //       blue: {
        //         color: "text-blue-gray-500 peer-focus:text-blue-500",
        //         after: "after:border-blue-500 peer-focus:after:border-blue-500",
        //       },
        //       indigo: {
        //         color: "text-blue-gray-500 peer-focus:text-indigo-500",
        //         after:
        //           "after:border-indigo-500 peer-focus:after:border-indigo-500",
        //       },
        //       "deep-purple": {
        //         color: "text-blue-gray-500 peer-focus:text-deep-purple-500",
        //         after:
        //           "after:border-deep-purple-500 peer-focus:after:border-deep-purple-500",
        //       },
        //       purple: {
        //         color: "text-blue-gray-500 peer-focus:text-purple-500",
        //         after:
        //           "after:border-purple-500 peer-focus:after:border-purple-500",
        //       },
        //       pink: {
        //         color: "text-blue-gray-500 peer-focus:text-pink-500",
        //         after: "after:border-pink-500 peer-focus:after:border-pink-500",
        //       },
        //       red: {
        //         color: "text-blue-gray-500 peer-focus:text-red-500",
        //         after: "after:border-red-500 peer-focus:after:border-red-500",
        //       },
        //     },
        //   },
        //   error: {
        //     input: {
        //       borderColor: "border-red-500 placeholder-shown:border-red-500",
        //       borderColorFocused: "focus:border-red-500",
        //     },
        //     label: {
        //       color:
        //         "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
        //       after: "after:border-red-500 peer-focus:after:border-red-500",
        //     },
        //   },
        //   success: {
        //     input: {
        //       borderColor:
        //         "border-green-500 placeholder-shown:border-green-500",
        //       borderColorFocused: "focus:border-green-500",
        //     },
        //     label: {
        //       color:
        //         "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
        //       after: "after:border-green-500 peer-focus:after:border-green-500",
        //     },
        //   },
        //   shrink: {
        //     input: {},
        //     label: {},
        //   },
        // },
      },
    },
  },
  select: {
    defaultProps: {
      variant: "outlined",
      color: "blue",
      size: "md",
      label: "",
      error: false,
      success: false,
      arrow: undefined,
      value: undefined,
      onChange: undefined,
      selected: undefined,
      offset: 5,
      dismiss: {},
      animate: {
        unmount: {},
        mount: {},
      },
      autoHeight: false,
      lockScroll: false,
      labelProps: {},
      menuProps: {},
      className: "",
      disabled: false,
      containerProps: undefined,
    },
    valid: {
      variants: ["standard", "outlined", "static"],
      sizes: ["md", "lg"],
      colors: [
        "blue-gray",
        "gray",
        "brown",
        "deep-orange",
        "orange",
        "amber",
        "yellow",
        "lime",
        "light-green",
        "green",
        "teal",
        "cyan",
        "light-blue",
        "blue",
        "indigo",
        "deep-purple",
        "purple",
        "pink",
        "red",
      ],
    },
    styles: {
      base: {
        container: {
          position: "relative",
          width: "w-full",
          minWidth: "min-w-[200px]",
        },
        select: {
          peer: "peer",
          width: "w-full",
          height: "h-full",
          bg: "bg-transparent",
          color: "text-blue-gray-700",
          fontFamily: "font-sans",
          fontWeight: "font-normal",
          textAlign: "text-left",
          outline: "outline outline-0 focus:outline-0",
          disabled: "disabled:bg-blue-gray-50 disabled:border-0",
          transition: "transition-all",
        },
        arrow: {
          initial: {
            display: "grid",
            placeItems: "place-items-center",
            position: "absolute",
            top: "top-2/4",
            right: "right-2",
            pt: "pt-px",
            width: "w-5",
            height: "h-5",
            color: "text-blue-gray-400",
            transform: "rotate-0 -translate-y-2/4",
            transition: "transition-all",
          },
          active: {
            transform: "rotate-180",
            mt: "mt-px",
          },
        },
        label: {
          display: "flex",
          width: "w-full",
          height: "h-full",
          userSelect: "select-none",
          pointerEvents: "pointer-events-none",
          position: "absolute",
          left: "left-0",
          fontWeight: "font-normal",
          transition: "transition-all",
        },
        menu: {
          width: "w-full",
          maxHeight: "max-h-96",
          bg: "bg-white",
          p: "p-3",
          border: "border border-blue-gray-50",
          borderRadius: "rounded-md",
          boxShadow: "shadow-lg shadow-blue-gray-500/10",
          fontFamily: "font-sans",
          fontSize: "text-sm",
          fontWeight: "font-normal",
          color: "text-blue-gray-500",
          overflow: "overflow-auto",
          outline: "focus:outline-none",
        },
        option: {
          initial: {
            pt: "pt-[9px]",
            pb: "pb-2",
            px: "px-3",
            borderRadius: "rounded-md",
            lightHeight: "leading-tight",
            cursor: "cursor-pointer",
            userSelect: "select-none",
            background: "hover:bg-blue-gray-50 focus:bg-blue-gray-50",
            opacity: "hover:bg-opacity-80 focus:bg-opacity-80",
            color: "hover:text-blue-gray-900 focus:text-blue-gray-900",
            outline: "outline outline-0",
            transition: "transition-all",
          },
          active: {
            bg: "bg-blue-gray-50 bg-opacity-80",
            color: "text-blue-gray-900",
          },
          disabled: {
            opacity: "opacity-50",
            cursor: "cursor-not-allowed",
            userSelect: "select-none",
            pointerEvents: "pointer-events-none",
          },
        },
      },
      variants: {
        outlined: {
          base: {
            select: {},
            label: {
              position: "-top-1.5",
              before: {
                content: "before:content[' ']",
                display: "before:block",
                boxSizing: "before:box-border",
                width: "before:w-2.5",
                height: "before:h-1.5",
                mt: "before:mt-[6.5px]",
                mr: "before:mr-1",
                borderRadius: "before:rounded-tl-md",
                pointerEvents: "before:pointer-events-none",
                transition: "before:transition-all",
                disabled: "peer-disabled:before:border-transparent",
              },
              after: {
                content: "after:content[' ']",
                display: "after:block",
                flexGrow: "after:flex-grow",
                boxSizing: "after:box-border",
                width: "after:w-2.5",
                height: "after:h-1.5",
                mt: "after:mt-[6.5px]",
                ml: "after:ml-1",
                borderRadius: "after:rounded-tr-md",
                pointerEvents: "after:pointer-events-none",
                transition: "after:transition-all",
                disabled: "peer-disabled:after:border-transparent",
              },
            },
          },
          sizes: {
            md: {
              container: {
                height: "h-10",
              },
              select: {
                fontSize: "text-sm",
                px: "px-3",
                py: "py-2.5",
                borderRadius: "rounded-[7px]",
              },
              label: {
                initial: {},
                states: {
                  close: {
                    lineHeight: "leading-[3.75]",
                  },
                  open: {
                    lineHeight: "leading-tight",
                  },
                  withValue: {
                    lineHeight: "leading-tight",
                  },
                },
              },
            },
            lg: {
              container: {
                height: "h-11",
              },
              select: {
                fontSize: "text-sm",
                px: "px-3",
                py: "py-3",
                borderRadius: "rounded-[7px]",
              },
              label: {
                initial: {},
                states: {
                  close: {
                    lineHeight: "leading-[4.1]",
                  },
                  open: {
                    lineHeight: "leading-tight",
                  },
                  withValue: {
                    lineHeight: "leading-tight",
                  },
                },
              },
            },
          },
          colors: {
            select: {
              gray: {
                close: {
                  borderColor: "border-[#DDE5E5]",
                },
                open: {
                  borderColor: "border-[#5E8290]",
                  borderTopColor: "border-t-transparent",
                },
                withValue: {
                  borderColor: "border-[#5E8290]",
                  borderTopColor: "border-t-transparent",
                },
              },
            },
            label: {
              gray: {
                close: {
                  color: "text-[#5E8290]",
                  before: "before:border-transparent",
                  after: "after:border-transparent",
                },
                open: {
                  color: "text-[#5E8290]",
                  before: "before:border-[#5E8290]",
                  after: "after:border-[#5E8290]",
                },
                withValue: {
                  color: "text-[#5E8290]",
                  before: "before:border-[#5E8290]",
                  after: "after:border-[#5E8290]",
                },
              },
            },
          },
          states: {
            close: {
              select: {
                borderWidth: "border",
              },
              label: {
                fontSize: "text-sm",
                disabled: "peer-disabled:text-blue-gray-400",
                before: {
                  bt: "before:border-t-transparent",
                  bl: "before:border-l-transparent",
                },
                after: {
                  bt: "after:border-t-transparent",
                  br: "after:border-r-transparent",
                },
              },
            },
            open: {
              select: {
                borderWidth: "border-2",
                borderColor: "border-t-transparent",
              },
              label: {
                fontSize: "text-[11px]",
                disabled: "peer-disabled:text-transparent",
                before: {
                  bt: "before:border-t-2",
                  bl: "before:border-l-2",
                },
                after: {
                  bt: "after:border-t-2",
                  br: "after:border-r-2",
                },
              },
            },
            withValue: {
              select: {
                borderWidth: "border",
                borderColor: "border-t-transparent",
              },
              label: {
                fontSize: "text-[11px]",
                disabled: "peer-disabled:text-transparent",
                before: {
                  bt: "before:border-t",
                  bl: "before:border-l",
                },
                after: {
                  bt: "after:border-t",
                  br: "after:border-r",
                },
              },
            },
          },
          error: {
            select: {
              initial: {},
              states: {
                close: {
                  borderColor: "border-red-500",
                },
                open: {
                  borderColor: "border-red-500",
                  borderTopColor: "border-t-transparent",
                },
                withValue: {
                  borderColor: "border-red-500",
                  borderTopColor: "border-t-transparent",
                },
              },
            },
            label: {
              initial: {},
              states: {
                close: {
                  color: "text-red-500",
                  before: "before:border-red-500",
                  after: "after:border-red-500",
                },
                open: {
                  color: "text-red-500",
                  before: "before:border-red-500",
                  after: "after:border-red-500",
                },
                withValue: {
                  color: "text-red-500",
                  before: "before:border-red-500",
                  after: "after:border-red-500",
                },
              },
            },
          },
          success: {
            select: {
              initial: {},
              states: {
                close: {
                  borderColor: "border-green-500",
                },
                open: {
                  borderColor: "border-green-500",
                  borderTopColor: "border-t-transparent",
                },
                withValue: {
                  borderColor: "border-green-500",
                  borderTopColor: "border-t-transparent",
                },
              },
            },
            label: {
              initial: {},
              states: {
                close: {
                  color: "text-green-500",
                  before: "before:border-green-500",
                  after: "after:border-green-500",
                },
                open: {
                  color: "text-green-500",
                  before: "before:border-green-500",
                  after: "after:border-green-500",
                },
                withValue: {
                  color: "text-green-500",
                  before: "before:border-green-500",
                  after: "after:border-green-500",
                },
              },
            },
          },
        },
      },
    },
  },
  checkbox: {
    defaultProps: {
      color: "blue",
      label: undefined,
      icon: undefined,
      ripple: true,
      className: "",
      disabled: false,
      containerProps: undefined,
      labelProps: undefined,
      iconProps: undefined,
    },
    valid: {
      colors: ["gray"],
    },
    styles: {
      base: {
        root: {
          display: "inline-flex",
          alignItems: "items-center",
        },
        container: {
          position: "relative",
          display: "flex",
          alignItems: "items-center",
          cursor: "cursor-pointer",
          p: "p-3",
          borderRadius: "rounded-full",
        },
        input: {
          peer: "peer",
          position: "relative",
          appearance: "appearance-none",
          width: "w-5",
          height: "h-5",
          borderWidth: "border",
          borderRadius: "rounded-md",
          borderColor: "border-blue-gray-200",
          cursor: "cursor-pointer",
          transition: "transition-all",
          before: {
            content: "before:content['']",
            display: "before:block",
            bg: "before:bg-blue-gray-500",
            width: "before:w-12",
            height: "before:h-12",
            borderRadius: "before:rounded-full",
            position: "before:absolute",
            top: "before:top-2/4",
            left: "before:left-2/4",
            transform: "before:-translate-y-2/4 before:-translate-x-2/4",
            opacity: "before:opacity-0 hover:before:opacity-10",
            transition: "before:transition-opacity",
          },
        },
        label: {
          color: "text-gray-700",
          fontWeight: "font-light",
          userSelect: "select-none",
          cursor: "cursor-pointer",
          mt: "mt-px",
        },
        icon: {
          color: "text-white",
          position: "absolute",
          top: "top-2/4",
          left: "left-2/4",
          translate: "-translate-y-2/4 -translate-x-2/4",
          pointerEvents: "pointer-events-none",
          opacity: "opacity-0 peer-checked:opacity-100",
          transition: "transition-opacity",
        },
        disabled: {
          opacity: "opacity-50",
          pointerEvents: "pointer-events-none",
        },
      },
      colors: {
        gray: {
          background: "checked:bg-[#41be89]",
          border: "checked:border-gray-500",
          before: "checked:before:bg-gray-500",
        },
      },
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContextProvider>
          <ThemeProvider value={customTheme}>
            <MaterialTailwindControllerProvider>
              <App />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </ToastContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
