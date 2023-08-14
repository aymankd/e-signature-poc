export enum ImagePaths {
  KEEZE_LOGO = './dist/assets/images/keeze-logo.png',
  SIGLE_KEEZE_GOLD = './dist/assets/images/sigle_keeze_gold.png',
}

export const Fonts = {
  WOLPE_PEGASUS_REGULAR: {
    path: './dist/assets/fonts/wolpe-pegasus-regular.ttf',
    filename: 'wolpe-pegasus-regular.ttf',
    name: 'wolpe-pegasus-regular',
  },
  WOLPE_PEGASUS_BOLD: {
    path: './dist/assets/fonts/wolpe-pegasus-bold.ttf',
    filename: 'wolpe-pegasus-bold.ttf',
    name: 'wolpe-pegasus-bold',
  },
  WOLPE_PEGASUS_ITALIC: {
    path: './dist/assets/fonts/wolpe-pegasus-italic.ttf',
    filename: 'wolpe-pegasus-italic.ttf',
    name: 'wolpe-pegasus-italic',
  },
};

export const CGV_KEEZE = './dist/assets/templates/CGV_KEEZE.pdf';

export enum FontsTypes {
  REGULAR = 'regular',
  NORMAL = 'normal',
  BOLD = 'bold',
  ITALIC = 'italic',
}

export enum FontSize {
  default = 13,
  H1 = 30,
  H2 = 25,
  xxl = 16,
  xl = 14,
  lg = 12,
  md = 10,
  sm = 8,
  xs = 6,
  xxs = 6,
}

export const A4 = {
  // A4 main x,y
  x: 210,
  y: 297,
  // x position to start in A4 page
  startX: 10,
  // y position to start in new Page
  startY: 30,
  // the last y position in page
  endY: 275,
  // header X Postion
  rightHeaderX: 135,
  // x postion for PU HT & Total HT
  puX: 145,
  totalX: 190,
  // x position of space Time
  spaceTimeX: 122,
  // half x page
  halfX: 105,
};
