// NOTA: Certifique-se de que todas as imagens referenciadas aqui existam na pasta `public/Crl/Imagens/` do seu projeto.
// Os nomes dos arquivos devem corresponder exatamente.

export interface CrlImage {
  src: string;
  alt: string;
}

const IMAGE_PATH = '/Crl/Imagens/';

// Definições das imagens principais com os nomes de arquivo corretos
const CRL_BANNED: CrlImage = { src: `${IMAGE_PATH}IMG-20230317-WA0058.jpg`, alt: 'CRL com entrada proibida na Villa Mix' };
const CRL_MUSCLE: CrlImage = { src: `${IMAGE_PATH}1713050050406.png`, alt: 'CRL mostrando os músculos com sua regata azul' };
const CRL_SAUSAGE: CrlImage = { src: `${IMAGE_PATH}1760146522665.png`, alt: 'O famoso mamilo de calabresa do CRL em sua forma mais pura' };
const CRL_GRADUATION: CrlImage = { src: `${IMAGE_PATH}1713528250395.png`, alt: 'CRL celebrando uma formatura com um levantamento épico' };
const CRL_THUMBS: CrlImage = { src: `${IMAGE_PATH}STK-20231207-WA0014.webp`, alt: 'CRL fazendo o clássico joinha de aprovação' };
const CRL_FACE: CrlImage = { src: `${IMAGE_PATH}STK-20231224-WA0026.webp`, alt: 'O rosto da lenda, CRL, pronto para os negócios' };

// Imagens icônicas adicionais para a galeria
const CRL_POLE_DANCE: CrlImage = { src: `${IMAGE_PATH}1704082687012.png`, alt: 'CRL demonstrando sua flexibilidade no pole dance' };
const CRL_STRIPPER: CrlImage = { src: `${IMAGE_PATH}STK-20230627-WA0012.webp`, alt: 'CRL em seu habitat natural, o palco' };
const CRL_DOLL: CrlImage = { src: `${IMAGE_PATH}STK-20230805-WA0024.webp`, alt: 'CRL com sua filha de mentira' };
const CRL_SWIMMER: CrlImage = { src: `${IMAGE_PATH}STK-20230503-WA0006.webp`, alt: 'CRL te desejando um "BOM DIA!" de touca' };
const CRL_WATER: CrlImage = { src: `${IMAGE_PATH}IMG-20250305-WA0043.jpg`, alt: 'CRL emergindo das águas' };
const CRL_TOWEL_HEAD: CrlImage = { src: `${IMAGE_PATH}IMG-20241221-WA0022.jpg`, alt: 'CRL e amigo em um momento de spa' };


// Imagens para o usuário selecionar no Mural da Vergonha
export const MEME_BASE_IMAGES: CrlImage[] = [
  CRL_MUSCLE,
  CRL_BANNED,
  CRL_SAUSAGE,
  CRL_GRADUATION,
  CRL_THUMBS
];

// Imagens para flutuar na tela
export const FLOATING_IMAGES: CrlImage[] = [
  CRL_FACE,
  CRL_THUMBS,
  CRL_SAUSAGE
];

// Todas as imagens para a galeria principal
export const GALLERY_IMAGES: CrlImage[] = [
  CRL_BANNED,
  CRL_MUSCLE,
  CRL_SAUSAGE,
  CRL_GRADUATION,
  CRL_THUMBS,
  CRL_FACE,
  CRL_POLE_DANCE,
  CRL_STRIPPER,
  CRL_DOLL,
  CRL_SWIMMER,
  CRL_WATER,
  CRL_TOWEL_HEAD,
];

// Assets para CrlGame
export const GAME_PLAYER_IMAGE: CrlImage = CRL_FACE;
export const GAME_OBSTACLE_IMAGE: CrlImage = CRL_SAUSAGE;
export const GAME_COLLECTIBLE_IMAGE: CrlImage = CRL_THUMBS;
