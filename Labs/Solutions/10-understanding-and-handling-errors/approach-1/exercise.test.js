import { combineAndPrint, combinedLength, sumArray } from "./exercise.js";

test("combinedLength :: valid arguments", (done) => {
  combinedLength([], [], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe(0);
    done();
  });
});

test("combinedLength :: valid arguments", (done) => {
  combinedLength([1], [], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe(1);
    done();
  });
});

test("combinedLength :: valid arguments", (done) => {
  combinedLength([], [1], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe(1);
    done();
  });
});

test("combinedLength :: valid arguments", (done) => {
  combinedLength([1, 2, 3], [1, 2, 3, 4], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe(7);
    done();
  });
});

test("combinedLength :: invalid arguments", (done) => {
  combinedLength(undefined, undefined, (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    done();
  });
});

test("combinedLength :: invalid arguments", (done) => {
  combinedLength(1, undefined, (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    expect(err.message).toBe("Both of the first arguments need to be arrays.");
    done();
  });
});

test("combinedLength :: invalid arguments", (done) => {
  combinedLength(1, {}, (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    expect(err.message).toBe("Both of the first arguments need to be arrays.");
    done();
  });
});

test("combinedLength :: invalid arguments", (done) => {
  combinedLength({}, [], (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    expect(err.message).toBe("Both of the first arguments need to be arrays.");
    done();
  });
});

test("combinedLength :: invalid arguments", (done) => {
  combinedLength([], {}, (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    expect(err.message).toBe("Both of the first arguments need to be arrays.");
    done();
  });
});

test("combinedLength :: invalid arguments", (done) => {
  combinedLength("", [], (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    expect(err.message).toBe("Both of the first arguments need to be arrays.");
    done();
  });
});

test("sumArray :: valid arguments", (done) => {
  sumArray([], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe(0);
    done();
  });
});

test("sumArray :: valid arguments", (done) => {
  sumArray([1], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe(1);
    done();
  });
});

test("sumArray :: valid arguments", (done) => {
  sumArray([1, 2, 3], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe(6);
    done();
  });
});

test("sumArray :: valid arguments", (done) => {
  sumArray([-1, -2, 3], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe(0);
    done();
  });
});

test("sumArray :: invalid arguments", (done) => {
  sumArray(undefined, (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    done();
  });
});

test("sumArray :: invalid arguments", (done) => {
  sumArray(1, (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    done();
  });
});

test("sumArray :: invalid arguments", (done) => {
  sumArray({}, (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    done();
  });
});

test("sumArray :: invalid arguments", (done) => {
  sumArray("", (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    done();
  });
});

test("sumArray :: invalid arguments", (done) => {
  sumArray(true, (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    done();
  });
});

test("sumArray :: invalid arguments", (done) => {
  sumArray(["", 2], (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    done();
  });
});

test("sumArray :: invalid arguments", (done) => {
  sumArray([1, "", true], (err, res) => {
    expect(err instanceof TypeError).toBeTruthy();
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint([], [], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe("Combined length: 0; Combined sum of elements: 0");
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint([1], [], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe("Combined length: 1; Combined sum of elements: 1");
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint([], [1], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe("Combined length: 1; Combined sum of elements: 1");
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint([1, 2, 3], [1, 2, 3, 4], (err, res) => {
    expect(err === null).toBeTruthy();
    expect(res).toBe("Combined length: 7; Combined sum of elements: 16");
    done();
  });
});

test("combineAndPrint :: invalid arguments", (done) => {
  combineAndPrint(undefined, undefined, (err, res) => {
    expect(err instanceof Error).toBeTruthy();
    expect(err.message).toBe(
      "Invalid arguments: both arguments must be arrays"
    );
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint(1, undefined, (err, res) => {
    expect(err instanceof Error).toBeTruthy();
    expect(err.message).toBe(
      "Invalid arguments: both arguments must be arrays"
    );
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint(1, undefined, (err, res) => {
    expect(err instanceof Error).toBeTruthy();
    expect(err.message).toBe(
      "Invalid arguments: both arguments must be arrays"
    );
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint(1, {}, (err, res) => {
    expect(err instanceof Error).toBeTruthy();
    expect(err.message).toBe(
      "Invalid arguments: both arguments must be arrays"
    );
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint({}, [], (err, res) => {
    expect(err instanceof Error).toBeTruthy();
    expect(err.message).toBe(
      "Invalid arguments: both arguments must be arrays"
    );
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint([], {}, (err, res) => {
    expect(err instanceof Error).toBeTruthy();
    expect(err.message).toBe(
      "Invalid arguments: both arguments must be arrays"
    );
    done();
  });
});

test("combineAndPrint :: valid arguments", (done) => {
  combineAndPrint("", [], (err, res) => {
    expect(err instanceof Error).toBeTruthy();
    expect(err.message).toBe(
      "Invalid arguments: both arguments must be arrays"
    );
    done();
  });
});
