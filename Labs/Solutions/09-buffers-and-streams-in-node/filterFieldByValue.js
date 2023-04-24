import { Transform } from "stream";

export class FilterFieldByValue extends Transform {
  constructor(field, value, options = {}) {
    options.objectMode = true;
    super(options);
    this.value = value;
    this.field = field;
  }
  _transform(record, enc, cb) {
    if (record[this.field] === this.value) {
      this.push(String(JSON.stringify(record)));
    }
    cb();
  }
}
