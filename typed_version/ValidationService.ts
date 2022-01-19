interface IValidationService {
  isFinished(): boolean;
  responseMessage(resZero: boolean, resCross: boolean): String | boolean;
  checkVerticalCell(): String | boolean;
  checkHorizontalCell(): String | boolean;
  checkDiagonalCell(): String | boolean;
}

export default class ValidationService implements IValidationService {
  private readonly validationResponseType = {
    0: 'zero-player winner',
    1: 'cross-player winner',
    '-2': 'no empty cells on field',
    '-1': 'game not finished',
  };
  private fields: Array<Array<Number>>;

  constructor(fields: Array<Array<Number>>) {
    this.fields = fields;
  }

  get validationResponseMessage() {
    return this.validationResponseType;
  }

  isFinished(): boolean {
    return this.fields.flat().some((item) => item === -1);
  }

  responseMessage(resZero: boolean, resCross: boolean = resZero): boolean | String {
    if (resZero) {
      return this.validationResponseType[0];
    }

    if (resCross) {
      return this.validationResponseType[1];
    }

    return false;
  }

  checkVerticalCell(): boolean | String {
    const checkCell = (first: Number, second: Number, third: Number) => first === second && second === third;
    let res: any = -1;

    for (let i = 0; i < 3; i += 1) {
      const checkRes = checkCell(this.fields[i][0], this.fields[i][1], this.fields[i][2]);

      if (checkRes) {
        res = this.fields[i][0];
      }
    }

    const message = this.responseMessage(res);

    return message;
  }

  checkHorizontalCell(): boolean | String {
    const checkCell = (first: Number, second: Number, third: Number) => first === second && second === third;
    let res: any = -1;

    for (let i = 0; i < 3; i += 1) {
      const checkRes = checkCell(this.fields[0][i], this.fields[1][i], this.fields[2][i]);

      if (checkRes) {
        res = this.fields[0][i];
      }
    }

    const message = this.responseMessage(res);

    return message;
  }

  checkDiagonalCell(): boolean | String {
    const firstDiagonal = this.fields.map((item, index) => item[index]);
    const secondDiagonal = this.fields.map((item, index) => {
      const indexNew = this.fields.length - index - 1;
      return item[indexNew];
    });
    const resCross = firstDiagonal.every((cell) => cell === 1) || secondDiagonal.every((cell) => cell === 1);
    const resZero = firstDiagonal.every((cell) => cell === 0) || secondDiagonal.every((cell) => cell === 0);
    const message = this.responseMessage(resZero, resCross);

    return message;
  }

}
