/* eslint-disable prefer-destructuring */

const ValidationService = require('./ValidationService');

const fields = [
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
];

function validateField(payload) {
  const validationService = new ValidationService(payload);
  const isNotFinished = validationService.isFinished();

  if (isNotFinished) {
    return this.validationService.validationResponseType['-1'];
  }

  const resultVertical = validationService.checkVerticalCell();
  const resultDiagonal = validationService.checkDiagonalCell();
  const resultHorizontal = validationService.checkHorizontalCell();

  if (resultDiagonal) {
    return resultDiagonal;
  }

  if (resultVertical) {
    return resultVertical;
  }

  if (resultHorizontal) {
    return resultHorizontal;
  }

  return validationService.validationResponseType['-2'];
}

console.log(validateField(fields));
