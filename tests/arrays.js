import { test } from "uvu";
import * as assert from "uvu/assert";
import patch from "../dist/index.js";

test("top level array patch", () => {
	assert.equal(patch(["one", "two"], [{ path: [1], type: "REMOVE" }]), ["one"]);
});

test("nested array patch", () => {
	assert.equal(
		patch(
			["one", ["two-one", "two-two"]],
			[{ path: [1, 2], type: "CREATE", value: "two-three" }]
		),
		["one", ["two-one", "two-two", "two-three"]]
	);
});

test("array inside object", () => {
	assert.equal(
		patch({ main: ["one", "two"] }, [
			{ path: ["main", 1], type: "CHANGE", value: "three" },
		]),
		{ main: ["one", "three"] }
	);
});

test.run();
