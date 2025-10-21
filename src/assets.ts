// NOTA: Certifique-se de que todas as imagens e vídeos referenciados aqui existam na pasta `public/Crl/Imagens/` do seu projeto.
// Os nomes dos arquivos devem corresponder exatamente.

export interface CrlImage {
  src: string;
  alt: string;
}

const IMAGE_PATH = '/Crl/Imagens/';

// Imagens
const CRL_POLE_DANCE: CrlImage = { src: `${IMAGE_PATH}1704082687012.png`, alt: 'CRL no Pole Dance' };
const CRL_MUSCLE_POSE: CrlImage = { src: `${IMAGE_PATH}1713050050406.png`, alt: 'CRL mostrando os músculos' };
const CRL_GRADUATION_LIFT: CrlImage = { src: `${IMAGE_PATH}1713528250395.png`, alt: 'CRL levantando formanda' };
const CRL_PEACE_SIGN: CrlImage = { src: `${IMAGE_PATH}1760146522665.png`, alt: 'CRL paz e amor sem camisa' };
const CRL_BANNED: CrlImage = { src: `${IMAGE_PATH}IMG-20230317-WA0058.jpg`, alt: 'CRL com entrada proibida no Villa Mix' };
const CRL_MUSCLE_SELFIE: CrlImage = { src: `${IMAGE_PATH}IMG-20230329-WA0009.jpg`, alt: 'CRL selfie no espelho' };
const CRL_EATING: CrlImage = { src: `${IMAGE_PATH}IMG-20230422-WA0026.jpg`, alt: 'CRL comendo' };
const CRL_SAUNA: CrlImage = { src: `${IMAGE_PATH}IMG-20241221-WA0022.jpg`, alt: 'CRL com amigos na sauna' };
const CRL_BEACH: CrlImage = { src: `${IMAGE_PATH}IMG-20250305-WA0043.jpg`, alt: 'CRL na praia' };
const CRL_FRIENDS_COLLAGE: CrlImage = { src: `${IMAGE_PATH}Screenshot_20251021-075109.png`, alt: 'CRL com amigos' };
const CRL_DILDO_STICKER: CrlImage = { src: `${IMAGE_PATH}STK-20230305-WA0001.webp`, alt: 'Figurinha CRL com dildos' };
const CRL_LIFTING_WEIGHTS: CrlImage = { src: `${IMAGE_PATH}STK-20230430-WA0031.webp`, alt: 'Figurinha CRL levantando peso' };
const CRL_GOOD_MORNING: CrlImage = { src: `${IMAGE_PATH}STK-20230503-WA0006.webp`, alt: 'Figurinha CRL bom dia nadador' };
const CRL_STRIPPER: CrlImage = { src: `${IMAGE_PATH}STK-20230627-WA0012.webp`, alt: 'Figurinha CRL stripper' };
const CRL_DOLL: CrlImage = { src: `${IMAGE_PATH}STK-20230805-WA0024.webp`, alt: 'Figurinha CRL com boneca' };
const CRL_OTHER_DOLL: CrlImage = { src: `${IMAGE_PATH}STK-20231101-WA0018.webp`, alt: 'Figurinha CRL com outra boneca' };
const CRL_THUMBS_UP_SIDE: CrlImage = { src: `${IMAGE_PATH}STK-20231124-WA0009.webp`, alt: 'Figurinha CRL joinha de lado' };
const CRL_THUMBS_UP: CrlImage = { src: `${IMAGE_PATH}STK-20231207-WA0014.webp`, alt: 'Figurinha CRL joinha' };
const CRL_FACE: CrlImage = { src: `${IMAGE_PATH}STK-20231224-WA0026.webp`, alt: 'O rosto da lenda, CRL' };
const CRL_SAUSAGE: CrlImage = { src: `${IMAGE_PATH}1760146522665.png`, alt: 'O famoso mamilo de calabresa do CRL' }; // Reutilizando uma imagem para a piada

// Imagens para o usuário selecionar no Mural da Vergonha
export const MEME_BASE_IMAGES: CrlImage[] = [
  CRL_MUSCLE_POSE,
  CRL_BANNED,
  CRL_PEACE_SIGN,
  CRL_GRADUATION_LIFT,
  CRL_THUMBS_UP
];

// Imagens para flutuar na tela
export const FLOATING_IMAGES: CrlImage[] = [
  CRL_FACE,
  CRL_THUMBS_UP,
  CRL_SAUSAGE,
];

// Todas as imagens para a galeria principal
export const GALLERY_IMAGES: CrlImage[] = [
  CRL_POLE_DANCE,
  CRL_MUSCLE_POSE,
  CRL_GRADUATION_LIFT,
  CRL_PEACE_SIGN,
  CRL_BANNED,
  CRL_MUSCLE_SELFIE,
  CRL_EATING,
  CRL_SAUNA,
  CRL_BEACH,
  CRL_FRIENDS_COLLAGE,
  CRL_DILDO_STICKER,
  CRL_STRIPPER,
  CRL_DOLL,
  CRL_GOOD_MORNING,
  CRL_THUMBS_UP_SIDE,
];

// Assets para CrlGame
export const GAME_PLAYER_IMAGE: CrlImage = CRL_FACE;
export const GAME_COLLECTIBLE_ASSETS: CrlImage[] = [CRL_THUMBS_UP, CRL_THUMBS_UP_SIDE];
export const GAME_OBSTACLE_ASSETS: CrlImage[] = [CRL_SAUSAGE, { src: `${IMAGE_PATH}STK-20230305-WA0001.webp`, alt: 'Calabresa' }];


// Assets para VideoGallery
export interface CrlVideo {
  src: string;
}
const VIDEO_PATH = '/Crl/Imagens/'; // Mantendo vídeos na mesma pasta das imagens por simplicidade

export const GALLERY_VIDEOS: CrlVideo[] = [
    { src: `${VIDEO_PATH}VID-20240512-WA0001.mp4` },
    { src: `${VIDEO_PATH}VID-20240512-WA0003.mp4` },
    { src: `${VIDEO_PATH}VID-20240512-WA0004.mp4` },
    { src: `${VIDEO_PATH}VID-20240512-WA0005.mp4` },
    { src: `${VIDEO_PATH}VID-20240512-WA0006.mp4` },
    { src: `${VIDEO_PATH}VID-20231221-WA0028.mp4` },
];
