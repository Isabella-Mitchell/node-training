function add(a, b) {
  return a + b;
}

console.assert(2 == add(1, 1), "Adding 1 + 1 to get 2");

add(1, 1);
add(3, 2);

function nestedError(n) {
  if (n == 0) {
    throw new Error("This is an expected error because ...");
  }
  nestedError(n - 1);
}

// nestedError(100);

class BBCError extends Error {
  constructor(message, code = "0000", state = {}) {
    super(message);
    this.code = code;
    this.state = state;
  }
}

try {
  throw new BBCError("iPlayer is down.", "HTTP_SRV_1010");
} catch (error) {
  if (error.code === "0000") {
    console.log("This is an unhandled error ... investigate");
    throw error;
  } else if (error.code === "HTTP_SRV_1010") {
    console.log(
      "Ping the uptime team - this is being triggered by the caching layer"
    );
  }
}
