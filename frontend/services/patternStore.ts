function generateDefaultPattern(
  _fileName: string,
  _name: string,
  _hex: string,
  _amzColor: string,
  _isDefault: boolean = false
  ) {
  return {
    fileName: _fileName,
    name: _name,
    hex: _hex,
    amzColor: _amzColor,
    isDefault: _isDefault,
  };
};

export function getPatternFilePath(patternName: string, hex: string) {
  // if (pattern && pattern.fileName) {
  //   return `../../assets/patterns/${pattern.fileName}.png`;
  // }
  if (patternName && hex) {
    return `../../assets/patterns/${patternName}_${hex.substr(1)}.png`;
  }
  return '../../assets/patterns/empty.png';
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
  "long sleeve": [
    generateDefaultPattern('long sleeve_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('long sleeve_2e394b', 'Navy', '#2e394b', 'multicolored', true),
    generateDefaultPattern('long sleeve_3e332f', 'Brown', '#3e332f', 'brown'),
    generateDefaultPattern('long sleeve_5f4c84', 'Purple', '#5f4c84', 'Purple'),
    generateDefaultPattern('long sleeve_9e273b', 'Red', '#9e273b', 'Red'),
    generateDefaultPattern('long sleeve_269d5f', 'Green', '#269d5f', 'Green'),
    generateDefaultPattern('long sleeve_20519f', 'Royal', '#20519f', 'Blue'),
    generateDefaultPattern('long sleeve_24352d', 'Forest', '#24352d', 'multicolored'),
    generateDefaultPattern('long sleeve_c1c4c9', 'Sport grey', '#c1c4c9', 'multicolored'),
    generateDefaultPattern('long sleeve_ffffff', 'White', '#ffffff', 'white'),
  ],
  "mug": [
    generateDefaultPattern('mug', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('mug', 'White', '#ffffff', 'white'),
  ],
  "magic mug": [
    generateDefaultPattern('mug', 'Black', '#000000', 'Black', true),
  ],
  "Tanktop": [
    generateDefaultPattern('tanktop_default', 'Black', '#000000', 'Black', true),
    generateDefaultPattern('tanktop_2e394b', 'Navy', '#2e394b', 'multicolored', true),
    generateDefaultPattern('tanktop_c1c4c9', 'Sport grey', '#c1c4c9', 'multicolored'),
    generateDefaultPattern('tanktop_ffffff', 'White', '#ffffff', 'white'),
  ],
};
