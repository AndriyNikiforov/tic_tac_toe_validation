/* eslint-disable prefer-destructuring */
class ValidationService {
  constructor(fields) {
    this.fields = fields;
    this.validationResponseType = {
      0: 'zero-player winner',
      1: 'cross-player winner',
      '-2': 'no empty cells on field',
      '-1': 'game not finished',
    };
  }

  isFinished() {
    return this.fields.flat().some((item) => item === -1);
  }

  responseMessage(resZero, resCross = resZero) {
    if (resZero) {
      return this.validationResponseType[0];
    }

    if (resCross) {
      return this.validationResponseType[1];
    }

    return false;
  }

  checkVerticalCell() {
    const checkCell = (first, second, third) => first === second && second === third;
    let res = -1;

    for (let i = 0; i < 3; i += 1) {
      const checkRes = checkCell(this.fields[i][0], this.fields[i][1], this.fields[i][2]);

      if (checkRes) {
        res = this.fields[i][0];
      }
    }

    return this.responseMessage(res);
  }

  checkHorizontalCell() {
    const checkCell = (first, second, third) => first === second && second === third;
    let res = -1;

    for (let i = 0; i < 3; i += 1) {
      const checkRes = checkCell(this.fields[0][i], this.fields[1][i], this.fields[2][i]);

      if (checkRes) {
        res = this.fields[0][i];
      }
    }

    return this.responseMessage(res);
  }

  checkDiagonalCell() {
    const firstDiagonal = this.fields.map((item, index) => item[index]);
    const secondDiagonal = this.fields.map((item, index) => {
      const indexNew = this.fields.length - index - 1;
      return item[indexNew];
    });
    const resCross = firstDiagonal.every((cell) => cell === 1) || secondDiagonal.every((cell) => cell === 1);
    const resZero = firstDiagonal.every((cell) => cell === 0) || secondDiagonal.every((cell) => cell === 0);

    return this.responseMessage(resZero, resCross);
  }
}

module.exports = ValidationService;
