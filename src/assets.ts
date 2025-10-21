// NOTA: Certifique-se de que todas as imagens referenciadas aqui existam na pasta `public/Crl/Imagens/` do seu projeto.
// Os nomes dos arquivos devem corresponder exatamente.

export interface CrlImage {
  src: string;
  alt: string;
}

const IMAGE_PATH = '/Crl/Imagens/';

const CRL_BANNED: CrlImage = { src: `${IMAGE_PATH}crl-proibido.png`, alt: 'CRL banido dos videogames' };
const CRL_MUSCLE: CrlImage = { src: `${IMAGE_PATH}crl-musculo.png`, alt: 'CRL mostrando os músculos' };
const CRL_SAUSAGE: CrlImage = { src: `${IMAGE_PATH}crl-calabresa.png`, alt: 'O famoso mamilo de calabresa do CRL' };
const CRL_GRADUATION: CrlImage = { src: `${IMAGE_PATH}crl-formatura.png`, alt: 'CRL na sua formatura' };
const CRL_THUMBS: CrlImage = { src: `${IMAGE_PATH}crl-joinha.png`, alt: 'CRL fazendo joinha' };
const CRL_FACE: CrlImage = { src: `${IMAGE_PATH}crl-rosto.png`, alt: 'O rosto da lenda, CRL' };


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
];

// Assets para CrlGame
export const GAME_PLAYER_IMAGE: CrlImage = CRL_FACE;
export const GAME_OBSTACLE_IMAGE: CrlImage = CRL_SAUSAGE;
export const GAME_COLLECTIBLE_IMAGE: CrlImage = CRL_THUMBS;
