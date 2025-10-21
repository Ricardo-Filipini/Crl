// NOTA: Certifique-se de que todas as imagens e vídeos referenciados aqui existam na pasta `public/Crl/Imagens/` do seu projeto.

export interface CrlAsset {
  src: string;
  alt: string;
}

export interface CrlVideoAsset extends CrlAsset {
  type: 'video/mp4';
}


const PATH = '/Crl/Imagens/';

// Definições de todas as imagens e vídeos
const CRL_POLE_DANCE: CrlAsset = { src: `${PATH}1704082687012.png`, alt: 'CRL demonstrando sua flexibilidade no pole dance' };
const CRL_MUSCLE: CrlAsset = { src: `${PATH}1713050050406.png`, alt: 'CRL mostrando os músculos com sua regata azul' };
const CRL_GRADUATION_LIFT: CrlAsset = { src: `${PATH}1713528250395.png`, alt: 'CRL celebrando uma formatura com um levantamento épico' };
const CRL_SAUSAGE_NIPPLE: CrlAsset = { src: `${PATH}1760146522665.png`, alt: 'O famoso mamilo de calabresa do CRL em sua forma mais pura' };
const CRL_BANNED_VILLAMIX: CrlAsset = { src: `${PATH}IMG-20230317-WA0058.jpg`, alt: 'CRL com entrada proibida na Villa Mix' };
const CRL_MUSCLE_SELFIE: CrlAsset = { src: `${PATH}IMG-20230329-WA0009.jpg`, alt: 'CRL em uma selfie de autoapreciação muscular' };
const CRL_EATING: CrlAsset = { src: `${PATH}IMG-20230422-WA0026.jpg`, alt: 'CRL concentrado na hora do lanche' };
const CRL_TOWEL_HEADS: CrlAsset = { src: `${PATH}IMG-20241221-WA0022.jpg`, alt: 'CRL e amigo em um momento de spa com toalhas na cabeça' };
const CRL_WATER_EMERGE: CrlAsset = { src: `${PATH}IMG-20250305-WA0043.jpg`, alt: 'CRL emergindo das águas como uma aparição' };
const CRL_DILDO_MASTER: CrlAsset = { src: `${PATH}STK-20230305-WA0001.webp`, alt: 'CRL, o mestre dos objetos fálicos' };
const CRL_WEIGHTLIFTER: CrlAsset = { src: `${PATH}STK-20230430-WA0031.webp`, alt: 'CRL mostrando sua força sobre-humana' };
const CRL_SWIMMER_GOOD_MORNING: CrlAsset = { src: `${PATH}STK-20230503-WA0006.webp`, alt: 'CRL te desejando um "BOM DIA!" de touca de natação' };
const CRL_STRIPPER: CrlAsset = { src: `${PATH}STK-20230627-WA0012.webp`, alt: 'CRL em seu habitat natural, o palco de strip' };
const CRL_DOLL_DAD: CrlAsset = { src: `${PATH}STK-20230805-WA0024.webp`, alt: 'CRL em um momento paterno com sua filha de mentira' };
const CRL_OTHER_DOLL: CrlAsset = { src: `${PATH}STK-20231101-WA0018.webp`, alt: 'CRL com outra boneca, um pai presente' };
const CRL_THUMBS_UP_SIDE: CrlAsset = { src: `${PATH}STK-20231124-WA0009.webp`, alt: 'CRL fazendo joinha de lado' };
const CRL_THUMBS_UP: CrlAsset = { src: `${PATH}STK-20231207-WA0014.webp`, alt: 'CRL fazendo o clássico joinha de aprovação' };
const CRL_FACE_SUNGLASSES: CrlAsset = { src: `${PATH}STK-20231224-WA0026.webp`, alt: 'O rosto da lenda, CRL, pronto para os negócios' };
const CRL_DRUNK_DANCING: CrlAsset = { src: `${PATH}STK-20240405-WA0001.webp`, alt: 'CRL mostrando seu molejo de ombros com uma cerveja na mão' };
const CRL_SINGER: CrlAsset = { src: `${PATH}STK-20240413-WA0029.webp`, alt: 'CRL soltando a voz no microfone' };
const CRL_FRIENDS_COLLAGE: CrlAsset = { src: `${PATH}Screenshot_20251021-075109.png`, alt: 'CRL e seus momentos com amigos' };

// Vídeos
const VID_PARTY_SELFIE: CrlVideoAsset = { src: `${PATH}VID-20231221-WA0028.mp4`, alt: 'CRL em uma selfie de vídeo na festa', type: 'video/mp4' };
const VID_DANCING_1: CrlVideoAsset = { src: `${PATH}VID-20240512-WA0001.mp4`, alt: 'CRL mostrando seu molejo na pista', type: 'video/mp4' };
const VID_DANCING_2: CrlVideoAsset = { src: `${PATH}VID-20240512-WA0003.mp4`, alt: 'CRL em close-up na balada', type: 'video/mp4' };
const VID_DANCING_3: CrlVideoAsset = { src: `${PATH}VID-20240512-WA0004.mp4`, alt: 'CRL e a galera na festa', type: 'video/mp4' };
const VID_DANCING_4: CrlVideoAsset = { src: `${PATH}VID-20240512-WA0005.mp4`, alt: 'Mais um ângulo do molejo do CRL', type: 'video/mp4' };
const VID_DANCING_5: CrlVideoAsset = { src: `${PATH}VID-20240512-WA0006.mp4`, alt: 'A performance continua', type: 'video/mp4' };


// --- Listas de Assets para os Componentes ---

// Imagens para o usuário selecionar no Mural da Vergonha
export const MEME_BASE_IMAGES: CrlAsset[] = [
  CRL_MUSCLE,
  CRL_BANNED_VILLAMIX,
  CRL_SAUSAGE_NIPPLE,
  CRL_SWIMMER_GOOD_MORNING,
  CRL_DRUNK_DANCING,
  CRL_DOLL_DAD
];

// Imagens para flutuar na tela
export const FLOATING_IMAGES: CrlAsset[] = [
  CRL_FACE_SUNGLASSES,
  CRL_THUMBS_UP,
  CRL_SAUSAGE_NIPPLE,
  CRL_POLE_DANCE,
  CRL_STRIPPER
];

// Todas as imagens para a galeria principal
export const GALLERY_IMAGES: CrlAsset[] = [
  CRL_BANNED_VILLAMIX,
  CRL_MUSCLE,
  CRL_SAUSAGE_NIPPLE,
  CRL_GRADUATION_LIFT,
  CRL_THUMBS_UP,
  CRL_FACE_SUNGLASSES,
  CRL_POLE_DANCE,
  CRL_STRIPPER,
  CRL_DOLL_DAD,
  CRL_SWIMMER_GOOD_MORNING,
  CRL_WATER_EMERGE,
  CRL_TOWEL_HEADS,
  CRL_DILDO_MASTER,
  CRL_WEIGHTLIFTER,
  CRL_DRUNK_DANCING,
  CRL_SINGER,
  CRL_EATING,
  CRL_FRIENDS_COLLAGE,
  CRL_MUSCLE_SELFIE,
  CRL_OTHER_DOLL,
  CRL_THUMBS_UP_SIDE,
];

// Todos os vídeos para a galeria de vídeos
export const GALLERY_VIDEOS: CrlVideoAsset[] = [
    VID_PARTY_SELFIE,
    VID_DANCING_1,
    VID_DANCING_2,
    VID_DANCING_3,
    VID_DANCING_4,
    VID_DANCING_5,
];


// Assets para CrlGame
export const GAME_PLAYER_IMAGE: CrlAsset = CRL_FACE_SUNGLASSES;
export const GAME_OBSTACLE_IMAGE: CrlAsset = CRL_SAUSAGE_NIPPLE;
export const GAME_COLLECTIBLE_IMAGE: CrlAsset = CRL_THUMBS_UP;