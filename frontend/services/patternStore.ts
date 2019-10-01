function generateDefaultPattern(
  _fileName: string,
  _name: string,
  _hex: string,
  _amzColor: string,
  _isDefault: boolean = false,
  _isUsed: boolean = true,
) {
  const _fileSrc = require(`../assets/patterns/${_fileName}.png`);

  const patternImgInfo = {
    fileName: _fileName,
    name: _name,
    hex: _hex,
    amzColor: _amzColor,
    isDefault: _isDefault,
    isUsed: _isUsed,
    fileSrc: _fileSrc
  };

  return patternImgInfo;
};

export function getPatternFilePath(patternName: string, hex: string) {
  // if (pattern && pattern.fileName) {
  //   return `../../assets/patterns/${pattern.fileName}.png`;
  // }
  if (patternName && hex) {
    // NOTE: This is just a hack case
    // if (hex === '#000000') {
    //   hex = '#default';
    // }
    // return `../../assets/patterns/${patternName}_${hex.substr(1)}.png`;
    const patternFile = patterns[patternName].find(pattern => {
      return (pattern.hex === hex);
    });

    return patternFile.fileSrc;
  }

  return '../assets/patterns/empty.png';
};

export const patterns = {
  "tshirt": [
    generateDefaultPattern('tshirt_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('tshirt_2e394b', 'Navy', '#2e394b', 'multicolored', true),
    generateDefaultPattern('tshirt_3e332f', 'Brown', '#3e332f', 'brown'),
    generateDefaultPattern('tshirt_4e5557', 'Charcoal', '#4e5557', 'multicolored'),
    generateDefaultPattern('tshirt_4f5042', 'Military green', '#4f5042', 'multicolored'),
    generateDefaultPattern('tshirt_5f4c84', 'Purple', '#5f4c84', 'Purple'),
    generateDefaultPattern('tshirt_5f2534', 'Maroon', '#5f2534', 'multicolored'),
    generateDefaultPattern('tshirt_7c2b56', 'Heather cardinal', '#7c2b56', 'multicolored'),
    generateDefaultPattern('tshirt_9e273b', 'Red', '#9e273b', 'Red'),
    generateDefaultPattern('tshirt_269d5f', 'Green', '#269d5f', 'Green'),
    generateDefaultPattern('tshirt_708fbe', 'Carolina blue', '#708fbe', 'multicolored'),
    generateDefaultPattern('tshirt_20519f', 'Royal', '#20519f', 'Blue'),
    generateDefaultPattern('tshirt_24352d', 'Forest', '#24352d', 'multicolored'),
    generateDefaultPattern('tshirt_50585a', 'Dark heather', '#50585a', 'multicolored'),
    generateDefaultPattern('tshirt_c1c4c9', 'Sport grey', '#c1c4c9', 'multicolored'),
    generateDefaultPattern('tshirt_d8447e', 'Pink', '#d8447e', 'multicolored'),
    generateDefaultPattern('tshirt_f0c3d7', 'Light Pink', '#f0c3d7', 'multicolored'),
    generateDefaultPattern('tshirt_feb846', 'Yellow', '#feb846', 'yellow'),
    generateDefaultPattern('tshirt_ff5927', 'Orange', '#ff5927', 'Orange'),
    generateDefaultPattern('tshirt_ffffff', 'White', '#ffffff', 'white'),
  ],
  "hoodie": [
    generateDefaultPattern('hoodie_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('hoodie_2e394b', 'Navy', '#2e394b', 'multicolored', true),
    generateDefaultPattern('hoodie_3e332f', 'Brown', '#3e332f', 'brown'),
    generateDefaultPattern('hoodie_5f4c84', 'Purple', '#5f4c84', 'Purple'),
    generateDefaultPattern('hoodie_5f2534', 'Maroon', '#5f2534', 'multicolored'),
    generateDefaultPattern('hoodie_9e273b', 'Red', '#9e273b', 'Red'),
    generateDefaultPattern('hoodie_269d5f', 'Green', '#269d5f', 'Green'),
    generateDefaultPattern('hoodie_20519f', 'Royal', '#20519f', 'Blue'),
    generateDefaultPattern('hoodie_24352d', 'Forest', '#24352d', 'multicolored'),
    generateDefaultPattern('hoodie_50585a', 'Dark heather', '#50585a', 'multicolored'),
    generateDefaultPattern('hoodie_c1c4c9', 'Sport grey', '#c1c4c9', 'multicolored'),
    generateDefaultPattern('hoodie_d8447e', 'Pink', '#d8447e', 'multicolored'),
    generateDefaultPattern('hoodie_ffffff', 'White', '#ffffff', 'white'),
  ],
  "sweater": [
    generateDefaultPattern('sweater_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('sweater_2e394b', 'Navy', '#2e394b', 'multicolored', true),
    generateDefaultPattern('sweater_3e332f', 'Brown', '#3e332f', 'brown'),
    generateDefaultPattern('sweater_5f4c84', 'Purple', '#5f4c84', 'Purple'),
    generateDefaultPattern('sweater_5f2534', 'Maroon', '#5f2534', 'multicolored'),
    generateDefaultPattern('sweater_9e273b', 'Red', '#9e273b', 'Red'),
    generateDefaultPattern('sweater_269d5f', 'Green', '#269d5f', 'Green'),
    generateDefaultPattern('sweater_20519f', 'Royal', '#20519f', 'Blue'),
    generateDefaultPattern('sweater_24352d', 'Forest', '#24352d', 'multicolored'),
    generateDefaultPattern('sweater_d8447e', 'Pink', '#d8447e', 'multicolored'),
    generateDefaultPattern('sweater_ffffff', 'White', '#ffffff', 'white'),
  ],
  "longSleeve": [
    generateDefaultPattern('longSleeve_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('longSleeve_2e394b', 'Navy', '#2e394b', 'multicolored', true),
    generateDefaultPattern('longSleeve_3e332f', 'Brown', '#3e332f', 'brown'),
    generateDefaultPattern('longSleeve_5f4c84', 'Purple', '#5f4c84', 'Purple'),
    generateDefaultPattern('longSleeve_9e273b', 'Red', '#9e273b', 'Red'),
    generateDefaultPattern('longSleeve_269d5f', 'Green', '#269d5f', 'Green'),
    generateDefaultPattern('longSleeve_20519f', 'Royal', '#20519f', 'Blue'),
    generateDefaultPattern('longSleeve_24352d', 'Forest', '#24352d', 'multicolored'),
    generateDefaultPattern('longSleeve_c1c4c9', 'Sport grey', '#c1c4c9', 'multicolored'),
    generateDefaultPattern('longSleeve_ffffff', 'White', '#ffffff', 'white'),
  ],
  "mug": [
    generateDefaultPattern('mug_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('mug_ffffff', 'White', '#ffffff', 'white'),
  ],
  "magicMug": [
    generateDefaultPattern('magicMug_default', 'Black', '#000000', 'Black', true),
  ],
  "tanktop": [
    generateDefaultPattern('tanktop_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('tanktop_2e394b', 'Navy', '#2e394b', 'multicolored', true),
    generateDefaultPattern('tanktop_c1c4c9', 'Sport grey', '#c1c4c9', 'multicolored'),
    generateDefaultPattern('tanktop_ffffff', 'White', '#ffffff', 'white'),
  ],
  "racerbacktank": [
    generateDefaultPattern('racerbacktank_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('racerbacktank_2e394b', 'Navy', '#2e394b', 'multicolored', true),
    generateDefaultPattern('racerbacktank_5f4c84', 'Purple', '#5f4c84', 'Purple'),
    generateDefaultPattern('racerbacktank_9e273b', 'Red', '#9e273b', 'Red'),
    generateDefaultPattern('racerbacktank_269d5f', 'Green', '#269d5f', 'Green'),
    generateDefaultPattern('racerbacktank_20519f', 'Royal', '#20519f', 'Blue'),
    generateDefaultPattern('racerbacktank_d8447e', 'Pink', '#d8447e', 'multicolored'),
    generateDefaultPattern('racerbacktank_ffffff', 'White', '#ffffff', 'white'),
    generateDefaultPattern('racerbacktank_827970', 'Grey', '#827970', 'multicolored'),
  ],
};
