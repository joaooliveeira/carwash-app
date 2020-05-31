import { scaleFont } from "./mixins";

// FONT FAMILY
export const FONT_FAMILY_REGULAR = "System";
export const FONT_FAMILY_BOLD = "System";

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = "400";
export const FONT_WEIGHT_BOLD = "900";

// FONT SIZE
export const FONT_SIZE_TITLE = scaleFont(22);
export const FONT_SIZE_TEXT = scaleFont(17);
export const FONT_SIZE_SUBTITLE = scaleFont(20);
export const FONT_SIZE_SMALL_TEXT = scaleFont(16);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_TEXT = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_SUBTITLE = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

export const FONT_TITLE = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

export const FONT_TITLE_BOLD = [FONT_BOLD, { fontSize: FONT_SIZE_TITLE }];
export const FONT_SMALL_TEXT = [{ fontSize: FONT_SIZE_SMALL_TEXT }, FONT_TEXT];
