export const error = (msg: string): [boolean, string] => [true, msg];

export const noError = (): [boolean] => [false];
