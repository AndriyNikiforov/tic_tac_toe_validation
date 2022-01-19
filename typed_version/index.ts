import ValidationService from './ValidationService';

const fields: Array<Array<Number>> = [
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
];

function validateField(payload: Array<Array<Number>>) {
  const validationService: ValidationService = new ValidationService(payload);
  const isNotFinished = validationService.isFinished();
  const responseMessages = validationService.validationResponseMessage;

  if (isNotFinished) {
    return responseMessages['-1'];
  }

  const resultVertical: boolean | String = validationService.checkVerticalCell();
  const resultDiagonal: boolean | String = validationService.checkDiagonalCell();
  const resultHorizontal: boolean | String = validationService.checkHorizontalCell();

  if (resultDiagonal) {
    return resultDiagonal;
  }

  if (resultVertical) {
    return resultVertical;
  }

  if (resultHorizontal) {
    return resultHorizontal;
  }

  return responseMessages['-2'];
}

console.log(validateField(fields));
