import { PresetColorTypes } from '../_util/colors'; // eslint-disable-next-line import/prefer-default-export

export function isPresetColor(color) {
  return PresetColorTypes.indexOf(color) !== -1;
}