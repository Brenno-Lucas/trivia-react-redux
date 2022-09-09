export const PLAYER_INFO = 'PLAYER_INFO';

export const playerInfo = (name, gravatarEmail) => ({
  type: PLAYER_INFO,
  name,
  gravatarEmail,
});
