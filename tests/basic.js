import { test } from "uvu";
import * as assert from "uvu/assert";
import patch from "../dist/index.js";

test("basic create patch", () => {
	assert.equal(
		patch({ test: true }, [{ path: ["test2"], type: "CREATE", value: "test" }]),
		{
			test: true,
			test2: "test",
		}
	);
});

test("basic change patch", () => {
	assert.equal(
		patch({ test: true }, [{ path: ["test"], type: "CHANGE", value: false }]),
		{
			test: false,
		}
	);
});

test("basic remove patch", () => {
	assert.equal(
		patch({ test: true, bananas: true }, [{ path: ["test"], type: "REMOVE" }]),
		{
			bananas: true,
		}
	);
});

test("heavily nested patch", () => {
	assert.equal(
		patch(
			{
				test: true,
				bananas: {
					stock: {
						geneva: true,
						stockholm: false,
					},
				},
			},
			[{ path: ["bananas", "stock", "stockholm"], type: "REMOVE" }]
		),
		{
			test: true,
			bananas: {
				stock: {
					geneva: true,
				},
			},
		}
	);
});
test.run();
