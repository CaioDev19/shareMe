export const theme = {
  COLORS: {
    redStr: "#eb1d36",
    redLt: " #ffa07a",

    peach: "#FA9494",

    gray_100: "#CFD2CF",
    gray_200: "#6b7280",

    beige: "#F5EDDC",

    white: "#FFF",
    whitesh: "#fafafa",
    black: "#000",
  },
  FONT_SIZE: {
    sml: "0.87rem",
    rgl: "1rem",
    lrg: "1.3rem",
    exl: "1.8rem",
  },
  FONT_WEIGHT: {
    wek: "400",
    str: "700",
    sstr: "900",
  },
  SPACERS: {
    sml: "0.87rem",
    rgl: "1rem",
    lrg: "1.3rem",
  },
}

export type Colors = keyof typeof theme.COLORS
export type FontSize = keyof typeof theme.FONT_SIZE
export type FontWeight = keyof typeof theme.FONT_WEIGHT
export type Spacers = keyof typeof theme.SPACERS
